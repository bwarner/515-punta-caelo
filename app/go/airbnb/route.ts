import { NextRequest, NextResponse } from "next/server";
import { PostHog } from "posthog-node";
import { getAppTags } from "@/lib/app-env";

const AIRBNB_BASE = "https://www.airbnb.com/h/puntacaelopanama";

function distinctIdFromCookie(req: NextRequest): string | null {
  const phCookie = req.cookies
    .getAll()
    .find((c) => c.name.startsWith("ph_") && c.name.endsWith("_posthog"));
  if (!phCookie) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(phCookie.value));
    return typeof parsed?.distinct_id === "string" ? parsed.distinct_id : null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const source = url.searchParams.get("source") || "unknown";
  const locale = url.searchParams.get("locale") || "unknown";
  const variant = url.searchParams.get("variant") || "button";
  const label = url.searchParams.get("label") || undefined;
  // Client component passes the visitor's posthog distinct_id via URL so
  // we don't have to depend on cookie parsing (which varies across SDK
  // versions). See components/tracked-airbnb-button.tsx.
  const didFromParam = url.searchParams.get("did") || null;

  // Identity resolution chain: URL param > cookie. We deliberately do NOT
  // mint a random anonymous ID. Real visitors always carry either the `did`
  // param (added client-side, see lib/use-posthog-did-href.ts) or the
  // first-party `ph_..._posthog` cookie. A request with neither is a
  // link-preview / crawler bot hitting /go/airbnb directly — tracking it
  // would create a throwaway person plus an identify per hit and inflate
  // person counts. Skip tracking for those and just redirect.
  const cookieId = distinctIdFromCookie(req);
  const distinctId = didFromParam ?? cookieId;
  const idSource = didFromParam ? "url_param" : "cookie";

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (apiKey && distinctId) {
    const client = new PostHog(apiKey, {
      host: "https://us.i.posthog.com",
      flushAt: 1,
      flushInterval: 0,
    });

    const now = new Date().toISOString();
    const referer = req.headers.get("referer") || undefined;

    // Person properties ride along on the capture via $set/$set_once.
    // Do NOT call client.identify() — it emits a separate $identify event
    // on every click, doubling event volume for no benefit here.
    client.capture({
      distinctId,
      event: "airbnb_link_clicked",
      properties: {
        source,
        locale,
        variant,
        label,
        id_source: idSource, // Track how identity was resolved (url_param/cookie)
        $current_url: referer,
        $referrer: referer,
        $set: { last_airbnb_click_at: now },
        $set_once: { first_airbnb_click_at: now },
        ...getAppTags(),
      },
    });

    await client.shutdown();
  }

  const dest = new URL(AIRBNB_BASE);
  dest.searchParams.set("source", "guidebook");
  dest.searchParams.set("utm_source", "guidebook");
  dest.searchParams.set("utm_medium", "site");
  dest.searchParams.set("utm_campaign", source);
  if (locale !== "unknown") {
    dest.searchParams.set("utm_content", locale);
  }

  return NextResponse.redirect(dest.toString(), 302);
}

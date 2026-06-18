import { NextRequest, NextResponse } from "next/server";
import { PostHog } from "posthog-node";

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
  const venue = url.searchParams.get("venue") || "unknown";
  const phone = url.searchParams.get("phone");
  const locale = url.searchParams.get("locale") || "unknown";
  const source = url.searchParams.get("source") || "unknown";

  if (!phone) {
    console.warn("[whatsapp] Missing phone parameter", {
      venue,
      locale,
      source,
    });
    return NextResponse.json(
      { error: "Missing phone parameter" },
      { status: 400 },
    );
  }

  // Only track when the first-party ph_..._posthog cookie identifies a real
  // visitor. We deliberately do NOT mint a random anonymous ID: a request
  // with no cookie is a link-preview / crawler bot hitting /go/whatsapp
  // directly, and tracking it would create a throwaway person plus an
  // identify per hit and inflate person counts. Skip those and just redirect.
  const distinctId = distinctIdFromCookie(req);

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (apiKey && distinctId) {
    try {
      const client = new PostHog(apiKey, {
        host: "https://us.i.posthog.com",
        flushAt: 1,
        flushInterval: 0,
      });
      const now = new Date().toISOString();
      const referer = req.headers.get("referer") || undefined;

      client.capture({
        distinctId,
        event: "whatsapp_link_clicked",
        properties: {
          venue,
          phone,
          locale,
          source,
          $current_url: referer,
          $referrer: referer,
        },
      });

      client.identify({
        distinctId,
        properties: {
          $set: { last_whatsapp_click_at: now },
          $set_once: { first_whatsapp_click_at: now },
        },
      });

      await client.shutdown();
    } catch (error) {
      console.error("[whatsapp] PostHog tracking failed", {
        error,
        venue,
        phone,
      });
      // Continue to redirect even if tracking fails
    }
  }

  // Redirect to WhatsApp
  const dest = `https://wa.me/${phone}`;
  return NextResponse.redirect(dest, 302);
}

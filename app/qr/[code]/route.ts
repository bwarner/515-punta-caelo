import { randomUUID } from "node:crypto";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PostHog } from "posthog-node";
import { defaultLocale, locales } from "@/i18n";
import { isValidQrCode, QR_CODES } from "@/lib/qr-codes";

const BASE_URL = "https://www.casapuntacaelo.com";

type Supported = (typeof locales)[number];

function pickFromAcceptLanguage(header: string): Supported {
  const candidates = header
    .toLowerCase()
    .split(",")
    .map((part) => part.trim().split(";")[0].split("-")[0]);
  for (const code of candidates) {
    if ((locales as readonly string[]).includes(code)) {
      return code as Supported;
    }
  }
  return defaultLocale;
}

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  if (!isValidQrCode(code)) {
    return NextResponse.redirect(new URL("/", BASE_URL), 302);
  }
  const config = QR_CODES[code];

  const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value;
  const accept = (await headers()).get("accept-language") || "";
  const locale: Supported =
    cookieLocale && (locales as readonly string[]).includes(cookieLocale)
      ? (cookieLocale as Supported)
      : pickFromAcceptLanguage(accept);

  // Identity resolution: did URL param → existing PostHog cookie → fresh anon.
  // The didFromParam case is mostly for testing — real scans come cold.
  const didFromParam = new URL(req.url).searchParams.get("did") || null;
  const didFromCookie = distinctIdFromCookie(req);
  const isNewIdentity = !didFromParam && !didFromCookie;
  const distinctId = didFromParam ?? didFromCookie ?? `anon_${randomUUID()}`;

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (apiKey) {
    const client = new PostHog(apiKey, {
      host: "https://us.i.posthog.com",
      flushAt: 1,
      flushInterval: 0,
    });
    const now = new Date().toISOString();
    const referer = req.headers.get("referer") || undefined;

    client.capture({
      distinctId,
      event: "qr_scanned",
      properties: {
        code,
        locale,
        campaign: config.campaign,
        $current_url: req.url,
        $referrer: referer,
        is_new_identity: isNewIdentity,
      },
    });

    client.identify({
      distinctId,
      properties: {
        $set: {
          last_qr_scanned_code: code,
          last_qr_scanned_at: now,
        },
        $set_once: {
          first_qr_scanned_code: code,
          first_qr_scanned_at: now,
        },
      },
    });

    await client.shutdown();
  }

  const dest = new URL(`/${locale}${config.destination}`, BASE_URL);
  dest.searchParams.set("utm_source", `qr_${code}`);
  dest.searchParams.set("utm_medium", "qr");
  dest.searchParams.set("utm_campaign", config.campaign);
  dest.searchParams.set("utm_content", locale);

  const response = NextResponse.redirect(dest.toString(), 302);

  // If we minted a fresh distinct_id (cold scan, no prior PostHog cookie),
  // write the PostHog persistence cookie so posthog-js on the destination
  // page restores this id and the qr_scanned event + subsequent pageviews
  // land on the same person. PostHog reads the cookie as URL-encoded JSON
  // and expects at minimum a distinct_id field; $device_id keeps anonymous
  // → identified linking consistent.
  if (isNewIdentity && apiKey) {
    const cookieName = `ph_${apiKey}_posthog`;
    const cookieValue = encodeURIComponent(
      JSON.stringify({
        distinct_id: distinctId,
        $device_id: distinctId,
      }),
    );
    response.cookies.set({
      name: cookieName,
      value: cookieValue,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year, matches posthog-js default
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

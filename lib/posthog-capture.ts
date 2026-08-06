/* global window, navigator, fetch, document */
/**
 * Direct PostHog event capture that bypasses the SDK transport layer.
 *
 * This is a workaround for posthog-js issue #3663 where events are captured
 * but never sent to the PostHog API. This utility sends events directly via
 * fetch() to the PostHog batch endpoint.
 *
 * @see https://github.com/PostHog/posthog-js/issues/3663
 */

import posthog from "posthog-js";

// PostHog managed reverse proxy: t.casapuntacaelo.com CNAMEs to PostHog's
// proxy service, keeping analytics traffic on a first-party domain so
// ad-blockers that filter *.posthog.com don't drop it. Used in all
// environments — unlike the old /relay Next.js rewrite, it works from
// localhost without 431 header-size errors.
export const POSTHOG_PROXY_HOST = "https://t.casapuntacaelo.com";

// Generate a UUID v4
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface PostHogBatchEvent {
  type: "capture" | "identify" | "page" | "screen" | "group" | "alias";
  event: string;
  distinct_id: string;
  properties: Record<string, unknown>;
  timestamp: string;
}

/**
 * Capture an event directly to PostHog, bypassing the SDK transport.
 *
 * Falls back to standard posthog.capture() if the direct capture fails.
 */
export async function captureEvent(
  eventName: string,
  properties: Record<string, unknown> = {},
): Promise<void> {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!apiKey) {
    console.warn("[PostHog Direct] No API key configured");
    return;
  }

  // Get distinct_id from the SDK if available, otherwise generate one
  let distinctId: string;
  try {
    distinctId = posthog.get_distinct_id?.() || generateUUID();
  } catch {
    distinctId = generateUUID();
  }

  // Get registered properties from the SDK
  let registeredProps: Record<string, unknown> = {};
  try {
    if (posthog.persistence) {
      registeredProps = posthog.persistence.props || {};
    }
  } catch {
    // Ignore errors accessing persistence
  }

  // Session properties from the SDK's session manager. Without $session_id,
  // PostHog's Web Analytics tab (Visitors/Page views/Sessions tiles, Paths,
  // Sources, Devices) shows zero — those queries are session-based, unlike
  // plain event insights.
  let sessionProps: Record<string, unknown> = {};
  try {
    const sessionId = posthog.get_session_id?.();
    if (sessionId) {
      sessionProps.$session_id = sessionId;
    }
    const windowId =
      posthog.sessionManager?.checkAndGetSessionAndWindowId(true)?.windowId;
    if (windowId) {
      sessionProps.$window_id = windowId;
    }
  } catch {
    // Ignore errors accessing the session manager
  }

  // Referrer properties. The SDK adds these automatically; this transport
  // must set them itself or every session shows as "(direct)" in Web
  // Analytics' Sources. document.referrer is not updated by SPA pushState
  // navigations, so it keeps pointing at the original external referrer —
  // which is exactly what session attribution wants. "$direct" is PostHog's
  // sentinel for no-referrer traffic.
  let referrerProps: Record<string, unknown> = {};
  try {
    if (typeof document !== "undefined") {
      const ref = document.referrer;
      referrerProps = {
        $referrer: ref || "$direct",
        $referring_domain: ref ? new URL(ref).hostname : "$direct",
      };
    }
  } catch {
    // Malformed document.referrer; leave referrer props unset
  }

  const event: PostHogBatchEvent = {
    type: "capture",
    event: eventName,
    distinct_id: distinctId,
    properties: {
      $lib: "posthog-js",
      $lib_version: "direct-capture",
      $current_url: typeof window !== "undefined" ? window.location.href : "",
      $host: typeof window !== "undefined" ? window.location.host : "",
      $pathname: typeof window !== "undefined" ? window.location.pathname : "",
      $browser:
        typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      $screen_height:
        typeof window !== "undefined" ? window.screen?.height : undefined,
      $screen_width:
        typeof window !== "undefined" ? window.screen?.width : undefined,
      $viewport_height:
        typeof window !== "undefined" ? window.innerHeight : undefined,
      $viewport_width:
        typeof window !== "undefined" ? window.innerWidth : undefined,
      ...referrerProps,
      ...registeredProps,
      ...sessionProps,
      ...properties,
    },
    timestamp: new Date().toISOString(),
  };

  const batchEndpoint = `${POSTHOG_PROXY_HOST}/batch/`;

  try {
    const response = await fetch(batchEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        batch: [event],
      }),
      keepalive: true,
    });

    if (!response.ok) {
      console.warn(
        `[PostHog Direct] Capture failed: ${response.status} ${response.statusText}`,
      );
      // Fallback to SDK capture
      posthog.capture(eventName, properties);
    }
  } catch (error) {
    console.warn("[PostHog Direct] Capture error:", error);
    // Fallback to SDK capture
    posthog.capture(eventName, properties);
  }
}

/**
 * Capture a pageview event directly to PostHog.
 */
export async function capturePageview(
  properties: Record<string, unknown> = {},
): Promise<void> {
  return captureEvent("$pageview", properties);
}

/**
 * Capture a pageleave event directly to PostHog.
 */
export async function capturePageleave(
  properties: Record<string, unknown> = {},
): Promise<void> {
  return captureEvent("$pageleave", properties);
}

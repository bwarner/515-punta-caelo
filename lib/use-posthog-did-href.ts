"use client";

/* global setTimeout, clearTimeout */
import { useEffect, useState } from "react";
import posthog from "posthog-js";

/**
 * Appends `&did=<distinct_id>` to the href if PostHog ID is available.
 */
function appendDid(baseHref: string, did: string): string {
  const separator = baseHref.includes("?") ? "&" : "?";
  return `${baseHref}${separator}did=${encodeURIComponent(did)}`;
}

/**
 * Try to get PostHog distinct_id synchronously (works if already initialized).
 */
function getDidSync(): string | null {
  try {
    const did = posthog?.get_distinct_id?.();
    return typeof did === "string" && did.length > 0 ? did : null;
  } catch {
    return null;
  }
}

/**
 * Returns a copy of `baseHref` with the visitor's PostHog `distinct_id`
 * appended as `&did=<id>` (or just appended as the first query param if
 * `baseHref` has none).
 *
 * Used by client-side outbound-link components ({@link "../components/tracked-airbnb-button"},
 * {@link "../components/tracked-airbnb-link"}) so the server route on the
 * other end can attribute the click to the same PostHog person as the
 * visitor's autocapture events. See `app/go/airbnb/route.ts` for the
 * server-side counterpart.
 *
 * Implementation detail: posthog-js's distinct_id isn't guaranteed to be
 * available at the moment a client component first renders — `posthog.init`
 * runs from `instrumentation-client.ts` but the `loaded` lifecycle can lag
 * a tick or two. We try synchronously first, then poll every 50ms until
 * the id is available (max 3 seconds), then stop.
 *
 * The href is updated via `setHref` (not by mutating an anchor in `onClick`)
 * because `target="_blank"` navigation timing makes onClick-time href
 * mutations unreliable across browsers — by the time the user can click,
 * the rendered anchor already carries `&did=...`.
 */
export function usePosthogDidHref(baseHref: string): string {
  // Try synchronously first - often works on subsequent renders
  const initialDid = getDidSync();
  const [href, setHref] = useState(
    initialDid ? appendDid(baseHref, initialDid) : baseHref,
  );

  useEffect(() => {
    // If we already have the ID, no need to poll
    if (initialDid) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;
    const maxAttempts = 60; // 50ms * 60 = 3 seconds max

    const attach = () => {
      if (cancelled) return;
      attempts++;

      const did = getDidSync();
      if (did) {
        setHref(appendDid(baseHref, did));
        return;
      }

      // Stop polling after max attempts (PostHog probably blocked)
      if (attempts < maxAttempts) {
        timer = setTimeout(attach, 50);
      }
    };
    attach();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [baseHref, initialDid]);

  return href;
}

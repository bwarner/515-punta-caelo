"use client";

/* global setTimeout, clearTimeout */
import { useEffect, useState } from "react";
import posthog from "posthog-js";

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
 * a tick or two. We poll every 100ms until the id is available, then stop.
 * In practice it's ready on the first tick; the polling is just insurance.
 *
 * The href is updated via `setHref` (not by mutating an anchor in `onClick`)
 * because `target="_blank"` navigation timing makes onClick-time href
 * mutations unreliable across browsers — by the time the user can click,
 * the rendered anchor already carries `&did=...`.
 */
export function usePosthogDidHref(baseHref: string): string {
  const [href, setHref] = useState(baseHref);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const attach = () => {
      if (cancelled) return;
      const did = posthog?.get_distinct_id?.();
      if (did) {
        const separator = baseHref.includes("?") ? "&" : "?";
        setHref(`${baseHref}${separator}did=${encodeURIComponent(did)}`);
        return;
      }
      timer = setTimeout(attach, 100);
    };
    attach();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [baseHref]);

  return href;
}

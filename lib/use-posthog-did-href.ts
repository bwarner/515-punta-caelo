"use client";

import { useEffect, useState } from "react";
import { usePostHog } from "posthog-js/react";

/**
 * Appends `&did=<distinct_id>` to the href if PostHog ID is available.
 */
function appendDid(baseHref: string, did: string): string {
  const separator = baseHref.includes("?") ? "&" : "?";
  return `${baseHref}${separator}did=${encodeURIComponent(did)}`;
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
 * Implementation: Uses the `usePostHog()` hook from posthog-js/react.
 * The hook provides direct access to the PostHog instance, making the
 * distinct_id immediately available once PostHog loads.
 *
 * The href is updated via `setHref` (not by mutating an anchor in `onClick`)
 * because `target="_blank"` navigation timing makes onClick-time href
 * mutations unreliable across browsers — by the time the user can click,
 * the rendered anchor already carries `&did=...`.
 */
export function usePosthogDidHref(baseHref: string): string {
  const posthog = usePostHog();
  const [href, setHref] = useState(baseHref);

  useEffect(() => {
    // PostHog may not be loaded yet on first render
    if (!posthog) return;

    const distinctId = posthog.get_distinct_id();
    if (distinctId) {
      setHref(appendDid(baseHref, distinctId));
    }
  }, [baseHref, posthog]);

  return href;
}

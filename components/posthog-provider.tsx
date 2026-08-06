/* global window */
"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { Suspense, useEffect, useRef, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getAppTags, getAppEnv } from "@/lib/app-env";
import {
  capturePageview,
  capturePageleave,
  POSTHOG_PROXY_HOST,
} from "@/lib/posthog-capture";

function compactRecord(input: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(input).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Only initialize once
    if (posthog.__loaded) return;

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      // Managed reverse proxy (see POSTHOG_PROXY_HOST) — same host in every
      // environment, so no dev/prod split.
      api_host: POSTHOG_PROXY_HOST,
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      // Include the defaults option as required by PostHog
      defaults: "2025-05-24",
      // Capture events and create person profiles for all users
      person_profiles: "always",
      // Enables capturing unhandled exceptions via Error Tracking
      capture_exceptions: true,
      // Disable automatic pageview - handled via direct capture below
      // due to posthog-js issue #3663 where SDK capture() never sends events
      capture_pageview: false,
      // Disable autocapture - too noisy, we use custom events instead
      autocapture: false,
      loaded: (ph) => {
        const host =
          typeof window !== "undefined" ? window.location.host : undefined;

        const appEnv = getAppEnv();
        const trafficType =
          host === "localhost:3000" || host === "127.0.0.1:3000"
            ? "local"
            : appEnv === "preview"
              ? "preview"
              : "production";

        ph.register(
          compactRecord({
            ...getAppTags(),
            traffic_type: trafficType,
            app_host: host,
          }),
        );
      },
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </PHProvider>
  );
}

/**
 * Captures pageviews and pageleaves on route changes using direct fetch.
 * This works around posthog-js issue #3663 where SDK capture() never sends,
 * which is also why capture_pageleave in posthog.init() would not work here.
 * Wrapped in Suspense because useSearchParams requires it for static rendering.
 */
function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPageRef = useRef<{ url: string; pathname: string } | null>(null);

  useEffect(() => {
    if (!posthog.__loaded) return;

    const url =
      typeof window !== "undefined"
        ? window.location.href
        : pathname + (searchParams?.toString() ? `?${searchParams}` : "");

    // On SPA navigation, record leaving the previous page before the new
    // pageview. window.location already points at the new URL, so the
    // previous page's URL must be passed explicitly.
    const prev = lastPageRef.current;
    if (prev && prev.url !== url) {
      capturePageleave({ $current_url: prev.url, $pathname: prev.pathname });
    }
    lastPageRef.current = { url, pathname };

    capturePageview({
      $current_url: url,
      $pathname: pathname,
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    // Hard exits: tab close, reload, or navigation off-site. pagehide also
    // covers bfcache suspension; captureEvent's keepalive fetch survives
    // page teardown.
    const handlePagehide = () => {
      const prev = lastPageRef.current;
      if (!prev) return;
      lastPageRef.current = null;
      capturePageleave({ $current_url: prev.url, $pathname: prev.pathname });
    };
    // Restore tracking if the page comes back from bfcache.
    const handlePageshow = () => {
      if (lastPageRef.current || typeof window === "undefined") return;
      lastPageRef.current = {
        url: window.location.href,
        pathname: window.location.pathname,
      };
    };

    window.addEventListener("pagehide", handlePagehide);
    window.addEventListener("pageshow", handlePageshow);
    return () => {
      window.removeEventListener("pagehide", handlePagehide);
      window.removeEventListener("pageshow", handlePageshow);
    };
  }, []);

  return null;
}

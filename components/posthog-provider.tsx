/* global window */
"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { Suspense, useEffect, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getAppTags, getAppEnv } from "@/lib/app-env";
import { capturePageview } from "@/lib/posthog-capture";

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
      // Use direct API in development to avoid 431 errors from reverse proxy.
      // In prod, /relay is rewritten to PostHog in next.config.js
      api_host:
        process.env.NODE_ENV === "development"
          ? "https://us.i.posthog.com"
          : "/relay",
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
 * Captures pageviews on route changes using direct fetch.
 * This works around posthog-js issue #3663 where SDK capture() never sends.
 * Wrapped in Suspense because useSearchParams requires it for static rendering.
 */
function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!posthog.__loaded) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    capturePageview({
      $current_url: typeof window !== "undefined" ? window.location.href : url,
      $pathname: pathname,
    });
  }, [pathname, searchParams]);

  return null;
}

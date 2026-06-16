/* global window */
import posthog from "posthog-js";
import { getAppTags, getAppEnv } from "@/lib/app-env";

function compactRecord(input: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(input).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );
}

// Initialize PostHog early via Next.js instrumentation.
// The PostHogProvider component also checks __loaded to avoid double init.
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
  // Turn on debug in development mode
  debug: process.env.NODE_ENV === "development",
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

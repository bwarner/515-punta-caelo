/* global window */
import posthog from "posthog-js";
import { getAppTags, getAppEnv } from "@/lib/app-env";
import { POSTHOG_PROXY_HOST } from "@/lib/posthog-config";

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
  // Managed reverse proxy (see POSTHOG_PROXY_HOST) — same host in every
  // environment, so no dev/prod split.
  api_host: POSTHOG_PROXY_HOST,
  ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  // Include the defaults option as required by PostHog
  defaults: "2025-05-24",
  // Capture events and create person profiles for all users
  person_profiles: "always",
  // Native pageview/pageleave capture; "history_change" also tracks SPA
  // navigations via the History API.
  capture_pageview: "history_change",
  capture_pageleave: true,
  // Disable autocapture - too noisy, we use custom events instead
  autocapture: false,
  // Enables capturing unhandled exceptions via Error Tracking
  capture_exceptions: true,
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

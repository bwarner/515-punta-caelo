/* global window */
import posthog from "posthog-js";

function compactRecord(input: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(input).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );
}

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  // Include the defaults option as required by PostHog
  defaults: "2025-05-24",
  // Enables capturing unhandled exceptions via Error Tracking
  capture_exceptions: true,
  // Turn on debug in development mode
  debug: process.env.NODE_ENV === "development",
  loaded: (ph) => {
    const host =
      typeof window !== "undefined" ? window.location.host : undefined;

    // Vercel provides NEXT_PUBLIC_VERCEL_ENV in many setups ("production" | "preview" | "development").
    // Fall back to NODE_ENV so this still works locally even without Vercel env vars.
    const appEnv =
      process.env.NEXT_PUBLIC_VERCEL_ENV ??
      (process.env.NODE_ENV === "development" ? "development" : "production");

    const trafficType =
      host === "localhost:3000" || host === "127.0.0.1:3000"
        ? "local"
        : appEnv === "preview"
          ? "preview"
          : "production";

    ph.register(
      compactRecord({
        app: "punta-caelo",
        app_env: appEnv,
        traffic_type: trafficType,
        // Helpful for filtering (even though $host/$current_url already exist)
        app_host: host,
        deployment_url: process.env.NEXT_PUBLIC_VERCEL_URL,
        git_commit_sha: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
        git_branch: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF,
      }),
    );
  },
});

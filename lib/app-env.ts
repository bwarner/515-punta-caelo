// Single source of truth for the env/version tags attached to every
// PostHog event so production / preview / development traffic stays
// distinguishable in Insights. Used by:
//   - instrumentation-client.ts (super properties via posthog.register)
//   - app/go/airbnb/route.ts and app/qr/[code]/route.ts (server captures)
//
// Client picks these up at build time from NEXT_PUBLIC_VERCEL_* (defined in
// next.config.js so they are baked into the bundle). Server picks them up
// at runtime from VERCEL_* directly. Both paths fall through to NODE_ENV
// for local dev.

export type AppEnv = "production" | "preview" | "development";

export function getAppEnv(): AppEnv {
  const vercelEnv =
    process.env.VERCEL_ENV ?? process.env.NEXT_PUBLIC_VERCEL_ENV;
  if (
    vercelEnv === "production" ||
    vercelEnv === "preview" ||
    vercelEnv === "development"
  ) {
    return vercelEnv;
  }
  return process.env.NODE_ENV === "production" ? "production" : "development";
}

export function getAppTags(): Record<string, string | undefined> {
  return {
    app: "punta-caelo",
    app_env: getAppEnv(),
    deployment_url:
      process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL ?? undefined,
    git_commit_sha:
      process.env.VERCEL_GIT_COMMIT_SHA ??
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
      undefined,
    git_branch:
      process.env.VERCEL_GIT_COMMIT_REF ??
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ??
      undefined,
  };
}

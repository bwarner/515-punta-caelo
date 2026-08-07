// PostHog managed reverse proxy: t.casapuntacaelo.com CNAMEs to PostHog's
// proxy service, keeping analytics traffic on a first-party domain so
// ad-blockers that filter *.posthog.com don't drop it. Used in all
// environments — unlike the old /relay Next.js rewrite, it works from
// localhost without 431 header-size errors.
export const POSTHOG_PROXY_HOST = "https://t.casapuntacaelo.com";

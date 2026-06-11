import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Expose Vercel system env vars to the client bundle so PostHog can tag
  // every event with the right environment + deploy. Server reads VERCEL_*
  // directly at runtime; client needs NEXT_PUBLIC_* baked in at build time.
  // See lib/app-env.ts for how they are consumed.
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV ?? "",
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL ?? "",
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA ?? "",
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: process.env.VERCEL_GIT_COMMIT_REF ?? "",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  // Legacy + collision redirects:
  // - /:locale/index was the old home URL → /:locale
  // - /:locale/home would collide with home-${locale}.mdx + [slug] route → /:locale
  async redirects() {
    return [
      // Redirect non-www to www for SEO consistency
      {
        source: "/:path*",
        has: [{ type: "host", value: "casapuntacaelo.com" }],
        destination: "https://www.casapuntacaelo.com/:path*",
        permanent: true,
      },
      // TinaCMS admin redirect
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false,
      },
      {
        source: "/:locale(en|es)/index",
        destination: "/:locale",
        permanent: true,
      },
      {
        source: "/:locale(en|es)/home",
        destination: "/:locale",
        permanent: true,
      },
    ];
  },
  // PostHog reverse proxy. Path is intentionally generic to avoid common
  // ad-blocker filter rules that pattern-match PostHog-flavored paths like
  // /ingest, /ph, /posthog. Client uses /relay as api_host in production.
  async rewrites() {
    return [
      {
        source: "/relay/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/relay/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  },
});

export default withMDX(nextConfig);

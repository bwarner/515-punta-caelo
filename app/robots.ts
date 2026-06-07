import { MetadataRoute } from "next";

// Sensitive guest pages should never appear in any index (search or LLM).
const SENSITIVE_PATHS = [
  "/api/",
  "/relay/", // PostHog reverse proxy (see next.config.js)
  "/*/wifi",
  "/*/check-in-out",
  "/*/emergency",
  "/*/contact",
  "/*/rules",
  "/*/location", // contains full street address — keep out of search + LLM indexes
  "/qr/", // in-unit QR redirector — not for indexing
  "/print/", // print-only pages — not for indexing
];

// AI/LLM crawlers we explicitly allow on public content (for citation in
// ChatGPT, Claude, Perplexity, etc.) while still blocking sensitive paths.
const LLM_USER_AGENTS = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT Search live fetcher
  "ChatGPT-User", // ChatGPT browsing on behalf of a user
  "ClaudeBot", // Anthropic
  "Claude-Web", // Anthropic browsing
  "PerplexityBot",
  "Google-Extended", // Google AI training (separate from Googlebot SEO)
  "Applebot-Extended", // Apple AI
  "CCBot", // Common Crawl (feeds many LLM training corpora)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: SENSITIVE_PATHS,
      },
      ...LLM_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: SENSITIVE_PATHS,
      })),
    ],
    sitemap: "https://www.casapuntacaelo.com/sitemap.xml",
  };
}

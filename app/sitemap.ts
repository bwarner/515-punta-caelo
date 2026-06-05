import { MetadataRoute } from "next";

const BASE_URL = "https://www.casapuntacaelo.com";

// Public pages to index (excludes sensitive guest info like WiFi, check-in codes, etc.)
// Home is served at /${locale} (no slug), tracked separately below.
const pages = [
  "property",
  "amenities",
  "transport",
  "things-to-know",
  "things-to-do",
  "places-to-eat",
  "places-to-drink",
  "faq",
  "before-you-go",
  "review",
  "gallery",
  "testimonials",
  // Excluded: wifi, check-in-out, emergency, contact, rules (sensitive guest info)
  // Excluded: location (contains full street address)
  // Excluded: guide (nav-only, noindex)
];

const locales = ["en", "es"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });

    for (const page of pages) {
      routes.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page === "property" ? 0.9 : 0.7,
      });
    }
  }

  return routes;
}

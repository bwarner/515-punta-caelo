import { MetadataRoute } from "next";

const BASE_URL = "https://casapuntacaelo.com";

// Public pages to index (excludes sensitive guest info like WiFi, check-in codes, etc.)
const pages = [
  "index",
  "guide",
  "property",
  "amenities",
  "location",
  "transport",
  "things-to-know",
  "things-to-do",
  "places-to-eat",
  "places-to-drink",
  "faq",
  "before-you-go",
  "review",
  "gallery",
  "welcome",
  // Excluded: wifi, check-in-out, emergency, contact, rules (sensitive guest info)
];

const locales = ["en", "es"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Add all locale/page combinations
  for (const locale of locales) {
    for (const page of pages) {
      routes.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: page === "index" ? "weekly" : "monthly",
        priority: page === "index" ? 1.0 : page === "guide" ? 0.9 : 0.7,
      });
    }
  }

  return routes;
}

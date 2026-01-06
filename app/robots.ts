import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/ingest/",
        // Sensitive guest information - block from indexing
        "/*/wifi",
        "/*/check-in-out",
        "/*/emergency",
        "/*/contact",
        "/*/rules",
      ],
    },
    sitemap: "https://casapuntacaelo.com/sitemap.xml",
  };
}

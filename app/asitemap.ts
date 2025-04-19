import { MetadataRoute } from "next";
import { locales } from "@/i18n";

const routes = ["", "listing", "faqs", "rules", "tips", "checkout"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route ? `/${route}` : ""}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );
}

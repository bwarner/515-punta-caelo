const BASE_URL = "https://www.casapuntacaelo.com";

export type Locale = "en" | "es";

export interface AlternatesConfig {
  canonical: string;
  languages: {
    en: string;
    es: string;
    "x-default": string;
  };
}

/**
 * Generate canonical and hreflang alternate URLs for SEO
 * @param locale - Current page locale
 * @param slug - Page slug (optional, omit for homepage)
 * @returns Alternates config for Next.js metadata
 */
export function generateAlternates(
  locale: Locale,
  slug?: string,
): AlternatesConfig {
  const path = slug ? `/${slug}` : "";

  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages: {
      en: `${BASE_URL}/en${path}`,
      es: `${BASE_URL}/es${path}`,
      "x-default": `${BASE_URL}/en${path}`,
    },
  };
}

export { BASE_URL };

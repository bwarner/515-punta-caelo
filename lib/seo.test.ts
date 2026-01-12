import { describe, it, expect } from "vitest";
import { generateAlternates, BASE_URL } from "./seo";

describe("generateAlternates", () => {
  describe("canonical URLs", () => {
    it("generates correct canonical URL for English content page", () => {
      const result = generateAlternates("en", "property");
      expect(result.canonical).toBe(`${BASE_URL}/en/property`);
    });

    it("generates correct canonical URL for Spanish content page", () => {
      const result = generateAlternates("es", "property");
      expect(result.canonical).toBe(`${BASE_URL}/es/property`);
    });

    it("generates correct canonical URL for homepage without slug", () => {
      const result = generateAlternates("en");
      expect(result.canonical).toBe(`${BASE_URL}/en`);
    });
  });

  describe("hreflang alternate URLs", () => {
    it("generates all language alternates for content page", () => {
      const result = generateAlternates("en", "property");

      expect(result.languages.en).toBe(`${BASE_URL}/en/property`);
      expect(result.languages.es).toBe(`${BASE_URL}/es/property`);
      expect(result.languages["x-default"]).toBe(`${BASE_URL}/en/property`);
    });

    it("generates all language alternates for Spanish page", () => {
      const result = generateAlternates("es", "amenities");

      expect(result.languages.en).toBe(`${BASE_URL}/en/amenities`);
      expect(result.languages.es).toBe(`${BASE_URL}/es/amenities`);
      expect(result.languages["x-default"]).toBe(`${BASE_URL}/en/amenities`);
    });

    it("generates alternates for homepage", () => {
      const result = generateAlternates("es");

      expect(result.languages.en).toBe(`${BASE_URL}/en`);
      expect(result.languages.es).toBe(`${BASE_URL}/es`);
      expect(result.languages["x-default"]).toBe(`${BASE_URL}/en`);
    });
  });

  describe("x-default", () => {
    it("x-default always points to English version", () => {
      const enResult = generateAlternates("en", "faq");
      const esResult = generateAlternates("es", "faq");

      expect(enResult.languages["x-default"]).toBe(`${BASE_URL}/en/faq`);
      expect(esResult.languages["x-default"]).toBe(`${BASE_URL}/en/faq`);
    });
  });

  describe("consistency between locales", () => {
    it("both locales generate the same alternate URLs for the same slug", () => {
      const enResult = generateAlternates("en", "transport");
      const esResult = generateAlternates("es", "transport");

      // Alternate URLs should be identical regardless of current locale
      expect(enResult.languages.en).toBe(esResult.languages.en);
      expect(enResult.languages.es).toBe(esResult.languages.es);
      expect(enResult.languages["x-default"]).toBe(
        esResult.languages["x-default"],
      );
    });
  });
});

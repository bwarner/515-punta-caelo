import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

// Get all content pages from the content directory
function getContentPages(): string[] {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs.readdirSync(contentDir);

  // Extract unique slugs from English files (to avoid duplicates from es/en pairs)
  const slugs = files
    .filter((f) => f.endsWith("-en.mdx"))
    .map((f) => f.replace(/-en\.mdx$/, ""));

  return slugs;
}

test.describe("Page Hydration Tests", () => {
  const slugs = getContentPages();

  for (const slug of slugs) {
    test(`/en/${slug} should load without hydration errors`, async ({
      page,
    }) => {
      const errors: string[] = [];

      // Listen for console errors
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          const text = msg.text();
          // Check for hydration-related errors
          if (
            text.includes("Hydration") ||
            text.includes("cannot be a descendant") ||
            text.includes("cannot contain a nested")
          ) {
            errors.push(text);
          }
        }
      });

      // Listen for page errors
      page.on("pageerror", (error) => {
        if (error.message.includes("Hydration")) {
          errors.push(error.message);
        }
      });

      await page.goto(`/en/${slug}`);

      // Wait a bit for any async hydration errors
      await page.waitForTimeout(1000);

      expect(
        errors,
        `Hydration errors found on /en/${slug}:\n${errors.join("\n")}`,
      ).toHaveLength(0);
    });
  }

  for (const slug of slugs) {
    test(`/es/${slug} should load without hydration errors`, async ({
      page,
    }) => {
      const errors: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          const text = msg.text();
          if (
            text.includes("Hydration") ||
            text.includes("cannot be a descendant") ||
            text.includes("cannot contain a nested")
          ) {
            errors.push(text);
          }
        }
      });

      page.on("pageerror", (error) => {
        if (error.message.includes("Hydration")) {
          errors.push(error.message);
        }
      });

      await page.goto(`/es/${slug}`);
      await page.waitForTimeout(1000);

      expect(
        errors,
        `Hydration errors found on /es/${slug}:\n${errors.join("\n")}`,
      ).toHaveLength(0);
    });
  }
});

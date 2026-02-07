/**
 * Migration script: converts MDX files from `export const metadata = {...}`
 * to YAML frontmatter format required by Tina CMS.
 *
 * Usage: node scripts/migrate-mdx-to-frontmatter.mjs
 */

import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");
const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

for (const file of files) {
  const filePath = path.join(contentDir, file);
  let content = fs.readFileSync(filePath, "utf-8");

  // Match the export const metadata block
  const metadataRegex =
    /export\s+const\s+metadata\s*=\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\};?\s*/s;
  const match = content.match(metadataRegex);

  if (!match) {
    console.log(`⏭️  Skipping ${file} - no metadata export found`);
    continue;
  }

  // Parse the metadata object manually
  const metadataStr = match[1];
  const frontmatterLines = [];

  // Extract key-value pairs
  const lines = metadataStr.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "," || trimmed.startsWith("//")) continue;

    // Match simple key: value pairs
    const kvMatch = trimmed.match(
      /^(\w+)\s*:\s*(?:"([^"]*(?:\\.[^"]*)*)"|'([^']*)'|(true|false))\s*,?\s*$/,
    );
    if (kvMatch) {
      const key = kvMatch[1];
      const value = kvMatch[2] ?? kvMatch[3] ?? kvMatch[4];
      if (value === "true" || value === "false") {
        frontmatterLines.push(`${key}: ${value}`);
      } else {
        // Quote strings that might have special YAML characters
        frontmatterLines.push(`${key}: "${value}"`);
      }
    }

    // Match multiline string values (description spanning lines)
    const multilineStart = trimmed.match(/^(\w+)\s*:\s*$/);
    if (multilineStart) {
      // Skip complex nested objects for now
      continue;
    }
  }

  if (frontmatterLines.length === 0) {
    console.log(`⚠️  Skipping ${file} - could not parse metadata`);
    continue;
  }

  // Build frontmatter
  const frontmatter = `---\n${frontmatterLines.join("\n")}\n---`;

  // Remove the metadata export and any related exports (like wifiCredentials)
  let body = content.replace(match[0], "").trim();

  // Also handle multi-line description strings
  // e.g., description:\n    "Check-in and check-out..."
  const descMultiline = body.match(
    /export\s+const\s+metadata\s*=\s*\{[\s\S]*?\};\s*/,
  );
  if (descMultiline) {
    body = body.replace(descMultiline[0], "").trim();
  }

  const newContent = `${frontmatter}\n\n${body}\n`;

  fs.writeFileSync(filePath, newContent);
  console.log(`✅ Migrated ${file} (${frontmatterLines.length} fields)`);
}

console.log("\nDone! Review the migrated files before committing.");

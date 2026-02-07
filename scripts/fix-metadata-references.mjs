/**
 * Replace metadata.locale and metadata.title references in MDX files
 * with literal values from frontmatter.
 */

import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");
const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

for (const file of files) {
  const filePath = path.join(contentDir, file);
  let content = fs.readFileSync(filePath, "utf-8");

  // Parse frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    console.log(`⏭️  Skipping ${file} - no frontmatter`);
    continue;
  }

  const fmLines = fmMatch[1].split("\n");
  const fm = {};
  for (const line of fmLines) {
    const m = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
    if (m) fm[m[1]] = m[2];
  }

  let modified = false;

  // Replace metadata.locale references
  if (fm.locale) {
    const localeRegex = /\{metadata\.locale\}/g;
    if (content.match(localeRegex)) {
      content = content.replace(localeRegex, `"${fm.locale}"`);
      modified = true;
    }
    // Also handle locale={metadata.locale}
    const localeAttrRegex = /locale=\{metadata\.locale\}/g;
    if (content.match(localeAttrRegex)) {
      content = content.replace(localeAttrRegex, `locale="${fm.locale}"`);
      modified = true;
    }
  }

  // Replace metadata.title references
  if (fm.title) {
    const titleRegex = /\{metadata\.title\}/g;
    if (content.match(titleRegex)) {
      content = content.replace(titleRegex, `"${fm.title}"`);
      modified = true;
    }
    const titleAttrRegex = /title=\{metadata\.title\}/g;
    if (content.match(titleAttrRegex)) {
      content = content.replace(titleAttrRegex, `title="${fm.title}"`);
      modified = true;
    }
  }

  // Replace metadata.description references
  if (fm.description) {
    const descRegex = /\{metadata\.description\}/g;
    if (content.match(descRegex)) {
      content = content.replace(descRegex, `"${fm.description}"`);
      modified = true;
    }
    const descAttrRegex = /description=\{metadata\.description\}/g;
    if (content.match(descAttrRegex)) {
      content = content.replace(
        descAttrRegex,
        `description="${fm.description}"`,
      );
      modified = true;
    }
  }

  // Replace metadata={metadata} with individual props
  const metadataObjRegex = /metadata=\{metadata\}/g;
  if (content.match(metadataObjRegex)) {
    const props = [];
    if (fm.title) props.push(`title="${fm.title}"`);
    if (fm.description) props.push(`description="${fm.description}"`);
    if (fm.darkBackground === "true") props.push(`darkBackground={true}`);
    if (fm.locale) props.push(`locale="${fm.locale}"`);
    content = content.replace(metadataObjRegex, props.join(" "));
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed references in ${file}`);
  } else {
    console.log(`⏭️  No changes needed in ${file}`);
  }
}

console.log("\nDone!");

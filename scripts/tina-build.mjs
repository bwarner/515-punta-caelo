/**
 * Conditional Tina CMS build script.
 * Only runs `tinacms build` when Tina Cloud credentials are configured.
 * This allows the site to build normally without Tina Cloud in environments
 * where the CMS is not needed (e.g., preview deployments).
 *
 * The Tina build is non-blocking — if it fails (e.g., branch not yet indexed
 * by Tina Cloud), the Next.js build will still proceed.
 */

import { execSync } from "child_process";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local for local builds (Vercel injects env vars natively)
try {
  const envFile = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex);
    const value = trimmed.slice(eqIndex + 1).replace(/^["']|["']$/g, "");
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
} catch {
  // No .env.local file — that's fine
}

const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const token = process.env.TINA_TOKEN;

if (clientId && token) {
  console.log("✅ Tina Cloud credentials found — running tinacms build...");
  try {
    execSync("npx tinacms build", { stdio: "inherit" });
  } catch (err) {
    console.warn(
      "⚠️  tinacms build failed — continuing with Next.js build.",
    );
    console.warn(
      "   This is expected if Tina Cloud has not yet indexed this branch.",
    );
    console.warn(
      "   The /admin page may not work until Tina Cloud indexes the branch.",
    );
  }
} else {
  console.log(
    "⏭️  Tina Cloud credentials not configured — skipping tinacms build.",
  );
  console.log(
    "   Set NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN to enable the CMS.",
  );
}

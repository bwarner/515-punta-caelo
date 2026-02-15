/**
 * Conditional Tina CMS build script.
 * Only runs `tinacms build` when Tina Cloud credentials are configured.
 * This allows the site to build normally without Tina Cloud in environments
 * where the CMS is not needed (e.g., preview deployments).
 */

import { execSync } from "child_process";

const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const token = process.env.TINA_TOKEN;

if (clientId && token) {
  console.log("✅ Tina Cloud credentials found — running tinacms build...");
  execSync("npx tinacms build", { stdio: "inherit" });
} else {
  console.log(
    "⏭️  Tina Cloud credentials not configured — skipping tinacms build.",
  );
  console.log(
    "   Set NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN to enable the CMS.",
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { generateAlternates, type Locale } from "@/lib/seo";

// Validate slug to prevent path traversal attacks
function isValidSlug(slug: string): boolean {
  // Only allow alphanumeric characters, hyphens, and underscores
  // Reject any path traversal attempts (.., /, \)
  return /^[a-zA-Z0-9_-]+$/.test(slug);
}

function getContentFile(locale: Locale, slug: string) {
  const suffix = locale === "es" ? "es" : "en";
  const filePath = path.join(process.cwd(), "content", `${slug}-${suffix}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw);
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  // Validate slug before using in dynamic import
  if (!isValidSlug(slug)) {
    notFound();
  }

  const { default: Content } =
    locale === "es"
      ? await import(`@/content/${slug}-es.mdx`)
      : await import(`@/content/${slug}-en.mdx`);

  return <Content className="prose dark:prose-invert" />;
}
type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  // Validate slug before using in dynamic import
  if (!isValidSlug(slug)) {
    return { title: "Not Found" };
  }

  // Read metadata from frontmatter
  const parsed = getContentFile(locale, slug);
  if (!parsed) {
    return { title: "Not Found" };
  }

  const { title, description } = parsed.data;

  return {
    title,
    description,
    alternates: generateAlternates(locale, slug),
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), "content");
  const fileNames = fs.readdirSync(contentDirectory);
  const locales = ["en", "es"];
  const slugs: string[] = fileNames.map((fileName: string) =>
    fileName.replace(/-(en|es)\.mdx$/, ""),
  );

  const staticParams: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    slugs.forEach((slug) => {
      staticParams.push({ locale, slug });
    });
  });

  return staticParams;
}

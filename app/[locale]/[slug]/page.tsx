import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

type Locale = "en" | "es";

// Validate slug to prevent path traversal attacks
function isValidSlug(slug: string): boolean {
  // Only allow alphanumeric characters, hyphens, and underscores
  // Reject any path traversal attempts (.., /, \)
  return /^[a-zA-Z0-9_-]+$/.test(slug);
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

  const { metadata } =
    locale === "es"
      ? await import(`@/content/${slug}-es.mdx`)
      : await import(`@/content/${slug}-en.mdx`);

  return metadata;
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

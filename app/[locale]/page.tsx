import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { generateAlternates, type Locale } from "@/lib/seo";
import { locales } from "@/i18n";
import { PageMetadataProvider } from "@/components/page-metadata-provider";

function getHomeFrontmatter(locale: Locale) {
  const filePath = path.join(process.cwd(), "content", `home-${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return matter(fs.readFileSync(filePath, "utf-8"));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return { title: "Not Found" };

  const parsed = getHomeFrontmatter(locale as Locale);
  if (!parsed) return { title: "Not Found" };

  const { title, description } = parsed.data;
  return {
    title,
    description,
    alternates: generateAlternates(locale as Locale),
  };
}

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  // Read frontmatter for metadata
  const parsed = getHomeFrontmatter(locale as Locale);
  const darkBackground = parsed?.data?.darkBackground ?? false;

  const { default: Content } =
    locale === "es"
      ? await import("@/content/home-es.mdx")
      : await import("@/content/home-en.mdx");

  return (
    <PageMetadataProvider locale={locale} darkBackground={darkBackground}>
      <Content className="prose dark:prose-invert" />
    </PageMetadataProvider>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

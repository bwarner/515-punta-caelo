import type { Metadata, ResolvingMetadata } from "next";

type Locale = "en" | "es";

export default async function ContentPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = await params;

  const { default: Content } =
    locale === "es"
      ? await import(`@/content/${slug}-es.mdx`)
      : await import(`@/content/${slug}-en.mdx`);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Content />
    </main>
  );
}
type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const { metadata } =
    locale === "es"
      ? await import(`@/content/${slug}-es.mdx`)
      : await import(`@/content/${slug}-en.mdx`);

  return metadata;
}

export const dynamicParams = false;

export function generateStaticParams() {
  const fs = require("fs");
  const path = require("path");
  const contentDirectory = path.join(process.cwd(), "content");
  const fileNames = fs.readdirSync(contentDirectory);
  const locales = ["en", "es"];
  const slugs: string[] = fileNames.map(
    (fileName: string) => fileName.split("-")[0]
  );

  const staticParams: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    slugs.forEach((slug) => {
      staticParams.push({ locale, slug });
    });
  });

  return staticParams;
}

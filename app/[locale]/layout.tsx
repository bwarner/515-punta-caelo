import "@/app/globals.css";
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import Header from "@/components/header";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  return (
    <>
      <Header locale={locale} />
      <main className="prose prose-lg max-w-3xl mx-auto py-8 px-4">
        {children}
      </main>
      <footer className="text-center text-sm text-gray-500 py-8">
        &copy; 2025 All rights reserved.
      </footer>
    </>
  );
}

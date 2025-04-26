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
    <div>
      <Header locale={locale} />
      <main className="mx-auto max-w-5xl p-6 bg-gray-100">{children}</main>
    </div>
  );
}

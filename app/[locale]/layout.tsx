import "@/app/globals.css";
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 mx-auto max-w-5xl w-full bg-gray-100">{children}</main>
      <Footer />
    </div>
  );
}

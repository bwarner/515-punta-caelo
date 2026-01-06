import "@/app/globals.css";
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LayoutContent from "@/components/layout-content";

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
  return <LayoutContent>{children}</LayoutContent>;
}

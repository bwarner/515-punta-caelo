"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  // Get the current path without the locale prefix
  const pathWithoutLocale = pathname.replace(/^\/(en|es)/, "");

  const otherLocale = locale === "en" ? "es" : "en";
  const newPath = `/${otherLocale}${pathWithoutLocale}`;

  return (
    <Link
      href={newPath}
      className="text-sm font-medium px-2 py-1 rounded border border-primary/30 hover:bg-primary/10 transition-colors"
      title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      {otherLocale.toUpperCase()}
    </Link>
  );
}

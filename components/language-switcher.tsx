"use client";

/* global document */
import Link from "next/link";
import { usePathname } from "next/navigation";

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function LanguageSwitcher({
  locale,
  className,
}: {
  locale: string;
  className?: string;
}) {
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(en|es)/, "");
  const otherLocale = locale === "en" ? "es" : "en";
  const newPath = `/${otherLocale}${pathWithoutLocale}`;

  const handleClick = () => {
    document.cookie = `NEXT_LOCALE=${otherLocale}; max-age=${LOCALE_COOKIE_MAX_AGE}; path=/; samesite=lax`;
  };

  return (
    <Link
      href={newPath}
      onClick={handleClick}
      className={
        className ??
        "text-sm font-medium px-2 py-1 rounded border border-primary/30 hover:bg-primary/10 transition-colors"
      }
      title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      {otherLocale.toUpperCase()}
    </Link>
  );
}

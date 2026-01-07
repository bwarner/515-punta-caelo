"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";

export function PropertyHeader({
  locale,
  title,
  headerTitle,
  backHref,
}: {
  locale: string;
  title: string;
  headerTitle?: string;
  backHref?: string;
}) {
  const defaultBackHref = `/${locale}/index`;
  const backText = locale === "es" ? "Volver" : "Back";
  const displayTitle = headerTitle || title;

  return (
    <div className="flex items-center justify-between py-4 mb-4 border-b border-primary/10">
      <Link
        href={backHref || defaultBackHref}
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors shrink-0"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="text-sm">{backText}</span>
      </Link>
      <h1 className="text-base font-semibold text-center truncate px-2">
        {displayTitle}
      </h1>
      <LanguageSwitcher locale={locale} />
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";

export function PropertyHeader({
  locale,
  title,
  backHref,
}: {
  locale: string;
  title: string;
  backHref?: string;
}) {
  const defaultBackHref = `/${locale}/index`;
  const backText = locale === "es" ? "Volver" : "Back";

  return (
    <div className="flex items-center justify-between py-4 mb-4 border-b border-primary/10">
      <Link
        href={backHref || defaultBackHref}
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="text-sm">{backText}</span>
      </Link>
      <h1 className="text-lg font-semibold">{title}</h1>
      <LanguageSwitcher locale={locale} />
    </div>
  );
}

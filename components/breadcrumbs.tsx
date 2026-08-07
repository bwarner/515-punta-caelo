"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import posthog from "posthog-js";

type Crumb = {
  label: string;
  href: string;
};

export function Breadcrumbs({
  locale,
  items,
  current,
}: {
  locale: string;
  items: Crumb[];
  current: string;
}) {
  const handleClick = (crumb: Crumb) => {
    posthog.capture("breadcrumb_clicked", {
      breadcrumb_label: crumb.label,
      destination_href: crumb.href,
      current_page_title: current,
      locale,
    });
  };

  return (
    <div className="flex items-center justify-between gap-3 py-4 mb-4 border-b border-primary/10">
      <nav
        aria-label={locale === "es" ? "Ruta de navegación" : "Breadcrumb"}
        className="min-w-0"
      >
        <ol className="flex items-center gap-1 text-sm">
          {items.map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-1 shrink-0">
              <Link
                href={crumb.href}
                onClick={() => handleClick(crumb)}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {crumb.label}
              </Link>
              <ChevronRight
                aria-hidden
                className="h-4 w-4 text-muted-foreground"
              />
            </li>
          ))}
          <li
            aria-current="page"
            className="font-semibold text-foreground truncate"
          >
            {current}
          </li>
        </ol>
      </nav>
      <LanguageSwitcher locale={locale} />
    </div>
  );
}

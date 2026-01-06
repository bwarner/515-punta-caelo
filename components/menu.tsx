"use client";

import { MenuIcon, X } from "lucide-react";
import { items } from "./links";
import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import posthog from "posthog-js";

export function Menu({
  locale,
  title,
  darkBackground = false,
}: {
  locale: string;
  title: string;
  darkBackground?: boolean;
}) {
  const handleNavClick = (itemTitle: string, itemHref: string) => {
    posthog.capture("menu_navigation_clicked", {
      menu_item_title: itemTitle,
      destination_href: itemHref,
      current_page_title: title,
      locale: locale,
    });
  };

  return (
    <div className="menu-wrapper w-full">
      <div className="menu-header flex flex-row justify-between items-center">
        <label
          className={`hamburger-menu ${darkBackground ? "hamburger-menu-dark" : ""}`}
        >
          <input type="checkbox" id="menu" className="" />
        </label>
        <div className="menu-container">
          <nav className="flex flex-col items-center justify-center">
            {items(locale).map((item) => (
              <Link
                href={item.href}
                key={item.title}
                onClick={() => handleNavClick(item.title, item.href)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="menu-title flex items-center gap-3">
          <h1>{title}</h1>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </div>
  );
}

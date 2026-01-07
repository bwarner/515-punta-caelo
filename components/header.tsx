"use client";

import { locales } from "@/i18n";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import clsx from "clsx";
import posthog from "posthog-js";

export default function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = pathname.split("/").slice(2).join("/");

  return (
    <header className="site-header">
      <div className="wrapper">
        <div className="site-header-wrapper">
          <div className="site-header-logo">
            <Image
              src="/images/logo.png"
              alt="Punta Caelo"
              width={100}
              height={100}
              className="site-header-logo-image"
            />
          </div>
          <div className="site-header-title">
            <span>Punta Caelo</span>
          </div>

          <div className="site-header-languages">
            <ul className="site-header-languages-list flex flex-row gap-2">
              {locales.map((loc) => (
                <li className="site-header-languages-item" key={loc}>
                  <Link
                    key={loc}
                    href={`/${loc}/${currentPath}`}
                    className={loc === locale ? "font-bold" : "opacity-70"}
                    onClick={() => {
                      if (loc !== locale) {
                        posthog.capture("language_changed", {
                          from_locale: locale,
                          to_locale: loc,
                          current_path: currentPath,
                        });
                      }
                    }}
                  >
                    {loc.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-header-menu-button md:hidden">
            <button
              id="site-header-menu-button"
              className="site-header-menu-button-icon"
              aria-label="Menu"
              aria-controls="site-header-nav"
              aria-expanded="false"
              onClick={() => {
                const newMenuState = !isMenuOpen;
                setIsMenuOpen(newMenuState);
                posthog.capture("mobile_menu_toggled", {
                  menu_state: newMenuState ? "opened" : "closed",
                  current_locale: locale,
                });
              }}
            >
              {isMenuOpen ? (
                <XIcon className="site-header-menu-button-icon" />
              ) : (
                <MenuIcon className="site-header-menu-button-icon" />
              )}
              <span className="site-header-menu-button-label sr-only">
                Menu
              </span>
            </button>
          </div>
          <nav
            id="site-header-nav"
            className={clsx(
              "site-header-nav md:block",
              isMenuOpen && "block",
              !isMenuOpen && "hidden",
            )}
          >
            <ul className="site-header-nav-list">
              <li className="site-header-nav-item">
                <a href={`/${locale}/introduction`}>🏠 Introduction</a>
              </li>
              <li className="site-header-nav-item">
                <a href={`/${locale}/introduction`}>🏠 Meeting your Your</a>
              </li>
              <li className="site-header-nav-item">
                <a href={`/${locale}/rules`}>📜 House Rules</a>
              </li>
              <li className="site-header-nav-item">
                <a href={`/${locale}/tips`}>💡 Local Tips</a>
              </li>
              <li className="site-header-nav-item">
                <a href={`/${locale}/todo`}>🗺️ Things To Do</a>
              </li>
              <li className="site-header-nav-item">
                <a href={`/${locale}/faqs`}>❓ FAQs</a>
              </li>
              <li className="site-header-nav-item">
                <a href={`/${locale}/checkout`}>👋 Check out</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

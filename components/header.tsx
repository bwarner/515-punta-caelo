"use client";

import { locales } from "@/i18n";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const currentPath = pathname.split("/").slice(2).join("/");

  return (
    <header className="site-header">
      <div className="wrapper">
        <div className="site-header-wrapper">
          <div className="site-header-logo">
            <img
              src="/images/logo.png"
              alt="Punta Caelo"
              width={100}
              height={100}
              className="site-header-logo-image"
            />
            <h1 className="site-header-title">Punta Caelo</h1>
          </div>
          <nav className="site-header-nav">
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

            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}/${currentPath}`}
                className={loc === locale ? "font-bold" : "opacity-70"}
              >
                {loc.toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

"use client";

import { locales } from "@/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ locale }: { locale: string }) {
  const pathname = usePathname();
  const currentPath = pathname.split("/").slice(2).join("/");

  return (
    <header className="w-full px-4 py-3 shadow-md flex justify-between items-center bg-white">
      <h1 className="text-xl font-semibold">Punta Caelo</h1>
      <nav className="flex gap-4 text-sm">
        <ul className="list-none flex flex-row gap-4">
          <li>
            <a href={`/${locale}`}>🏠 Welcome</a>
          </li>
          <li>
            <a href={`/${locale}/rules`}>📜 House Rules</a>
          </li>
          <li>
            <a href={`/${locale}/tips`}>💡 Local Tips</a>
          </li>
          <li>
            <a href={`/${locale}/todo`}>🗺️ Things To Do</a>
          </li>
          <li>
            <a href={`/${locale}/faqs`}>❓ FAQs</a>
          </li>
          <li>
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
    </header>
  );
}

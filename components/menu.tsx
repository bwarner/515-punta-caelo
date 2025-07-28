import { MenuIcon, X } from "lucide-react";
import { items } from "./links";
import Link from "next/link";

export function Menu({ locale, title }: { locale: string; title: string }) {
  return (
    <div className="menu-wrapper w-full">
      <div className="menu-header flex flex-row justify-between items-center">
        <label className="hamburger-menu">
          <input type="checkbox" id="menu" className="" />
        </label>
        <div className="menu-container">
          <nav className="flex flex-col items-center justify-center">
            {items(locale).map((item) => (
              <Link href={item.href} key={item.title}>
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="menu-title">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
}

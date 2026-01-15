import "./globals.css";
import type { ReactNode } from "react";
import { roboto, raleway, montserrat } from "./font";
import { JsonLd } from "@/components/json-ld";

export const metadata = {
  title: "Panama Vacation Rental",
  description:
    "Our vacation rental is a beautiful property in Panama with a pool and access to the beach.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.className} ${roboto.className} ${raleway.className}`}
    >
      <head></head>
      <body className="antialiased text-gray-900 font-monserrat ">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}

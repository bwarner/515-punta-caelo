import "./globals.css";
import type { ReactNode } from "react";
import { dancingScript, roboto, raleway } from "./font";

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
      className={`${dancingScript.className} ${roboto.className} ${raleway.className}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased text-gray-900 font-sans bg-white">
        {children}
      </body>
    </html>
  );
}

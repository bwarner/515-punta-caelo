import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { roboto, raleway, montserrat } from "./font";
import { JsonLd } from "@/components/json-ld";
import { BASE_URL } from "@/lib/seo";

const SITE_NAME = "Casa Punta Caelo";
const DEFAULT_TITLE = "Casa Punta Caelo | Oceanfront Vacation Rental in Panama";
const DEFAULT_DESCRIPTION =
  "Oceanfront 3-bedroom vacation rental with maid's quarters in San Carlos, Panama. Sleeps 6 with 3 pools, direct beach access, and full amenities.";
const SHARE_IMAGE = "/og-image.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: SHARE_IMAGE,
        width: 1200,
        height: 630,
        alt: "Oceanfront balcony and pool view at Casa Punta Caelo",
      },
    ],
    locale: "en_US",
    alternateLocale: ["es_PA"],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SHARE_IMAGE],
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

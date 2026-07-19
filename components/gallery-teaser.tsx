"use client";

import Image from "next/image";
import Link from "next/link";
import { captureEvent } from "@/lib/posthog-capture";
import { gallerySections } from "@/content/gallery-images.mjs";
import { cn } from "@/lib/utils";

type Locale = "en" | "es";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: { en: string; es: string };
};

type GallerySection = {
  id: string;
  title: { en: string; es: string };
  images: GalleryImage[];
};

const sections = gallerySections as GallerySection[];
const totalImages = sections.reduce((n, s) => n + s.images.length, 0);

// One representative image per section, in section order.
const covers = sections.map((s) => ({ sectionId: s.id, ...s.images[0] }));

const labels = {
  en: { viewAll: `View all ${totalImages} photos` },
  es: { viewAll: `Ver las ${totalImages} fotos` },
};

// Mosaic layout for 4 tiles: featured (2x2), small, small, wide — mirrors the
// pattern used by GalleryShowcase so the teaser reads as a preview of it.
const MOSAIC = ["col-span-2 row-span-2", "", "", "col-span-2"];

/**
 * Compact photo strip linking to the full gallery page.
 *
 * `variant="strip"` renders a single row of three square tiles (home page);
 * `variant="mosaic"` renders a featured-image mosaic (property page).
 */
export default function GalleryTeaser({
  locale = "en",
  source,
  variant = "mosaic",
  className,
}: {
  locale?: Locale;
  source: string;
  variant?: "strip" | "mosaic";
  className?: string;
}) {
  const t = labels[locale];
  const images = variant === "strip" ? covers.slice(0, 3) : covers.slice(0, 4);
  const href = `/${locale}/gallery`;

  const track = (sectionId: string) => {
    captureEvent("gallery_teaser_clicked", {
      locale,
      source,
      variant,
      section: sectionId,
      total_images: totalImages,
    });
  };

  return (
    <div
      className={cn(
        "grid gap-2",
        variant === "strip"
          ? "grid-cols-3"
          : "grid-cols-2 sm:grid-cols-4 auto-rows-[28vw] sm:auto-rows-[140px]",
        className,
      )}
    >
      {images.map((img, i) => {
        const isViewAll = i === images.length - 1;
        return (
          <Link
            key={img.src}
            href={href}
            onClick={() => track(img.sectionId)}
            aria-label={
              isViewAll ? t.viewAll : (img.caption?.[locale] ?? img.alt)
            }
            className={cn(
              "group relative overflow-hidden rounded-lg shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              variant === "strip" ? "aspect-square" : MOSAIC[i % MOSAIC.length],
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={
                variant === "strip"
                  ? "(max-width: 640px) 33vw, 160px"
                  : "(max-width: 640px) 50vw, 25vw"
              }
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            />
            {isViewAll ? (
              <span className="absolute inset-0 flex items-center justify-center bg-black/50 p-2 text-center text-xs sm:text-sm font-medium text-white transition-colors duration-300 group-hover:bg-black/60">
                {t.viewAll}
              </span>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}

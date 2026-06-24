"use client";

/* global window, document */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { captureEvent } from "@/lib/posthog-capture";
import {
  LazyMotion,
  domMax,
  m,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
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

// Mosaic layout for a 4-image section: featured (2x2), wide, small, small.
// `col-span-2` is full-width on the 2-col mobile grid and half on the 4-col
// desktop grid, so a single pattern reads well at every breakpoint.
const MOSAIC = ["col-span-2 row-span-2", "col-span-2", "", ""];

const labels = {
  en: { close: "Close", prev: "Previous photo", next: "Next photo" },
  es: { close: "Cerrar", prev: "Foto anterior", next: "Foto siguiente" },
};

export default function GalleryShowcase({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const reduce = useReducedMotion();

  // Flatten every section into one ordered list so the lightbox can page
  // across the whole gallery, not just within a section.
  const flat = useMemo(() => sections.flatMap((s) => s.images), []);

  const [active, setActive] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  // Distinct images seen in the current lightbox session, so we can report
  // browse depth on close (prev/next/swipe aren't otherwise tracked).
  const viewed = useRef<Set<number>>(new Set());

  const open = useCallback(
    (img: GalleryImage, index: number, sectionId: string) => {
      viewed.current = new Set([index]);
      setActive(index);
      captureEvent("image_gallery_interacted", {
        image_src: img.src,
        image_alt: img.alt,
        image_index: index,
        total_images: flat.length,
        locale,
        section: sectionId,
        caption: img.caption?.[locale] ?? null,
      });
    },
    [flat.length, locale],
  );

  const close = useCallback(() => {
    if (viewed.current.size > 0) {
      captureEvent("gallery_lightbox_closed", {
        images_viewed: viewed.current.size,
        total_images: flat.length,
        locale,
      });
      viewed.current = new Set();
    }
    setActive(null);
  }, [flat.length, locale]);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setActive((i) => {
        if (i === null) return i;
        const next = (i + dir + flat.length) % flat.length;
        viewed.current.add(next);
        return next;
      });
    },
    [flat.length],
  );

  // Keyboard navigation + body scroll lock while the lightbox is open.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") paginate(1);
      else if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, paginate]);

  const onDragEnd = useCallback(
    (_e: unknown, info: PanInfo) => {
      const swipe = info.offset.x * 0.5 + info.velocity.x * 0.05;
      if (swipe < -60) paginate(1);
      else if (swipe > 60) paginate(-1);
    },
    [paginate],
  );

  const t = labels[locale];
  const activeImage = active === null ? null : flat[active];
  // Adjacent images, preloaded while the lightbox is open so paging is instant.
  const neighbors = (() => {
    if (active === null) return [];
    const n = flat.length;
    const cand = [(active + 1) % n, (active - 1 + n) % n];
    return cand
      .filter((i, k) => i !== active && cand.indexOf(i) === k)
      .map((i) => flat[i]);
  })();
  let globalIndex = 0;

  return (
    <LazyMotion features={domMax} strict>
      <div className="flex flex-col gap-10">
        {sections.map((section) => (
          <section key={section.id} className="flex flex-col gap-3">
            <h3 className="text-xl font-serif tracking-wide text-foreground">
              {section.title[locale]}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 auto-rows-[40vw] sm:auto-rows-[150px] lg:auto-rows-[185px]">
              {section.images.map((img, i) => {
                const index = globalIndex++;
                return (
                  <m.button
                    key={img.src}
                    type="button"
                    onClick={() => open(img, index, section.id)}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                    className={cn(
                      "group relative overflow-hidden rounded-lg shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      MOSAIC[i % MOSAIC.length],
                    )}
                    aria-label={img.caption?.[locale] ?? img.alt}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 p-3 text-left text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {img.caption?.[locale] ?? img.alt}
                    </span>
                  </m.button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <AnimatePresence>
        {activeImage ? (
          <m.div
            key="lightbox"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={activeImage.caption?.[locale] ?? activeImage.alt}
          >
            <button
              type="button"
              onClick={close}
              aria-label={t.close}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white shadow-lg ring-1 ring-white/25 transition-colors hover:bg-black/65"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              aria-label={t.prev}
              className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-lg ring-1 ring-white/25 transition-colors hover:bg-black/65"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              aria-label={t.next}
              className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white shadow-lg ring-1 ring-white/25 transition-colors hover:bg-black/65"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            <AnimatePresence
              initial={false}
              mode="popLayout"
              custom={direction}
            >
              <m.div
                key={active}
                custom={direction}
                className="relative flex h-[78vh] w-[92vw] max-w-5xl cursor-grab items-center justify-center active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={onDragEnd}
                onClick={(e) => e.stopPropagation()}
                initial={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction > 0 ? 80 : -80, scale: 0.96 }
                }
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction > 0 ? -80 : 80, scale: 0.96 }
                }
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="92vw"
                  priority
                  draggable={false}
                  className="select-none object-contain"
                />
              </m.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute bottom-5 left-0 right-0 flex flex-col items-center gap-1 px-4 text-center text-white">
              <span className="text-sm font-medium">
                {activeImage.caption?.[locale] ?? activeImage.alt}
              </span>
              <span className="text-xs text-white/60">
                {active! + 1} / {flat.length}
              </span>
            </div>

            {/* Warm the next/prev full-size images so navigation is instant.
                Same sizes="92vw" as the visible image, priority so the offscreen
                elements actually fetch instead of lazy-loading. */}
            <div
              aria-hidden
              className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0"
            >
              {neighbors.map((im) => (
                <div key={im.src} className="relative h-px w-px">
                  <Image src={im.src} alt="" fill sizes="92vw" priority />
                </div>
              ))}
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}

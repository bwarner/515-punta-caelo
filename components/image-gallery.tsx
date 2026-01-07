"use client";

import Image from "next/image";
import posthog from "posthog-js";

export default function ImageGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const handleImageClick = (
    img: { src: string; alt: string },
    index: number,
  ) => {
    posthog.capture("image_gallery_interacted", {
      image_src: img.src,
      image_alt: img.alt,
      image_index: index,
      total_images: images.length,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {images.map((img, index) => (
        <div key={img.src} className="relative aspect-[4/3]">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="rounded-sm shadow-sm cursor-pointer object-cover"
            onClick={() => handleImageClick(img, index)}
          />
        </div>
      ))}
    </div>
  );
}

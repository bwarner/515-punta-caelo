"use client";

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
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="rounded-sm shadow-sm cursor-pointer"
          onClick={() => handleImageClick(img, index)}
        />
      ))}
    </div>
  );
}

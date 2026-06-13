import Image from "next/image";
import type { ReactNode } from "react";

export interface ContentCardProps {
  /** Optional header image */
  image?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Card title */
  title?: string;
  /** Card content - can be text, lists, or any React content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * White rounded card with optional header image and title.
 * Used for content sections like amenity lists, info blocks, etc.
 */
export function ContentCard({
  image,
  imageAlt,
  title,
  children,
  className = "",
}: ContentCardProps) {
  return (
    <div
      className={`bg-white mx-4 mt-4 rounded-lg overflow-hidden ${className}`}
    >
      {image && (
        <div className="relative w-full h-[140px]">
          <Image
            src={image}
            alt={imageAlt || ""}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="px-6 py-4">
        {title && <h2 className="text-xl font-semibold mb-3">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

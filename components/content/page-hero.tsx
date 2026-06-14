import Image from "next/image";

export interface PageHeroProps {
  /** Path to the hero image (relative to public/) */
  image: string;
  /** Alt text for the hero image */
  imageAlt: string;
  /** Page title displayed in the banner */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
}

/**
 * Hero section with full-width image and title banner.
 * Used at the top of content pages like Amenities, Check-in/out, Location.
 */
export function PageHero({ image, imageAlt, title, subtitle }: PageHeroProps) {
  return (
    <>
      {/* Hero image */}
      <div className="relative w-full h-[180px] overflow-hidden mb-0">
        <Image src={image} alt={imageAlt} fill className="object-cover" />
      </div>

      {/* Title banner */}
      <div className="bg-white py-3 px-4 text-center">
        <h1 className="text-3xl font-semibold tracking-widest uppercase">
          {title}
        </h1>
        {subtitle && <p className="text-lg text-gray-600 mt-1">{subtitle}</p>}
      </div>
    </>
  );
}

export interface MapEmbedProps {
  /** Latitude */
  lat: number;
  /** Longitude */
  lng: number;
  /** Map title for accessibility */
  title?: string;
  /** Zoom level (default: 18) */
  zoom?: number;
}

/**
 * Google Maps embed with a link to open in Google Maps.
 */
export function MapEmbed({
  lat,
  lng,
  title = "Location map",
  zoom = 18,
}: MapEmbedProps) {
  const embedUrl = `https://www.google.com/maps?output=embed&q=${lat},${lng}&z=${zoom}`;
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className="bg-white mx-4 mt-4 rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold mb-3 text-center">Map</h2>
      </div>
      <div className="w-full aspect-[16/10]">
        <iframe
          title={title}
          src={embedUrl}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="px-6 py-4 flex justify-center">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium underline underline-offset-4 hover:opacity-80"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

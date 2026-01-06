export default function ImageGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {images.map((img) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="rounded-sm shadow-sm"
        />
      ))}
    </div>
  );
}

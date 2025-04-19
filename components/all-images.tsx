import { galleryImages } from "@/content/gallery-images.mjs";
import ImageGallery from "./image-gallery";

export default function AllImages() {
  return <ImageGallery images={galleryImages} />;
}

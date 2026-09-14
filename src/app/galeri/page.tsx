import type { Metadata } from "next";
import { galleryContent } from "@/content/site";
import { getGalleryItems } from "@/sanity/lib/gallery";
import { GallerySection } from "@/components/sections/gallery-section";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Showroom, depo, teslim edilen makineler ve fuar görselleriyle Özdemir Makine galerisi.",
};

// Studio yeterince görsel yüklenene kadar sayfa yine dolu (Pinterest masonry) kalsın diye
// hedef minimum tile sayısı. Sanity'den gelen gerçek görseller önce, eksik kalan yer
// placeholder'larla tamamlanır. Gerçek görsel sayısı bunu aşınca placeholder çıkmaz.
const MIN_TILES = 10;

export default async function GaleriPage() {
  const real = await getGalleryItems();
  const placeholders = galleryContent.items;
  const finalItems =
    real.length >= MIN_TILES
      ? real
      : [...real, ...placeholders.slice(0, MIN_TILES - real.length)];
  return (
    <GallerySection
      kicker={galleryContent.kicker}
      heading={galleryContent.heading}
      items={finalItems}
    />
  );
}

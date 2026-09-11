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

export default async function GaleriPage() {
  const items = await getGalleryItems();
  // Sanity boşsa statik placeholder tile'lar görünür (sayfa tasarımlı kalır).
  const finalItems = items.length ? items : galleryContent.items;
  return (
    <GallerySection
      kicker={galleryContent.kicker}
      heading={galleryContent.heading}
      items={finalItems}
    />
  );
}

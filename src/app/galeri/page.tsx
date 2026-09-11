import type { Metadata } from "next";
import { galleryContent } from "@/content/site";
import { GallerySection } from "@/components/sections/gallery-section";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Showroom, depo, teslim edilen makineler ve fuar görselleriyle Özdemir Makine galerisi.",
};

export default function GaleriPage() {
  const { kicker, heading, items } = galleryContent;
  return <GallerySection kicker={kicker} heading={heading} items={items} />;
}

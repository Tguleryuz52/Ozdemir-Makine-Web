import { client } from "./client";
import { urlForImage } from "./image";
import type { GalleryItem } from "@/content/site";

// Galeri görselleri → GallerySection'ın beklediği GalleryItem şekli.
// ratio yalnızca placeholder içindir; gerçek görsel doğal oranıyla akar → sabit "landscape".

const cacheOpts = { next: { revalidate: 60, tags: ["gallery"] } };

type RawGallery = {
  id: string;
  gorsel?: Parameters<typeof urlForImage>[0];
  baslik?: string;
  etiket?: string;
};

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const rows = await client.fetch<RawGallery[]>(
    `*[_type == "galleryItem" && defined(gorsel)] | order(coalesce(sira, 9999) asc, _createdAt desc){
      "id": _id,
      gorsel,
      baslik,
      etiket
    }`,
    {},
    cacheOpts,
  );
  return rows
    .filter((r) => r.gorsel)
    .map((r) => ({
      id: r.id,
      src: urlForImage(r.gorsel!).width(1400).fit("max").auto("format").url(),
      alt: r.baslik ?? r.etiket ?? "Özdemir Makine galeri görseli",
      title: r.baslik,
      ratio: "landscape" as const,
    }));
}

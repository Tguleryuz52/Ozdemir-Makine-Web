"use client";

import type { GalleryItem } from "@/content/site";
import { Gallery, GalleryGrid, GalleryImage } from "@/components/ui/shared-element-gallery";
import { Reveal } from "@/components/ui/reveal";

// himon uyarlaması — büyük ortalı başlık + solda kicker etiketi (markalar/blog ile aynı
// kalıp) + shared-element masonry galeri. Client bileşen (context/motion); içerik prop ile.

const container = "mx-auto max-w-[110rem] px-5 lg:px-8";

// Placeholder tile yüksekliği — gerçek görsel gelince aspect kalkar, görselin doğal oranı geçer.
const ratioClass: Record<GalleryItem["ratio"], string> = {
  portrait: "aspect-[3/4]",
  tall: "aspect-[3/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function GallerySection({
  kicker,
  heading,
  items,
}: {
  kicker: string;
  heading: string;
  items: GalleryItem[];
}) {
  return (
    <section className="bg-white">
      <div className={`${container} pt-[calc(var(--spacing-section)+2rem)] pb-[var(--spacing-section)]`}>
        <Reveal className="relative">
          <p className="absolute left-0 top-2 hidden items-center gap-2 lg:flex">
            <span className="size-2.5 bg-brand" aria-hidden="true" />
            <span className="font-mono text-[13px] font-medium uppercase tracking-[0.1em] text-ink/70">
              {kicker}
            </span>
          </p>
          <h1 className="text-center text-display-xl uppercase text-ink">{heading}</h1>
        </Reveal>

        <div className="mt-16">
          <Gallery>
            <GalleryGrid>
              {items.map((item) => (
                <GalleryImage
                  key={item.id}
                  id={item.id}
                  src={item.src}
                  alt={item.alt}
                  title={item.title}
                  className={item.src ? undefined : ratioClass[item.ratio]}
                />
              ))}
            </GalleryGrid>
          </Gallery>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;

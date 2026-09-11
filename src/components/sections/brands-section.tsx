import { brandsContent } from "@/content/site";
import { BrandCard } from "@/components/ui/brand-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

// himon "/investors" uyarlaması — büyük ortalı başlık + solda kicker etiketi (himon
// "INVESTORS" gibi) + geniş 4'lü marka kartı ızgarası. CTA yok: footer zaten taşıyor.
// Server bileşen, içerik site.ts'ten.

const container = "mx-auto max-w-[110rem] px-5 lg:px-8";

export function BrandsSection() {
  const { kicker, heading, items } = brandsContent;

  return (
    <section className="bg-white">
      <div className={`${container} pt-[calc(var(--spacing-section)+2rem)] pb-[var(--spacing-section)]`}>
        {/* Başlık — himon: büyük ortalı başlık, solda küçük kicker etiketi */}
        <Reveal className="relative">
          <p className="absolute left-0 top-2 hidden items-center gap-2 lg:flex">
            <span className="size-2.5 bg-brand" aria-hidden="true" />
            <span className="font-mono text-[13px] font-medium uppercase tracking-[0.1em] text-ink/70">
              {kicker}
            </span>
          </p>
          <h1 className="text-center text-display-xl uppercase text-ink">{heading}</h1>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((brand, i) => (
            <RevealItem key={`${brand.name}-${i}`}>
              <BrandCard brand={brand} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default BrandsSection;

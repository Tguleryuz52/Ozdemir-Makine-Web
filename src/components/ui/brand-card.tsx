import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Brand } from "@/content/site";

// himon "/investors" kartı birebir: ince çerçeveli kart (hafif keskin köşe) · üstte
// KARE off-white logo paneli · altında ad + açıklama + Website →. Website linki
// gelene kadar aynı görünümde ama tıklanamaz (aria-hidden) — layout himon gibi durur.
// Server bileşen — hover saf CSS. Logolar beyaz saydam → açık panelde invert.
export function BrandCard({ brand }: { brand: Brand }) {
  const { name, logo, blurb, website } = brand;
  const websiteBase =
    "mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] font-medium";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink/[0.18] bg-white transition-colors duration-300 hover:border-ink/[0.28]">
      {/* Kare logo paneli — off-white, kenardan kenara; logo ortada, hover'da büyür */}
      <div className="flex aspect-square items-center justify-center bg-paper px-8">
        {logo ? (
          <Image
            src={logo}
            alt={name}
            width={240}
            height={90}
            className="h-16 w-auto max-w-[62%] object-contain opacity-90 [filter:invert(1)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
          />
        ) : (
          <span className="text-[24px] font-semibold uppercase tracking-[-0.01em] text-ink/60 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]">
            {name}
          </span>
        )}
      </div>

      {/* Metin bloğu — ad + açıklama + Website (alta pinli) */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <h3 className="text-[20px] font-medium tracking-[-0.02em] text-ink">{name}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-ink/55">{blurb}</p>
        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className={`${websiteBase} text-ink/70 transition-colors hover:text-brand`}
          >
            Website
            <ArrowRight className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
          </a>
        ) : (
          <span className={`${websiteBase} text-ink/40`} aria-hidden="true">
            Website
            <ArrowRight className="size-3.5" strokeWidth={1.8} />
          </span>
        )}
      </div>
    </div>
  );
}

export default BrandCard;

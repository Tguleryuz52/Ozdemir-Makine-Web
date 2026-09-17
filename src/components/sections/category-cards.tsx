"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { categoryCardsContent, type CategoryCard } from "@/content/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
type Tone = CategoryCard["tone"];

// Marka mavisi ailesi — premium tonal set (token'dan). Tek aksan mavi.
const GRADIENTS: Record<Tone, string> = {
  blue: "var(--grad-card-vivid)",
  light: "var(--grad-card-deep)",
  dark: "var(--grad-card-steel)",
};

// Tüm gövdeler koyu (near-black mavi tint) — kohezyon + premium.
const CARD_BODY = "var(--card-body-dark)";

const NoiseOverlay = () => (
  <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-60 mix-blend-overlay">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function CategoryCards() {
  const reduce = useReducedMotion();

  return (
    <section
      id="kategoriler"
      className="w-full bg-paper text-ink pt-6 pb-10 lg:pt-8 lg:pb-12"
    >
      <div className="mx-auto w-full max-w-[104rem] px-6 lg:px-10">
        {/* Başlık — kompakt, sola dayalı. Sağdaki boşluğa şimdilik bir şey konmuyor
            (stat grid + microcopy denemesi kaldırıldı — sade duruş tercih edildi). */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-4 lg:mb-6"
        >
          <span className="mb-3 block font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-brand">
            {categoryCardsContent.kicker}
          </span>
          <h2 className="text-[2rem] font-medium leading-[1] tracking-tight md:text-[2.5rem] lg:text-[3rem]">
            {categoryCardsContent.title}
          </h2>
        </motion.div>

        {/* Kartlar — sade, kompakt, ortalı. Hover magnetic effect kaldırıldı;
            kartın kendi iç top-gradient reveal'ı zaten mevcut (CategoryTile içinde). */}
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto grid max-w-[58rem] grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {categoryCardsContent.items.map((cat) => (
            <motion.div key={cat.num} variants={cardReveal}>
              <CategoryTile cat={cat} reduce={!!reduce} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// scale: tüm sabit ölçüler (yükseklik, font, notch, reveal) orantılı küçülür/büyür.
// default 1 = orijinal section görünümü birebir. Hero şeridi ~0.7 geçer (Faz 12).
export function CategoryTile({
  cat,
  reduce,
  scale = 1,
}: {
  cat: CategoryCard;
  reduce: boolean;
  scale?: number;
}) {
  const fg = "#ffffff";
  const sub = "rgba(255,255,255,0.5)";
  const rem = (x: number) => `${x * scale}rem`;
  const px = (x: number) => `${x * scale}px`;

  return (
    <Link
      href={cat.href}
      aria-label={`${cat.title} kategorisi`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      style={{ borderRadius: rem(2) }}
    >
      <motion.article
        initial="rest"
        animate="rest"
        whileHover={reduce ? undefined : "hover"}
        className={cn("relative flex w-full flex-col overflow-hidden", "border border-white/5")}
        style={{
          height: rem(20),
          borderRadius: rem(2),
          background: CARD_BODY,
          padding: px(8), // kalın dış çerçeve (folder-tab efekti)
        }}
      >
        {/* Üst Reveal Görseli (Gradient) */}
        <motion.div
          variants={{ rest: { height: 160 * scale }, hover: { height: 210 * scale } }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative w-full shrink-0 overflow-hidden"
          style={{
            background: GRADIENTS[cat.tone],
            borderTopLeftRadius: rem(1.5),
            borderTopRightRadius: rem(1.5),
          }}
        >
          <NoiseOverlay />

          {/* Ok İkonu (Gradient'in üzerinde) */}
          <motion.span
            variants={{ rest: { x: 0, y: 0 }, hover: { x: 3, y: -3 } }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute z-20 text-white"
            style={{ right: rem(1.25), top: rem(1.25) }}
          >
            <svg
              viewBox="0 0 24 24"
              style={{ width: rem(1.25), height: rem(1.25) }}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </motion.span>
        </motion.div>

        {/* Alt İçerik Gövdesi (Folder Tab) */}
        <div className="relative z-10 flex flex-1 flex-col">
          {/* Klasör Tabı (Folder Notch) */}
          <div
            className="relative w-fit"
            style={{
              marginTop: rem(-3.5),
              borderTopRightRadius: rem(1.25),
              paddingRight: rem(1.5),
              paddingTop: rem(0.75),
              background: CARD_BODY,
            }}
          >
            <span
              className="block font-light leading-none tracking-tight"
              style={{ color: fg, fontSize: rem(3.5), paddingLeft: rem(1), paddingRight: rem(0.25) }}
            >
              {cat.num}
            </span>
            {/* Konkav Kıvrım — orantılı yarıçap */}
            <span
              aria-hidden="true"
              className="absolute left-full bottom-0"
              style={{
                height: px(32),
                width: px(32),
                background: CARD_BODY,
                WebkitMaskImage: `radial-gradient(circle at top right, transparent ${px(32)}, #000 ${px(32)})`,
                maskImage: `radial-gradient(circle at top right, transparent ${px(32)}, #000 ${px(32)})`,
              }}
            />
          </div>

          <div
            className="flex flex-1 flex-col justify-end"
            style={{ padding: rem(1) }}
          >
            <h3 className="font-medium tracking-tight" style={{ color: fg, fontSize: rem(1.125) }}>
              {cat.title}
            </h3>
            <p
              className="leading-relaxed"
              style={{ color: sub, fontSize: rem(0.8125), marginTop: rem(0.25) }}
            >
              {cat.desc}
            </p>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default CategoryCards;

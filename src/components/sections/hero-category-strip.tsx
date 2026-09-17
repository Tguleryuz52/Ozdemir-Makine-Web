"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { categoryCardsContent } from "@/content/site";
import { CategoryTile } from "@/components/sections/category-cards";

// Faz 12 (Talha 2026-09-17): "Ne arıyorsunuz?" kartlarının BİREBİR kendisi (folder-tab + gradient +
// hover reveal animasyonu), sadece orantılı küçültülmüş (scale) haliyle hero'ya taşındı. Ayrı
// CategoryCards section kaldırıldı. Giriş animasyonu orijinal section'la aynı (stagger + cardReveal),
// hero'da fold üstü olduğu için whileInView yerine mount'ta animate.
const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// Kartın orantılı ölçeği — masaüstü ~14rem (0.7). Mobilde 3'lü düzen korunur ama uniform küçültülür
// (Talha: "desktopdaki gibi görünsün, sadece küçük"), tall-narrow olmasın diye ölçek düşürülür.
const CARD_SCALE_DESKTOP = 0.7;
const CARD_SCALE_MOBILE = 0.5;

export function HeroCategoryStrip() {
  const reduce = useReducedMotion();

  const tiles = (scale: number) =>
    categoryCardsContent.items.map((cat) => (
      <motion.div key={cat.num} variants={cardReveal}>
        <CategoryTile cat={cat} reduce={!!reduce} scale={scale} />
      </motion.div>
    ));

  return (
    <>
      {/* Mobil: 3'lü düzen (masaüstünün küçültülmüş hali) */}
      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="grid grid-cols-3 gap-2 sm:hidden"
      >
        {tiles(CARD_SCALE_MOBILE)}
      </motion.div>

      {/* Masaüstü */}
      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="hidden max-w-[44rem] grid-cols-3 gap-4 sm:grid"
      >
        {tiles(CARD_SCALE_DESKTOP)}
      </motion.div>
    </>
  );
}

export default HeroCategoryStrip;

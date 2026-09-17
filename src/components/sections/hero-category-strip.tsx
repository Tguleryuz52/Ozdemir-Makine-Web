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

// Kartın orantılı ölçeği — orijinal 20rem yükseklik → ~14rem.
const CARD_SCALE = 0.7;

export function HeroCategoryStrip() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={container}
      initial={reduce ? false : "hidden"}
      animate="show"
      className="grid grid-cols-1 gap-4 max-w-[21rem] sm:max-w-[44rem] sm:grid-cols-3"
    >
      {categoryCardsContent.items.map((cat) => (
        <motion.div key={cat.num} variants={cardReveal}>
          <CategoryTile cat={cat} reduce={!!reduce} scale={CARD_SCALE} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default HeroCategoryStrip;

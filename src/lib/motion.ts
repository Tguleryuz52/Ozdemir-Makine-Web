// Site geneli motion token'ları — tek kaynak. "Kuş tüyü" hissi: y + opacity + hafif blur, expo-out easing.
import type { Variants } from "framer-motion";

// Yumuşak expo-out (linear yasak). Reveal/entrance için ana easing.
export const EASE_SOFT = [0.16, 1, 0.3, 1] as const;
// Standart (butonlar, küçük geçişler).
export const EASE = [0.22, 1, 0.36, 1] as const;

export const REVEAL_VIEWPORT = { once: true, margin: "-12% 0px" } as const;

// Havada süzülerek gelen tekil eleman. Sadece transform/opacity → GPU-dostu, kasmaz.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_SOFT } },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE_SOFT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_SOFT } },
};

// Stagger sarmalayıcı (RevealGroup için).
export const staggerContainer = (stagger = 0.09, delayChildren = 0.02): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

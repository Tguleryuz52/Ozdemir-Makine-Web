"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { MachineSearch } from "@/components/ui/ai-search-input";
import { HeroCategoryStrip } from "@/components/sections/hero-category-strip";
import { heroContent } from "@/content/site";

// himon 1. bölüm (hero) — Özdemir'e uyarlandı. Referans: design/references/himon/himon-01-hero.png
// Full-bleed, header'ın ALTINA girer (-mt-20). Arka plan GEÇİCİ gradient (gerçek foto gelince next/image fill).
// Giriş animasyonu: başlık satır-maske reveal + kicker/CTA/gövde fade-up + arka plan zoom-out (himon dili).

// Hero CTA — Faz 12'de küçültüldü (arama + kategori şeridine yer açmak için).
const heroBtnSize = {
  "--afb-h": "3rem",
  "--afb-px": "1.4rem",
  "--afb-text": "0.95rem",
  "--afb-circle": "2rem",
  "--afb-gap": "0.5rem",
  "--afb-arrow": "1rem",
} as CSSProperties;

const EASE = [0.22, 1, 0.36, 1] as const; // = --ease-out-soft

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const lineReveal: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
};

const kickerClass =
  "whitespace-pre-line font-mono text-kicker uppercase text-white/85";

export function Hero() {
  const reduce = useReducedMotion();
  const lines = heroContent.headline.split("\n");
  const initial = reduce ? false : "hidden";

  return (
    <section className="relative -mt-24 min-h-[82svh] overflow-hidden text-white">
      {/* Arka plan — GEÇİCİ gradient placeholder. Gerçek foto: bu bloğu next/image fill ile değiştir. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        initial={reduce ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#0e0e0e_0%,#13224a_52%,#0e4193_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_78%_18%,transparent_38%,rgba(14,14,14,0.55)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55" />
      </motion.div>

      <motion.div
        variants={container}
        initial={initial}
        animate="show"
        className="mx-auto flex min-h-[82svh] max-w-[110rem] flex-col px-5 pb-10 pt-24 lg:px-8 lg:pb-12 lg:pt-28"
      >
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-[17rem_minmax(0,1fr)]">
          {/* Sol kolon (masaüstü): kicker üstte + scroll oku altta, sağ ayraç */}
          <div className="hidden flex-col justify-between border-white/15 pr-8 lg:flex lg:border-r">
            <motion.p variants={fadeUp} className={`${kickerClass} leading-[1.5] tracking-[0.06em]`}>
              {heroContent.kicker}
            </motion.p>
            <motion.span
              variants={fadeUp}
              aria-hidden
              className="text-2xl leading-none text-white/55"
            >
              ↓
            </motion.span>
          </div>

          {/* Sağ kolon: başlık + CTA, üst bölgede (himon: kicker hizası, ortada foto boşluğu) */}
          <div className="flex flex-col justify-start lg:pl-12">
            <motion.p
              variants={fadeUp}
              className={`${kickerClass} mb-6 leading-[1.5] tracking-[0.06em] lg:hidden`}
            >
              {heroContent.kicker}
            </motion.p>

            {/* Başlık — logo revizesi sonrası daha da küçüldü. Talha kararı 2026-09-15:
                logoyu büyütüyoruz, bu yazı marka'yı baskılamasın diye dengeye çekiliyor.
                Clamp: mobil 2rem → desktop 3.5rem. */}
            <h1 className="max-w-[26ch] text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium uppercase leading-[1.02] tracking-tight text-balance">
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span variants={lineReveal} className="block">
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* ARAMA — hero'nun ana etkileşimi. Koyu zeminde MachineSearch (ink zemin) belirgin görünsün diye
                dışına parlak beyaz ring + shadow ekliyoruz. */}
            <motion.div variants={fadeUp} className="mt-7 max-w-[540px]">
              <MachineSearch
                collapsedWidth={360}
                expandedWidth={540}
                collapsedHeight={52}
                expandedHeight={138}
              />
            </motion.div>

            {/* CTA — ikincil, aramanın altında. "Aradığın yoksa tüm katalogu gez." */}
            <motion.div variants={fadeUp} className="mt-5">
              <ArrowFillButton
                href={heroContent.cta.href}
                btnText={heroContent.cta.label}
                bgColor="#ffffff"
                textColor="#0e0e0e"
                fillBgColor="#0a509e"
                fillTextColor="#ffffff"
                style={heroBtnSize}
              />
            </motion.div>

            {/* Kompakt kategori şeridi — eski "Ne arıyorsunuz?" kartlarının birebir (scale'li) hali. */}
            <div className="mt-8">
              <HeroCategoryStrip />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;

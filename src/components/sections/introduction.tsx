"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { introContent } from "@/content/site";

// himon 2. kalıp (split-istatistik) — Özdemir'e uyarlandı.
// Klasik dashboard widget'ları yerine asil ve ince çizgilerle ayrılmış, dev tipografili liste.
// Sayı sayma (count-up) yok, sadece zarif bir fade-up reveal.

const EASE = [0.22, 1, 0.36, 1] as const;

export function Introduction() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const reveal: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section className="bg-white text-ink pb-24 lg:pb-32 pt-24 lg:pt-32">
      <div className="mx-auto max-w-[104rem] px-6 lg:px-10">
        
        {/* Üst Kısım: Dev Başlık (Himon'daki gibi) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-24 lg:mb-32">
          {/* Sol: Kicker (INTRODUCTION) */}
          <motion.div 
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:w-1/4 flex items-start gap-3 pt-2"
          >
            <div className="size-2.5 bg-brand mt-1.5" />
            <span className="font-mono text-kicker uppercase text-ink/50 tracking-widest">
              Kurumsal
            </span>
          </motion.div>
          
          {/* Sağ: Devasa Cümle */}
          <motion.h2 
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:w-3/4 text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-medium leading-[1.05] tracking-tight text-ink text-balance"
          >
            {introContent.heading}
          </motion.h2>
        </div>

        {/* Alt Kısım: Split (Görsel + İstatistikler) */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-24">
          
          {/* Sol Görsel Alanı */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: EASE }}
            className="relative aspect-square w-full overflow-hidden bg-ink"
          >
            <div className="absolute inset-0 bg-[linear-gradient(130deg,#0e0e0e_0%,#13224a_55%,#234d9c_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_12%,transparent_45%,rgba(0,0,0,0.5)_100%)]" />
          </motion.div>

          {/* Sağ İçerik Alanı (Body + Statlar + CTA) */}
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="pt-4 lg:pt-0"
          >
            {/* Paragraf */}
            <motion.p 
              variants={reveal} 
              className="text-[1.25rem] leading-relaxed text-ink/80 max-w-lg font-medium"
            >
              {introContent.body}
            </motion.p>

            {/* İstatistik Satırları */}
            <div className="mt-20 flex flex-col border-b border-ink/15">
              {introContent.stats.map((s) => (
                <motion.div
                  key={s.num}
                  variants={reveal}
                  className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-8 border-t border-ink/15"
                >
                  <div className="text-[3.5rem] lg:text-[4rem] font-medium leading-none tracking-tight shrink-0 md:w-[38%] text-ink">
                    {s.num}
                  </div>
                  <div className="text-[15px] leading-relaxed text-ink/60 max-w-xs md:pt-2">
                    {s.desc}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Butonu */}
            <motion.div variants={reveal} className="mt-14">
              <ArrowFillButton
                href={introContent.cta.href}
                btnText={introContent.cta.label}
                bgColor="#0e0e0e"
                textColor="#ffffff"
                fillBgColor="#234d9c"
                fillTextColor="#ffffff"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Introduction;

"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import ArrowFillButton from "@/components/arrow-fill-button";
import { introContent } from "@/content/site";

// himon 2. kalıp (split-istatistik) — Özdemir'e uyarlandı. Sol görsel + sağ metin/istatistik.
// "Farklı" scroll animasyonu: sayılar görünürde count-up + içerik whileInView stagger reveal.
// Görsel şu an GEÇİCİ gradient (swappable → gerçek makine fotoğrafı: next/image fill).

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <div ref={ref} className="bg-paper p-6">
      <div className="text-[2.5rem] font-medium leading-none tracking-[-0.03em] text-ink">
        {n.toLocaleString("tr-TR")}
        <span className="text-brand">{suffix}</span>
      </div>
      <div className="mt-2 text-[13px] leading-snug text-ink/55">{label}</div>
    </div>
  );
}

export function Introduction() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto max-w-[104rem] px-6 py-section lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Görsel — GEÇİCİ gradient placeholder (gerçek makine fotoğrafı gelince next/image fill) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative aspect-[4/3] overflow-hidden rounded-card bg-ink"
          >
            <div className="absolute inset-0 bg-[linear-gradient(130deg,#0e0e0e_0%,#13224a_55%,#234d9c_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_12%,transparent_45%,rgba(0,0,0,0.5)_100%)]" />
          </motion.div>

          {/* İçerik */}
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={reveal}
              className="font-mono text-kicker uppercase text-brand"
            >
              {introContent.kicker}
            </motion.p>
            <motion.h2
              variants={reveal}
              className="mt-4 max-w-xl text-display-lg text-balance"
            >
              {introContent.heading}
            </motion.h2>
            <motion.p
              variants={reveal}
              className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink/60"
            >
              {introContent.body}
            </motion.p>

            {/* İstatistikler — ince ayraçlı grid (gap-px + bg), sayılar count-up */}
            <motion.dl
              variants={reveal}
              className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10"
            >
              {introContent.stats.map((s) => (
                <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </motion.dl>

            <motion.div variants={reveal} className="mt-10">
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

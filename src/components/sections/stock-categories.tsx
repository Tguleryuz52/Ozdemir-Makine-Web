"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "@/lib/motion";
import type { StockCategory } from "@/content/site";

// Stok Listemiz index — himon "kategori grid" dili. Prop-driven (Sanity'ye hazır).
// Kartlar: sade beyaz, ince ayraç, mavi aksan, hover'da yükselme + ok hareketi.

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function StockCategories({
  kicker,
  title,
  intro,
  categories,
}: {
  kicker: string;
  title: string;
  intro: string;
  categories: StockCategory[];
}) {
  const reduce = useReducedMotion();

  return (
    <section className="w-full bg-paper text-ink pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto w-full max-w-[104rem] px-6 lg:px-10">
        {/* Başlık bloğu */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl"
        >
          <span className="mb-4 block font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-brand">
            {kicker}
          </span>
          <h1 className="text-[2rem] font-medium leading-[1.05] tracking-tight md:text-[2.75rem] lg:text-[3.25rem]">
            {title}
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink/55">
            {intro}
          </p>
        </motion.div>

        {/* Kategori kartları */}
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
        >
          {categories.map((cat, i) => (
            <motion.div key={cat.slug} variants={cardReveal}>
              <Link
                href={`/stok-listesi/${cat.slug}`}
                aria-label={`${cat.title} listelerini gör`}
                className="group block h-full rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <article className="relative flex h-full min-h-[19rem] flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-white p-7 transition-all duration-500 ease-out-soft group-hover:-translate-y-1 group-hover:border-brand/30 group-hover:shadow-[0_24px_60px_-28px_rgba(10,80,158,0.4)]">
                  {/* Üst satır: numara + liste sayısı */}
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="font-mono text-sm font-medium text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-ink/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/45">
                      {cat.lists.length} liste
                    </span>
                  </div>

                  {/* Gövde */}
                  <div className="relative z-10 mt-12">
                    <h2 className="text-[1.5rem] font-medium leading-[1.15] tracking-tight">
                      {cat.title}
                    </h2>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/55">
                      {cat.summary}
                    </p>
                  </div>

                  {/* Alt: aksiyon */}
                  <div className="relative z-10 mt-8 flex items-center gap-1.5 text-[0.9375rem] font-medium text-brand">
                    Listeleri Gör
                    <ArrowUpRight className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  {/* Mavi köşe parıltısı */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-brand/[0.06] blur-2xl transition-all duration-500 group-hover:bg-brand/10"
                  />
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default StockCategories;

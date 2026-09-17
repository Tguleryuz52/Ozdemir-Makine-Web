"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import type { StockCategory } from "@/content/site";

// Stok kategori detay — klasik sayfa başlığı (breadcrumb + dev başlık) + PDF liste satırları.
// Her satır bir PDF dokümanı: pdf varsa yeni sekmede açılır, yoksa "Yakında" durumu.

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const rowReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function StockCategoryDetail({
  kicker,
  category,
}: {
  kicker: string;
  category: StockCategory;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="w-full bg-paper text-ink pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="mx-auto w-full max-w-[104rem] px-6 lg:px-10">
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Konum"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-2 font-mono text-[0.8125rem] uppercase tracking-[0.08em]"
        >
          <Link href="/stok-listesi" className="text-brand transition-colors hover:text-brand-deep">
            {kicker}
          </Link>
          <span className="text-ink/30">/</span>
          <span className="text-ink/50">{category.title}</span>
        </motion.nav>

        {/* Başlık */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-6 max-w-3xl"
        >
          <h1 className="text-[2rem] font-medium leading-[1.05] tracking-tight md:text-[2.75rem] lg:text-[3.25rem]">
            {category.title}
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink/55">
            {category.summary}
          </p>
        </motion.div>

        {/* PDF listeleri — YAN YANA buton-kart grid (2 sütun). PDF'li → basılabilir + indir ikonu
            (ne açılacağı belli); PDF'siz → "Yakında". (Talha: buton yap, yan yana, indirme işareti koy,
            sayfa dolu görünsün.) */}
        <motion.ul
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:gap-5"
        >
          {category.lists.map((list) => {
            const hasPdf = Boolean(list.pdf);
            const Card = (
              <article
                className={cn(
                  "relative flex h-full min-h-[10.5rem] flex-col justify-between rounded-2xl border bg-white p-6 transition-all duration-300 ease-out-soft sm:p-7",
                  hasPdf
                    ? "border-ink/10 group-hover:-translate-y-1 group-hover:border-brand/40 group-hover:shadow-[0_24px_50px_-28px_rgba(10,80,158,0.5)]"
                    : "border-dashed border-ink/15",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={cn(
                      "grid size-12 shrink-0 place-items-center rounded-xl transition-colors",
                      hasPdf ? "bg-brand/10 text-brand group-hover:bg-brand/15" : "bg-ink/5 text-ink/30",
                    )}
                  >
                    <FileText className="size-6" strokeWidth={1.6} aria-hidden />
                  </span>
                  {hasPdf ? (
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white transition-all duration-300 ease-out-soft group-hover:translate-y-0.5 group-hover:bg-brand-deep"
                    >
                      <Download className="size-[18px]" strokeWidth={1.9} />
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full border border-ink/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40">
                      Yakında
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="text-[1.1875rem] font-medium leading-snug tracking-tight text-ink">
                    {list.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1.5 text-[0.9375rem] font-medium",
                      hasPdf ? "text-brand" : "text-ink/40",
                    )}
                  >
                    {hasPdf ? "PDF olarak indir" : list.note || "Liste yakında eklenecek"}
                  </p>
                </div>
              </article>
            );

            return (
              <motion.li key={list.slug} variants={rowReveal} className="h-full">
                {hasPdf ? (
                  <a
                    href={list.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${list.title} — PDF olarak aç`}
                    className="group block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    {Card}
                  </a>
                ) : (
                  <div className="group h-full cursor-default select-none">{Card}</div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Geri dön */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-14"
        >
          <Link
            href="/stok-listesi"
            className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink/60 transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 ease-out-soft group-hover:-translate-x-0.5" strokeWidth={1.6} />
            Tüm kategoriler
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default StockCategoryDetail;

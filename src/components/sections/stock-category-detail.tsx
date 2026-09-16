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
          <h1 className="text-[2.25rem] font-medium leading-[1.05] tracking-tight md:text-[3rem] lg:text-[3.5rem]">
            {category.title}
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink/55">
            {category.summary}
          </p>
        </motion.div>

        {/* PDF liste satırları */}
        <motion.ul
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 border-t border-ink/12 lg:mt-16"
        >
          {category.lists.map((list) => {
            const hasPdf = Boolean(list.pdf);
            const Row = (
              <div
                className={cn(
                  "flex items-center justify-between gap-6 py-6 transition-colors duration-300",
                  hasPdf ? "group-hover:text-brand" : "",
                )}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <FileText
                    className={cn(
                      "size-6 shrink-0 transition-colors",
                      hasPdf ? "text-brand" : "text-ink/30",
                    )}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <span className="block truncate text-[1.0625rem] font-medium tracking-tight md:text-[1.1875rem]">
                      {list.title}
                    </span>
                    {list.note ? (
                      <span className="mt-0.5 block truncate text-sm text-ink/50">
                        {list.note}
                      </span>
                    ) : null}
                  </div>
                </div>

                {hasPdf ? (
                  <span className="flex shrink-0 items-center gap-2 font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-ink/55 transition-colors group-hover:text-brand">
                    PDF
                    <Download className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-y-0.5" strokeWidth={1.6} />
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full border border-ink/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/40">
                    Yakında
                  </span>
                )}
              </div>
            );

            return (
              <motion.li key={list.slug} variants={rowReveal} className="border-b border-ink/12">
                {hasPdf ? (
                  <a
                    href={list.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    {Row}
                  </a>
                ) : (
                  <div className="cursor-default select-none opacity-80">{Row}</div>
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

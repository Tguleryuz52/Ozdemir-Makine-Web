"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { featuredMachinesContent } from "@/content/site";
import type { MachineDoc } from "@/sanity/lib/machines";
import { ProductCard } from "./productcard";
import { CategoryCards } from "./category-cards";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function FeaturedMachines({ items }: { items: MachineDoc[] }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="vitrin"
      className="bg-paper text-ink pt-16 pb-24 lg:pt-20 lg:pb-32 overflow-hidden"
    >
      {/* 1. KISIM: ARAMA VE KATEGORİLER (Birleştirildi) */}
      <CategoryCards />

      {/* 2. KISIM: ÖNE ÇIKAN MAKİNELER (VİTRİN) */}
      <div className="mx-auto w-full max-w-[104rem] px-6 lg:px-10 mt-16 lg:mt-20">
        
        {/* Üst Şerit: Başlık ve CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end border-b border-ink/10 pb-6 lg:mb-12"
        >
          <div>
            <span className="mb-4 block font-mono text-[0.8125rem] tracking-[0.08em] uppercase text-brand">
              {featuredMachinesContent.kicker}
            </span>
            <h2 className="text-[2rem] font-medium leading-[1.05] tracking-tight md:text-[2.5rem] lg:text-[3rem]">
              {featuredMachinesContent.title}
            </h2>
          </div>
          
          <div className="shrink-0 pb-1 lg:pb-3">
            <ArrowFillButton
              href={featuredMachinesContent.cta.href}
              btnText={featuredMachinesContent.cta.label}
              bgColor="#0e0e0e"
              textColor="#ffffff"
              fillBgColor="#234d9c"
              fillTextColor="#ffffff"
            />
          </div>
        </motion.div>

        {/* Makine Slider — başlıkla hizalı başlar, sağ kenara full-bleed taşar */}
        <div className="w-full mt-4 lg:mt-8">
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex w-full gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 [--px:1.5rem] lg:[--px:2.5rem] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{
              marginRight: "calc(-50vw + 50%)",
              paddingRight: "calc(50vw - 50% + var(--px))",
            }}
          >
            {items.map((machine) => (
              <motion.div
                key={machine.id}
                variants={cardReveal}
                className="min-w-[280px] w-[85vw] sm:w-[340px] lg:w-[380px] shrink-0 snap-start"
              >
                <ProductCard
                  brand={machine.brand}
                  model={machine.title}
                  condition={machine.condition}
                  year={machine.year}
                  price={machine.price}
                  priceOnRequest={machine.priceOnRequest}
                  image={machine.image}
                  href={machine.href}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default FeaturedMachines;

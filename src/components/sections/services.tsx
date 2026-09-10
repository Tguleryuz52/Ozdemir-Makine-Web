"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { servicesContent } from "@/content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

// Placeholder gradient — gerçek servis fotoları gelene kadar.
// Anahtar = servis num'u ("01"..). Foto gelince site.ts'te image doldurulur, buradan düşer.
const GRADIENTS: Record<string, string> = {
  "01": "linear-gradient(135deg,#0e0e0e 0%,#13224a 50%,#234d9c 100%)",
  "02": "linear-gradient(135deg,#164295 0%,#0e92dd 100%)",
  "03": "linear-gradient(135deg,#0e0e0e 0%,#2a2a2a 100%)",
  "04": "linear-gradient(135deg,#234d9c 0%,#0e0e0e 100%)",
  "05": "linear-gradient(135deg,#0e92dd 0%,#164295 60%,#0e0e0e 100%)",
};

export function Services() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const activeItem = servicesContent.items[active];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } },
  };

  const row: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white text-ink flex flex-col justify-center pt-20 pb-16 lg:h-[100svh] lg:min-h-[720px] lg:py-16"
    >
      <div className="mx-auto flex w-full max-w-[104rem] flex-col px-6 lg:h-full lg:px-10">
        {/* Üst şerit: dev başlık + sağda sayaç, altında ince ayraç */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex shrink-0 items-baseline justify-between border-b border-ink/15 pb-5 lg:pb-6"
        >
          <h2
            id="services-heading"
            className="text-[2.75rem] font-medium leading-[0.95] tracking-tight text-ink md:text-[4.5rem] lg:text-[6rem]"
          >
            {servicesContent.kicker}
          </h2>
          <span className="font-medium text-ink/70 text-[1.15rem] md:text-[1.75rem] lg:text-[2.25rem] tracking-tight">
            {servicesContent.count}
          </span>
        </motion.div>

        {/* İçerik: sol master-list · sağ detail — desktop'ta grid stretch */}
        <div className="mt-8 grid flex-1 min-h-0 gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-stretch lg:gap-16">
          {/* SOL: Master-list */}
          <motion.ul
            variants={container}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col"
          >
            {servicesContent.items.map((item, i) => {
              const isActive = active === i;
              return (
                <motion.li
                  key={item.num}
                  variants={row}
                  className="flex-1"
                >
                  <Link
                    href={item.href}
                    aria-label={`${item.title} — detay`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group inline-flex h-full w-fit items-center gap-4 py-4 outline-none lg:gap-8 lg:py-5 focus-visible:bg-paper/60"
                  >
                    <span
                      className={`w-12 shrink-0 text-[1.75rem] font-medium leading-[1.05] tracking-tight transition-colors duration-300 md:text-[2.25rem] lg:w-24 lg:text-[2.85rem] ${
                        isActive ? "text-ink" : "text-ink/25"
                      }`}
                    >
                      {item.num}
                    </span>
                    <span
                      className={`text-[1.75rem] font-medium leading-[1.05] tracking-tight transition-colors duration-300 md:text-[2.25rem] lg:text-[2.85rem] ${
                        isActive ? "text-ink" : "text-ink/30"
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* SAĞ: Detail — sol listenin yüksekliğine oturur (flex-col + görsel flex-1) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="flex min-h-0 flex-col"
          >
            {/* Görsel — arta kalan alanı doldurur, cross-fade */}
            <div className="relative min-h-[280px] w-full flex-1 overflow-hidden rounded-[1.5rem] bg-ink lg:min-h-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeItem.num}
                  initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0"
                  style={
                    activeItem.image
                      ? {
                          backgroundImage: `url(${activeItem.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : { backgroundImage: GRADIENTS[activeItem.num] }
                  }
                >
                  <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_15%,transparent_45%,rgba(0,0,0,0.45)_100%)]" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Açıklama — cross-fade, sabit alt blok */}
            <div className="mt-5 shrink-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={activeItem.num}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="text-[0.95rem] leading-[1.5] text-ink/70 lg:text-[1rem]"
                >
                  {activeItem.body}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA — sabit alt blok */}
            <div className="mt-5 shrink-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeItem.num}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <ArrowFillButton
                    href={activeItem.href}
                    btnText={activeItem.ctaLabel}
                    bgColor="#0e0e0e"
                    textColor="#ffffff"
                    fillBgColor="#234d9c"
                    fillTextColor="#ffffff"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Services;

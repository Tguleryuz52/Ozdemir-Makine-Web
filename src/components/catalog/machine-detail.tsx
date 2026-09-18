"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "@/components/sections/productcard";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { socialLinks } from "@/content/site";
import type { MachineDoc } from "@/sanity/lib/machines";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

// Placeholder galeri gradyanları (gerçek foto gelene kadar, marka token'larından)
const PLACEHOLDER = [
  "radial-gradient(130% 130% at 20% 0%, var(--brand-bright), var(--brand) 45%, var(--brand-deep))",
  "radial-gradient(130% 130% at 80% 10%, color-mix(in srgb, var(--brand-bright) 40%, #fff), var(--brand) 72%)",
  "linear-gradient(150deg, var(--brand-deep), var(--ink))",
  "radial-gradient(130% 130% at 50% 0%, var(--brand), var(--brand-deep) 60%, var(--ink))",
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MachineDetail({ machine, related }: { machine: MachineDoc; related: MachineDoc[] }) {
  const d = machine;
  const gallery = d.gallery?.length ? d.gallery : [];
  const tileCount = gallery.length || 4;
  const [active, setActive] = useState(0);

  const specs: [string, string][] = [];
  if (machine.productCode) specs.push(["Ürün Kodu", machine.productCode]);
  specs.push(["Marka", machine.brand], ["Model", machine.model]);
  if (d.format) specs.push(["Format", d.format]);
  if (d.press) specs.push(["Baskı", d.press]);
  if (machine.year) specs.push(["Yıl", String(machine.year)]);
  specs.push(["Durum", machine.condition]);
  specs.push(["Kategori", machine.subcategory ? `${machine.category} · ${machine.subcategory}` : machine.category]);

  const acc: { id: string; title: string; type: "text" | "list"; body: string | string[] }[] = [];
  if (d.description) acc.push({ id: "aciklama", title: "Açıklama", type: "text", body: d.description });
  if (d.features?.length) acc.push({ id: "ozellikler", title: "Öne Çıkan Özellikler", type: "list", body: d.features });
  if (d.notes?.length) acc.push({ id: "notlar", title: "Notlar", type: "list", body: d.notes });
  const [openAcc, setOpenAcc] = useState<string | null>(acc[0]?.id ?? null);

  const igUrl = socialLinks.find((s) => s.label === "Instagram")?.href ?? "#";
  const quoteHref = `/iletisim?makine=${encodeURIComponent(machine.slug)}`;

  const bigBg = gallery[active] ? undefined : PLACEHOLDER[active % PLACEHOLDER.length];

  return (
    <div className="bg-paper text-ink">
      <div className="mx-auto w-full max-w-[104rem] px-6 pt-28 lg:px-10 lg:pt-32">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-ink/50">
          <Link href="/" className="hover:text-ink">Ana Sayfa</Link>
          <span>/</span>
          <Link href={`/makineler?kategori=${encodeURIComponent(machine.category)}`} className="hover:text-ink">{machine.category}</Link>
          <span>/</span>
          <span className="text-ink/80">{machine.title}</span>
        </nav>

        {/* Üst: Galeri + Bilgi */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Galeri */}
          <div className="flex items-start gap-4">
            {/* Thumbnail şeridi — max ~7 görünür, fazlası scroll (alt ok göstergeli) */}
            <div className="relative shrink-0">
              <div className="flex max-h-[30rem] flex-col gap-3 overflow-y-auto pr-1 [scrollbar-width:thin] lg:max-h-[34rem]">
                {Array.from({ length: tileCount }).map((_, i) => (
                  <button
                    key={i}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-label={`Görsel ${i + 1}`}
                    className={cn("size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all", active === i ? "border-brand" : "border-transparent opacity-60 hover:opacity-100")}
                    style={gallery[i] ? { backgroundImage: `url(${gallery[i]})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: PLACEHOLDER[i % PLACEHOLDER.length] }}
                  />
                ))}
              </div>
              {tileCount > 7 && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-9 items-end justify-center rounded-b-xl bg-gradient-to-t from-paper via-paper/70 to-transparent">
                  <svg viewBox="0 0 24 24" className="size-4 animate-bounce text-ink/50" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                </div>
              )}
            </div>
            <motion.div
              key={active}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative aspect-[4/3] flex-1 self-start overflow-hidden rounded-2xl bg-ink/5"
              style={gallery[active] ? { backgroundImage: `url(${gallery[active]})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: bigBg }}
            >
              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink backdrop-blur-md">
                {machine.condition}
              </span>
            </motion.div>
          </div>

          {/* Bilgi */}
          <div>
            <span className="font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-brand">{machine.category}</span>
            <h1 className="mt-3 text-[2.25rem] font-medium leading-[1.05] tracking-tight lg:text-[3rem]">{machine.title}</h1>
            <div className="mt-4 text-2xl font-medium">
              {machine.priceOnRequest ? <span className="text-brand">Fiyat Sorunuz</span> : machine.price}
            </div>

            {d.description && <p className="mt-5 max-w-[46ch] whitespace-pre-line text-[0.95rem] leading-relaxed text-ink/60">{d.description}</p>}

            {/* Specs */}
            <dl className="mt-8 border-t border-ink/10">
              {specs.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-6 border-b border-ink/10 py-3">
                  <dt className="text-sm text-ink/50">{k}</dt>
                  <dd className="text-right text-sm font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            {/* CTA'lar — ArrowFillButton animasyonu, iki buton yan yana */}
            <div className="mt-8 flex flex-wrap gap-3">
              <ArrowFillButton
                href={quoteHref}
                btnText="Fiyat Teklifi Al"
                bgColor="#0a509e"
                textColor="#ffffff"
                fillBgColor="#ffffff"
                fillTextColor="#0a509e"
                className="[--afb-arrow:1.25rem] [--afb-circle:3rem] [--afb-gap:0.5rem] [--afb-h:4rem] [--afb-px:2.25rem] [--afb-text:1.0625rem]"
              />
              {d.pdfUrl && (
                <ArrowFillButton
                  href={d.pdfUrl}
                  btnText="PDF Döküman"
                  bgColor="#0e0e0e"
                  textColor="#ffffff"
                  fillBgColor="#0a509e"
                  fillTextColor="#ffffff"
                  className="[--afb-arrow:1.25rem] [--afb-circle:3rem] [--afb-gap:0.5rem] [--afb-h:4rem] [--afb-px:2.25rem] [--afb-text:1.0625rem]"
                />
              )}
            </div>
            <p className="mt-3 text-xs text-ink/45">
              Teklif formu bu makinenin bilgileriyle otomatik dolu gelir.
              {d.pdfUrl ? " Teknik detaylar için PDF föyünü inceleyebilirsiniz." : ""}
            </p>
          </div>
        </div>

        {/* Accordion */}
        {acc.length > 0 && (
          <div className="mx-auto mt-16 max-w-[62rem] lg:mt-24">
            {acc.map((item) => {
              const open = openAcc === item.id;
              return (
                <div key={item.id} className="border-b border-ink/10">
                  <button
                    onClick={() => setOpenAcc(open ? null : item.id)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between py-5 text-left"
                  >
                    <span className="text-lg font-medium tracking-tight">{item.title}</span>
                    <span className={cn("grid size-6 place-items-center text-ink/50 transition-transform duration-300", open && "rotate-45")}>
                      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ height: { duration: 0.42, ease: EASE }, opacity: { duration: 0.3, ease: "easeOut" } }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6">
                          {item.type === "text" ? (
                            <p className="max-w-[60ch] whitespace-pre-line text-[0.95rem] leading-relaxed text-ink/65">{item.body as string}</p>
                          ) : (
                            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              {(item.body as string[]).map((li, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-[0.9rem] text-ink/70">
                                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                                  {li}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Benzer Makineler */}
      {related.length > 0 && (
        <section className="mx-auto mt-20 w-full max-w-[104rem] px-6 lg:mt-28 lg:px-10">
          <h2 className="mb-8 text-[1.75rem] font-medium tracking-tight lg:text-[2.25rem]">Benzer Makineler</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((m) => (
              <ProductCard key={m.id} brand={m.brand} model={m.title} condition={m.condition} year={m.year} price={m.price} priceOnRequest={m.priceOnRequest} image={m.image} href={`/makineler/${m.slug}`} />
            ))}
          </div>
        </section>
      )}

      {/* Instagram */}
      <section className="mx-auto mt-20 w-full max-w-[104rem] px-6 pb-28 lg:mt-28 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-brand">Instagram</span>
            <h2 className="mt-2 text-[1.75rem] font-medium tracking-tight lg:text-[2.25rem]">@ozdemirmakinetr</h2>
          </div>
          <a href={igUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/50">
            <InstagramIcon /> Takip Et
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <a
              key={i}
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram gönderisi"
              className="group relative aspect-square overflow-hidden rounded-xl"
              style={{ background: PLACEHOLDER[i % PLACEHOLDER.length] }}
            >
              <span className="absolute inset-0 grid place-items-center text-white/0 transition-colors duration-300 group-hover:bg-ink/30 group-hover:text-white">
                <InstagramIcon />
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MachineDetail;

"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  categoryTree,
  facetLabels,
  facetOptions,
  machineFacetValue,
  groupMeta,
  type Machine,
  type FacetKey,
  type MachineGroup,
} from "@/content/machines";
import { ProductCard } from "@/components/sections/productcard";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const FACET_ORDER: FacetKey[] = ["brand", "model", "condition"];
const PARAM_OF: Record<FacetKey, string> = { brand: "marka", model: "model", condition: "durum" };

type Selected = Record<FacetKey, Set<string>>;
const emptySelected = (): Selected => ({ brand: new Set(), model: new Set(), condition: new Set() });

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}
function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4 shrink-0 text-ink/40 transition-transform duration-300", open && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function Pill({ active, small, muted, onClick, children }: { active: boolean; small?: boolean; muted?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors",
        small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
        active ? "border-brand bg-brand text-white" : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink",
        muted && !active && "opacity-40",
      )}
    >
      {children}
    </button>
  );
}

function CatalogInner({ group, machines }: { group?: MachineGroup; machines: Machine[] }) {
  const meta = groupMeta[group ?? "all"];
  const base = useMemo(
    () => (group ? machines.filter((m) => m.group === group) : machines),
    [group, machines],
  );
  const sp = useSearchParams();

  const [cat, setCat] = useState<string>(() => {
    const c = sp.get("kategori") ?? "";
    return base.some((m) => m.category === c) ? c : "";
  });
  const [subs, setSubs] = useState<Set<string>>(() => {
    const s = new Set<string>();
    const raw = sp.get("alt");
    if (raw) raw.split(",").map((x) => x.trim()).forEach((v) => s.add(v));
    return s;
  });
  const [selected, setSelected] = useState<Selected>(() => {
    const next = emptySelected();
    for (const key of FACET_ORDER) {
      const raw = sp.get(PARAM_OF[key]);
      if (raw) raw.split(",").map((x) => x.trim()).forEach((v) => next[key].add(v));
    }
    return next;
  });
  const [q, setQ] = useState<string>(() => sp.get("q") ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<FacetKey, boolean>>({ brand: true, model: false, condition: true });
  const toggleGroup = useCallback((k: FacetKey) => setOpenGroups((p) => ({ ...p, [k]: !p[k] })), []);
  const [catOpen, setCatOpen] = useState(true);

  const matchFacets = useCallback((m: Machine, sel: Selected, query: string) => {
    for (const key of FACET_ORDER) {
      const set = sel[key];
      if (set.size && !set.has(machineFacetValue(m, key))) return false;
    }
    if (query.trim()) {
      const hay = `${m.brand} ${m.model} ${m.title} ${m.productCode ?? ""}`.toLowerCase();
      if (!hay.includes(query.trim().toLowerCase())) return false;
    }
    return true;
  }, []);

  const matchCatSub = useCallback(
    (m: Machine) => {
      if (cat && m.category !== cat) return false;
      if (subs.size && !(m.subcategory && subs.has(m.subcategory))) return false;
      return true;
    },
    [cat, subs],
  );

  const scoped = useMemo(() => base.filter(matchCatSub), [base, matchCatSub]);
  const filtered = useMemo(() => scoped.filter((m) => matchFacets(m, selected, q)), [scoped, selected, q, matchFacets]);

  const activeNode = useMemo(() => categoryTree.find((n) => n.name === cat) ?? null, [cat]);
  const availableSubs = useMemo(() => activeNode?.subs ?? [], [activeNode]);

  const countFor = useCallback(
    (key: FacetKey, value: string) => {
      const sel: Selected = { ...selected, [key]: new Set<string>() };
      return scoped.filter((m) => matchFacets(m, sel, q) && machineFacetValue(m, key) === value).length;
    },
    [scoped, selected, q, matchFacets],
  );
  const facetData = useMemo(() => FACET_ORDER.map((key) => ({ key, options: facetOptions(scoped, key) })), [scoped]);

  const nonCat = useCallback((m: Machine) => matchFacets(m, selected, q), [matchFacets, selected, q]);
  const topCount = useCallback((name: string) => base.filter((m) => nonCat(m) && (name === "" || m.category === name)).length, [base, nonCat]);
  const subCount = useCallback((sub: string) => base.filter((m) => nonCat(m) && m.category === cat && (sub === "" || m.subcategory === sub)).length, [base, nonCat, cat]);

  useEffect(() => {
    const p = new URLSearchParams();
    if (cat) p.set("kategori", cat);
    if (subs.size) p.set("alt", [...subs].join(","));
    for (const key of FACET_ORDER) {
      const v = [...selected[key]];
      if (v.length) p.set(PARAM_OF[key], v.join(","));
    }
    if (q.trim()) p.set("q", q.trim());
    const qs = p.toString();
    window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : ""));
  }, [cat, subs, selected, q]);

  const toggleFacet = useCallback((key: FacetKey, value: string) => {
    setSelected((prev) => {
      const n: Selected = { ...prev, [key]: new Set(prev[key]) };
      if (n[key].has(value)) n[key].delete(value);
      else n[key].add(value);
      return n;
    });
  }, []);
  const toggleSub = useCallback((sub: string) => {
    setSubs((prev) => {
      const n = new Set(prev);
      if (n.has(sub)) n.delete(sub);
      else n.add(sub);
      return n;
    });
  }, []);
  const selectCat = useCallback((name: string) => {
    setCat(name);
    setSubs(new Set());
  }, []);
  const clearAll = useCallback(() => {
    setCat("");
    setSubs(new Set());
    setSelected(emptySelected());
    setQ("");
  }, []);

  const activeChips = useMemo(
    () => [
      ...[...subs].map((value) => ({ type: "sub" as const, value })),
      ...FACET_ORDER.flatMap((key) => [...selected[key]].map((value) => ({ type: key, value }))),
    ],
    [subs, selected],
  );
  const activeCount = (cat ? 1 : 0) + subs.size + FACET_ORDER.reduce((n, k) => n + selected[k].size, 0) + (q.trim() ? 1 : 0);

  const Filters = (
    <div>
      {/* Kategoriler — solda kalır; tıklayınca alt kategoriler üstte pill olur */}
      <fieldset className="border-b border-ink/10">
        <legend className="w-full">
          <button type="button" onClick={() => setCatOpen((o) => !o)} aria-expanded={catOpen} className="flex w-full items-center justify-between py-3.5">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink/45">
              Kategoriler{cat && <span className="ml-1.5 text-brand">(1)</span>}
            </span>
            <Chevron open={catOpen} />
          </button>
        </legend>
        {catOpen && (
          <div className="space-y-0.5 pb-3">
            {[{ name: "", subs: [] as string[] }, ...categoryTree].map((node) => {
              const active = cat === node.name;
              const c = topCount(node.name);
              const hasSubs = node.subs.length > 0;
              return (
                <button
                  key={node.name || "all"}
                  type="button"
                  onClick={() => selectCat(active ? "" : node.name)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-all",
                    active ? "bg-brand/[0.08]" : "hover:bg-ink/[0.03]",
                    c === 0 && !active && node.name !== "" && "opacity-40",
                  )}
                >
                  <span className={cn("grid size-[18px] shrink-0 place-items-center rounded-full border transition-colors", active ? "border-brand bg-brand text-white" : "border-ink/25")}>
                    {active && <CheckIcon />}
                  </span>
                  <span className={cn("flex-1 text-[0.9rem]", active ? "font-medium text-brand" : "text-ink/75 group-hover:text-ink")}>
                    {node.name || "Tümü"}
                  </span>
                  {hasSubs && <Chevron open={active} />}
                  <span className="text-xs tabular-nums text-ink/35">{c}</span>
                </button>
              );
            })}
          </div>
        )}
      </fieldset>
      {facetData.map(({ key, options }) => {
        const open = openGroups[key];
        const selCount = selected[key].size;
        return (
          <fieldset key={key} className="border-b border-ink/10">
            <legend className="w-full">
              <button type="button" onClick={() => toggleGroup(key)} aria-expanded={open} className="flex w-full items-center justify-between py-3.5">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink/45">
                  {facetLabels[key]}
                  {selCount > 0 && <span className="ml-1.5 text-brand">({selCount})</span>}
                </span>
                <Chevron open={open} />
              </button>
            </legend>
            {open && (
              <div className="space-y-0.5 pb-3">
                {options.map((o) => {
                  const checked = selected[key].has(o.value);
                  const c = countFor(key, o.value);
                  return (
                    <label key={o.value} className={cn("group flex cursor-pointer items-center gap-3 py-1.5 transition-opacity", c === 0 && !checked && "pointer-events-none opacity-35")}>
                      <input type="checkbox" checked={checked} onChange={() => toggleFacet(key, o.value)} className="sr-only" />
                      <span className={cn("grid size-[18px] shrink-0 place-items-center rounded-[6px] border transition-colors", checked ? "border-brand bg-brand text-white" : "border-ink/25 text-transparent group-hover:border-ink/50")}>
                        <CheckIcon />
                      </span>
                      <span className="flex-1 text-[0.9rem] text-ink/75 transition-colors group-hover:text-ink">{o.value}</span>
                      <span className="text-xs tabular-nums text-ink/35">{c}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </fieldset>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Editoryal Header */}
      <section className="bg-paper text-ink">
        <div className="mx-auto w-full max-w-[104rem] px-6 pb-8 pt-28 lg:px-10 lg:pt-36">
          <span className="mb-4 block font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-brand">
            {meta.kicker} / {base.length} ürün
          </span>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-[46rem]">
              <h1 className="text-[2rem] font-medium leading-[1] tracking-tight md:text-[2.75rem] lg:text-[3.25rem]">{meta.title}</h1>
              <p className="mt-5 max-w-[52ch] text-[0.95rem] leading-relaxed text-ink/55">{meta.desc}</p>
            </div>
            <div className="shrink-0 text-left md:text-right">
              <div className="text-[3.5rem] font-medium leading-none tabular-nums lg:text-[4rem]">{filtered.length}</div>
              <div className="mt-1 text-sm text-ink/45">{activeCount > 0 ? "filtrelenmiş sonuç" : `/ ${base.length} ürün`}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gövde */}
      <section className="bg-paper pb-28">
        <div className="mx-auto flex w-full max-w-[104rem] gap-10 px-6 lg:px-10">
          {/* Sidebar (marka/model/durum) */}
          <aside className="hidden w-[16.5rem] shrink-0 lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin]">
              {Filters}
              {activeCount > 0 && (
                <button onClick={clearAll} className="mt-6 text-sm font-medium text-brand underline-offset-4 hover:underline">
                  Tüm filtreleri temizle ({activeCount})
                </button>
              )}
            </div>
          </aside>

          {/* Ana kolon */}
          <div className="min-w-0 flex-1">
            {/* Arama + mobil filtre */}
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.2-3.2" />
                </svg>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Marka, model veya ürün kodu ara…"
                  aria-label="Makine ara"
                  className="w-full rounded-full border border-ink/15 bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-brand"
                />
              </div>
              <button onClick={() => setMobileOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium text-ink lg:hidden">
                Filtrele{activeCount > 0 ? ` (${activeCount})` : ""}
              </button>
            </div>

            {/* Alt kategori pill'leri — soldan bir kategori seçilince çıkar */}
            {availableSubs.length > 0 && (
              <div className="mb-6 rounded-2xl bg-ink/[0.03] p-4">
                <span className="mb-3 block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-brand">
                  {cat}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <Pill small active={subs.size === 0} onClick={() => setSubs(new Set())}>
                    Tümü
                  </Pill>
                  {availableSubs.map((s) => {
                    const sc = subCount(s);
                    return (
                      <Pill key={s} small active={subs.has(s)} muted={sc === 0} onClick={() => toggleSub(s)}>
                        {s} <span className="tabular-nums opacity-60">{sc}</span>
                      </Pill>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Aktif chip'ler */}
            {activeChips.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {activeChips.map(({ type, value }) => (
                  <button
                    key={`${type}:${value}`}
                    onClick={() => (type === "sub" ? toggleSub(value) : toggleFacet(type, value))}
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 py-1.5 pl-3 pr-2 text-xs font-medium text-ink transition-colors hover:bg-ink/10"
                  >
                    {value}
                    <span className="text-ink/50">✕</span>
                  </button>
                ))}
                <button onClick={clearAll} className="ml-1 text-xs font-medium text-brand hover:underline">Temizle</button>
              </div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {filtered.map((m) => (
                    <motion.div key={m.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3, ease: EASE }}>
                      <ProductCard brand={m.brand} model={m.title} condition={m.condition} year={m.year} price={m.price} priceOnRequest={m.priceOnRequest} image={m.image} href={`/makineler/${m.slug}`} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 py-24 text-center">
                <p className="text-lg font-medium text-ink">Sonuç bulunamadı</p>
                <p className="mt-2 max-w-[36ch] text-sm text-ink/55">Seçtiğiniz filtrelerle eşleşen makine yok. Filtreleri değiştirin veya temizleyin.</p>
                <button onClick={clearAll} className="mt-6 rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">Filtreleri temizle</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobil filtre drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div className="absolute inset-y-0 right-0 flex w-[85%] max-w-[22rem] flex-col bg-paper shadow-2xl" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.4, ease: EASE }}>
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
                <span className="font-medium">Filtreler</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Kapat" className="text-ink/60 hover:text-ink">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">{Filters}</div>
              <div className="flex gap-3 border-t border-ink/10 px-6 py-4">
                <button onClick={clearAll} className="flex-1 rounded-full border border-ink/20 py-3 text-sm font-medium">Temizle</button>
                <button onClick={() => setMobileOpen(false)} className="flex-1 rounded-full bg-brand py-3 text-sm font-medium text-white">{filtered.length} sonucu gör</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function CatalogView({ group, machines }: { group?: MachineGroup; machines: Machine[] }) {
  return (
    <Suspense fallback={null}>
      <CatalogInner group={group} machines={machines} />
    </Suspense>
  );
}

export default CatalogView;

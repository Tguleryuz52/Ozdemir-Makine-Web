"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { searchContent } from "@/content/site";
import { cn } from "@/lib/utils";

const SPRING = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
const EASE = [0.22, 1, 0.36, 1] as const;

// ---- İkonlar (inline SVG, harici bağımlılık yok) ----
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function ArrowUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 12V2M7 2 2.5 6.5M7 2l4.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TagIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7.5V12l8.5 8.5a2 2 0 0 0 2.8 0l5.2-5.2a2 2 0 0 0 0-2.8L11 4H6.5A3.5 3.5 0 0 0 3 7.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="7.5" cy="8" r="1.2" fill="currentColor" />
    </svg>
  );
}
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true"
      animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: EASE }}
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

// ---- Genişliği yumuşak değişen etiket (MorphingText) ----
function MorphingText({ text }: { text: string }) {
  const [width, setWidth] = useState<number | "auto">("auto");
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) setWidth(ref.current.offsetWidth);
  }, [text]);
  return (
    <motion.span
      className="relative inline-flex items-center justify-center overflow-hidden"
      animate={{ width }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{ width }}
    >
      <span ref={ref} className="invisible whitespace-nowrap px-0.5">{text}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: EASE }}
          className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

export interface MachineSearchProps {
  className?: string;
  onSubmit?: (query: string, meta: { brand: string; category: string }) => void;
  // Boyut ayarları — default'lar mevcut hero ölçüleri. Hero'da (Faz 12) daha küçük geçilir.
  collapsedWidth?: number;
  expandedWidth?: number;
  collapsedHeight?: number;
  expandedHeight?: number;
}

export function MachineSearch({
  className,
  onSubmit,
  collapsedWidth = 440,
  expandedWidth = 680,
  collapsedHeight = 60,
  expandedHeight = 150,
}: MachineSearchProps) {
  const router = useRouter();
  const { placeholder, brands, categories, basePath } = searchContent;

  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const [brand, setBrand] = useState<string>(brands[0]);
  const [catIndex, setCatIndex] = useState(0);
  const [brandOpen, setBrandOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const category = categories[catIndex];
  const hasValue = value.trim() !== "";

  // Açılınca odaklan
  useEffect(() => {
    if (!expanded) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [expanded]);

  // Dışarı tıklayınca (boşsa) topla
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setBrandOpen(false);
        if (!hasValue) setExpanded(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [hasValue]);

  const submit = () => {
    if (onSubmit) {
      onSubmit(value.trim(), { brand, category });
      return;
    }
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    if (catIndex !== 0) params.set("kategori", category);
    if (brand !== brands[0]) params.set("marka", brand);
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  };

  const cycleCategory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCatIndex((i) => (i + 1) % categories.length);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full text-paper", className)}
      style={{ maxWidth: expanded ? expandedWidth : collapsedWidth, transition: `max-width 0.4s ${SPRING}` }}
    >
      <div
        onMouseDown={(e) => {
          if (!expanded) {
            e.preventDefault();
            setExpanded(true);
          }
        }}
        style={{
          height: expanded ? expandedHeight : collapsedHeight,
          borderRadius: 30,
          transition: `height 0.4s ${SPRING}`,
          background: "var(--ink)",
        }}
        className={cn(
          "relative w-full overflow-visible border border-paper/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-paper/15",
          expanded ? "cursor-text" : "cursor-pointer",
        )}
      >
        {/* Toplu haldeki placeholder */}
        <button
          type="button"
          aria-label="Aramayı aç"
          onClick={() => setExpanded(true)}
          className={cn(
            "absolute inset-x-0 top-0 z-[1] cursor-pointer px-6 pr-16 py-[19px] text-left text-[0.95rem] font-medium text-paper/55 outline-none transition-all duration-300",
            expanded ? "pointer-events-none translate-y-1 opacity-0" : "translate-y-0 opacity-100",
          )}
          style={{ transition: `all 0.35s ${SPRING}` }}
        >
          {placeholder}
        </button>

        {/* Arama input'u */}
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); submit(); }
            if (e.key === "Escape" && !hasValue) setExpanded(false);
          }}
          placeholder={placeholder}
          aria-label="Makine ara"
          className={cn(
            "absolute inset-x-0 top-0 z-[1] w-full bg-transparent px-6 pr-16 py-[18px] text-[0.95rem] text-paper outline-none placeholder:font-medium placeholder:text-paper/45",
            expanded ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          style={{ transition: "opacity 0.3s ease-out" }}
        />

        {/* Alt kontroller: marka + kategori */}
        <div
          className={cn(
            "absolute bottom-3 left-3.5 right-16 z-[10] flex items-center gap-1 transition-all duration-300",
            expanded ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0 blur-sm",
          )}
          style={{ transition: `all 0.3s ${SPRING}` }}
        >
          {/* Marka dropdown */}
          <div className="relative">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => { e.stopPropagation(); setBrandOpen((v) => !v); }}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold text-paper/60 outline-none transition-colors hover:bg-paper/10 hover:text-paper",
                brandOpen && "bg-paper/10 text-paper",
              )}
              aria-label={`Marka seç. Şu an: ${brand}`}
            >
              <TagIcon />
              <MorphingText text={brand} />
              <ChevronIcon open={brandOpen} />
            </button>

            <AnimatePresence>
              {brandOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ transformOrigin: "bottom left", background: "var(--ink)" }}
                  className="absolute bottom-full left-0 z-50 mb-2.5 flex w-48 flex-col gap-0.5 rounded-2xl border border-paper/10 p-1 shadow-xl"
                >
                  {brands.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e) => { e.stopPropagation(); setBrand(b); setBrandOpen(false); }}
                      className={cn(
                        "flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs font-medium outline-none transition-colors hover:bg-paper/10",
                        b === brand ? "text-paper" : "text-paper/70",
                      )}
                    >
                      <span className={cn("size-1.5 rounded-full", b === brand ? "bg-brand-bright" : "bg-paper/25")} />
                      {b}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Kategori cycle */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={cycleCategory}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold text-paper/60 outline-none transition-colors hover:bg-paper/10 hover:text-paper"
            aria-label={`Kategori: ${category}. Değiştirmek için tıkla`}
          >
            <TagIcon />
            <MorphingText text={category} />
          </button>
        </div>

        {/* Gönder / ara butonu (morph) */}
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onClick={(e) => {
            e.stopPropagation();
            if (!expanded) { setExpanded(true); return; }
            submit();
          }}
          aria-label={hasValue ? "Ara" : "Aramayı aç"}
          className={cn(
            "absolute right-2.5 z-[10] flex size-10 items-center justify-center rounded-full bg-brand text-paper outline-none transition-all duration-300 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand-bright",
            // Kapalıyken dikey ortalı; açılınca alt kontrol satırına hizalı (bottom).
            expanded ? "bottom-2.5" : "top-1/2 -translate-y-1/2",
          )}
        >
          <span className="relative flex size-full items-center justify-center">
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-300",
                hasValue ? "scale-100 opacity-100" : "scale-50 opacity-0",
              )}
              style={{ transitionTimingFunction: SPRING }}
            >
              <ArrowUpIcon />
            </span>
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-300",
                hasValue ? "scale-50 opacity-0" : "scale-100 opacity-100",
              )}
              style={{ transitionTimingFunction: SPRING }}
            >
              <SearchIcon />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default MachineSearch;

"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { mainNav, siteConfig, type NavItem } from "@/content/site";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { UnderlineLink } from "@/components/ui/underline-link";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

// Orijinal logomuz. `solid`: hero üstünde beyaz zemin olunca logo siyaha (invert) dönüyor.
function Wordmark({ solid }: { solid: boolean }) {
  return (
    <Link href="/" className="flex items-center -ml-6 lg:-ml-12" aria-label={siteConfig.name}>
      <Image
        src="/logo_main.png"
        alt="Özdemir Makine Logo"
        width={480}
        height={148}
        quality={100}
        priority
        className={cn(
          "object-contain h-[42px] lg:h-[46px] w-auto transition-all duration-500 ease-out-soft",
          solid ? "invert" : "invert-0",
        )}
      />
    </Link>
  );
}

// Teklif Al: hero üstünde beyaz pill + mavi ok dairesi; solid'de siyah pill (himon dili).
function QuoteButton({
  solid,
  className,
  style,
}: {
  solid: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <ArrowFillButton
      href="/iletisim"
      btnText="Teklif Al"
      bgColor={solid ? "#0e0e0e" : "#ffffff"}
      textColor={solid ? "#ffffff" : "#0e0e0e"}
      fillBgColor={solid ? "#ffffff" : "#234d9c"}
      fillTextColor={solid ? "#0e0e0e" : "#ffffff"}
      className={className}
      style={style}
    />
  );
}

// Masaüstü: alt menülü öğe. Tıklama → ana sayfaya (ör. /makineler); hover/focus → alt kategoriler.
function NavDropdown({ item, navColor }: { item: NavItem; navColor: string }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openNow = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocusCapture={openNow}
      onBlurCapture={closeSoon}
    >
      <Link
        href={item.href}
        className={cn(
          "inline-flex items-center gap-1 text-[16px] font-medium tracking-[-0.02em] transition-colors duration-300",
          navColor,
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      >
        {item.label}
        <ChevronDown
          className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
          aria-hidden="true"
        />
      </Link>

      <AnimatePresence>
        {open && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.26, ease: EASE }}
            style={{ transformOrigin: "top left" }}
            className="absolute left-0 top-full pt-3"
            role="menu"
          >
            {/* Premium panel — yumuşak derin gölge, ince kenarlık, stagger'lı öğeler */}
            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } } }}
              initial="hidden"
              animate="show"
              className="min-w-[248px] rounded-2xl border border-ink/[0.08] bg-white p-2 shadow-[0_24px_48px_-16px_rgba(14,14,14,0.22)]"
            >
              {item.children.map((c) => (
                <motion.div
                  key={c.href}
                  variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE } } }}
                >
                  <Link
                    href={c.href}
                    role="menuitem"
                    className="group/mi flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-[14.5px] font-medium text-ink/70 transition-colors duration-200 hover:bg-paper hover:text-ink focus-visible:bg-paper focus-visible:text-ink focus-visible:outline-none"
                  >
                    <span>{c.label}</span>
                    <ArrowRight
                      className="size-4 -translate-x-1 text-ink/40 opacity-0 transition-all duration-200 group-hover/mi:translate-x-0 group-hover/mi:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobil: alt menülü öğe → accordion.
function MobileNavGroup({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-ink/5">
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          onClick={onNavigate}
          className="flex-1 py-4 text-base font-medium text-ink transition-colors hover:text-brand"
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="grid size-10 place-items-center text-ink/60"
          aria-label={`${item.label} alt menüsünü ${expanded ? "kapat" : "aç"}`}
          aria-expanded={expanded}
        >
          <ChevronDown
            className={cn("size-5 transition-transform duration-300", expanded && "rotate-180")}
          />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {expanded && item.children && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden"
          >
            {item.children.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  onClick={onNavigate}
                  className="block py-2.5 pl-4 text-[15px] text-ink/70 transition-colors hover:text-brand"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const overlay = pathname === "/"; // ana sayfada hero var → header hero üstünde şeffaf başlar
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (overlay) {
      setScrolled(latest > 24);
    }

    // Aşağı kaydırınca gizlenir, yukarı kaydırınca gelir.
    if (latest > 120 && latest > previous) {
      setHidden(true);
      setOpen(false);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (!overlay) return;
    const raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    return () => cancelAnimationFrame(raf);
  }, [overlay]);

  // solid = beyaz zemin + koyu yazı. Overlay dışı sayfalar hep solid; hero'da scroll/menü açık → solid.
  const solid = !overlay || scrolled || open;
  const linkColor = solid ? "" : "text-white after:bg-white hover:text-white";
  const triggerColor = solid ? "text-ink hover:text-brand" : "text-white/90 hover:text-white";

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: EASE }}
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-500 ease-out-soft w-full",
        solid ? "border-ink/10 bg-white" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto grid h-20 max-w-[110rem] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 lg:px-8">
        <Wordmark solid={solid} />

        {/* himon: nav ortada, logodan ferah boşlukla — 16px / 500 / tight tracking / Geist */}
        <nav
          className="hidden items-center justify-center gap-7 lg:flex"
          aria-label="Ana menü"
        >
          {mainNav.map((item) =>
            item.children ? (
              <NavDropdown key={item.href} item={item} navColor={triggerColor} />
            ) : (
              <UnderlineLink
                key={item.href}
                href={item.href}
                className={cn("text-[16px] font-medium tracking-[-0.02em]", linkColor)}
              >
                {item.label}
              </UnderlineLink>
            ),
          )}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <QuoteButton
            solid={solid}
            className="hidden lg:inline-flex"
            style={{ "--afb-px": "1.7rem" } as CSSProperties}
          />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "grid size-10 place-items-center rounded-full border transition-colors duration-500 ease-out-soft lg:hidden",
              solid ? "border-ink/15 text-ink" : "border-white/30 text-white",
            )}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden border-t border-ink/10 bg-white lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col px-5" aria-label="Mobil menü">
              {mainNav.map((item) =>
                item.children ? (
                  <MobileNavGroup
                    key={item.href}
                    item={item}
                    onNavigate={() => setOpen(false)}
                  />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-ink/5 py-4 text-base font-medium text-ink transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <QuoteButton solid className="my-5 w-fit" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

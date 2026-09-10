"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNav, siteConfig } from "@/content/site";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { UnderlineLink } from "@/components/ui/underline-link";
import { cn } from "@/lib/utils";

// Orijinal logomuz. `solid`: hero üstünde beyaz zemin olunca logo siyaha (invert) dönüyor.
function Wordmark({ solid }: { solid: boolean }) {
  return (
    <Link href="/" className="flex items-center" aria-label={siteConfig.name}>
      <Image
        src="/logo_main.png"
        alt="Özdemir Makine Logo"
        width={240}
        height={74}
        className={cn(
          "object-contain h-9 lg:h-11 w-auto transition-all duration-500 ease-out-soft",
          solid ? "invert" : "invert-0"
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

export function Header() {
  const pathname = usePathname();
  const overlay = pathname === "/"; // ana sayfada hero var → header hero üstünde şeffaf başlar
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Şeffaf/beyaz zemin geçişi
    if (overlay) {
      setScrolled(latest > 24);
    }

    // Klasik premium scroll akışı: Aşağı kaydırınca gizlenir, yukarı kaydırınca gelir
    if (latest > 120 && latest > previous) {
      setHidden(true);
      setOpen(false); // gizlenirken mobil menüyü kapat
    } else {
      setHidden(false);
    }
  });

  // Sayfa yüklendiğinde mevcut scroll pozisyonunu al (rAF: setState'i effect gövdesi dışına al)
  useEffect(() => {
    if (!overlay) return;
    const raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    return () => cancelAnimationFrame(raf);
  }, [overlay]);

  // solid = beyaz zemin + koyu yazı. Overlay dışı sayfalar hep solid; hero'da scroll/menü açık → solid.
  const solid = !overlay || scrolled || open;
  const navColor = solid ? "" : "text-white after:bg-white hover:text-white";

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-500 ease-out-soft w-full",
        solid ? "border-ink/10 bg-white" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[104rem] items-center px-6 lg:px-10">
        <Wordmark solid={solid} />

        <nav
          className="ml-12 hidden items-center gap-6 lg:flex xl:ml-20"
          aria-label="Ana menü"
        >
          {mainNav.map((item) => (
            <UnderlineLink
              key={item.href}
              href={item.href}
              className={cn("text-[15px]", navColor)}
            >
              {item.label}
            </UnderlineLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
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

      {open && (
        <div className="border-t border-ink/10 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5" aria-label="Mobil menü">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/5 py-4 text-base font-medium text-ink transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
            <QuoteButton solid className="my-5 w-fit" />
          </nav>
        </div>
      )}
    </motion.header>
  );
}

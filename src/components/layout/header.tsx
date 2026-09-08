"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { mainNav, siteConfig } from "@/content/site";
import ArrowFillButton from "@/components/arrow-fill-button";

// Geçici wordmark — Talha gerçek logoyu atınca burası değişir (himon: siyah mark + wordmark).
function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={siteConfig.name}>
      <span className="grid size-8 place-items-center rounded-[7px] bg-ink text-white" aria-hidden>
        <span className="block size-3 rounded-[2px] border-2 border-current" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-ink">
        {siteConfig.wordmark.strong}
        <span className="ml-1 font-normal text-ink/40">{siteConfig.wordmark.light}</span>
      </span>
    </Link>
  );
}

// himon nav link: 16px/500, tracking -0.02em, soldan-sağa altı-çizili hover (::after scaleX).
const navLinkClass =
  "relative whitespace-nowrap py-1 text-[15px] font-medium tracking-[-0.01em] text-ink/90 transition-colors hover:text-ink " +
  "after:pointer-events-none after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] " +
  "after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform " +
  "after:duration-[550ms] after:ease-out-soft hover:after:scale-x-100";

// arrow-fill-button varsayılan boyutu zaten header ölçeği (~48px). Sadece renk + konum.
function QuoteButton({ className }: { className?: string }) {
  return (
    <ArrowFillButton
      href="/iletisim"
      btnText="Teklif Al"
      bgColor="#0e0e0e"
      textColor="#ffffff"
      fillBgColor="#ffffff"
      fillTextColor="#0e0e0e"
      className={className}
    />
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white">
      <div className="mx-auto flex h-20 max-w-[104rem] items-center gap-8 px-6 lg:px-12">
        <Wordmark />

        <nav
          className="hidden flex-1 items-center justify-center gap-7 lg:flex"
          aria-label="Ana menü"
        >
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3 lg:flex-none">
          <QuoteButton className="hidden lg:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink lg:hidden"
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
            <QuoteButton className="my-5 w-fit" />
          </nav>
        </div>
      )}
    </header>
  );
}

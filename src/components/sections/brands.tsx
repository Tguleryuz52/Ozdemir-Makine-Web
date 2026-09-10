"use client";

import Image from "next/image";

// Çıkartılan gerçek logolarımız (beyaz, saydam, premium versiyonları public/distributors içinde)
const DISTRIBUTORS = [
  { name: "ADGM", src: "/distributors/adgm.png", w: 140, h: 48 },
  { name: "DAYUAN", src: "/distributors/dayuan.png", w: 140, h: 48 },
  { name: "HPM", src: "/distributors/hpm.png", w: 120, h: 48 },
  { name: "HORDA", src: "/distributors/horda.png", w: 140, h: 48 },
  { name: "BEIJING RUNDA", src: "/distributors/runda.png", w: 120, h: 48 },
  { name: "GMB", src: "/distributors/gmb.png", w: 140, h: 48 },
  { name: "HUATAI", src: "/distributors/huatai.png", w: 140, h: 48 },
  { name: "OYANG", src: "/distributors/oyang.png", w: 140, h: 48 },
  { name: "KETCHVIEW", src: "/distributors/ketchview.png", w: 140, h: 48 },
];

export function Brands() {
  return (
    <section
      aria-label="Partner Markalar"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-ink py-16 lg:py-20"
    >
      {/* İnce üst/alt border */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/5" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/5" />

      {/* 21st-dev Brand Scroller Komponenti (Senin gönderdiğin CSS mimarisi ile) */}
      <div className="group flex overflow-hidden py-2 [--gap:4rem] [gap:var(--gap)] flex-row max-w-full [--duration:40s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_15%,rgba(0,_0,_0,_1)_85%,rgba(0,_0,_0,_0))]">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row"
              key={i}
            >
              {DISTRIBUTORS.map((item, idx) => (
                <div
                  key={`${item.name}-${idx}`}
                  className="flex items-center justify-center opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:scale-105"
                >
                  <div className="relative flex h-16 w-32 items-center justify-center lg:w-40">
                    <Image
                      src={item.src}
                      alt={`${item.name} Logo`}
                      width={item.w}
                      height={item.h}
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </section>
  );
}

export default Brands;

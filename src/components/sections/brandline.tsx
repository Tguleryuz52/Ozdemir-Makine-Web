"use client";

import Image from "next/image";

const DISTRIBUTORS = [
  { name: "ADGM", src: "/distributors/adgm.png", w: 90, h: 32 },
  { name: "DAYUAN", src: "/distributors/dayuan.png", w: 90, h: 32 },
  { name: "HPM", src: "/distributors/hpm.png", w: 80, h: 32 },
  { name: "HORDA", src: "/distributors/horda.png", w: 90, h: 32 },
  { name: "BEIJING RUNDA", src: "/distributors/runda.png", w: 80, h: 32 },
  { name: "GMB", src: "/distributors/gmb.png", w: 90, h: 32 },
  { name: "HUATAI", src: "/distributors/huatai.png", w: 90, h: 32 },
  { name: "OYANG", src: "/distributors/oyang.png", w: 90, h: 32 },
  { name: "KETCHVIEW", src: "/distributors/ketchview.png", w: 90, h: 32 },
];

export default function Brandline() {
  return (
    <section className="bg-white border-y border-ink/10 relative overflow-hidden">
      <div className="group flex py-6 [--gap:3rem] [gap:var(--gap)] flex-row max-w-full [--duration:40s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row"
              key={i}
            >
              {DISTRIBUTORS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center w-24 md:w-28 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                >
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={item.w}
                    height={item.h}
                    className="object-contain h-6 md:h-8 w-auto"
                  />
                </div>
              ))}
            </div>
          ))}
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";

const DISTRIBUTORS = [
  { name: "ADGM", src: "/distributors/01-DGM.svg", w: 140, h: 48, style: "h-9 md:h-11" },
  { name: "GMB", src: "/distributors/02-GMB-GUANGMING.svg", w: 140, h: 48, style: "h-9 md:h-11" },
  { name: "HPM", src: "/distributors/03-HPM.svg", w: 120, h: 48, style: "h-10 md:h-14" },
  { name: "OYANG", src: "/distributors/05-OYANG.svg", w: 140, h: 48, style: "h-11 md:h-14" },
  { name: "HUATAI", src: "/distributors/07-HUATAI.svg", w: 140, h: 48, style: "h-8 md:h-10" },
  { name: "KETCHVIEW", src: "/distributors/08-KETCHVIEW-SPM.svg", w: 140, h: 48, style: "h-9 md:h-11" },
  { name: "HORDA", src: "/distributors/04-HORDA.svg", w: 140, h: 48, style: "h-9 md:h-11" },
  { name: "DAYUAN", src: "/distributors/06-DAYUAN.svg", w: 140, h: 48, style: "h-10 md:h-12" },
  { name: "BEIJING RUNDA", src: "/distributors/09-RUNDA.svg", w: 120, h: 48, style: "h-12 md:h-16" },
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
                  className="flex items-center justify-center w-32 md:w-40 transition-transform duration-300 hover:scale-110"
                >
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={item.w}
                    height={item.h}
                    className={`object-contain w-auto ${item.style}`}
                  />
                </div>
              ))}
            </div>
          ))}
      </div>
    </section>
  );
}
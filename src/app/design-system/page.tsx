import { ArrowRight } from "lucide-react";

// GEÇİCİ — Faz 2 token doğrulama sayfası. Faz sonunda kaldırılır.

const swatches = [
  { name: "brand", cls: "bg-brand text-white", hex: "#0a509e" },
  { name: "brand-deep", cls: "bg-brand-deep text-white", hex: "#0e4193" },
  { name: "brand-bright", cls: "bg-brand-bright text-white", hex: "#0171b9" },
  { name: "ink", cls: "bg-ink text-paper", hex: "#0E0E0E" },
  { name: "paper", cls: "bg-paper text-ink border border-ink/10", hex: "#F2F0EC" },
  { name: "white", cls: "bg-white text-ink border border-ink/10", hex: "#FFFFFF" },
];

const typeScale = [
  { label: "display-xl", cls: "text-display-xl", sample: "PRECISION" },
  { label: "display-lg", cls: "text-display-lg", sample: "Makine çözümleri" },
  { label: "heading", cls: "text-heading", sample: "Öne çıkan makineler" },
  { label: "body-lg", cls: "text-lg", sample: "30 yıldır matbaa makineleri alım-satımı." },
  { label: "body", cls: "text-base", sample: "Sıfır ve ikinci el ofset baskı makineleri." },
  { label: "body-sm", cls: "text-sm", sample: "Kategori · Marka · Yıl" },
];

export default function DesignSystemPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-5 py-16 lg:px-8">
      <header>
        <p className="font-mono text-kicker uppercase text-ink/50">Design System</p>
        <h1 className="mt-3 text-display-lg text-ink">Token doğrulama</h1>
        <p className="mt-4 max-w-xl text-lg text-ink/60">
          himon dili + Özdemir mavisi. ui-ux-pro-max üç katmanlı token mimarisi.
        </p>
      </header>

      {/* Renk */}
      <section className="space-y-5">
        <p className="font-mono text-kicker uppercase text-ink/50">Renk</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {swatches.map((s) => (
            <div key={s.name} className={`flex h-28 flex-col justify-end rounded-card p-3 ${s.cls}`}>
              <span className="text-sm font-medium">{s.name}</span>
              <span className="font-mono text-xs opacity-70">{s.hex}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tipografi */}
      <section className="space-y-6">
        <p className="font-mono text-kicker uppercase text-ink/50">Tipografi — Geist</p>
        <div className="space-y-5">
          {typeScale.map((t) => (
            <div key={t.label} className="flex flex-col gap-1 border-b border-ink/10 pb-5">
              <span className="font-mono text-xs uppercase tracking-wider text-ink/40">{t.label}</span>
              <span className={`${t.cls} text-ink`}>{t.sample}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Buton */}
      <section className="space-y-5">
        <p className="font-mono text-kicker uppercase text-ink/50">Buton — Pill</p>
        <div className="flex flex-wrap items-center gap-4">
          <button className="group inline-flex items-center gap-2 rounded-full bg-brand py-2.5 pl-5 pr-2.5 text-sm font-medium text-white transition-colors duration-200 ease-out-soft hover:bg-brand-deep">
            Teklif Al
            <span className="grid size-7 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-ink py-2.5 px-5 text-sm font-medium text-paper transition-colors hover:bg-ink/80">
            İkincil (dark)
          </button>
          <button className="inline-flex items-center gap-2 rounded-full border border-ink/20 py-2.5 px-5 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand">
            Ghost
          </button>
        </div>
      </section>

      {/* Radius + motion */}
      <section className="space-y-5">
        <p className="font-mono text-kicker uppercase text-ink/50">Radius & Motion</p>
        <div className="flex flex-wrap gap-4">
          <div className="grid h-24 w-40 place-items-center rounded-card bg-paper text-sm text-ink/70">
            rounded-card (20px)
          </div>
          <div className="grid h-24 w-40 place-items-center rounded-full bg-paper text-sm text-ink/70">
            pill
          </div>
          <div className="grid h-24 flex-1 place-items-center rounded-card bg-ink text-sm text-paper/70">
            ease-out-soft · dur 200/400/700ms
          </div>
        </div>
      </section>
    </div>
  );
}

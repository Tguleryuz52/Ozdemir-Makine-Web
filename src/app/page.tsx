import { Hero } from "@/components/sections/hero";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* GEÇİCİ — hero altı bölümler (Faz 4 devamı) gelene kadar scroll + header solid geçişi için. */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[104rem] px-6 py-24 lg:px-10 lg:py-32">
          <p className="font-mono text-kicker uppercase text-ink/50">Sırada</p>
          <h2 className="mt-4 max-w-2xl text-heading text-ink">
            Hero hazır. Split-istatistik, servis kartları ve süreç bölümleri
            sırada.
          </h2>
        </div>
      </section>
    </>
  );
}

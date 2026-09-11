import { aboutContent } from "@/content/site";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

// himon "/about-us" uyarlaması — kısa, 5 bölüm. Server bileşen, içerik site.ts'ten.
// Görsel slotları MediaFrame ile: src boşken placeholder, Talha src verince next/image.

const container = "mx-auto max-w-[104rem] px-6 lg:px-10";
const kickerCls =
  "font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-brand";

export function AboutSection() {
  const { kicker, heading, lead, heroImage, story, founder, values, offices } =
    aboutContent;

  return (
    <>
      {/* 1 — Başlık + full-bleed görsel şeridi (kompakt bant, kenardan kenara) */}
      <section className="bg-white">
        <div className={`${container} pt-[calc(var(--spacing-section)+3rem)]`}>
          <Reveal>
            <p className={kickerCls}>{kicker}</p>
            <h1 className="mt-4 max-w-[18ch] text-display-xl uppercase text-ink">
              {heading}
            </h1>
            <p className="mt-6 max-w-2xl text-[18px] leading-relaxed tracking-[-0.01em] text-ink/60">
              {lead}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mt-10 lg:mt-14">
          <MediaFrame
            src={heroImage || undefined}
            alt="Özdemir Makine showroom"
            label="Özdemir Makine"
            className="aspect-[3/2] w-full sm:aspect-[21/9] lg:aspect-[16/5]"
            rounded={false}
            sizes="100vw"
            priority
          />
        </Reveal>
      </section>

      {/* 2 — Firma hikayesi (split) + görsel galerisi */}
      <section className="bg-white">
        <div className={`${container} py-[var(--spacing-section)]`}>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Reveal>
              <h2 className="text-display-lg text-balance text-ink">{story.statement}</h2>
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col gap-5">
              {story.paragraphs.map((p, i) => (
                <p key={i} className="text-[17px] leading-relaxed text-ink/70">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {story.gallery.map((src, i) => (
              <RevealItem key={i}>
                <MediaFrame
                  src={src || undefined}
                  alt={`Özdemir Makine görsel ${i + 1}`}
                  label={`Görsel ${i + 1}`}
                  className="aspect-[4/3]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 3 — Kurucu (Murat Özdemir) */}
      <section className="border-y border-ink/10 bg-paper/50">
        <div className={`${container} py-[var(--spacing-section)]`}>
          <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <Reveal>
              <MediaFrame
                src={founder.image || undefined}
                alt={founder.name}
                label={founder.name}
                className="aspect-[4/5] w-full max-w-md"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <p className={kickerCls}>{founder.kicker}</p>
              <h2 className="mt-4 text-display-lg text-ink">{founder.name}</h2>
              <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.06em] text-ink/50">
                {founder.role}
              </p>
              <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-ink/70">
                {founder.bio}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 — Vizyon & Misyon */}
      <section className="bg-white">
        <div className={`${container} py-[var(--spacing-section)]`}>
          <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
            {values.map((v) => (
              <Reveal key={v.title} className="border-t border-ink/15 pt-8">
                <h3 className="text-heading text-ink">{v.title}</h3>
                <p className="mt-4 text-[17px] leading-relaxed text-ink/70">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Ofisler & Tesisler (Özdemir'e özgü güven öğesi; footer CTA kapatır) */}
      <section className="bg-white">
        <div className={`${container} pb-[var(--spacing-section)]`}>
          <Reveal>
            <p className={kickerCls}>{offices.kicker}</p>
            <h2 className="mt-4 max-w-[20ch] text-display-lg text-ink">{offices.title}</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offices.items.map((o) => (
              <RevealItem key={o.city}>
                <div className="h-full rounded-[var(--radius-card)] border border-ink/10 bg-paper/40 p-6 transition-colors duration-300 hover:border-brand/40">
                  <p className="font-mono text-[12px] font-medium uppercase tracking-[0.06em] text-brand">
                    {o.role}
                  </p>
                  <p className="mt-2 text-[19px] font-medium tracking-[-0.01em] text-ink">
                    {o.city}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}

export default AboutSection;

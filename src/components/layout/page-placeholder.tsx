import ArrowFillButton from "@/components/ui/arrow-fill-button";

// Henüz içeriği yapılmamış rotalar için geçici, on-marka sayfa (header 404 vermesin).
// Her sayfa gerçek içerikle değiştikçe bu placeholder düşer.
export function PagePlaceholder({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto flex min-h-[70vh] max-w-[104rem] flex-col items-start justify-center px-6 py-[var(--spacing-section)] lg:px-10">
        <p className="font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-ink/50">
          {kicker}
        </p>
        <h1 className="mt-4 max-w-[16ch] text-display-lg text-ink">{title}</h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed tracking-[-0.01em] text-ink/60">
          {description}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <ArrowFillButton
            href="/iletisim"
            btnText="Bize Ulaşın"
            bgColor="#0e0e0e"
            textColor="#ffffff"
            fillBgColor="#0a509e"
            fillTextColor="#ffffff"
          />
          <ArrowFillButton
            href="/makineler"
            btnText="Makineleri İncele"
            bgColor="#ffffff"
            textColor="#0e0e0e"
            fillBgColor="#0e0e0e"
            fillTextColor="#ffffff"
          />
        </div>
      </div>
    </section>
  );
}

export default PagePlaceholder;

import Link from "next/link";
import { ContactForm } from "@/components/ui/contact-form";
import { CampaignCard } from "@/components/ui/campaign-card";
import { contactContent } from "@/content/site";
import type { MachineDoc } from "@/sanity/lib/machines";
import type { Campaign } from "@/content/campaigns";
import { getSiteSettings } from "@/sanity/lib/settings";

// himon "/contact" (TALK WITH US) uyarlaması — server bileşen, veriyi prop/import ile alır.
// Düzen: tam-genişlik dev başlık + ayraç → sol iletişim bilgileri / sağ form (himon 2 kolon split).
// Teklif akışında (machine varsa) başlık değişir + form üstünde makine bağlam kartı çıkar.

// Üst bölüm kicker'ı: mono (marka aksanı, "İLETİŞİM").
const kickerCls =
  "font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-ink/55";
// Detay/bağlam etiketleri: yumuşak Sans (himon — mono değil, premium his).
const detailLabelCls =
  "text-[12px] font-medium uppercase tracking-[0.06em] text-ink/55";

export interface ContactSectionProps {
  machine?: MachineDoc;
  campaign?: Campaign;
}

export async function ContactSection({ machine, campaign }: ContactSectionProps) {
  const { kicker, heading, quoteHeading, lead, detailsHeading, form } =
    contactContent;
  const s = await getSiteSettings();
  const details = [
    { label: "E-posta & Destek", value: s.email, href: `mailto:${s.email}` },
    { label: "Telefon", value: s.phoneLabel, href: s.phoneHref },
    { label: "Ofis — Türkiye", value: s.addressTR, href: "" },
    { label: "Ofis — Almanya", value: s.addressDE, href: "" },
  ];
  const isQuote = Boolean(machine);
  const isCampaign = Boolean(campaign);
  // Kampanya modunda başlık/kicker DEĞİŞMEZ — sadece form üstünde küçük bağlam kartı çıkar
  // (makine akışıyla aynı disiplin). Kullanıcı hangi kampanya için başvurduğunu kart üzerinden anlar.
  const activeKicker = kicker;
  const activeHeading = isQuote ? quoteHeading : heading;
  const prefill = campaign
    ? `Merhaba, ${campaign.title} için başvurumu iletmek istiyorum. Bilgilerimi bırakıyorum, benimle iletişime geçebilirsiniz.`
    : machine
      ? `Merhaba, ${machine.title}${machine.productCode ? ` (${machine.productCode})` : ""} hakkında fiyat teklifi almak istiyorum. Lütfen benimle iletişime geçin.`
      : "";
  const leadSource = campaign
    ? `Website — ${campaign.title}`
    : isQuote
      ? "Website — Makine Teklifi"
      : "Website — İletişim";

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[104rem] px-6 pb-[var(--spacing-section)] pt-[calc(var(--spacing-section)+3rem)] lg:px-10">
        {/* Başlık bloğu */}
        <p className={kickerCls}>{activeKicker}</p>
        <h1 className="mt-4 max-w-[14ch] text-display-xl uppercase text-ink">
          {activeHeading}
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed tracking-[-0.01em] text-ink/60">
          {lead}
        </p>

        <div className="mt-12 h-px w-full bg-ink/10" />

        {/* İki kolon: sol bilgiler / sağ form */}
        <div className="mt-14 grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
          {/* Sol — İletişim bilgileri */}
          <div>
            <h2 className="text-heading font-medium tracking-tight text-ink">
              {detailsHeading}
            </h2>
            <dl className="mt-8 flex flex-col gap-7">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className={detailLabelCls}>{d.label}</dt>
                  <dd className="mt-2.5">
                    {d.href ? (
                      <a
                        href={d.href}
                        className="text-[19px] font-medium tracking-[-0.01em] text-ink underline-offset-4 transition-colors hover:text-brand focus-visible:underline focus-visible:outline-none"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="max-w-[22rem] text-[16px] leading-relaxed text-ink/65">
                        {d.value}
                      </p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Sağ — form (+ kampanya kartı VEYA makine bağlam kartı) */}
          <div>
            {campaign && <CampaignCard campaign={campaign} />}
            {!campaign && machine && (
              <div className="mb-8 flex items-center gap-4 rounded-2xl border border-ink/10 bg-paper/60 p-4">
                <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand/15 to-ink/10">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-wide text-brand">
                    {machine.brand.slice(0, 3)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className={detailLabelCls}>{form.machineContextNote}</p>
                  <p className="mt-1 truncate text-[16px] font-medium tracking-tight text-ink">
                    {machine.title}
                  </p>
                  <Link
                    href={`/makineler/${machine.slug}`}
                    className="mt-0.5 inline-block text-[13px] text-ink/50 underline-offset-2 hover:text-brand hover:underline"
                  >
                    Makineyi görüntüle
                  </Link>
                </div>
              </div>
            )}
            <ContactForm
              prefillMessage={prefill}
              machineCode={machine?.productCode || ""}
              machineSlug={machine?.slug || ""}
              machineTitle={machine?.title || ""}
              leadSource={leadSource}
              submitLabel={campaign?.cta}
              isQuote={isQuote || isCampaign}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

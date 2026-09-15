import Image from "next/image";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { UnderlineLink } from "@/components/ui/underline-link";
import { siteMapNav, footerContent } from "@/content/site";
import { getSiteSettings } from "@/sanity/lib/settings";

// himon footer deseni: CTA + 4 kolonlu grid (Site Haritası 2 kolon geniş + iç 2 sütun,
// İletişim, Sosyal) + legal. Alttaki dev wordmark YOK (logo gelince oraya).
// Zemin #1C1C1C, kicker mono grisi, sıkı satır ritmi (himon: link adımı ~23px).

const kickerClass =
  "font-mono text-[13px] font-bold uppercase tracking-wide text-white/55";
const linkClass =
  "py-0 text-[15px] leading-[1.35] text-white/85 hover:text-white after:bg-white";

function Column({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <p className={kickerClass}>{label}</p>
      <div className="flex flex-col items-start gap-1">{children}</div>
    </div>
  );
}

export async function Footer() {
  const s = await getSiteSettings();
  return (
    <footer className="bg-[linear-gradient(180deg,#0e4193_0%,#08203f_100%)] text-white">
      <div className="mx-auto max-w-[104rem] px-6 lg:px-10">
        {/* CTA */}
        <div className="flex flex-col gap-10 border-b border-white/10 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-24">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.04em] text-balance">
              {footerContent.ctaTitle}
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed tracking-[-0.02em] text-white/70">
              {footerContent.ctaText}
            </p>
          </div>
          <ArrowFillButton
            href={footerContent.ctaButton.href}
            btnText={footerContent.ctaButton.label}
            bgColor="#0e0e0e"
            textColor="#ffffff"
            fillBgColor="#0e4193"
            fillTextColor="#ffffff"
          />
        </div>

        {/* Kolonlar — himon grid: sitemap geniş (2 kolon + iç 2 sütun), iletişim, sosyal */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
          {/* Site Haritası — 2 kolon genişlik, iç 2 sütun */}
          <div className="flex min-w-0 flex-col gap-3 lg:col-span-2">
            <p className={kickerClass}>Site Haritası</p>
            <div className="flex flex-col items-start gap-1.5">
              {siteMapNav.map((i) => (
                <UnderlineLink key={i.href} href={i.href} className={linkClass}>
                  {i.label}
                </UnderlineLink>
              ))}
            </div>
          </div>

          {/* İletişim — E-posta / Telefon / Adres alt alta */}
          <div className="flex flex-col gap-6">
            <Column label="E-posta">
              <a href={`mailto:${s.email}`} className={`${linkClass} break-all`}>
                {s.email}
              </a>
            </Column>

            <Column label="Telefon">
              <a href={s.phoneHref} className={linkClass}>
                {s.phoneLabel}
              </a>
            </Column>

            <Column label="Adres">
              <p className="max-w-[16rem] text-[15px] leading-[1.4] text-white/60">
                {s.addressTR}
              </p>
            </Column>
          </div>

          {/* Sosyal */}
          <Column label="Sosyal">
            {s.social.map((sl) => (
              <UnderlineLink
                key={sl.href}
                href={sl.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {sl.label}
              </UnderlineLink>
            ))}
          </Column>
        </div>

        {/* Legal — logo imzası solda, telif sağda */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <Image
            src="/logo_main.png"
            alt="Özdemir Makine"
            width={980}
            height={247}
            className="h-12 w-auto object-contain brightness-0 invert sm:h-14"
          />
          <p className="text-[13px] text-white/50">{footerContent.legal}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

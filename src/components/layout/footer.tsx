import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { UnderlineLink } from "@/components/ui/underline-link";
import {
  siteConfig,
  socialLinks,
  siteMapNav,
  footerContent,
} from "@/content/site";

// himon footer deseni: CTA + 4 kolonlu grid (Site Haritası 2 kolon geniş + iç 2 sütun,
// İletişim, Sosyal) + legal. Alttaki dev wordmark YOK (logo gelince oraya).
// Zemin #1C1C1C, kicker mono grisi, sıkı satır ritmi (himon: link adımı ~23px).

const kickerClass =
  "font-mono text-[13px] font-bold uppercase tracking-wide text-footer-muted";
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

export function Footer() {
  return (
    <footer className="bg-footer-bg text-white">
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
            bgColor="#ffffff"
            textColor="#0e0e0e"
            fillBgColor="#234d9c"
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
              <a
                href={`mailto:${siteConfig.email}`}
                className={`${linkClass} break-all`}
              >
                {siteConfig.email}
              </a>
            </Column>

            <Column label="Telefon">
              <a href={siteConfig.phone.href} className={linkClass}>
                {siteConfig.phone.label}
              </a>
            </Column>

            <Column label="Adres">
              <p className="max-w-[16rem] text-[15px] leading-[1.4] text-white/60">
                {siteConfig.address.tr}
              </p>
            </Column>
          </div>

          {/* Sosyal */}
          <Column label="Sosyal">
            {socialLinks.map((s) => (
              <UnderlineLink
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {s.label}
              </UnderlineLink>
            ))}
          </Column>
        </div>

        {/* Legal */}
        <div className="border-t border-white/10 py-8">
          <p className="text-[13px] text-white/50">{footerContent.legal}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

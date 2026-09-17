import Image from "next/image";
import ArrowFillButton from "@/components/ui/arrow-fill-button";
import { UnderlineLink } from "@/components/ui/underline-link";
import { siteMapNav, footerContent } from "@/content/site";
import { getSiteSettings } from "@/sanity/lib/settings";

// himon footer deseni: CTA + 4 kolonlu grid (Site Haritası 2 kolon geniş + iç 2 sütun,
// İletişim, Sosyal) + legal. Alttaki dev wordmark YOK (logo gelince oraya).
// Zemin #1C1C1C, kicker mono grisi, sıkı satır ritmi (himon: link adımı ~23px).

const linkClass =
  "py-0 text-[15px] leading-[1.35] text-white/85 hover:text-white after:bg-white";

// Premium bölüm etiketi — eski mono/gri "basit" görünüm yerine Geist Sans semibold + geniş tracking
// + başında marka-mavisi çubuk (Talha 2026-09-17: "daha ayrıştırıcı, premium bir font").
function FooterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 text-[12.5px] font-semibold uppercase tracking-[0.2em] text-white/75">
      <span aria-hidden className="h-[3px] w-4 rounded-full bg-brand-bright" />
      {children}
    </p>
  );
}

// Sosyal etiketi → marka ikonu. lucide artık marka/sosyal ikonları içermiyor (trademark) →
// inline SVG (simple-icons path'leri), fill=currentColor. İsim yerine ikon (Talha isteği).
const SOCIAL_PATHS: { match: string; d: string }[] = [
  {
    match: "face",
    d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    match: "insta",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    match: "you",
    d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    match: "linked",
    d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    match: "twit",
    d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zm-1.161 19.5h2.039L6.486 3.24H4.298l13.442 17.413z",
  },
  {
    match: "x",
    d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zm-1.161 19.5h2.039L6.486 3.24H4.298l13.442 17.413z",
  },
];
function SocialGlyph({ label }: { label: string }) {
  const l = label.toLowerCase();
  const item = SOCIAL_PATHS.find((s) => l.includes(s.match)) ?? SOCIAL_PATHS[4];
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
      <path d={item.d} />
    </svg>
  );
}

function Column({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3.5">
      <FooterLabel>{label}</FooterLabel>
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
            <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.04em] text-balance">
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
          <div className="flex min-w-0 flex-col gap-3.5 lg:col-span-2">
            <FooterLabel>Site Haritası</FooterLabel>
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

          {/* Sosyal — isim yerine ikon satırı */}
          <div className="flex min-w-0 flex-col gap-3.5">
            <FooterLabel>Sosyal</FooterLabel>
            <div className="flex flex-wrap gap-2.5">
              {s.social.map((sl) => (
                <a
                  key={sl.href}
                  href={sl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sl.label}
                  className="grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright"
                >
                  <SocialGlyph label={sl.label} />
                </a>
              ))}
            </div>
          </div>
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

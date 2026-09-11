import { client } from "./client";
import { siteConfig, socialLinks } from "@/content/site";

// Site Ayarları singleton'ı → footer + iletişim sayfası besler.
// Her alan boşsa koddaki statik değere düşer → site asla eksik görünmez.

export type SocialLink = { label: string; href: string };
export type SiteSettings = {
  email: string;
  phoneLabel: string;
  phoneHref: string;
  whatsapp: string; // "" → yok
  addressTR: string;
  addressDE: string;
  social: SocialLink[];
};

const cacheOpts = { next: { revalidate: 60, tags: ["settings"] } };

type RawSettings = {
  email?: string;
  telefon?: string;
  whatsapp?: string;
  adresTR?: string;
  adresDE?: string;
  sosyal?: { ad?: string; url?: string }[];
} | null;

function telHref(label: string): string {
  const digits = label.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const s = await client.fetch<RawSettings>(
    `*[_type == "siteSettings"][0]{ email, telefon, whatsapp, adresTR, adresDE, sosyal }`,
    {},
    cacheOpts,
  );

  const social = (s?.sosyal ?? [])
    .filter((x): x is { ad: string; url: string } => Boolean(x?.ad && x?.url))
    .map((x) => ({ label: x.ad, href: x.url }));

  return {
    email: s?.email || siteConfig.email,
    phoneLabel: s?.telefon || siteConfig.phone.label,
    phoneHref: s?.telefon ? telHref(s.telefon) : siteConfig.phone.href,
    whatsapp: s?.whatsapp || "",
    addressTR: s?.adresTR || siteConfig.address.tr,
    addressDE: s?.adresDE || siteConfig.address.de,
    social: social.length ? social : socialLinks.map((l) => ({ label: l.label, href: l.href })),
  };
}

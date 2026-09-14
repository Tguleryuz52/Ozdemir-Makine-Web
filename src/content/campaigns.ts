// Kampanya kataloğu — Avrasya Fuarı, Drupa vb. Her yeni kampanya için tek satır.
// URL: /iletisim?kampanya=<slug> → form üstünde büyük renkli kart + leadSource "Website — <title>"
// Zoho Campaigns mail butonu için önerilen URL:
//   https://ozdemirmakine.com.tr/iletisim?kampanya=<slug>&utm_campaign=<slug>

export type Campaign = {
  slug: string;
  title: string;
  ikon: string; // Emoji — kartın üst köşesinde
  tarih?: string; // "15-18 Ekim 2024 · İstanbul"
  aciklama: string;
  cta?: string; // Buton metni override
};

export const campaigns: readonly Campaign[] = [
  {
    slug: "avrasya-fuari-2024",
    title: "Avrasya Ambalaj Fuarı 2024",
    ikon: "🎪",
    tarih: "15-18 Ekim 2024 · İstanbul TÜYAP",
    aciklama:
      "Standımızı ziyaret için başvurunuzu bırakın. Fuar boyunca özel gösterimler ve teknoloji söyleşileri düzenleyeceğiz.",
    cta: "Başvurumu Gönder",
  },
  {
    slug: "drupa-2024",
    title: "drupa 2024",
    ikon: "🌍",
    tarih: "28 Mayıs - 7 Haziran 2024 · Düsseldorf",
    aciklama:
      "Almanya ofisimizde sizi ağırlamaktan mutluluk duyarız. Randevu için bilgilerinizi bırakın.",
    cta: "Randevu Talep Et",
  },
] as const;

export function findCampaign(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}

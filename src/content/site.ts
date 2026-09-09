// Site geneli içerik — kaynak: canlı ozdemirmakine.com.tr (zip kilitli).
// Bileşenler bu tipli veriyi prop/import ile alır; JSX'e gömülmez.

export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Özdemir Makine",
  wordmark: { strong: "ÖZDEMİR", light: "MAKİNE" },
  tagline: "İkinci El & Sıfır Matbaa Makineleri",
  email: "info@ozdemirmakine.com.tr",
  phone: {
    label: "+90 212 544 63 46",
    href: "tel:+902125446346",
  },
  address: {
    tr: "Davutpaşa Cad. Salhane Sok. No: 3, Topkapı / Zeytinburnu, 34010 İstanbul",
    de: "Özdemir Machinery Trading GmbH, Uerdinger Str. 125, 47799 Krefeld, DE",
  },
} as const;

// himon 6 nav item — "Galeri" header'dan çıkarıldı (footer'da kalacak).
export const mainNav: NavItem[] = [
  { label: "Kurumsal", href: "/kurumsal" },
  { label: "Sıfır Makineler", href: "/sifir-makineler" },
  { label: "İkinci El Makineler", href: "/ikinci-el-makineler" },
  { label: "Yedek Parçalar", href: "/yedek-parcalar" },
  { label: "İletişim", href: "/iletisim" },
];

export const socialLinks: NavItem[] = [
  { label: "Facebook", href: "https://www.facebook.com/ozdemirmakinetr/" },
  { label: "X", href: "https://www.twitter.com/OZDMachineryTR/" },
  { label: "Instagram", href: "https://www.instagram.com/ozdemirmakinetr/" },
  { label: "YouTube", href: "https://www.youtube.com/ozdemirmakine" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ozdemirmakinetr/" },
];


// Hero — himon 1. bölüm kalıbı, Özdemir'e uyarlandı. Metin JSX'e gömülmez.
// kicker + headline'daki "\n" bilinçli satır kırılımıdır (whitespace-pre-line ile render).
// image: gerçek foto gelince doldurulacak (şimdilik gradient placeholder).
export const heroContent = {
  kicker: "SIFIR & İKİNCİ EL\nMATBAA MAKİNELERİ",
  headline: "MATBAA\nMAKİNELERİNDE\nDOĞRU ADRES.",
  cta: { label: "Teklif Al", href: "/iletisim" },
  body: "20+ yıllık tecrübeyle sıfır ve ikinci el matbaa makineleri, yedek parça ve teknik destek. Türkiye ve Almanya ofisleriyle uçtan uca güvenilir tedarik.",
  image: "", // TODO: gerçek hero fotoğrafı (matbaa/ambalaj makinesi) — gelince next/image fill
} as const;

// Footer — himon deseni (sade). Metinler burada, JSX'e gömülmez.
export const footerContent = {
  ctaTitle: "Doğru makineyi birlikte bulalım.",
  ctaText:
    "Sıfır ve ikinci el matbaa makineleri, yedek parça ve teknik destek. İhtiyacınızı iletin, size en uygun çözümü sunalım.",
  ctaButton: { label: "Teklif Al", href: "/iletisim" },
  legal: "© 2026 Özdemir Makine. Tüm hakları saklıdır.",
} as const;

// Footer site haritası = ana menü + Galeri (header'dan çıkarılmıştı).
export const siteMapNav: NavItem[] = [
  ...mainNav,
  { label: "Galeri", href: "/galeri" },
];

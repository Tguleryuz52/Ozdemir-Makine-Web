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

// Introduction (hero-altı) — himon 2. kalıp "split-istatistik", Özdemir'e uyarlandı.
// stats: scroll'da count-up animasyonlu. DOĞRULANMIŞ: 20+ yıl (metadata), 2 ülke (TR+DE adres).
// DOĞRULA işaretli sayılar tahminî — arşiv/gerçek veri gelince güncelle.
export const introContent = {
  // Üstte ortalı büyük cümle-başlık (himon sentence-case h2)
  heading:
    "Tedarikten kurulumuna, matbaanızın her aşamasında kesintisiz çözüm sunuyoruz.",
  // Sağ kolon üstü paragraf
  body: "Sıfır ve ikinci el matbaa makinelerinde 20+ yıllık tecrübe. Doğru makine seçiminden montaja, yedek parçadan teknik servise kadar tüm süreci tek elden yönetiyoruz.",
  cta: { label: "Hakkımızda", href: "/kurumsal" },
  image: "", // TODO: gerçek KARE makine/showroom fotoğrafı (himon: keskin köşe) → next/image fill
  // himon deseni: büyük sayı + açıklama cümlesi (count-up yok, statik). DOĞRULA notluları tahminî.
  stats: [
    {
      num: "20+",
      desc: "Yıldır sıfır ve ikinci el matbaa makineleri alım-satımı, yedek parça ve teknik servis.",
    },
    {
      num: "TR & DE",
      desc: "Türkiye ve Almanya ofisleriyle Avrupa'dan Anadolu'ya güvenilir tedarik ve lojistik.",
    },
    {
      num: "1000+",
      desc: "m² kapalı depo ve showroom'da sevkiyata hazır makine stoğu.", // DOĞRULA
    },
  ],
} as const;

// Services — himon canlı kalıbı: master-detail hover.
// Sol master-list: 01..05 num + servis adı (hover → aktif siyah, diğerleri muted).
// Sağ detail: aktif servisin görseli + açıklama + CTA (hover değişince cross-fade).
// image: gerçek foto gelene kadar farklı gradient placeholder — services.tsx içindeki
// GRADIENTS haritasına num ile eşlenir. Fotolar gelince image alanı doldurulur, gradient düşer.
export type ServiceItem = {
  num: string; // "01"..
  title: string;
  body: string;
  href: string;
  ctaLabel: string;
  image: string; // TODO: gerçek servis fotosu — boşsa gradient placeholder
};

export const servicesContent: {
  kicker: string;
  count: string;
  items: ServiceItem[];
} = {
  kicker: "Hizmetler",
  count: "(05)",
  items: [
    {
      num: "01",
      title: "Sıfır Makine",
      body: "Avrupa menşeli üreticilerden orijinal sıfır ofset, dijital ve baskı sonrası makinelerini garantili tedarik ediyoruz.",
      href: "/sifir-makineler",
      ctaLabel: "Sıfır Makine Kataloğu",
      image: "",
    },
    {
      num: "02",
      title: "İkinci El Alım-Satım",
      body: "Kontrollü, revize edilmiş ikinci el matbaa makinelerini alıyor, satıyor ve ihtiyaca göre eşleştiriyoruz.",
      href: "/ikinci-el-makineler",
      ctaLabel: "İkinci El Katalog",
      image: "",
    },
    {
      num: "03",
      title: "Yedek Parça",
      body: "Heidelberg, Komori, Man Roland ve daha fazlası için orijinal ve muadil yedek parça, hızlı sevkiyat.",
      href: "/yedek-parcalar",
      ctaLabel: "Parça Kataloğu",
      image: "",
    },
    {
      num: "04",
      title: "Montaj & Devreye Alma",
      body: "Sökümden kuruluma, elektrik-mekanik bağlantıdan devreye almaya kadar deneyimli ekiple uçtan uca proje yönetimi.",
      href: "/hizmetler/montaj",
      ctaLabel: "Süreci Gör",
      image: "",
    },
    {
      num: "05",
      title: "Gümrük & Lojistik",
      body: "Yurt dışı tedarikte gümrük, taşıma sigortası ve nakliye organizasyonu — makine kapınıza sorunsuz teslim.",
      href: "/hizmetler/lojistik",
      ctaLabel: "Detayları Gör",
      image: "",
    },
  ],
};

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

// Öne Çıkan Makineler (Vitrin) — Ana Sayfa için mock veri. 
// Sanity CMS geçişinde bu veri yapısı `machine` şemasına birebir uyumlu olacak.
export type Machine = {
  id: string;
  brand: string;
  model: string;
  year: number;
  condition: "Sıfır" | "2. El";
  price?: string;
  priceOnRequest: boolean;
  image: string; // TODO: gerçek fotoğraf url'si
  href: string;
};

export const featuredMachinesContent = {
  kicker: "Vitrin",
  title: "Öne Çıkan Makineler",
  cta: { label: "Tüm Kataloğu İncele", href: "/makineler" },
  items: [
    {
      id: "m1",
      brand: "Heidelberg",
      model: "Speedmaster CX 104-5+L",
      year: 2023,
      condition: "Sıfır",
      priceOnRequest: true,
      image: "",
      href: "/makineler/heidelberg-cx104",
    },
    {
      id: "m2",
      brand: "Komori",
      model: "Lithrone G40",
      year: 2015,
      condition: "2. El",
      price: "€240,000",
      priceOnRequest: false,
      image: "",
      href: "/makineler/komori-g40",
    },
    {
      id: "m3",
      brand: "Man Roland",
      model: "705 3B",
      year: 2008,
      condition: "2. El",
      priceOnRequest: true,
      image: "",
      href: "/makineler/man-roland-705",
    },
    {
      id: "m4",
      brand: "Bobst",
      model: "Novacut 106 ER",
      year: 2020,
      condition: "2. El",
      priceOnRequest: true,
      image: "",
      href: "/makineler/bobst-novacut-106",
    },
  ] as Machine[],
};

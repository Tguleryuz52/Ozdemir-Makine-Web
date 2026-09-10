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

// İletişim / Teklif sayfası — himon "/contact" (TALK WITH US) uyarlaması.
// Tek form iki yüzeyde: (a) /iletisim genel, (b) /iletisim?makine=<productCode> teklif (prefill + gizli Zoho alanı).
// Metin JSX'e gömülmez. Gizli alanlar (makineKodu/leadSource/kampanya) Zoho CRM web formuna bağlanacak —
// gerekçe CONTENT-INVENTORY: eski projede lead kaynağı/kampanya boş geliyordu, burada baştan doldurulur.
export const contactContent = {
  kicker: "İletişim",
  heading: "BİZE ULAŞIN", // genel varsayılan (himon: TALK WITH US)
  quoteHeading: "FİYAT TEKLİFİ ALIN", // ?makine=... ile gelindiğinde
  lead: "Doğru makineyi birlikte belirleyelim. Talebinizi iletin, ekibimiz en kısa sürede size özel çözümle dönsün.",
  detailsHeading: "İletişim Bilgileri",
  details: [
    { label: "E-posta & Destek", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { label: "Telefon", value: siteConfig.phone.label, href: siteConfig.phone.href },
    { label: "Ofis — Türkiye", value: siteConfig.address.tr, href: "" },
    { label: "Ofis — Almanya", value: siteConfig.address.de, href: "" },
  ],
  // Telefon ülke kodu — TR öncelikli, ihracat müşterileri için AB + majör pazarlar.
  phoneCountries: [
    { code: "TR", dial: "+90", flag: "🇹🇷", name: "Türkiye" },
    { code: "DE", dial: "+49", flag: "🇩🇪", name: "Almanya" },
    { code: "GB", dial: "+44", flag: "🇬🇧", name: "Birleşik Krallık" },
    { code: "NL", dial: "+31", flag: "🇳🇱", name: "Hollanda" },
    { code: "FR", dial: "+33", flag: "🇫🇷", name: "Fransa" },
    { code: "IT", dial: "+39", flag: "🇮🇹", name: "İtalya" },
    { code: "ES", dial: "+34", flag: "🇪🇸", name: "İspanya" },
    { code: "BE", dial: "+32", flag: "🇧🇪", name: "Belçika" },
    { code: "AT", dial: "+43", flag: "🇦🇹", name: "Avusturya" },
    { code: "CH", dial: "+41", flag: "🇨🇭", name: "İsviçre" },
    { code: "PL", dial: "+48", flag: "🇵🇱", name: "Polonya" },
    { code: "RU", dial: "+7", flag: "🇷🇺", name: "Rusya" },
    { code: "UA", dial: "+380", flag: "🇺🇦", name: "Ukrayna" },
    { code: "US", dial: "+1", flag: "🇺🇸", name: "ABD / Kanada" },
    { code: "AE", dial: "+971", flag: "🇦🇪", name: "BAE" },
    { code: "SA", dial: "+966", flag: "🇸🇦", name: "S. Arabistan" },
    { code: "QA", dial: "+974", flag: "🇶🇦", name: "Katar" },
    { code: "EG", dial: "+20", flag: "🇪🇬", name: "Mısır" },
    { code: "IR", dial: "+98", flag: "🇮🇷", name: "İran" },
    { code: "IQ", dial: "+964", flag: "🇮🇶", name: "Irak" },
    { code: "AZ", dial: "+994", flag: "🇦🇿", name: "Azerbaycan" },
    { code: "IN", dial: "+91", flag: "🇮🇳", name: "Hindistan" },
    { code: "OTHER", dial: "+", flag: "🌐", name: "Diğer" },
  ],
  form: {
    fields: {
      firstName: { label: "Adınız", placeholder: "Adınız", required: true },
      lastName: { label: "Soyadınız", placeholder: "Soyadınız", required: true },
      company: { label: "Firma Adı", placeholder: "Firma adınız (opsiyonel)", required: false },
      phone: { label: "Telefon", placeholder: "5xx xxx xx xx", required: true },
      email: { label: "E-posta", placeholder: "ornek@firma.com", required: true },
      message: { label: "Mesajınız", placeholder: "Aradığınız makineyi, ihtiyacınızı veya sorunuzu yazın…", required: true },
    },
    submit: "Mesaj Gönder",
    submitQuote: "Teklif Talebini Gönder",
    consent: "Göndererek talebinizin işlenmesini kabul etmiş olursunuz. Bilgileriniz üçüncü taraflarla paylaşılmaz.",
    success: {
      title: "Talebiniz alındı.",
      body: "En kısa sürede size dönüş yapacağız. Acil durumlar için doğrudan telefonla da ulaşabilirsiniz.",
      again: "Yeni mesaj gönder",
    },
    machineContextNote: "Bu makine için teklif istiyorsunuz",
  },
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

// Makine Arama (Vitrin başı) — 21st.dev prompt-input uyarlaması.
// "model dropdown" → marka seçici · "effort cycle" → kategori. Framer Motion animasyonları.
export const searchContent = {
  placeholder: "Makine, marka veya model ara…",
  brands: ["Tüm Markalar", "Heidelberg", "Komori", "Man Roland", "Bobst", "Ryobi"],
  categories: ["Tüm Kategoriler", "Sıfır", "İkinci El", "Yedek Parça"],
  basePath: "/makineler",
} as const;

// Kategori Kartları (Vitrin üstü) — canlı sitedeki 3 kategori girişi.
// himon folder-tab reveal deseni: hover'da üst görsel büyür, numara aşağı kayar.
// image: gerçek makine fotoğrafı gelene kadar tone'a göre soyut marka-mavisi
// render (bkz. category-cards.tsx REVEAL). Foto gelince opsiyonel image alanı doldurulur.
export type CategoryCard = {
  num: string; // "01".."03"
  title: string;
  desc: string;
  href: string;
  tone: "blue" | "light" | "dark";
};

export const categoryCardsContent: {
  kicker: string;
  title: string;
  items: CategoryCard[];
} = {
  kicker: "Kategoriler",
  title: "Ne arıyorsunuz?",
  items: [
    {
      num: "01",
      title: "Sıfır Makineler",
      desc: "Avrupa menşeli üreticilerden garantili, orijinal sıfır ofset ve baskı sonrası makineleri.",
      href: "/sifir-makineler",
      tone: "blue",
    },
    {
      num: "02",
      title: "İkinci El Makineler",
      desc: "Kontrollü, revize edilmiş ikinci el matbaa makineleri — alım, satım ve eşleştirme.",
      href: "/ikinci-el-makineler",
      tone: "light",
    },
    {
      num: "03",
      title: "Yedek Parçalar",
      desc: "Heidelberg, Komori, Man Roland ve daha fazlası için orijinal ve muadil yedek parça.",
      href: "/yedek-parcalar",
      tone: "dark",
    },
  ],
};

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
      href: "/makineler/heidelberg-speedmaster-cx-104",
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
      href: "/makineler/komori-lithrone-g40",
    },
    {
      id: "m3",
      brand: "Man Roland",
      model: "705 3B",
      year: 2008,
      condition: "2. El",
      priceOnRequest: true,
      image: "",
      href: "/makineler/man-roland-705-3b",
    },
    {
      id: "m4",
      brand: "Bobst",
      model: "Novacut 106 ER",
      year: 2020,
      condition: "2. El",
      priceOnRequest: true,
      image: "",
      href: "/makineler/bobst-novacut-106-er",
    },
  ] as Machine[],
};

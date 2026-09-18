// Makine Kataloğu — tipli mock veri.
// ⚠️ Bu şekil Sanity `machine` şemasıyla BİREBİR aynı olacak (Faz 9 geçişi bedava).
// Kategorizasyon = Özdemir sitesinin yapısı: üst kategori + alt kategori (renk sayısı / işlem tipi).

export type MachineCondition = "Sıfır" | "İkinci El" | "Opsiyonlu";
export type MachineGroup = "sifir" | "ikinci-el" | "yedek-parca";

export type Machine = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  title: string;
  category: string; // üst kategori (categoryTree.name)
  subcategory?: string; // alt kategori (renk sayısı / işlem tipi)
  group: MachineGroup;
  condition: MachineCondition;
  year?: number;
  productCode?: string;
  price?: string;
  priceOnRequest: boolean;
  image: string;
  featured?: boolean;
};

// Kategori ağacı — arama çubuğu altındaki buton (pill) navigasyonu bunu render eder.
export type CategoryNode = { name: string; subs: string[] };
// Zoho'nun gerçek 10 kategorisi (SIFIR/2.EL öneki grup+rozete gidiyor).
// Alt kategori (renk sayısı) sadece Ofset Baskı'da anlamlı; kalanlar düz.
export const categoryTree: CategoryNode[] = [
  {
    name: "Ofset Baskı",
    subs: ["Tek Renkli", "2 Renkli", "4 Renkli", "5 Renkli", "6 Renkli", "8 Renkli", "10 Renkli", "Sürekli Form"],
  },
  { name: "Baskı Sonrası", subs: [] },
  { name: "Katlama & Yapıştırma", subs: [] },
  { name: "Çanta Yapma", subs: [] },
  { name: "Kutu Kesim", subs: [] },
  { name: "Kutu Toplama", subs: [] },
  { name: "Kağıt Kesim", subs: [] },
  { name: "Laminasyon", subs: [] },
  { name: "Palet Çevirme", subs: [] },
  { name: "Baskı Aksesuarları", subs: [] },
];

// Sidebar facet'leri (kategori artık üstte buton olduğu için burada yok)
export type FacetKey = "brand" | "model" | "condition";
export const facetLabels: Record<FacetKey, string> = {
  brand: "Markalar",
  model: "Model",
  condition: "Ürün Durumu",
};

export const groupMeta: Record<MachineGroup | "all", { kicker: string; title: string; desc: string }> = {
  all: {
    kicker: "Makine Kataloğu",
    title: "Tüm Makineler",
    desc: "Sıfır ve ikinci el matbaa & ambalaj makineleri ile yedek parçaların tamamı. Kategori, marka ve duruma göre filtreleyin, aradığınız makineyi hızlıca bulun.",
  },
  sifir: {
    kicker: "Sıfır Makineler",
    title: "Sıfır Makineler",
    desc: "Avrupa ve Uzakdoğu menşeili üreticilerden garantili, orijinal, sıfır matbaa ve ambalaj makineleri.",
  },
  "ikinci-el": {
    kicker: "İkinci El Makineler",
    title: "İkinci El Makineler",
    desc: "Kontrolleri ve bakımları yapılmış ikinci el matbaa makineleri.",
  },
  "yedek-parca": {
    kicker: "Yedek Parçalar",
    title: "Yedek Parçalar",
    desc: "Heidelberg, Komori, Man Roland ve daha fazlası için orijinal ve muadil yedek parçalar.",
  },
};

export const machines: Machine[] = [
  // — Ofset Baskı (alt = renk sayısı) —
  { id: "m01", slug: "heidelberg-speedmaster-cx-104", brand: "Heidelberg", model: "Speedmaster CX 104", title: "Speedmaster CX 104-5+L", category: "Ofset Baskı", subcategory: "5 Renkli", group: "sifir", condition: "Sıfır", year: 2023, productCode: "CX104-5L", priceOnRequest: true, image: "", featured: true },
  { id: "m02", slug: "komori-lithrone-g40", brand: "Komori", model: "Lithrone G40", title: "Lithrone G40", category: "Ofset Baskı", subcategory: "4 Renkli", group: "ikinci-el", condition: "İkinci El", year: 2015, productCode: "GL-440", price: "€240,000", priceOnRequest: false, image: "", featured: true },
  { id: "m03", slug: "man-roland-705-3b", brand: "Man Roland", model: "705", title: "Man Roland 705 3B", category: "Ofset Baskı", subcategory: "5 Renkli", group: "ikinci-el", condition: "İkinci El", year: 2008, productCode: "705-3B", priceOnRequest: true, image: "" },
  { id: "m04", slug: "heidelberg-sm-52", brand: "Heidelberg", model: "SM 52", title: "Speedmaster SM 52-4", category: "Ofset Baskı", subcategory: "4 Renkli", group: "ikinci-el", condition: "İkinci El", year: 2006, productCode: "SM52-4", priceOnRequest: true, image: "" },
  { id: "m05", slug: "ryobi-755", brand: "Ryobi", model: "755", title: "Ryobi 755 5 Renk", category: "Ofset Baskı", subcategory: "5 Renkli", group: "ikinci-el", condition: "İkinci El", year: 2010, productCode: "RY-755", priceOnRequest: true, image: "" },

  // — Baskı Sonrası —
  { id: "m06", slug: "dgm-technocut-1050-s", brand: "DGM", model: "Technocut 1050-S", title: "2026 DGM Technocut 1050-S", category: "Baskı Sonrası", subcategory: "Kutu Kesim", group: "sifir", condition: "Sıfır", year: 2026, productCode: "1050-S", priceOnRequest: true, image: "", featured: true },
  { id: "m07", slug: "dgm-technofoil-1050", brand: "DGM", model: "Technofoil 1050", title: "2026 DGM Technofoil 1050 SC", category: "Baskı Sonrası", subcategory: "Yaldız & Cilt", group: "sifir", condition: "Sıfır", year: 2026, productCode: "FOIL/SC", priceOnRequest: true, image: "" },
  { id: "m08", slug: "bobst-novacut-106-er", brand: "Bobst", model: "Novacut 106 ER", title: "Bobst Novacut 106 ER", category: "Baskı Sonrası", subcategory: "Kutu Kesim", group: "ikinci-el", condition: "İkinci El", year: 2012, productCode: "NC-106", priceOnRequest: true, image: "" },
  { id: "m09", slug: "bobst-sp-102-e", brand: "Bobst", model: "SP 102-E", title: "1990 Bobst SP 102-E", category: "Baskı Sonrası", subcategory: "Kutu Kesim", group: "ikinci-el", condition: "İkinci El", year: 1990, productCode: "SP102-E", priceOnRequest: true, image: "" },
  { id: "m10", slug: "dgm-megafold-1450-sl", brand: "DGM", model: "Megafold 1450 SL", title: "2026 DGM Megafold 1450-SL", category: "Baskı Sonrası", subcategory: "Katlama & Yapıştırma", group: "sifir", condition: "Sıfır", year: 2026, productCode: "MF-1450", priceOnRequest: true, image: "" },
  { id: "m11", slug: "steinmann-lotus-70", brand: "Steinmann", model: "Lotus 70", title: "2004 Steinmann Lotus 70", category: "Baskı Sonrası", subcategory: "Katlama & Yapıştırma", group: "ikinci-el", condition: "İkinci El", year: 2004, productCode: "LOTUS-70", priceOnRequest: true, image: "" },
  { id: "m12", slug: "polar-115-x", brand: "Polar", model: "115 X", title: "Polar 115 X Giyotin", category: "Baskı Sonrası", subcategory: "Kağıt Kesim (Giyotin)", group: "ikinci-el", condition: "İkinci El", year: 2011, productCode: "POLAR-115", priceOnRequest: true, image: "" },
  { id: "m13", slug: "polar-78-es", brand: "Polar", model: "78 ES", title: "Polar 78 ES Giyotin", category: "Baskı Sonrası", subcategory: "Kağıt Kesim (Giyotin)", group: "ikinci-el", condition: "İkinci El", year: 2007, productCode: "POLAR-78", priceOnRequest: true, image: "" },
  { id: "m14", slug: "steinmann-varak-yaldiz", brand: "Steinmann", model: "Foil Master", title: "Steinmann Varak Yaldız Ünitesi", category: "Baskı Sonrası", subcategory: "Yaldız & Cilt", group: "ikinci-el", condition: "Opsiyonlu", year: 2018, productCode: "FOIL-M", priceOnRequest: true, image: "" },

  // — Yedek Parça —
  { id: "m15", slug: "heidelberg-sm52-yedek", brand: "Heidelberg", model: "SM 52", title: "Heidelberg SM 52 Rulman Seti", category: "Yedek Parça", group: "yedek-parca", condition: "Sıfır", productCode: "SM52-RUL", priceOnRequest: true, image: "" },
  { id: "m16", slug: "bacher-2045", brand: "Bacher", model: "2045", title: "Bacher 2045 Register Sistemi", category: "Yedek Parça", group: "yedek-parca", condition: "İkinci El", productCode: "BAC-2045", priceOnRequest: true, image: "" },
  { id: "m17", slug: "komori-g40-yedek", brand: "Komori", model: "Lithrone G40", title: "Komori G40 Kauçuk & Blanket Seti", category: "Yedek Parça", group: "yedek-parca", condition: "Sıfır", productCode: "G40-BLK", priceOnRequest: true, image: "" },
];

// Detay sayfası ek alanları — makine id ile eşlenir (array'i bozmamak için ayrı map).
// ⚠️ Sanity'de bunlar `machine` şemasının alanları olacak. Boşsa detay sayfası temeli gösterir.
export type MachineExtra = {
  format?: string; // ebat
  press?: string; // baskı adedi
  description?: string;
  features?: string[]; // öne çıkan özellikler
  notes?: string[];
  gallery?: string[]; // gerçek foto url'leri; boşsa placeholder
  pdfUrl?: string;
};

export const machineDetails: Record<string, MachineExtra> = {
  m01: {
    format: "720 × 1040 mm",
    description:
      "Heidelberg Speedmaster CX 104, yüksek hacimli ticari ve ambalaj baskısı için tasarlanmış 5 renk + laklı sıfır ofset baskı makinesidir. Otomasyon ve renk kontrolüyle kısa hazırlık süresi ve tutarlı kalite sunar.",
    features: [
      "5 Renk + Lak ünitesi",
      "Prinect Inpress Control renk ölçüm",
      "Otomatik plaka değiştirme (AutoPlate)",
      "IR / UV kurutma sistemi",
      "Sıfır — garanti kapsamında",
    ],
    notes: ["Sıfır makine; teslim, kurulum ve devreye alma Özdemir Makine tarafından yapılır."],
  },
  m03: {
    format: "100 × 140 cm",
    press: "186 Mil.",
    description:
      "Man Roland R 805+L, 5 renk + lak üniteli büyük ebat ofset baskı makinesi. Ambalaj ve yüksek tirajlı işler için elverişli, çok iyi kondisyonda.",
    features: [
      "Tam Alkollü",
      "RC 2 Masa Kumandası",
      "Otomatik Yıkamalar",
      "IR Kurutma",
      "Hızlı Pim Değiştirme Sistemi",
      "Pudralama Aparatı",
      "Çok İyi Kondisyonda",
      "Hemen Teslim",
    ],
    notes: [
      "Makine toplamda 6 renk + lak ünitesine sahiptir; bir renk ünitesi çalışmadığından fiilen 5 renk + lak olarak kullanılır, teklif bu şekilde (5+Lak) sunulur.",
      "Ana motor ve sürücüsü Baumüller servo motor olarak değiştirildi.",
    ],
  },
  m06: {
    format: "1050 × 720 mm",
    description:
      "DGM Technocut 1050-S, otomatik besleme ve ayıklama üniteli sıfır kutu kesim (die-cut) makinesidir. Karton ambalaj üretimi için yüksek hız ve hassasiyet sunar.",
    features: [
      "Otomatik ayıklama (stripping) ünitesi",
      "Merkezi yağlama sistemi",
      "PLC dokunmatik kontrol",
      "Hızlı kalıp bağlama",
      "Sıfır — garanti kapsamında",
    ],
    notes: ["Sıfır makine; kurulum ve devreye alma dahildir."],
  },
};

// — Facet yardımcıları (brand/model/condition) —
export function machineFacetValue(m: Machine, key: FacetKey): string {
  switch (key) {
    case "brand": return m.brand;
    case "model": return m.model;
    case "condition": return m.condition;
  }
}

export function facetOptions(list: Machine[], key: FacetKey): { value: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const m of list) {
    const v = machineFacetValue(m, key);
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => a.value.localeCompare(b.value, "tr"));
}

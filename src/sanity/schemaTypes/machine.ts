import { defineType, defineField, defineArrayMember } from "sanity";

// Makine dokümanı — kartın + detay sayfasının tüm alanları. Kaynak model:
// src/content/machines.ts (Machine + MachineExtra tek dokümanda birleştirildi).
//
// Bu şema BİLEREK "bir çocuğun bile anlayacağı" netlikte tutulur: her alanda örnek,
// mantıklı sıra, nazik uyarılar. Marka şimdilik sabit dropdown; alt kategori düz liste.

const MARKALAR = [
  "Bacher", "Bobst", "DGM", "Heidelberg", "Komori",
  "Man Roland", "Polar", "Ryobi", "Steinmann",
];

const KATEGORILER = [
  "Ofset Baskı", "Baskı Sonrası", "Baskı Öncesi", "Baskı Ekipmanları", "Yedek Parça",
];

const ALT_KATEGORILER = [
  "Tek Renkli", "2 Renkli", "4 Renkli", "5 Renkli", "6 Renkli", "8 Renkli", "10 Renkli",
  "Sürekli Form", "Kutu Kesim", "Katlama & Yapıştırma", "Kağıt Kesim (Giyotin)", "Yaldız & Cilt",
];

export const machine = defineType({
  name: "machine",
  title: "Makine",
  type: "document",
  groups: [
    { name: "temel", title: "📋 Temel Bilgiler", default: true },
    { name: "siniflandirma", title: "🏷️ Sınıflandırma" },
    { name: "medya", title: "🖼️ Görsel & PDF" },
    { name: "detay", title: "📝 Detay & Özellikler" },
  ],
  fields: [
    // ——— 1) TEMEL: bir makineyi tarif eden çekirdek bilgiler ———
    defineField({
      name: "baslik", title: "Başlık (makine adı)", type: "string", group: "temel",
      description: "Kartta ve detay sayfasında görünen büyük isim. Örn: Heidelberg Speedmaster CX 104-5+L",
      validation: (r) => r.required().error("Başlık zorunlu — makinenin adı."),
    }),
    defineField({
      name: "slug", title: "URL adresi", type: "slug", group: "temel",
      description: "Sitedeki link. Sağdaki 'Generate' düğmesine bas → başlıktan otomatik üretilir. Elle dokunmana gerek yok.",
      options: { source: "baslik", maxLength: 96 },
      validation: (r) => r.required().error("'Generate' düğmesine basıp URL üret."),
    }),
    defineField({
      name: "marka", title: "Marka", type: "string", group: "temel",
      description: "Makinenin üreticisi. Listeden seç.",
      options: { list: MARKALAR },
      validation: (r) => r.required().error("Marka seç."),
    }),
    defineField({
      name: "model", title: "Model", type: "string", group: "temel",
      description: "Marka olmadan model adı. Örn: Speedmaster CX 104",
    }),
    defineField({
      name: "urunKodu", title: "Ürün Kodu", type: "string", group: "temel",
      description: "Kendi stok kodun (opsiyonel). Örn: OF-2015-014",
    }),
    defineField({
      name: "yil", title: "Üretim Yılı", type: "number", group: "temel",
      description: "Sadece rakam. Örn: 2015",
      validation: (r) => r.integer().min(1950).max(2100).warning("Yıl 1950–2100 arasında olmalı."),
    }),
    defineField({
      name: "format", title: "Format / Ebat", type: "string", group: "temel",
      description: "Baskı ebadı. Örn: 720 × 1040 mm",
    }),
    defineField({
      name: "baskiAdedi", title: "Baskı Adedi", type: "string", group: "temel",
      description: "İkinci el makinelerde toplam baskı sayısı (opsiyonel). Örn: 186 Mil.",
    }),
    defineField({
      name: "fiyatSorunuz", title: "Fiyatı gizle → 'Fiyat Sorunuz' yaz", type: "boolean",
      group: "temel", initialValue: true,
      description: "Açık (varsayılan): kartta 'Fiyat Sorunuz' yazar. Kapatırsan alttaki fiyat kutusu açılır.",
    }),
    defineField({
      name: "fiyat", title: "Fiyat", type: "string", group: "temel",
      description: "Sadece yukarıdaki anahtarı KAPATTIYSAN görünür. Örn: €240,000",
      hidden: ({ parent }) => parent?.fiyatSorunuz !== false,
    }),

    // ——— 2) SINIFLANDIRMA: makine katalogda nereye düşecek ———
    defineField({
      name: "grup", title: "Ürün Grubu", type: "string", group: "siniflandirma",
      description: "Makine hangi katalog sayfasında listelensin? (En önemli seçim — kartın nereye gideceğini bu belirler.)",
      options: {
        layout: "radio",
        list: [
          { title: "Sıfır Makine", value: "sifir" },
          { title: "İkinci El Makine", value: "ikinci-el" },
          { title: "Yedek Parça", value: "yedek-parca" },
        ],
      },
      validation: (r) => r.required().error("Grup seç — bu makine hangi sayfada çıkacak?"),
    }),
    defineField({
      name: "durumRozeti", title: "Durum Rozeti (kart köşesi)", type: "string", group: "siniflandirma",
      description: "Kartın sol üst köşesindeki küçük etiket. Genelde grupla aynı: Sıfır makine → 'Sıfır', ikinci el → 'İkinci El'.",
      options: { layout: "radio", list: ["Sıfır", "İkinci El", "Opsiyonlu"] },
      validation: (r) => r.required().error("Rozet seç."),
    }),
    defineField({
      name: "kategori", title: "Kategori", type: "string", group: "siniflandirma",
      description: "Makinenin türü. Örn: Ofset Baskı",
      options: { list: KATEGORILER },
      validation: (r) => r.required().error("Kategori seç."),
    }),
    defineField({
      name: "altKategori", title: "Alt Kategori", type: "string", group: "siniflandirma",
      description: "Kategoriye uygun olanı seç (ör. Ofset Baskı → 5 Renkli). Yedek parçada boş bırakabilirsin.",
      options: { list: ALT_KATEGORILER },
    }),
    defineField({
      name: "vitrin", title: "⭐ Ana sayfa vitrininde göster", type: "boolean",
      group: "siniflandirma", initialValue: false,
      description: "Açarsan ana sayfadaki 'Öne Çıkan Makineler' bölümünde çıkar. En iyi 3-4 makineyi seç.",
    }),

    // ——— 3) GÖRSEL & PDF ———
    defineField({
      name: "gorseller", title: "Görseller (fotoğraflar)", type: "array", group: "medya",
      description: "İlk görsel = ANA görsel (kartta o çıkar). Birden fazla ekleyebilirsin; sürükle-bırak ile sırala. Her görselde noktaya tıklayıp odak seçebilirsin (kırpma o noktayı kesmez).",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      validation: (r) => r.min(1).warning("En az 1 görsel öneririz — kartta ve detay sayfasında kullanılır."),
    }),
    defineField({
      name: "pdf", title: "PDF Döküman (teknik föy)", type: "file", group: "medya",
      description: "Yüklersen detay sayfasında 'PDF Döküman' düğmesi otomatik çıkar. Sadece PDF.",
      options: { accept: "application/pdf" },
    }),

    // ——— 4) DETAY: detay sayfasını dolduran metinler ———
    defineField({
      name: "aciklama", title: "Açıklama", type: "text", rows: 4, group: "detay",
      description: "Detay sayfasındaki tanıtım paragrafı. Makinenin durumu, avantajları, kısa hikâyesi.",
    }),
    defineField({
      name: "oneCikanOzellikler", title: "Öne Çıkan Özellikler", type: "array", group: "detay",
      description: "Kısa madde madde artılar. '+ Add item' ile her satıra bir özellik yaz. Örn: 'Otomatik plaka değiştirme'",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "notlar", title: "Notlar", type: "array", group: "detay",
      description: "Ek notlar (opsiyonel). Satır satır.",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "ekOzellikler", title: "Ek Teknik Özellikler (tablo)", type: "array", group: "detay",
      description: "Bu makineye özel teknik değerler. Her satır: özellik adı + değeri. Örn: 'Maks. hız' → '15.000 tabaka/saat'",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "ad", title: "Özellik", type: "string" }),
            defineField({ name: "deger", title: "Değer", type: "string" }),
          ],
          preview: { select: { title: "ad", subtitle: "deger" } },
        }),
      ],
    }),
  ],
  // Sol menüdeki liste önizlemesi: hangisi hangi makine net olsun.
  preview: {
    select: { title: "baslik", brand: "marka", year: "yil", durum: "durumRozeti", media: "gorseller.0" },
    prepare({ title, brand, year, durum, media }) {
      const alt = [brand, year, durum].filter(Boolean).join(" · ");
      return { title: title || "(İsimsiz makine)", subtitle: alt || "Bilgi eksik", media };
    },
  },
});

export default machine;

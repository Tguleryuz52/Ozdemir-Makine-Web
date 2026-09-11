import { defineType, defineField, defineArrayMember } from "sanity";

// Makine dokümanı — kartın + detay sayfasının tüm alanları. Kaynak model:
// src/content/machines.ts (Machine + MachineExtra tek dokümanda birleştirildi).
//
// NOT (Faz 7 kapsamı = sadece makine): marka şimdilik sabit dropdown; alt kategori düz liste.
// Markalar sayfası Sanity'ye alınınca marka → logolu referansa, alt kategori → kategoriye göre
// süzülen alana yükseltilecek.

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
    { name: "temel", title: "Temel", default: true },
    { name: "siniflandirma", title: "Sınıflandırma" },
    { name: "medya", title: "Görsel & PDF" },
    { name: "detay", title: "Detay & Özellikler" },
  ],
  fields: [
    defineField({
      name: "baslik", title: "Başlık", type: "string", group: "temel",
      description: "Detay sayfasında görünen büyük isim. Örn: Speedmaster CX 104-5+L",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug", title: "URL (slug)", type: "slug", group: "temel",
      description: "'Generate' ile başlıktan otomatik üretilir.",
      options: { source: "baslik", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "marka", title: "Marka", type: "string", group: "temel",
      options: { list: MARKALAR },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "model", title: "Model", type: "string", group: "temel",
      description: "Örn: Speedmaster CX 104",
    }),
    defineField({ name: "urunKodu", title: "Ürün Kodu", type: "string", group: "temel" }),
    defineField({
      name: "yil", title: "Yıl", type: "number", group: "temel",
      validation: (r) => r.integer().min(1950).max(2100),
    }),
    defineField({
      name: "format", title: "Format / Ebat", type: "string", group: "temel",
      description: "Örn: 720 × 1040 mm",
    }),
    defineField({
      name: "baskiAdedi", title: "Baskı Adedi", type: "string", group: "temel",
      description: "İkinci el makinelerde toplam baskı sayısı. Örn: 186 Mil.",
    }),

    defineField({
      name: "grup", title: "Ürün Grubu", type: "string", group: "siniflandirma",
      description: "Katalog gruplaması (sol menü / üst sekme).",
      options: {
        layout: "radio",
        list: [
          { title: "Sıfır Makine", value: "sifir" },
          { title: "İkinci El Makine", value: "ikinci-el" },
          { title: "Yedek Parça", value: "yedek-parca" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "durumRozeti", title: "Durum Rozeti", type: "string", group: "siniflandirma",
      description: "Kartın köşesindeki etiket.",
      options: { layout: "radio", list: ["Sıfır", "İkinci El", "Opsiyonlu"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "kategori", title: "Kategori", type: "string", group: "siniflandirma",
      options: { list: KATEGORILER },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "altKategori", title: "Alt Kategori", type: "string", group: "siniflandirma",
      description: "Kategoriye uygun olanı seç (ör. Ofset Baskı → 5 Renkli). Yedek parçada boş bırakılabilir.",
      options: { list: ALT_KATEGORILER },
    }),
    defineField({
      name: "vitrin", title: "Vitrinde göster (Öne Çıkan)", type: "boolean",
      group: "siniflandirma", initialValue: false,
      description: "Açıksa ana sayfadaki 'Öne Çıkan Makineler' bölümünde çıkar.",
    }),

    defineField({
      name: "fiyatSorunuz", title: "Fiyat Sorunuz (fiyatı gizle)", type: "boolean",
      group: "temel", initialValue: true,
    }),
    defineField({
      name: "fiyat", title: "Fiyat", type: "string", group: "temel",
      description: "Örn: €240,000. Sadece 'Fiyat Sorunuz' kapalıyken görünür.",
      hidden: ({ parent }) => parent?.fiyatSorunuz !== false,
    }),

    defineField({
      name: "gorseller", title: "Görseller", type: "array", group: "medya",
      description: "İlk görsel ANA görsel olur. Sürükle-bırak ile sırala.",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "pdf", title: "PDF Döküman", type: "file", group: "medya",
      description: "'PDF Döküman' butonu otomatik buna bağlanır.",
      options: { accept: "application/pdf" },
    }),

    defineField({
      name: "aciklama", title: "Açıklama", type: "text", rows: 4, group: "detay",
    }),
    defineField({
      name: "oneCikanOzellikler", title: "Öne Çıkan Özellikler", type: "array", group: "detay",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "notlar", title: "Notlar", type: "array", group: "detay",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "ekOzellikler", title: "Ek Teknik Özellikler", type: "array", group: "detay",
      description: "Serbest satırlar: her makineye özel özellik adı + değer.",
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
  preview: {
    select: { title: "baslik", subtitle: "marka", media: "gorseller.0" },
  },
});

export default machine;

import { defineType, defineField, defineArrayMember } from "sanity";

// Blog yazısı. Kart alanları (baslik/ozet/kategori/kapak) + detay sayfası gövdesi (icerik).
// Şema bilerek sade + örnekli tutulur (makine şemasıyla aynı "çocuk bile anlar" disiplini).

const KATEGORILER = ["Fuar", "Duyuru", "Haber", "Rehber"];

export const post = defineType({
  name: "post",
  title: "Blog Yazısı",
  type: "document",
  groups: [
    { name: "temel", title: "📋 Temel", default: true },
    { name: "icerik", title: "📝 Yazı İçeriği" },
  ],
  fields: [
    defineField({
      name: "baslik", title: "Başlık", type: "string", group: "temel",
      description: "Yazının başlığı. Örn: 2024 Drupa Fuarındayız",
      validation: (r) => r.required().error("Başlık zorunlu."),
    }),
    defineField({
      name: "slug", title: "URL adresi", type: "slug", group: "temel",
      description: "Sağdaki 'Generate' düğmesine bas → başlıktan otomatik üretilir.",
      options: { source: "baslik", maxLength: 96 },
      validation: (r) => r.required().error("'Generate' düğmesine bas."),
    }),
    defineField({
      name: "kategori", title: "Kategori", type: "string", group: "temel",
      description: "Kartın köşesindeki etiket.",
      options: { list: KATEGORILER },
      validation: (r) => r.required().error("Kategori seç."),
    }),
    defineField({
      name: "tarih", title: "Yayın Tarihi", type: "datetime", group: "temel",
      description: "Yazının tarihi. Liste yeni → eski sıralanır.",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "ozet", title: "Özet", type: "text", rows: 3, group: "temel",
      description: "Kartta görünen 1-2 cümlelik kısa tanıtım.",
      validation: (r) => r.max(260).warning("Kısa tutun (~260 karakter)."),
    }),
    defineField({
      name: "kapak", title: "Kapak Görseli", type: "image", options: { hotspot: true },
      group: "temel",
      description: "Kartta ve yazı başında görünür. Noktaya tıklayıp odak seçebilirsin.",
    }),
    defineField({
      name: "vitrin", title: "⭐ Öne çıkar", type: "boolean", group: "temel", initialValue: false,
      description: "Açarsan blog listesinde en başa alınır.",
    }),
    defineField({
      name: "icerik", title: "Yazı", type: "array", group: "icerik",
      description: "Asıl yazı. Başlık, kalın/italik, madde listesi, link ve görsel ekleyebilirsin.",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),
  ],
  orderings: [
    { title: "Tarih (yeni → eski)", name: "tarihDesc", by: [{ field: "tarih", direction: "desc" }] },
  ],
  preview: {
    select: { title: "baslik", subtitle: "kategori", media: "kapak" },
    prepare({ title, subtitle, media }) {
      return { title: title || "(Başlıksız yazı)", subtitle, media };
    },
  },
});

export default post;

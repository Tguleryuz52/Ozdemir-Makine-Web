import { defineType, defineField } from "sanity";

// Tek galeri görseli. Her görsel bir doküman → etikete göre süzülebilir, tek tek sıralanabilir.
// Görünüm masonry + lightbox (shared-element-gallery); gerçek görsel doğal oranıyla akar.

const ETIKETLER = ["Fuar", "Makine", "Showroom", "Teslimat", "Tesis", "Ekip"];

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Galeri Görseli",
  type: "document",
  fields: [
    defineField({
      name: "gorsel", title: "Görsel", type: "image", options: { hotspot: true },
      description: "Galeride gösterilecek fotoğraf. Herhangi bir boyut olur; doğal oranıyla dizilir.",
      validation: (r) => r.required().error("Görsel zorunlu."),
    }),
    defineField({
      name: "baslik", title: "Başlık / Açıklama", type: "string",
      description: "Kısa açıklama — büyütünce görünür + erişilebilirlik için. Örn: Drupa 2024 standımız",
    }),
    defineField({
      name: "etiket", title: "Etiket", type: "string",
      description: "İsteğe bağlı gruplama.",
      options: { list: ETIKETLER },
    }),
    defineField({
      name: "sira", title: "Sıra No", type: "number",
      description: "Küçük numara önce gelir. Boş bırakırsan en son eklenen başa gelir.",
    }),
  ],
  orderings: [
    { title: "Sıra No (artan)", name: "siraAsc", by: [{ field: "sira", direction: "asc" }] },
  ],
  preview: {
    select: { title: "baslik", subtitle: "etiket", media: "gorsel" },
    prepare({ title, subtitle, media }) {
      return { title: title || "(Başlıksız görsel)", subtitle: subtitle || "Galeri", media };
    },
  },
});

export default galleryItem;

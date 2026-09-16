import { defineType, defineField, defineArrayMember } from "sanity";

// Stok Listesi Kategorisi — Studio'dan yönetilir.
// Yapı: Kategori (ör. Ofset Baskı Makineleri) → içinde birden çok "PDF Liste" satırı.
// Her PDF Liste satırına bir PDF dosyası yüklenir; ziyaretçi satıra tıklayınca o PDF açılır.
// PDF yüklenmemiş satır sitede "Yakında" olarak görünür (kırık link olmaz).

export const stockCategory = defineType({
  name: "stockCategory",
  title: "Stok Listesi Kategorisi",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Kategori Adı",
      type: "string",
      description:
        "Örn: Ofset Baskı Makineleri. Stok Listemiz sayfasında kart başlığı olarak görünür.",
      validation: (r) => r.required().error("Kategori adı zorunlu."),
    }),
    defineField({
      name: "slug",
      title: "Sayfa Adresi (URL)",
      type: "slug",
      description:
        "'Generate' düğmesine bas — kategori adından otomatik üretir. Örn: ofset-baski-makineleri → site adresi /stok-listesi/ofset-baski-makineleri olur.",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required().error("URL zorunlu — Generate düğmesine bas."),
    }),
    defineField({
      name: "summary",
      title: "Kısa Açıklama",
      type: "text",
      rows: 2,
      description:
        "Kategori kartında ve kategori sayfasında başlığın altında görünen 1-2 cümlelik özet.",
    }),
    defineField({
      name: "order",
      title: "Sıra No",
      type: "number",
      description: "Küçük numara önce gelir (1, 2, 3...). Boş bırakırsan en sona düşer.",
    }),
    defineField({
      name: "lists",
      title: "PDF Listeleri",
      type: "array",
      description:
        "Bu kategorideki her PDF bir satırdır. Aşağıdan 'Add item' ile yeni PDF ekle, her birine dosyayı yükle.",
      of: [
        defineArrayMember({
          type: "object",
          name: "stockList",
          title: "PDF Liste",
          fields: [
            defineField({
              name: "title",
              title: "Liste Adı",
              type: "string",
              description:
                "Satırda görünecek ad. Örn: Ofset Baskı Makineleri, Aksesuarlar.",
              validation: (r) => r.required().error("Liste adı zorunlu."),
            }),
            defineField({
              name: "pdf",
              title: "PDF Dosyası",
              type: "file",
              description:
                "⬆️ PDF'i buraya yükle (sürükle-bırak ya da 'Upload'). Ziyaretçi satıra tıklayınca bu dosya açılır. BOŞ bırakırsan satırda 'Yakında' yazar.",
              options: { accept: "application/pdf" },
            }),
            defineField({
              name: "note",
              title: "Not (opsiyonel)",
              type: "string",
              description:
                "Liste adının altında küçük gri yazı olarak görünür. Örn: marka/kapsam bilgisi. Boş bırakabilirsin.",
            }),
          ],
          preview: {
            select: { title: "title", filename: "pdf.asset.originalFilename" },
            prepare({ title, filename }) {
              return {
                title: title || "(Adsız liste)",
                subtitle: filename ? `PDF: ${filename}` : "⚠️ PDF yüklenmedi → 'Yakında'",
              };
            },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Sıra No (artan)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", lists: "lists" },
    prepare({ title, lists }) {
      const n = Array.isArray(lists) ? lists.length : 0;
      return { title: title || "(Adsız kategori)", subtitle: `${n} PDF liste` };
    },
  },
});

export default stockCategory;

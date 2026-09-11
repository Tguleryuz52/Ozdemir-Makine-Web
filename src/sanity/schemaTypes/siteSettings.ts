import { defineType, defineField, defineArrayMember } from "sanity";

// Site Ayarları — TEK doküman (singleton). İletişim bilgileri + sosyal medya linkleri.
// Footer ve İletişim sayfası buradan beslenir; alan boşsa koddaki varsayılana düşer (site asla boş kalmaz).

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  groups: [
    { name: "iletisim", title: "📞 İletişim", default: true },
    { name: "sosyal", title: "🔗 Sosyal Medya" },
  ],
  fields: [
    defineField({
      name: "email", title: "E-posta", type: "string", group: "iletisim",
      description: "Genel iletişim e-postası. Footer + İletişim sayfasında görünür.",
    }),
    defineField({
      name: "telefon", title: "Telefon", type: "string", group: "iletisim",
      description: "Görünen numara. Örn: +90 212 544 63 46 — arama linki otomatik üretilir.",
    }),
    defineField({
      name: "whatsapp", title: "WhatsApp Numarası", type: "string", group: "iletisim",
      description: "İsteğe bağlı. Ülke koduyla, sadece rakam. Örn: 905321234567",
    }),
    defineField({
      name: "adresTR", title: "Adres — Türkiye", type: "text", rows: 2, group: "iletisim",
    }),
    defineField({
      name: "adresDE", title: "Adres — Almanya", type: "text", rows: 2, group: "iletisim",
    }),
    defineField({
      name: "sosyal", title: "Sosyal Medya Linkleri", type: "array", group: "sosyal",
      description: "Footer'da alt alta listelenir. Platform seç + linki yapıştır.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "ad", title: "Platform", type: "string",
              options: { list: ["Facebook", "Instagram", "X/Twitter", "YouTube", "LinkedIn"] },
            }),
            defineField({ name: "url", title: "Link", type: "url" }),
          ],
          preview: { select: { title: "ad", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Ayarları" }),
  },
});

export default siteSettings;

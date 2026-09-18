import type { StructureResolver } from "sanity/structure";

// Studio sol menüsü. Makineler hem TÜR (aile) hem DURUM'a göre gezilir; ayrıca Stok, Blog, Galeri, Ayarlar.
const yilaGore = [{ field: "yil", direction: "desc" as const }];

// Makine Türü (aile) klasörü
const tur = (S: Parameters<StructureResolver>[0], aile: string, icon: string) =>
  S.listItem()
    .title(aile)
    .icon(() => icon)
    .child(S.documentList().title(aile).filter('_type == "machine" && aile == $aile').params({ aile }).defaultOrdering(yilaGore));

// Durum (grup) klasörü
const durum = (S: Parameters<StructureResolver>[0], label: string, grup: string, icon: string) =>
  S.listItem()
    .title(label)
    .icon(() => icon)
    .child(S.documentList().title(label).filter('_type == "machine" && grup == $grup').params({ grup }).defaultOrdering(yilaGore));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("İçerik")
    .items([
      // ——— Makineler: tek klasör, hem TÜR'e hem DURUM'a göre gezilir ———
      S.listItem()
        .title("Makineler")
        .icon(() => "🏭")
        .child(
          S.list()
            .title("Makineler")
            .items([
              // Türe göre (Aile) — eski sitedeki üst gruplar
              tur(S, "Ofset Baskı", "🖨️"),
              tur(S, "Baskı Sonrası", "✂️"),
              tur(S, "Baskı Ekipmanları", "🧰"),
              tur(S, "Baskı Öncesi", "🎞️"),
              S.divider(),
              // Duruma göre
              durum(S, "Sıfır", "sifir", "📗"),
              durum(S, "İkinci El", "ikinci-el", "📘"),
              durum(S, "Yedek Parça", "yedek-parca", "🔧"),
              S.divider(),
              S.listItem()
                .title("Tüm Makineler")
                .icon(() => "📑")
                .child(S.documentTypeList("machine").title("Tüm Makineler").defaultOrdering(yilaGore)),
            ]),
        ),

      S.divider(),

      // ——— Stok Listemiz (kategori → PDF listeleri) ———
      S.listItem()
        .title("Stok Listemiz")
        .icon(() => "📄")
        .child(
          S.documentTypeList("stockCategory")
            .title("Stok Listesi Kategorileri")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.divider(),

      // ——— Blog & Galeri ———
      S.documentTypeListItem("post").title("Blog Yazıları").icon(() => "✍️"),
      S.documentTypeListItem("galleryItem").title("Galeri").icon(() => "🖼️"),

      S.divider(),

      // ——— Site Ayarları (tek doküman) ———
      S.listItem()
        .title("Site Ayarları")
        .icon(() => "⚙️")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
    ]);

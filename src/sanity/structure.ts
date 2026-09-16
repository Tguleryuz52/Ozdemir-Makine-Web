import type { StructureResolver } from "sanity/structure";

// Studio sol menüsü. Makineler gruplara bölünür; ayrıca Blog, Galeri ve tek-doküman Site Ayarları.
const yilaGore = [{ field: "yil", direction: "desc" as const }];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("İçerik")
    .items([
      // ——— Makineler (gruplara bölünmüş) ———
      S.listItem()
        .title("Sıfır Makineler")
        .icon(() => "📗")
        .child(
          S.documentList()
            .title("Sıfır Makineler")
            .filter('_type == "machine" && grup == "sifir"')
            .defaultOrdering(yilaGore),
        ),
      S.listItem()
        .title("İkinci El Makineler")
        .icon(() => "📘")
        .child(
          S.documentList()
            .title("İkinci El Makineler")
            .filter('_type == "machine" && grup == "ikinci-el"')
            .defaultOrdering(yilaGore),
        ),
      S.listItem()
        .title("Yedek Parçalar")
        .icon(() => "🔧")
        .child(
          S.documentList()
            .title("Yedek Parçalar")
            .filter('_type == "machine" && grup == "yedek-parca"')
            .defaultOrdering(yilaGore),
        ),
      S.listItem()
        .title("Tüm Makineler")
        .icon(() => "📑")
        .child(
          S.documentTypeList("machine")
            .title("Tüm Makineler")
            .defaultOrdering(yilaGore),
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

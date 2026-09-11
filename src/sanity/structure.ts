import type { StructureResolver } from "sanity/structure";

// Studio sol menüsü. Şimdilik tek tip (Makineler); marka/başka tipler eklenince genişler.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("İçerik")
    .items([
      S.documentTypeListItem("machine").title("Makineler"),
    ]);

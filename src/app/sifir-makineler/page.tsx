import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/catalog-view";

export const metadata: Metadata = {
  title: "Sıfır Makineler",
  description:
    "Avrupa ve Uzakdoğu menşeli üreticilerden garantili, orijinal sıfır matbaa ve ambalaj makineleri.",
};

export default function SifirMakinelerPage() {
  return <CatalogView group="sifir" />;
}

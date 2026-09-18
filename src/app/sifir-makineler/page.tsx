import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/catalog-view";
import { getMachines } from "@/sanity/lib/machines";

export const metadata: Metadata = {
  title: "Sıfır Makineler",
  description:
    "Avrupa ve Uzakdoğu menşeili üreticilerden garantili, orijinal, sıfır matbaa ve ambalaj makineleri.",
};

export default async function SifirMakinelerPage() {
  const machines = await getMachines();
  return <CatalogView group="sifir" machines={machines} />;
}

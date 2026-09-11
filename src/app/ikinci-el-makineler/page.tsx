import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/catalog-view";
import { getMachines } from "@/sanity/lib/machines";

export const metadata: Metadata = {
  title: "İkinci El Makineler",
  description:
    "Kontrollü, revize edilmiş ikinci el matbaa makineleri — alım, satım ve ihtiyaca göre eşleştirme.",
};

export default async function IkinciElMakinelerPage() {
  const machines = await getMachines();
  return <CatalogView group="ikinci-el" machines={machines} />;
}

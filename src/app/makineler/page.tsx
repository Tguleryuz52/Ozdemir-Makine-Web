import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/catalog-view";
import { getMachines } from "@/sanity/lib/machines";

export const metadata: Metadata = {
  title: "Tüm Makineler",
  description:
    "Sıfır ve ikinci el matbaa & ambalaj makineleri ile yedek parçaların tamamı. Marka, model ve duruma göre filtreleyin.",
};

export default async function MakinelerPage() {
  const machines = await getMachines();
  return <CatalogView machines={machines} />;
}

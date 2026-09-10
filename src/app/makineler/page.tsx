import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/catalog-view";

export const metadata: Metadata = {
  title: "Tüm Makineler",
  description:
    "Sıfır ve ikinci el matbaa & ambalaj makineleri ile yedek parçaların tamamı. Marka, model ve duruma göre filtreleyin.",
};

export default function MakinelerPage() {
  return <CatalogView />;
}

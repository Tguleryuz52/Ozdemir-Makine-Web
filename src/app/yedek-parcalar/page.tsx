import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/catalog-view";
import { getMachines } from "@/sanity/lib/machines";

export const metadata: Metadata = {
  title: "Yedek Parçalar",
  description:
    "Heidelberg, Komori, Man Roland ve daha fazlası için orijinal ve muadil yedek parçalar.",
};

export default async function YedekParcalarPage() {
  const machines = await getMachines();
  return <CatalogView group="yedek-parca" machines={machines} />;
}

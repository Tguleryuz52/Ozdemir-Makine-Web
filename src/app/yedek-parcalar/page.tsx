import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/catalog-view";

export const metadata: Metadata = {
  title: "Yedek Parçalar",
  description:
    "Heidelberg, Komori, Man Roland ve daha fazlası için orijinal ve muadil yedek parçalar.",
};

export default function YedekParcalarPage() {
  return <CatalogView group="yedek-parca" />;
}

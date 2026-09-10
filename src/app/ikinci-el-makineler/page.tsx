import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/catalog-view";

export const metadata: Metadata = {
  title: "İkinci El Makineler",
  description:
    "Kontrollü, revize edilmiş ikinci el matbaa makineleri — alım, satım ve ihtiyaca göre eşleştirme.",
};

export default function IkinciElMakinelerPage() {
  return <CatalogView group="ikinci-el" />;
}

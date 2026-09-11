import type { Metadata } from "next";
import { BrandsSection } from "@/components/sections/brands-section";

export const metadata: Metadata = {
  title: "Distribütör & Markalar",
  description:
    "2014'ten beri DGM distribütörüyüz. Matbaa ve ambalaj sektörünün önde gelen markalarının makinelerini tedarik ediyor, kurulum ve servis desteği veriyoruz.",
};

export default function MarkalarPage() {
  return <BrandsSection />;
}

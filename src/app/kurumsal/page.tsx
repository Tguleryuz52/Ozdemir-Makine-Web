import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "30 yıllık tecrübeyle matbaa ve ambalaj makineleri sektöründe güvenilir çözüm ortağı. Kurucu Murat Özdemir, Türkiye ve Almanya ofisleri, 1000 m² depo.",
};

export default function KurumsalPage() {
  return <AboutSection />;
}

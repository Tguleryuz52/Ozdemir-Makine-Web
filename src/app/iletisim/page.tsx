import type { Metadata } from "next";
import { getMachineBySlug } from "@/sanity/lib/machines";
import { findCampaign } from "@/content/campaigns";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Özdemir Makine ile iletişime geçin. Sıfır ve ikinci el matbaa makineleri, yedek parça ve teknik destek için teklif alın.",
};

export default async function IletisimPage({
  searchParams,
}: {
  searchParams: Promise<{ makine?: string; kampanya?: string }>;
}) {
  // ?makine=<slug>   → detay sayfasından "Fiyat Teklifi Al" akışı
  // ?kampanya=<slug> → Zoho Campaigns mail'inden gelen fuar/etkinlik başvurusu
  const { makine, kampanya } = await searchParams;
  const machine = makine ? (await getMachineBySlug(makine)) ?? undefined : undefined;
  const campaign = kampanya ? findCampaign(kampanya) : undefined;

  return <ContactSection machine={machine} campaign={campaign} />;
}

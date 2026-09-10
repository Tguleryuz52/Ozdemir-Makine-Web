import type { Metadata } from "next";
import { machines } from "@/content/machines";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Özdemir Makine ile iletişime geçin. Sıfır ve ikinci el matbaa makineleri, yedek parça ve teknik destek için teklif alın.",
};

export default async function IletisimPage({
  searchParams,
}: {
  searchParams: Promise<{ makine?: string }>;
}) {
  const { makine } = await searchParams;
  const machine = makine
    ? machines.find((m) => m.productCode === makine)
    : undefined;

  return <ContactSection machine={machine} />;
}

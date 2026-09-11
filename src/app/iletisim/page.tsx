import type { Metadata } from "next";
import { getMachineBySlug } from "@/sanity/lib/machines";
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
  // ?makine=<slug> ile gelinir (detay sayfası "Fiyat Teklifi Al" düğmesi). Slug her makinede
  // benzersiz + doludur; ürün kodu boş olabilir, o yüzden yönlendirme slug'la yapılır.
  const { makine } = await searchParams;
  const machine = makine ? (await getMachineBySlug(makine)) ?? undefined : undefined;

  return <ContactSection machine={machine} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { machines } from "@/content/machines";
import { MachineDetail } from "@/components/catalog/machine-detail";

export function generateStaticParams() {
  return machines.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = machines.find((x) => x.slug === slug);
  if (!m) return { title: "Makine" };
  return {
    title: m.title,
    description: `${m.brand} ${m.model} — ${m.category}${m.subcategory ? " · " + m.subcategory : ""}. ${m.condition} makine, Özdemir Makine.`,
  };
}

export default async function MachineDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const machine = machines.find((m) => m.slug === slug);
  if (!machine) notFound();

  const related = machines
    .filter((m) => m.id !== machine.id && (m.category === machine.category || m.brand === machine.brand))
    .slice(0, 4);

  return <MachineDetail machine={machine} related={related} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MachineDetail } from "@/components/catalog/machine-detail";
import { getMachineSlugs, getMachineBySlug, getRelatedMachines } from "@/sanity/lib/machines";

export async function generateStaticParams() {
  const slugs = await getMachineSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = await getMachineBySlug(slug);
  if (!m) return { title: "Makine" };
  return {
    title: m.title,
    description: `${m.brand} ${m.model} — ${m.category}${m.subcategory ? " · " + m.subcategory : ""}. ${m.condition} makine, Özdemir Makine.`,
  };
}

export default async function MachineDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const machine = await getMachineBySlug(slug);
  if (!machine) notFound();

  const related = await getRelatedMachines(machine);

  return <MachineDetail machine={machine} related={related} />;
}

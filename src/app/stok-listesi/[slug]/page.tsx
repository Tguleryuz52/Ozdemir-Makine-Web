import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StockCategoryDetail } from "@/components/sections/stock-category-detail";
import { stockListContent } from "@/content/site";
import { getStockCategoryBySlug, getStockCategorySlugs } from "@/sanity/lib/stock";

export async function generateStaticParams() {
  const slugs = await getStockCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getStockCategoryBySlug(slug);
  if (!cat) return { title: "Stok Listemiz" };
  return { title: `${cat.title} — Stok Listemiz`, description: cat.summary };
}

export default async function StockCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getStockCategoryBySlug(slug);
  if (!category) notFound();

  return <StockCategoryDetail kicker={stockListContent.kicker} category={category} />;
}

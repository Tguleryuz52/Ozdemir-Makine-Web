import type { Metadata } from "next";
import { StockCategories } from "@/components/sections/stock-categories";
import { stockListContent } from "@/content/site";
import { getStockCategories } from "@/sanity/lib/stock";

export const metadata: Metadata = {
  title: "Stok Listemiz",
  description:
    "Sıfır ve ikinci el matbaa & ambalaj makineleri stok listelerimiz — ofset baskı, baskı sonrası ve sıfır ekipman güncel PDF listeleri.",
};

export default async function StockListPage() {
  // Başlık/kicker/intro sabit; kategoriler Sanity'den (boşsa statik fallback lib içinde).
  const { kicker, title, intro } = stockListContent;
  const categories = await getStockCategories();
  return (
    <StockCategories kicker={kicker} title={title} intro={intro} categories={categories} />
  );
}

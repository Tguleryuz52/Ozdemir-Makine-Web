import { client } from "./client";
import { stockListContent, type StockCategory } from "@/content/site";

// Stok Listesi kategorileri → StockCategory şekli (bileşenlerin beklediği).
// PDF URL'i asset dereference ile alınır: pdf.asset->url. Yüklenmemişse "" → UI "Yakında".
// Sanity'de hiç kategori yoksa statik içeriğe (stockListContent) düşer → sayfa asla boş kalmaz.

const cacheOpts = { next: { revalidate: 60, tags: ["stock"] } };

const PROJECTION = `{
  "slug": slug.current,
  title,
  "summary": coalesce(summary, ""),
  "lists": coalesce(lists[]{
    "slug": _key,
    title,
    "pdf": coalesce(pdf.asset->url, ""),
    "note": coalesce(note, "")
  }, [])
}`;

export async function getStockCategories(): Promise<StockCategory[]> {
  const rows = await client.fetch<StockCategory[]>(
    `*[_type == "stockCategory" && defined(slug.current)] | order(coalesce(order, 9999) asc, title asc) ${PROJECTION}`,
    {},
    cacheOpts,
  );
  return rows.length > 0 ? rows : stockListContent.categories;
}

export async function getStockCategorySlugs(): Promise<string[]> {
  const rows = await client.fetch<string[]>(
    `*[_type == "stockCategory" && defined(slug.current)].slug.current`,
    {},
    cacheOpts,
  );
  return rows.length > 0 ? rows : stockListContent.categories.map((c) => c.slug);
}

export async function getStockCategoryBySlug(
  slug: string,
): Promise<StockCategory | null> {
  const row = await client.fetch<StockCategory | null>(
    `*[_type == "stockCategory" && slug.current == $slug][0] ${PROJECTION}`,
    { slug },
    cacheOpts,
  );
  if (row) return row;
  return stockListContent.categories.find((c) => c.slug === slug) ?? null;
}

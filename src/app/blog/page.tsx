import type { Metadata } from "next";
import { blogContent } from "@/content/site";
import { getPosts } from "@/sanity/lib/posts";
import { BlogSection } from "@/components/sections/blog-section";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Matbaa ve ambalaj sektöründen haberler, fuar duyuruları ve Özdemir Makine'den güncellemeler.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  // Sanity boşsa statik taslak yazılar görünür (sayfa asla boş kalmaz).
  const items = posts.length ? posts : blogContent.items;
  return <BlogSection items={items} />;
}

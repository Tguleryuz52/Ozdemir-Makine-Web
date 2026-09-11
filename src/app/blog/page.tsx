import type { Metadata } from "next";
import { BlogSection } from "@/components/sections/blog-section";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Matbaa ve ambalaj sektöründen haberler, fuar duyuruları ve Özdemir Makine'den güncellemeler.",
};

export default function BlogPage() {
  return <BlogSection />;
}

import { Hero } from "@/components/sections/hero";
import Brandline from "@/components/sections/brandline";
import { CategoryCards } from "@/components/sections/category-cards";
import { FeaturedMachines } from "@/components/sections/featured-machines";
import { Introduction } from "@/components/sections/introduction";
import { Services } from "@/components/sections/services";
import { getFeaturedMachines } from "@/sanity/lib/machines";

export default async function HomePage() {
  const featured = await getFeaturedMachines();
  // Sıra (2026-09-15 kompakt cila v2): Hero + Brandline ilk viewport'ta beraber görünsün
  // (marka güvenilirliği ilk saniyede aşılansın), altında kategori kartları, sonra vitrin.
  return (
    <>
      <Hero />
      <Brandline />
      <CategoryCards />
      <FeaturedMachines items={featured} />
      <Introduction />
      <Services />
    </>
  );
}

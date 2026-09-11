import { Hero } from "@/components/sections/hero";
import Brandline from "@/components/sections/brandline";
import { FeaturedMachines } from "@/components/sections/featured-machines";
import { Introduction } from "@/components/sections/introduction";
import { Services } from "@/components/sections/services";
import { getFeaturedMachines } from "@/sanity/lib/machines";

export default async function HomePage() {
  const featured = await getFeaturedMachines();
  return (
    <>
      <Hero />
      <Brandline />
      <FeaturedMachines items={featured} />
      <Introduction />
      <Services />
    </>
  );
}

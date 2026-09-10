import { Hero } from "@/components/sections/hero";
import Brandline from "@/components/sections/brandline";
import { Introduction } from "@/components/sections/introduction";
import { FeaturedMachines } from "@/components/sections/featured-machines";
import { Services } from "@/components/sections/services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brandline />
      <Introduction />
      <FeaturedMachines />
      <Services />
    </>
  );
}

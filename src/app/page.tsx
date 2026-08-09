import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Studio } from "@/components/sections/studio";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Studio />
      <Contact />
    </>
  );
}

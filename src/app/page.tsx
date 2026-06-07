import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { About } from "@/components/sections/about";
// import { Brands } from "@/components/sections/brands";
// import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
// import { Initiatives } from "@/components/sections/initiatives";
import { Journey } from "@/components/sections/journey";
// import { Press } from "@/components/sections/press";
// import { Quote } from "@/components/sections/quote";
import { Achievements } from "@/components/sections/achievements";
import { Speaking } from "@/components/sections/speaking";
// import { Testimonials } from "@/components/sections/testimonials";
import { WorkWithMe } from "@/components/sections/work-with-me";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Journey />
       {/*<Quote />
        <Initiatives />
        <Press />
        <Brands />
        <Testimonials />
        <Contact />*/}
        <Speaking />
        <Achievements />
        <WorkWithMe />
      </main>
      <Footer />
    </>
  );
}

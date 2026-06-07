import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { DisplayTitle } from "@/components/ui/display-title";
import { SectionShell } from "@/components/ui/section-shell";
import { IMAGE } from "@/lib/constants";
import Image from "next/image";

export function About() {
  return (
    <SectionShell
      id="about"
      className="bg-sand text-charcoal"
      aria-labelledby="about-heading"
    >
      <DisplayTitle
        align="left"
        theme="light"
        words={[
          { text: "About", emphasis: "muted" },
          { text: "Benjamen", emphasis: "primary" },
          { text: "Oladokun", emphasis: "secondary" },
        ]}
      />

      <h2 id="about-heading" className="sr-only">
        About Benjamen Oladokun
      </h2>

      <div className="mt-4 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal>
          <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden bg-linear-to-br from-beige via-stone to-ivory lg:mx-0">
            <Image
              src={IMAGE}
              alt="Benjamen Oladokun portrait"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-6 text-base leading-[1.7] text-charcoal/80">
            <p>
              Benjamen Oladokun is a visionary entrepreneur, strategist, and
              builder passionate about reshaping industries and empowering
              people. With nearly 15 years of experience founding and scaling
              businesses across mobility, fintech, logistics, hospitality, and
              technology, he has consistently transformed bold ideas into
              impactful ventures.
            </p>
            <p>
              He is the co-founder of Shekel Mobility, a Y Combinator-backed
              fintech startup revolutionizing auto dealerships across Africa and
              emerging markets — helping thousands of auto entrepreneurs access
              credit, digital tools, and growth opportunities.
            </p>
            <p>
              Beyond entrepreneurship, Benjamen serves as Community Leader of the
              Global Impact Business Community (GIBC), equipping faith-driven
              entrepreneurs with the tools, networks, and values to build
              businesses that matter.
            </p>
          </div>

          <blockquote className="mt-10 border-l-2 border-charcoal pl-6">
            <p className="font-display text-2xl leading-snug text-charcoal md:text-3xl">
              &ldquo;At my core, I am driven by clarity, purpose, and
              legacy.&rdquo;
            </p>
          </blockquote>
        </ScrollReveal>
      </div>
    </SectionShell>
  );
}

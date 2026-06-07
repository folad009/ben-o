import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { IMAGE, INITIATIVES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export function Initiatives() {
  return (
    <section
      id="programs"
      className="bg-stone py-24 md:py-32"
      aria-labelledby="programs-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Programs"
            title="Initiatives & Programs"
            subtitle="Purpose-built experiences designed to accelerate leadership, sharpen strategy, and unlock potential."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {INITIATIVES.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <article className="group overflow-hidden bg-ivory transition-shadow duration-300 hover:shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={IMAGE}
                    alt={item.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-charcoal/20 transition-colors duration-300 group-hover:bg-charcoal/10" />
                </div>
                <div className="p-8 md:p-10">
                  <h3 className="font-display text-2xl text-charcoal md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                    {item.description}
                  </p>
                  <Link
                    href="#contact"
                    className="mt-6 inline-flex items-center text-sm font-medium tracking-wide text-sand transition-colors hover:text-charcoal"
                  >
                    Learn More →
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

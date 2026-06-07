import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { IMAGE, TESTIMONIALS } from "@/lib/constants";
import Image from "next/image";

export function Testimonials() {
  return (
    <section
      className="bg-stone py-24 md:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="What Leaders Say"
            subtitle="Trusted by executives, founders, and institutions worldwide."
            align="center"
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <ScrollReveal key={item.name} delay={index * 0.1}>
              <article className="flex h-full flex-col bg-ivory p-8 md:p-10">
                <p className="flex-1 font-display text-xl leading-relaxed text-charcoal md:text-2xl">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4 border-t border-charcoal/10 pt-8">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={IMAGE}
                      alt={item.name}
                      fill
                      className="object-cover object-top"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">{item.name}</p>
                    <p className="text-sm text-charcoal/60">
                      {item.position}, {item.organization}
                    </p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

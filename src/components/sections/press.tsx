import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { IMAGE, PRESS } from "@/lib/constants";
import Image from "next/image";

export function Press() {
  return (
    <section
      id="press"
      className="bg-ivory py-24 md:py-32"
      aria-labelledby="press-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Press"
            title="Featured In"
            subtitle="Editorial features, podcast appearances, and media coverage from leading global publications."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRESS.map((item, index) => (
            <ScrollReveal key={item.publication} delay={index * 0.06}>
              <article className="group relative aspect-[3/4] overflow-hidden bg-charcoal">
                <Image
                  src={IMAGE}
                  alt={`${item.publication} feature`}
                  fill
                  className="object-cover object-top opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-sand">
                    {item.publication}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-ivory md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm text-ivory/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    View Publication →
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

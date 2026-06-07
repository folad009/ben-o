import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { BRANDS } from "@/lib/constants";

export function Brands() {
  const marqueeItems = [...BRANDS, ...BRANDS];

  return (
    <section
      className="overflow-hidden border-y border-charcoal/10 bg-stone py-20 md:py-24"
      aria-label="Brands and partnerships"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Partnerships"
            title="Trusted By"
            subtitle="Collaborating with world-class organizations and media institutions."
            align="center"
          />
        </ScrollReveal>
      </div>

      <div className="relative mt-14 hidden overflow-hidden md:block">
        <div className="animate-marquee flex w-max gap-16 px-8">
          {marqueeItems.map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              className="whitespace-nowrap font-display text-3xl tracking-wide text-charcoal/30 transition-colors duration-300 hover:text-charcoal/60 lg:text-4xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-6 px-6 md:hidden md:px-12">
        {BRANDS.map((brand) => (
          <div
            key={brand}
            className="flex items-center justify-center border border-charcoal/10 py-6"
          >
            <span className="font-display text-xl text-charcoal/40">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

import { ScrollReveal } from "@/components/animations/scroll-reveal";

export function Quote() {
  return (
    <section
      className="bg-charcoal py-32 md:py-40"
      aria-label="Signature quote"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <ScrollReveal>
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="font-display text-4xl leading-tight text-ivory md:text-6xl lg:text-7xl">
              &ldquo;Win at work,
              <br />
              win at life.&rdquo;
            </p>
            <footer className="mt-10 text-sm font-medium uppercase tracking-[0.3em] text-sand">
              — Benjamen Oladokun
            </footer>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
}

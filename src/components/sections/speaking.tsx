import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { DisplayTitle } from "@/components/ui/display-title";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import { SpeakingCarousel } from "@/components/sections/speaking-carousel";

export function Speaking() {
  return (
    <SectionShell
      id="speaking"
      className="bg-sand text-charcoal"
      aria-labelledby="speaking-heading"
    >
      <DisplayTitle
        align="center"
        theme="light"
        words={[
          { text: "Sharing", emphasis: "muted" },
          { text: "Speaking", emphasis: "primary" },
          { text: "Inspiring", emphasis: "muted" },
        ]}
      />

      <ScrollReveal>
        <SectionHeading
          id="speaking-heading"
          title="Sharing Insights, Inspiring Change."
          subtitle="From global tech summits to intimate boardrooms — exploring entrepreneurship, innovation, and what it means to build with purpose."
        />
         <div
        className="heading-line mt-6 h-px w-full max-w-md origin-left bg-linear-to-r from-charcoal via-charcoal/60 to-transparent sm:mt-8"
        aria-hidden="true"
      />
      </ScrollReveal>

      <div className="mt-8 sm:mt-12 md:mt-16">
        <SpeakingCarousel />
      </div>
    </SectionShell>
  );
}

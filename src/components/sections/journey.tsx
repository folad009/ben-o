import { DisplayTitle } from "@/components/ui/display-title";
import { JourneyTimeline } from "@/components/sections/journey-timeline";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";

export function Journey() {
  return (
    <SectionShell
      id="journey"
      className="bg-charcoal text-white"
      aria-labelledby="journey-heading"
    >
      <DisplayTitle
        align="center"
        theme="dark"
        words={[
          { text: "The", emphasis: "muted" },
          { text: "Journey", emphasis: "primary" },
        ]}
      />

      <SectionHeading
        id="journey-heading"
        variant="dark"
        title="A Legacy in the Making."
        subtitle="From university dorms to global stages, every chapter driven by purpose, innovation, and the audacity to build."
      />
       <div
        className="heading-line mt-6 h-px w-full max-w-md origin-left bg-linear-to-r from-sand via-sand/60 to-transparent sm:mt-8"
        aria-hidden="true"
      />

      <JourneyTimeline />
    </SectionShell>
  );
}

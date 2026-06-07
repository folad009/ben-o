"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { IMAGE, SITE } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-image", {
        opacity: 0,
        scale: 1.04,
        duration: 1.4,
      })
        .from(
          ".hero-eyebrow",
          { opacity: 0, y: 24, duration: 0.8 },
          "-=0.8",
        )
        .from(
          ".hero-name",
          { opacity: 0, y: 32, duration: 1 },
          "-=0.5",
        )
        .from(
          ".hero-intro",
          { opacity: 0, y: 24, duration: 0.9 },
          "-=0.4",
        );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="bg-ivory" aria-label="Hero">
      <div className="relative min-h-[90vh] w-full overflow-hidden md:min-h-screen">
        <div className="hero-image absolute inset-0">
          <Image
            src={IMAGE}
            alt=""
            fill
            priority
            className="object-cover object-[center_15%]"
            sizes="100vw"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-linear-to-b from-charcoal/55 via-charcoal/35 to-charcoal/55"
            aria-hidden="true"
          />
        </div>

        <div className="hero-bg-text relative z-10 flex min-h-[90vh] flex-col items-center justify-end px-5 pb-2 pt-24 text-center md:min-h-screen md:px-8 md:pb-4 md:pt-28">
          <Eyebrow className="hero-eyebrow mb-0 text-ivory/90 drop-shadow-md md:mb-2">
            {SITE.tagline.replace(/ • /g, " · ")}
          </Eyebrow>
          <h1 className="hero-name pointer-events-none w-full max-w-360 select-none whitespace-nowrap font-display text-[clamp(2.55rem,11vw,12rem)] font-bold leading-none tracking-tighter text-ivory [text-shadow:0_2px_24px_rgba(0,0,0,0.6),0_4px_48px_rgba(0,0,0,0.4)]">
            {SITE.name}
          </h1>
        </div>
      </div>

      <div className="hero-intro mx-auto max-w-360 px-6 pb-24 pt-14 text-center md:px-12 md:pb-32 md:pt-16">
        <p className="mx-auto max-w-2xl text-base leading-[1.8] text-charcoal/80 md:text-lg">
          Reshaping industries and empowering people across Africa and emerging
          markets, Co-founder of Shekel Mobility, Forbes Business Council Member,
          and a Harambean Fellow.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="#journey" variant="sand" className="font-display font-bold">
            Explore Journey
          </Button>
          <Button href="#contact" variant="secondary" className="font-display font-bold">
           Let&apos;s Connect
          </Button>
        </div>
      </div>
    </section>
  );
}

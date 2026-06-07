"use client";

import { JOURNEY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function JourneyTimeline() {
  const pinRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const pin = pinRef.current;
      const content = contentRef.current;
      if (!pin || !content) return;

      const track = pin.querySelector<HTMLElement>(".journey-track-progress");
      const milestones = gsap.utils.toArray<HTMLElement>(
        ".journey-milestone",
        pin,
      );
      const count = milestones.length;

      const clearInlineStyles = () => {
        gsap.set([content, ...milestones], {
          clearProps: "opacity,transform,scale,y",
        });
        milestones.forEach((milestone) => {
          const card = milestone.querySelector<HTMLElement>(".journey-card");
          if (card) gsap.set(card, { clearProps: "opacity,transform,scale,y" });
        });
      };

      const setActiveMilestone = (activeIndex: number) => {
        milestones.forEach((milestone, index) => {
          milestone.dataset.active = index === activeIndex ? "true" : "false";
        });
      };

      const getScrollDistance = () => {
        const viewport = pin.offsetHeight;
        const contentHeight = content.offsetHeight;
        return Math.max(
          contentHeight - viewport * 0.45,
          viewport * (count - 1) * 0.45,
        );
      };

      const getYOffset = () => {
        const viewport = pin.offsetHeight;
        const contentHeight = content.offsetHeight;
        return -(contentHeight - viewport * 0.7);
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        clearInlineStyles();
        setActiveMilestone(0);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            pinSpacing: true,
            pinType: "transform",
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const activeIndex = Math.min(
                Math.round(self.progress * (count - 1)),
                count - 1,
              );
              setActiveMilestone(activeIndex);
            },
          },
        });

        tl.to(content, { y: getYOffset, ease: "none", duration: 1 });

        if (track) {
          tl.fromTo(
            track,
            { scaleY: 0 },
            { scaleY: 1, ease: "none", duration: 1, immediateRender: false },
            0,
          );
        }

        const refresh = () => {
          clearInlineStyles();
          ScrollTrigger.refresh();
        };

        requestAnimationFrame(refresh);
        window.addEventListener("load", refresh);

        return () => {
          window.removeEventListener("load", refresh);
          clearInlineStyles();
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        clearInlineStyles();
        milestones.forEach((milestone) => {
          milestone.dataset.active = "true";
        });
        if (track) gsap.set(track, { scaleY: 1 });
      });

      return () => mm.revert();
    },
    { scope: pinRef },
  );

  return (
    <div className="relative mt-6 sm:mt-8 md:mt-12">
      <div
        ref={pinRef}
        className="relative h-[min(68svh,620px)] w-full overflow-hidden md:h-[min(72svh,680px)]"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-white/25 md:left-1/2 md:-translate-x-px" />
          <div className="journey-track-progress absolute bottom-0 left-4 top-0 w-px origin-top bg-sand md:left-1/2 md:-translate-x-px" />
        </div>

        <div
          ref={contentRef}
          className="journey-pin-content relative w-full pt-[10vh] pb-[11vh] md:pt-[12vh] md:pb-[12vh]"
        >
          <ol className="relative space-y-16 md:space-y-24">
            {JOURNEY.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <li
                  key={item.year}
                  data-active={index === 0 ? "true" : "false"}
                  className={cn(
                    "journey-milestone group relative",
                    isEven ? "md:pr-[52%]" : "md:pl-[52%]",
                    isEven ? "md:-translate-y-6" : "md:translate-y-6",
                  )}
                >
                  <span
                    className={cn(
                      "journey-dot absolute top-6 z-10 flex h-5 w-5 scale-100 items-center justify-center rounded-full border border-sand bg-charcoal transition-transform duration-500 md:top-8",
                      "left-4 -translate-x-1/2 md:left-1/2",
                      "group-data-[active=true]:scale-125",
                    )}
                    aria-hidden="true"
                  >
                    <span className="h-2 w-2 rounded-full bg-sand" />
                  </span>

                  <article
                    className={cn(
                      "journey-card ml-12 border border-white/20 bg-white/8 p-5 transition-[border-color,box-shadow] duration-500 md:ml-0 md:p-6",
                      "group-data-[active=true]:border-sand/60 group-data-[active=true]:shadow-[0_0_40px_rgba(217,164,106,0.12)]",
                      isEven ? "md:text-right" : "md:text-left",
                    )}
                  >
                    <p className="font-display text-3xl text-sand md:text-4xl">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.35em] text-white/80">
                      {item.year}
                    </p>
                    <h3 className="mt-3 font-display text-xl leading-snug text-white md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-base">
                      {item.description}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

"use client";

import { IMAGE, SPEAKING } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export function SpeakingCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    if (!slides.length) return;

    const trackLeft = track.scrollLeft;
    const trackCenter = trackLeft + track.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(trackCenter - slideCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
    setCanScrollPrev(trackLeft > 4);
    setCanScrollNext(trackLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;

    const offset =
      slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;

    track.scrollTo({ left: offset, behavior: "smooth" });
  };

  const scrollPrev = () => scrollToIndex(Math.max(activeIndex - 1, 0));
  const scrollNext = () =>
    scrollToIndex(Math.min(activeIndex + 1, SPEAKING.length - 1));

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-linear-to-r from-sand to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-linear-to-l from-sand to-transparent md:block" />

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
        aria-label="Speaking engagements carousel"
      >
        {SPEAKING.map((event) => (
          <article
            key={event.topic}
            className="group w-[min(88vw,520px)] shrink-0 snap-center border border-charcoal/10 bg-white p-6 transition-shadow duration-300 hover:shadow-lg sm:w-[min(72vw,520px)] md:p-8"
          >
            <div className="flex gap-6">
              <div className="relative hidden h-32 w-28 shrink-0 overflow-hidden sm:block">
                <Image
                  src={IMAGE}
                  alt={event.topic}
                  fill
                  className="object-cover object-top"
                  sizes="112px"
                />
              </div>
              <div>
                <h3 className="font-display text-xl text-charcoal md:text-2xl">
                  {event.topic}
                </h3>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal/60">
                  <span>{event.location}</span>
                  <span className="text-sand">{event.description}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex gap-2">
          {SPEAKING.map((event, index) => (
            <button
              key={event.topic}
              type="button"
              onClick={() => scrollToIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-8 bg-sand"
                  : "w-2 bg-charcoal/20 hover:bg-charcoal/35",
              )}
              aria-label={`Go to slide ${index + 1}: ${event.topic}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory disabled:pointer-events-none disabled:opacity-30"
            aria-label="Previous speaking engagement"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory disabled:pointer-events-none disabled:opacity-30"
            aria-label="Next speaking engagement"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

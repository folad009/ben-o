"use client";

import { IMAGE, SPEAKING } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_DELAY_MS = 5000;
const MANUAL_PAUSE_MS = 8000;

export function SpeakingCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const manualPauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;

    const offset =
      slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;

    track.scrollTo({ left: offset, behavior: "smooth" });
  }, []);

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

    activeIndexRef.current = closestIndex;
    setActiveIndex(closestIndex);
  }, []);

  const pauseTemporarily = useCallback(() => {
    setIsPaused(true);

    if (manualPauseTimeoutRef.current) {
      clearTimeout(manualPauseTimeoutRef.current);
    }

    manualPauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      manualPauseTimeoutRef.current = null;
    }, MANUAL_PAUSE_MS);
  }, []);

  const goToIndex = useCallback(
    (index: number, fromUser = false) => {
      if (fromUser) pauseTemporarily();
      scrollToIndex(index);
    },
    [pauseTemporarily, scrollToIndex],
  );

  const scrollPrev = () => {
    const prevIndex =
      (activeIndexRef.current - 1 + SPEAKING.length) % SPEAKING.length;
    goToIndex(prevIndex, true);
  };

  const scrollNext = () => {
    const nextIndex = (activeIndexRef.current + 1) % SPEAKING.length;
    goToIndex(nextIndex, true);
  };

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

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || isPaused || SPEAKING.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndexRef.current + 1) % SPEAKING.length;
      scrollToIndex(nextIndex);
    }, AUTOPLAY_DELAY_MS);

    return () => clearInterval(interval);
  }, [isPaused, scrollToIndex]);

  useEffect(() => {
    return () => {
      if (manualPauseTimeoutRef.current) {
        clearTimeout(manualPauseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-linear-to-r from-sand to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-linear-to-l from-sand to-transparent md:block" />

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
        aria-label="Speaking engagements carousel"
        aria-roledescription="carousel"
        aria-live="off"
      >
        {SPEAKING.map((event, index) => (
          <article
            key={event.topic}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${SPEAKING.length}`}
            aria-hidden={index !== activeIndex}
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
              onClick={() => goToIndex(index, true)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-8 bg-white"
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
            aria-label="Previous speaking engagement"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-ivory"
            aria-label="Next speaking engagement"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

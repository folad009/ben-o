"use client";

import { SPEAKING } from "@/lib/constants";
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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-5 bg-linear-to-r from-sand to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-5 bg-linear-to-l from-sand to-transparent md:block" />

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
            aria-label={`${index + 1} of ${SPEAKING.length}: ${event.topic}`}
            aria-hidden={index !== activeIndex}
            data-active={index === activeIndex ? "true" : "false"}
            className="group relative aspect-[4/5] w-[min(72vw,340px)] shrink-0 snap-center overflow-hidden sm:w-[min(56vw,360px)] md:w-[min(42vw,380px)]"
          >
            <Image
              src={event.image}
              alt={event.topic}
              fill
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 72vw, (max-width: 1024px) 56vw, 380px"
            />

            <div
              className={cn(
                "absolute inset-0 bg-linear-to-t from-charcoal/90 via-charcoal/35 to-charcoal/10",
                "opacity-0 transition-opacity duration-500",
                "group-hover:opacity-100",
                "max-md:group-data-[active=true]:opacity-100",
                "motion-reduce:opacity-100",
              )}
              aria-hidden="true"
            />

            <div
              className={cn(
                "absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 text-ivory",
                "translate-y-3 opacity-0 transition-all duration-500 ease-out",
                "group-hover:translate-y-0 group-hover:opacity-100",
                "max-md:group-data-[active=true]:translate-y-0 max-md:group-data-[active=true]:opacity-100",
                "motion-reduce:translate-y-0 motion-reduce:opacity-100",
              )}
            >
              <h3 className="font-display text-xl leading-tight md:text-2xl">
                {event.topic}
              </h3>
              <p className="text-sm text-ivory/80">{event.location}</p>
              <p className="text-sm leading-relaxed text-sand">
                {event.description}
              </p>
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

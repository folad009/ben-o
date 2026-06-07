"use client";

import { DisplayTitle } from "@/components/ui/display-title";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/ui/section-shell";
import {
  ACHIEVEMENT_LEADERSHIP,
  ACHIEVEMENT_METRICS,
  ACHIEVEMENT_RECOGNITION,
  ACHIEVEMENT_VENTURES,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ACHIEVEMENT_TABS = [
  { id: "ventures", title: "Ventures", items: ACHIEVEMENT_VENTURES },
  { id: "recognition", title: "Recognition", items: ACHIEVEMENT_RECOGNITION },
  { id: "leadership", title: "Leadership", items: ACHIEVEMENT_LEADERSHIP },
] as const;

const METRIC_LAYOUT = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "",
  "",
  "md:col-span-2",
] as const;

function formatMetric(
  value: number,
  prefix: string,
  suffix: string,
): string {
  return `${prefix}${value}${suffix}`;
}

export function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const metrics = gsap.utils.toArray<HTMLElement>(".metric-value");
      const cards = gsap.utils.toArray<HTMLElement>(".metric-card");
      const headingLine = sectionRef.current?.querySelector(".heading-line");

      if (prefersReducedMotion) {
        metrics.forEach((el) => {
          const value = Number(el.dataset.value);
          const prefix = el.dataset.prefix ?? "";
          const suffix = el.dataset.suffix ?? "";
          el.textContent = formatMetric(value, prefix, suffix);
        });
        return;
      }

      if (headingLine) {
        gsap.fromTo(
          headingLine,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: headingLine,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          rotateX: 8,
          duration: 0.8,
          delay: index * 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      metrics.forEach((el) => {
        const value = Number(el.dataset.value);
        const prefix = el.dataset.prefix ?? "";
        const suffix = el.dataset.suffix ?? "";
        const counter = { val: 0 };

        gsap.to(counter, {
          val: value,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = formatMetric(
              Math.round(counter.val),
              prefix,
              suffix,
            );
          },
        });
      });
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!listRef.current || prefersReducedMotion) return;

      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        },
      );
    },
    { scope: listRef, dependencies: [activeTab] },
  );

  const activeItems = ACHIEVEMENT_TABS[activeTab].items;

  return (
    <SectionShell
      ref={sectionRef}
      id="achievements"
      className="overflow-hidden bg-charcoal text-white"
      aria-labelledby="achievements-heading"
      decorations={
        <>
          <div
            className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-sand/10 blur-[120px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sand/5 blur-[100px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-size-[32px_32px"
            aria-hidden="true"
          />
        </>
      }
    >
      <DisplayTitle
        align="center"
        theme="dark"
        words={[
          { text: "My", emphasis: "muted" },
          { text: "Achievements", emphasis: "primary" },
        ]}
      />

      <SectionHeading
        id="achievements-heading"
        variant="dark"
        title="Numbers That Tell the Story."
        subtitle="A snapshot of impact across ventures, recognition, and leadership — measured in years, transactions, and lives touched."
      />

      <div
        className="heading-line mt-6 h-px w-full max-w-md origin-left bg-linear-to-r from-sand via-sand/60 to-transparent sm:mt-8"
        aria-hidden="true"
      />

        <div className="mt-10 grid grid-cols-2 gap-2 sm:mt-16 sm:gap-3 md:grid-cols-4 md:gap-4">
          {ACHIEVEMENT_METRICS.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                "metric-card group relative overflow-hidden rounded-sm border border-white/20 bg-white/5 p-4 backdrop-blur-sm transition-all duration-500 hover:border-sand/50 hover:bg-white/8 hover:shadow-[0_0_60px_rgba(217,164,106,0.12)] sm:p-6 md:p-8",
                METRIC_LAYOUT[index],
              )}
            >
              <span
                className="absolute right-4 top-4 font-body text-[10px] font-medium uppercase tracking-[0.35em] text-white/50 transition-colors duration-300 group-hover:text-sand"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-sand to-sand/60 transition-all duration-500 group-hover:w-full"
                aria-hidden="true"
              />

              <p
                className={cn(
                  "metric-value font-body font-bold tracking-tight text-sand transition-transform duration-500 group-hover:scale-[1.03]",
                  index === 0
                    ? "text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
                    : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
                )}
                data-value={metric.value}
                data-prefix={metric.prefix}
                data-suffix={metric.suffix}
              >
                {formatMetric(0, metric.prefix, metric.suffix)}
              </p>
              <p className="mt-4 max-w-56 text-[10px] font-medium uppercase leading-relaxed tracking-[0.35em] text-white/85 md:text-[11px]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-28">
          <div
            className="flex flex-wrap gap-2 border-b border-white/10 pb-6 md:gap-4"
            role="tablist"
            aria-label="Achievement categories"
          >
            {ACHIEVEMENT_TABS.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`achievement-panel-${tab.id}`}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "relative px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] transition-colors duration-300 md:text-sm",
                  activeTab === index
                    ? "text-sand"
                    : "text-white/65 hover:text-white",
                )}
              >
                {tab.title}
                {activeTab === index && (
                  <span className="absolute inset-x-4 -bottom-6 h-px bg-sand" />
                )}
              </button>
            ))}
          </div>

          <div
            id={`achievement-panel-${ACHIEVEMENT_TABS[activeTab].id}`}
            role="tabpanel"
            className="mt-10 rounded-sm border border-white/20 bg-white/5 p-6 md:p-10"
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <h3 className="font-display text-2xl text-white md:text-3xl">
                {ACHIEVEMENT_TABS[activeTab].title}
              </h3>
              <span className="text-xs uppercase tracking-[0.35em] text-white/70">
                {activeItems.length} highlights
              </span>
            </div>

            <ul ref={listRef} className="grid gap-3 md:grid-cols-2 md:gap-4">
              {activeItems.map((item, index) => (
                <li key={item}>
                  <div className="achievement-item group flex items-start gap-4 rounded-sm border border-transparent px-4 py-4 transition-all duration-300 hover:border-white/10 hover:bg-white/4">
                    <span
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sand/40 bg-sand/10 font-body text-[11px] font-bold text-sand"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-relaxed text-white transition-colors duration-300 group-hover:text-sand md:text-base">
                        {item}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="mt-1 shrink-0 text-sand/70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sand"
                      aria-hidden="true"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </SectionShell>
  );
}

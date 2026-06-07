import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface SectionShellProps {
  id?: string;
  children: React.ReactNode;
  decorations?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  container?: boolean;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  function SectionShell(
    {
      id,
      children,
      decorations,
      className,
      innerClassName,
      container = true,
      "aria-labelledby": ariaLabelledby,
      "aria-label": ariaLabel,
    },
    ref,
  ) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn("relative py-8 md:py-7 lg:py-10", className)}
        aria-labelledby={ariaLabelledby}
        aria-label={ariaLabel}
      >
        {decorations}
        {container ? (
          <div
            className={cn(
              "relative mx-auto max-w-360 px-5 sm:px-6 md:px-12",
              innerClassName,
            )}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    );
  },
);

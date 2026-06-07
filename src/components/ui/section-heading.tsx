import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  variant?: "light" | "dark";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  variant = "light",
  id,
  className,
}: SectionHeadingProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow theme={variant} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        id={id}
        className={cn(
          "font-display text-2xl leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl",
          isDark ? "text-white" : "text-charcoal",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:mt-6 md:text-xl",
            isDark ? "text-white/75" : "text-charcoal/70",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

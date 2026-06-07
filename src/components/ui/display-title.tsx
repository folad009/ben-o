import { cn } from "@/lib/utils";

export type DisplayWordEmphasis = "primary" | "secondary" | "muted";

export interface DisplayWord {
  text: string;
  emphasis?: DisplayWordEmphasis;
}

interface DisplayTitleProps {
  words: DisplayWord[];
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

const WORD_SIZE = {
  primary:
    "text-[clamp(3.15rem,10vw,4.5rem)] md:text-[clamp(4.5rem,11vw,10.5rem)]",
  secondary:
    "text-[clamp(3.15rem,10vw,4.5rem)] md:text-[clamp(4.5rem,11vw,10.5rem)]",
  muted:
    "text-[clamp(2rem,6vw,2.5rem)] md:text-[clamp(2.5rem,8vw,5rem)]",
} as const;

export function DisplayTitle({
  words,
  align = "center",
  theme = "light",
  className,
}: DisplayTitleProps) {
  const lightColors = {
    primary: "text-charcoal",
    secondary: "text-charcoal/20",
    muted: "text-grey/50",
  } as const;

  const darkColors = {
    primary: "text-white",
    secondary: "text-white/20",
    muted: "text-white/40",
  } as const;

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <div
      className={cn(
        "pointer-events-none w-full select-none overflow-hidden py-2 md:py-6",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex items-baseline gap-1.5 whitespace-nowrap sm:gap-2 md:gap-4",
          align === "center" ? "justify-center" : "justify-start",
        )}
      >
        {words.map((word, index) => {
          const emphasis = word.emphasis ?? "muted";

          return (
            <span
              key={`${word.text}-${index}`}
              className={cn(
                "font-hero uppercase leading-none tracking-tight",
                WORD_SIZE[emphasis],
                colors[emphasis],
              )}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}

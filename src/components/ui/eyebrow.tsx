import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

export function Eyebrow({ children, className, theme = "light" }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-[0.35em]",
        theme === "light" ? "text-sand" : "text-sand",
        className,
      )}
    >
      {children}
    </p>
  );
}

import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "sand";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  href?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-charcoal bg-charcoal text-ivory hover:bg-transparent hover:text-charcoal",
  secondary:
    "border border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-ivory",
  ghost:
    "border border-transparent bg-transparent text-charcoal hover:border-charcoal",
  sand:
    "border-0 bg-sand text-charcoal hover:bg-sand/80",
};

export function Button({
  className,
  variant = "primary",
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

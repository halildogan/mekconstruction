import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "outline-light" | "ghost-light";
export type ButtonSize = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2.5 font-semibold tracking-[0.01em] transition-colors duration-200 ease-(--ease-standard) disabled:cursor-not-allowed disabled:opacity-60 select-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-ink hover:bg-accent-hover",
  secondary: "bg-ink text-white hover:bg-graphite",
  outline: "border border-ink text-ink hover:bg-ink hover:text-white",
  "outline-light": "border border-white/60 text-white hover:border-white hover:bg-white hover:text-ink",
  "ghost-light": "text-white underline-offset-4 hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-13 px-6 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
      strokeWidth={2.25}
    />
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
};

export function Button({ variant, size, arrow, className, children, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

type LinkButtonProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function LinkButton({ variant, size, arrow, className, children, ...props }: LinkButtonProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

type TextLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & {
  className?: string;
  dark?: boolean;
  children: ReactNode;
};

/** Inline call-to-action link with an arrow. */
export function ArrowLink({ className, dark, children, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2 font-semibold underline decoration-2 underline-offset-[6px] transition-colors",
        dark ? "text-white decoration-accent hover:text-accent" : "text-ink decoration-accent hover:text-accent-ink",
        className,
      )}
      {...props}
    >
      {children}
      <Arrow />
    </Link>
  );
}

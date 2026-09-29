import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Tone = "paper" | "white" | "ink" | "charcoal";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  white: "bg-white text-ink",
  ink: "surface-dark bg-ink text-white",
  charcoal: "surface-dark bg-charcoal text-white",
};

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: Tone;
  spacing?: "default" | "compact" | "none";
};

export function Section({ tone = "paper", spacing = "default", className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        tones[tone],
        spacing === "default" && "py-16 sm:py-20 lg:py-28",
        spacing === "compact" && "py-12 sm:py-16",
        className,
      )}
      {...props}
    />
  );
}

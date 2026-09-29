import { cn } from "@/lib/cn";

/**
 * MEK mark: a steel-stud wall elevation — top track, three studs and an amber
 * bottom track — that also reads as the "m" of MEK.
 *
 * If MEK has an official vector logo, replace this component's SVG (and
 * src/app/icon.svg / public/brand/*) with it.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={cn("shrink-0", className)}>
      <rect width="48" height="48" fill="#111315" />
      <g fill="#f5f4f0">
        <rect x="10" y="11" width="28" height="5" />
        <rect x="10" y="11" width="5" height="22" />
        <rect x="21.5" y="11" width="5" height="22" />
        <rect x="33" y="11" width="5" height="22" />
      </g>
      <rect x="10" y="35" width="28" height="3" fill="#e3a21a" />
    </svg>
  );
}

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className={cn("size-10", dark && "outline outline-1 -outline-offset-1 outline-white/20")} />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[1.375rem] font-[800] tracking-[0.04em] [font-stretch:88%]", dark ? "text-white" : "text-ink")}>
          MEK
        </span>
        <span className={cn("eyebrow mt-1 text-[0.625rem] tracking-[0.14em]", dark ? "text-steel-400" : "text-steel-600")}>
          Construction Inc.
        </span>
      </span>
    </span>
  );
}

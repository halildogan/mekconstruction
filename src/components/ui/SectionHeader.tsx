import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  /** Section number shown in the technical label, e.g. "01". */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  id?: string;
  /** Heading level; defaults to h2. */
  as?: "h2" | "h3";
  dark?: boolean;
  className?: string;
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  actions,
  id,
  as: Heading = "h2",
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "grid gap-6 border-t pt-6 lg:grid-cols-12 lg:gap-10",
        dark ? "border-white/15" : "border-ink/15",
        className,
      )}
    >
      <p className={cn("eyebrow lg:col-span-3", dark ? "text-steel-400" : "text-steel-600")}>
        {index && <span className={dark ? "text-accent" : "text-accent-ink"}>{index} / </span>}
        {eyebrow}
      </p>
      <div className="lg:col-span-9">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Heading id={id} className="heading text-3xl sm:text-4xl lg:text-[2.75rem]">
              {title}
            </Heading>
            {description && (
              <div className={cn("mt-4 text-lg leading-relaxed", dark ? "text-concrete-300" : "text-steel-600")}>
                {description}
              </div>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

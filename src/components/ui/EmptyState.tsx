import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
  /** Developer-only notices get a dashed outline so they are never mistaken for public UI. */
  developerNotice?: boolean;
  className?: string;
}

export function EmptyState({ title, children, actions, developerNotice, className }: EmptyStateProps) {
  return (
    <div
      role={developerNotice ? "note" : undefined}
      className={cn(
        "p-8 sm:p-10",
        developerNotice ? "border-2 border-dashed border-accent-ink/50 bg-white" : "border border-ink/12 bg-white",
        className,
      )}
    >
      {developerNotice && <p className="eyebrow mb-3 text-accent-ink">Development only — not shown in production</p>}
      <h3 className="heading text-2xl">{title}</h3>
      {children && <div className="mt-3 max-w-2xl leading-relaxed text-steel-600">{children}</div>}
      {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

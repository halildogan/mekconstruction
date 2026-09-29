import type { CapabilityItem } from "@/types/content";
import { cn } from "@/lib/cn";

/** Numbered two-column list used for "why MEK" criteria and process steps. */
export function CapabilityList({
  items,
  dark = false,
  columns = 2,
}: {
  items: CapabilityItem[];
  dark?: boolean;
  columns?: 1 | 2 | 3;
}) {
  return (
    <ol
      className={cn(
        "grid border-t",
        dark ? "border-white/15" : "border-ink/15",
        columns === 2 && "md:grid-cols-2 md:gap-x-10",
        columns === 3 && "md:grid-cols-2 md:gap-x-10 xl:grid-cols-3",
      )}
    >
      {items.map((item, i) => (
        <li key={item.title} className={cn("grid grid-cols-[3rem_1fr] border-b py-6", dark ? "border-white/15" : "border-ink/15")}>
          <span className={cn("eyebrow pt-1.5", dark ? "text-accent" : "text-accent-ink")}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className={cn("mt-2 leading-relaxed", dark ? "text-concrete-300" : "text-steel-600")}>{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/cn";

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={cn("flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm", dark ? "text-steel-400" : "text-steel-600")}>
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={dark ? "text-white" : "text-ink"}>
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.path}
                      className={cn("underline-offset-4 hover:underline", dark ? "hover:text-white" : "hover:text-ink")}
                    >
                      {crumb.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </>
  );
}

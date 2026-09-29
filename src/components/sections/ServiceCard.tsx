import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types/content";
import { Photo } from "@/components/ui/Photo";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col border border-ink/12 bg-white transition-colors duration-200 hover:border-ink"
    >
      <Photo
        image={service.image}
        sizes="(min-width: 1440px) 460px, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
        ratio="aspect-[4/3]"
        imageClassName="grayscale-[20%] transition-transform duration-500 ease-(--ease-standard) group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow text-steel-600">{String(index + 1).padStart(2, "0")}</p>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 text-steel-400 transition-colors group-hover:text-accent-ink"
          />
        </div>
        <h3 className="heading mt-3 text-2xl">{service.name}</h3>
        <p className="mt-3 leading-relaxed text-steel-600">{service.summary}</p>
        <span className="mt-auto pt-6 text-sm font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px]">
          View scope details
        </span>
      </div>
    </Link>
  );
}

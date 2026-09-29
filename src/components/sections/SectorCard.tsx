import Link from "next/link";
import type { Sector } from "@/types/content";
import { Photo } from "@/components/ui/Photo";

/** Image-led sector tile for dark sections. */
export function SectorCard({ sector }: { sector: Sector }) {
  return (
    <Link
      href={`/sectors#${sector.slug}`}
      className="group relative flex min-h-[20rem] flex-col justify-end overflow-hidden border border-white/10 sm:min-h-[22rem]"
    >
      <Photo
        image={sector.image}
        sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
        decorative
        cover
        className="bg-graphite"
        imageClassName="grayscale-[45%] transition-transform duration-500 ease-(--ease-standard) group-hover:scale-[1.04]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_19_21/0.1)_0%,rgb(17_19_21/0.92)_75%)]" />
      <div className="relative p-6">
        <h3 className="heading text-2xl text-white">{sector.name}</h3>
        <p className="mt-2 leading-relaxed text-concrete-300">{sector.summary}</p>
        <span aria-hidden="true" className="mt-5 block h-0.5 w-10 bg-accent transition-[width] duration-300 group-hover:w-16" />
      </div>
    </Link>
  );
}

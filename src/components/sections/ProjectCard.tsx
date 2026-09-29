import Link from "next/link";
import type { Project } from "@/types/content";
import { Photo } from "@/components/ui/Photo";
import { formatMonthYear } from "@/lib/format";

export function ProjectCard({ project, sectorName }: { project: Project; sectorName?: string }) {
  const meta = [sectorName, project.location, project.completionDate && formatMonthYear(project.completionDate)].filter(
    Boolean,
  );
  return (
    <Link href={`/projects/${project.slug}`} className="group flex h-full flex-col border border-ink/12 bg-white hover:border-ink">
      {project.featuredImage ? (
        <Photo
          image={project.featuredImage}
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
          ratio="aspect-[4/3]"
          imageClassName="transition-transform duration-500 ease-(--ease-standard) group-hover:scale-[1.03]"
        />
      ) : (
        <div aria-hidden="true" className="grid-lines aspect-[4/3] bg-concrete-100" />
      )}
      <div className="flex flex-1 flex-col p-6">
        {meta.length > 0 && <p className="eyebrow text-steel-600">{meta.join(" · ")}</p>}
        <h3 className="heading mt-3 text-xl">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-steel-600">{project.shortDescription}</p>
      </div>
    </Link>
  );
}

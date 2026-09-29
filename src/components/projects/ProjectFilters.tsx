"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types/content";
import type { Option } from "@/lib/forms/options";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { cn } from "@/lib/cn";

interface ProjectFiltersProps {
  projects: Project[];
  sectors: Option[];
  services: Option[];
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {[{ value: "all", label: "All" }, ...options].map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "min-h-10 border px-4 text-[0.9375rem] font-medium transition-colors",
            value === o.value ? "border-ink bg-ink text-white" : "border-ink/20 bg-white hover:border-ink",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Client-side filtering of an already-rendered project list — instant, no round trips. */
export function ProjectFilters({ projects, sectors, services }: ProjectFiltersProps) {
  const [sector, setSector] = useState("all");
  const [service, setService] = useState("all");

  const usedSectors = sectors.filter((s) => projects.some((p) => p.sector === s.value));
  const usedServices = services.filter((s) => projects.some((p) => p.services?.includes(s.value)));

  const visible = useMemo(
    () =>
      projects.filter(
        (p) => (sector === "all" || p.sector === sector) && (service === "all" || p.services?.includes(service)),
      ),
    [projects, sector, service],
  );

  return (
    <div>
      <div className="grid gap-4 border-y border-ink/15 py-6">
        {usedSectors.length > 1 && (
          <div className="grid gap-2 md:grid-cols-[8rem_1fr] md:items-center">
            <p className="eyebrow text-steel-600">Sector</p>
            <FilterGroup label="Filter by sector" options={usedSectors} value={sector} onChange={setSector} />
          </div>
        )}
        {usedServices.length > 1 && (
          <div className="grid gap-2 md:grid-cols-[8rem_1fr] md:items-center">
            <p className="eyebrow text-steel-600">Trade</p>
            <FilterGroup label="Filter by trade" options={usedServices} value={service} onChange={setService} />
          </div>
        )}
        <p className="text-sm text-steel-600" role="status" aria-live="polite">
          Showing {visible.length} of {projects.length} project{projects.length === 1 ? "" : "s"}
        </p>
      </div>

      {visible.length > 0 ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} sectorName={sectors.find((s) => s.value === p.sector)?.label} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-steel-600">No projects match these filters.</p>
      )}
    </div>
  );
}

import "server-only";

import type { Project, Sector, Service } from "@/types/content";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { projects } from "@/content/projects";

/**
 * Content repository.
 *
 * Pages and components read content only through these functions. They are
 * async on purpose: swapping the typed data modules for a headless CMS or a
 * PostgreSQL/Prisma-backed store later means changing this file, not the UI.
 */

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export async function getServices(): Promise<Service[]> {
  return [...services].sort(byOrder);
}

export async function getFeaturedServices(): Promise<Service[]> {
  return (await getServices()).filter((s) => s.featured);
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return services.find((s) => s.slug === slug);
}

export async function getServicesBySlugs(slugs: readonly string[]): Promise<Service[]> {
  return slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
}

export async function getSectors(): Promise<Sector[]> {
  return [...sectors].sort(byOrder);
}

export async function getFeaturedSectors(): Promise<Sector[]> {
  return (await getSectors()).filter((s) => s.featured);
}

export async function getSectorBySlug(slug: string): Promise<Sector | undefined> {
  return sectors.find((s) => s.slug === slug);
}

function sortProjects(a: Project, b: Project): number {
  return (b.completionDate ?? "").localeCompare(a.completionDate ?? "");
}

/** Published projects only — unpublished entries never leave this module. */
export async function getProjects(): Promise<Project[]> {
  return projects.filter((p) => p.published).sort(sortProjects);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.featured).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug);
}

export async function getProjectsForService(slug: string, limit = 3): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.services?.includes(slug)).slice(0, limit);
}

export async function getRelatedProjects(project: Project, limit = 3): Promise<Project[]> {
  const all = await getProjects();
  const scored = all
    .filter((p) => p.slug !== project.slug)
    .map((p) => {
      let score = 0;
      if (project.sector && p.sector === project.sector) score += 2;
      for (const s of p.services ?? []) if (project.services?.includes(s)) score += 1;
      return { p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ p }) => p);
}

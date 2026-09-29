import type { Project } from "@/types/content";

/**
 * Verified MEK projects.
 *
 * This list is intentionally empty until real project information is supplied.
 * Never add placeholder, sample or illustrative projects here — anything with
 * `published: true` is shown publicly, in the sitemap and in structured data.
 *
 * While there are no published projects:
 * - the homepage "Featured projects" section is hidden,
 * - /projects shows an honest "portfolio in preparation" message,
 * - /projects/[slug] returns 404.
 *
 * See README.md → "Adding a project" for a complete, annotated example entry.
 * Store project photos in src/assets/images/projects/<slug>/ and import them.
 */
export const projects: Project[] = [];

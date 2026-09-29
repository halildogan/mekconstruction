import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjects,
  getRelatedProjects,
  getSectorBySlug,
  getServicesBySlugs,
} from "@/lib/content";
import { formatMonthYear } from "@/lib/format";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CTASection } from "@/components/sections/CTASection";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { TrackView } from "@/components/analytics/TrackView";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return createMetadata({
    title: project.seo?.title ?? project.title,
    description: project.seo?.description ?? project.shortDescription,
    path: `/projects/${project.slug}`,
  });
}

const STATUS_LABEL = { completed: "Completed", "in-progress": "In progress", upcoming: "Upcoming" } as const;

function TextBlock({ title, paragraphs }: { title: string; paragraphs?: string[] }) {
  if (!paragraphs?.length) return null;
  return (
    <section className="border-t border-ink/15 pt-6">
      <h2 className="eyebrow text-steel-600">{title}</h2>
      <div className="prose-mek mt-4">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const [sector, services, related] = await Promise.all([
    project.sector ? getSectorBySlug(project.sector) : undefined,
    getServicesBySlugs(project.services ?? []),
    getRelatedProjects(project),
  ]);

  const facts = [
    { label: "Location", value: project.location },
    { label: "Sector", value: sector?.name },
    { label: "Status", value: project.status ? STATUS_LABEL[project.status] : undefined },
    { label: "Completed", value: project.completionDate ? formatMonthYear(project.completionDate) : undefined },
    ...(project.metadata ?? []),
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <>
      <PageHero
        eyebrow={sector ? `${sector.name} project` : "Project"}
        title={project.title}
        lead={<p>{project.shortDescription}</p>}
        breadcrumbs={[
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
        image={project.featuredImage}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-4">
            {facts.length > 0 && (
              <dl className="border border-ink/15 bg-white">
                {facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-ink/10 px-5 py-4 last:border-b-0">
                    <dt className="eyebrow pt-0.5 text-steel-600">{f.label}</dt>
                    <dd className="font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {services.length > 0 && (
              <div className="mt-6">
                <h2 className="eyebrow text-steel-600">Services performed</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="inline-flex min-h-10 items-center border border-ink/20 bg-white px-4 text-[0.9375rem] font-medium hover:border-ink">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
          <div className="grid content-start gap-10 lg:col-span-8">
            <TextBlock title="Project description" paragraphs={project.longDescription} />
            {project.scope?.length ? (
              <section className="border-t border-ink/15 pt-6">
                <h2 className="eyebrow text-steel-600">Scope of work</h2>
                <ul className="mt-4 grid gap-2">
                  {project.scope.map((s) => (
                    <li key={s} className="flex gap-3 leading-relaxed">
                      <span aria-hidden="true" className="mt-2.5 block size-1.5 shrink-0 bg-accent" />
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <TextBlock title="Project challenges" paragraphs={project.challenges} />
            <TextBlock title="MEK's approach" paragraphs={project.solution} />
          </div>
        </Container>
      </Section>

      {project.gallery?.length ? (
        <Section tone="white" aria-labelledby="gallery-heading">
          <Container>
            <SectionHeader eyebrow="Gallery" id="gallery-heading" title="Project photos." />
            <div className="mt-10">
              <ProjectGallery images={project.gallery} title={project.title} />
            </div>
          </Container>
        </Section>
      ) : null}

      {related.length > 0 && (
        <Section aria-labelledby="related-projects-heading">
          <Container>
            <SectionHeader eyebrow="Related projects" id="related-projects-heading" title="Similar work." />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <CTASection />
      <TrackView event="project_viewed" props={{ project: project.slug }} />
    </>
  );
}

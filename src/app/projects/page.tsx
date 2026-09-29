import type { Metadata } from "next";
import { getProjects, getSectors, getServices } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Commercial interior projects by MEK Construction Inc.: drywall, framing, finishing, ceilings and paint for commercial clients across the GTA.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const [projects, sectors, services] = await Promise.all([getProjects(), getSectors(), getServices()]);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Project portfolio."
        lead={<p>Commercial interior work across the Greater Toronto Area, filterable by sector and trade.</p>}
        breadcrumbs={[{ name: "Projects", path: "/projects" }]}
      />

      <Section>
        <Container>
          {projects.length > 0 ? (
            <ProjectFilters
              projects={projects}
              sectors={sectors.map((s) => ({ value: s.slug, label: s.name }))}
              services={services.map((s) => ({ value: s.slug, label: s.name }))}
            />
          ) : (
            <>
              <EmptyState
                title="Our online portfolio is being prepared."
                actions={
                  <>
                    <LinkButton href="/invite-to-bid" arrow>
                      Invite MEK to Bid
                    </LinkButton>
                    <LinkButton href="/contact" variant="outline">
                      Contact MEK
                    </LinkButton>
                  </>
                }
              >
                <p>
                  Project write-ups are published here once they have been documented and cleared for publication. If
                  you are prequalifying MEK for a tender, contact us and we will respond to your reference and project
                  experience requirements directly.
                </p>
              </EmptyState>
              {process.env.NODE_ENV === "development" && (
                <EmptyState developerNotice title="No published projects" className="mt-6">
                  <p>
                    Add verified projects to <code>src/content/projects.ts</code> with <code>published: true</code>. See
                    README → “Adding a project”.
                  </p>
                </EmptyState>
              )}
            </>
          )}
        </Container>
      </Section>
      <CTASection />
    </>
  );
}

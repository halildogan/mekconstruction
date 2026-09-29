import type { Metadata } from "next";
import { selectionCriteria } from "@/content/company";
import { siteConfig } from "@/content/site";
import { getFeaturedProjects, getFeaturedSectors, getFeaturedServices, getSectors, getServices } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { HomeHero } from "@/components/sections/HomeHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CapabilityList } from "@/components/sections/CapabilityList";
import { SectorCard } from "@/components/sections/SectorCard";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { BidCta } from "@/components/sections/BidCta";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.legalName} — Commercial Drywall, Framing & Interior Trades, Toronto & GTA`,
  absoluteTitle: true,
  description:
    "Commercial construction subcontractor in Toronto and the GTA: drywall, metal stud framing, taping and finishing, insulation, painting and acoustic ceilings. Invite MEK to bid or request a quote.",
  path: "/",
});

export default async function HomePage() {
  const [featuredServices, allServices, sectors, allSectors, projects] = await Promise.all([
    getFeaturedServices(),
    getServices(),
    getFeaturedSectors(),
    getSectors(),
    getFeaturedProjects(3),
  ]);
  const showProjectNotice = projects.length === 0 && process.env.NODE_ENV === "development";

  return (
    <>
      <HomeHero />

      <Section aria-labelledby="services-heading">
        <Container>
          <SectionHeader
            index="01"
            eyebrow="Capabilities"
            id="services-heading"
            title="Interior trade scopes, priced from the drawings and installed to specification."
            description={
              <p>
                Framing, board, finishing, insulation, ceilings and paint — the interior trades that carry a commercial
                fit-out from open floor plate to turnover.
              </p>
            }
            actions={<ArrowLink href="/services">All {allServices.length} services</ArrowLink>}
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <li key={service.slug} className="reveal">
                <ServiceCard service={service} index={allServices.indexOf(service)} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white" aria-labelledby="why-heading">
        <Container>
          <SectionHeader
            index="02"
            eyebrow="Working with MEK"
            id="why-heading"
            title="What general contractors need from an interior trade."
            description={
              <p>
                Interior trades often sit on the critical path of a commercial project. These are the working practices
                MEK applies to its trade packages.
              </p>
            }
            actions={<ArrowLink href="/about">How we work</ArrowLink>}
          />
          <div className="mt-12 lg:ml-[25%] lg:pl-2.5">
            <CapabilityList items={selectionCriteria} />
          </div>
        </Container>
      </Section>

      <Section tone="ink" aria-labelledby="sectors-heading">
        <Container>
          <SectionHeader
            dark
            index="03"
            eyebrow="Sectors"
            id="sectors-heading"
            title="Interior trade work across the commercial sectors."
            description={<p>Commercial, retail, office, institutional and industrial projects, including tenant improvements in occupied buildings.</p>}
            actions={
              <ArrowLink href="/sectors" dark>
                All sectors
              </ArrowLink>
            }
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <li key={sector.slug} className="reveal">
                <SectorCard sector={sector} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {projects.length > 0 && (
        <Section aria-labelledby="projects-heading">
          <Container>
            <SectionHeader
              eyebrow="Featured projects"
              id="projects-heading"
              title="Recent work."
              actions={<ArrowLink href="/projects">All projects</ArrowLink>}
            />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} sectorName={allSectors.find((s) => s.slug === project.sector)?.name} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
      {showProjectNotice && (
        <Section spacing="compact">
          <Container>
            <EmptyState developerNotice title="Featured projects section is hidden">
              <p>
                No published, featured projects exist in <code>src/content/projects.ts</code>. The section appears
                automatically once a verified project is added with <code>published: true</code> and{" "}
                <code>featured: true</code>. See README → “Adding a project”.
              </p>
            </EmptyState>
          </Container>
        </Section>
      )}

      <BidCta index="04" />
      <ServiceArea index="05" />
      <CTASection />
    </>
  );
}

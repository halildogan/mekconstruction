import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import {
  getProjectsForService,
  getSectors,
  getServiceBySlug,
  getServices,
  getServicesBySlugs,
} from "@/lib/content";
import { createMetadata, serviceJsonLd } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinkButton } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackView } from "@/components/analytics/TrackView";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return createMetadata({
    title: service.seo?.title ?? service.name,
    description: service.seo?.description ?? service.summary,
    path: `/services/${service.slug}`,
  });
}

function SpecList({ title, items, id }: { title: string; items: string[]; id: string }) {
  return (
    <section aria-labelledby={id} className="border-t border-ink/15 pt-6">
      <h2 id={id} className="eyebrow text-steel-600">
        {title}
      </h2>
      <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 border-b border-ink/8 py-3 leading-relaxed">
            <span aria-hidden="true" className="mt-2.5 block size-1.5 shrink-0 bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [related, sectors, projects, allServices] = await Promise.all([
    getServicesBySlugs(service.relatedServices),
    getSectors(),
    getProjectsForService(service.slug),
    getServices(),
  ]);
  const serviceSectors = sectors.filter((s) => service.sectors.includes(s.slug));

  return (
    <>
      <PageHero
        eyebrow={`Service ${String(allServices.indexOf(service) + 1).padStart(2, "0")} — Toronto & GTA`}
        title={service.name}
        lead={<p>{service.tagline}</p>}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
        image={service.image}
        actions={
          <>
            <LinkButton href="/invite-to-bid" size="lg" arrow>
              Invite MEK to Bid
            </LinkButton>
            <LinkButton href="/request-quote" size="lg" variant="outline-light">
              Request a Quote
            </LinkButton>
          </>
        }
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow text-accent-ink">Overview</p>
            <p className="heading mt-3 text-2xl">{service.summary}</p>
          </div>
          <div className="grid gap-12 lg:col-span-8">
            <div className="prose-mek max-w-3xl">
              {service.overview.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            {service.scopeNote && (
              <aside className="flex gap-4 border-l-4 border-accent bg-white p-5" aria-label="Scope note">
                <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-ink" />
                <p className="leading-relaxed text-steel-700">{service.scopeNote}</p>
              </aside>
            )}
            <SpecList id="applications" title="Typical applications" items={service.applications} />
            <SpecList id="capabilities" title="Capabilities" items={service.capabilities} />
            <SpecList id="systems" title="Materials and systems" items={service.systems} />
            {serviceSectors.length > 0 && (
              <section aria-labelledby="project-types" className="border-t border-ink/15 pt-6">
                <h2 id="project-types" className="eyebrow text-steel-600">
                  Project types
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {serviceSectors.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/sectors#${s.slug}`}
                        className="inline-flex min-h-10 items-center border border-ink/20 bg-white px-4 text-[0.9375rem] font-medium hover:border-ink"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </Container>
      </Section>

      {projects.length > 0 && (
        <Section tone="white" aria-labelledby="service-projects-heading">
          <Container>
            <SectionHeader eyebrow="Related projects" id="service-projects-heading" title={`${service.name} projects.`} />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} sectorName={sectors.find((s) => s.slug === p.sector)?.name} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section tone="white" aria-labelledby="related-heading">
          <Container>
            <SectionHeader
              eyebrow="Related services"
              id="related-heading"
              title="Often packaged together."
              description={<p>Trades commonly priced alongside {service.name.toLowerCase()}.</p>}
            />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.slug}>
                  <ServiceCard service={r} index={allServices.indexOf(r)} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <CTASection
        title={`Pricing ${service.name.toLowerCase()} on an upcoming project?`}
        description="Send the drawings and specifications for a quotation, or invite MEK to bid the trade package."
      />
      <JsonLd data={serviceJsonLd(service)} />
      <TrackView event="service_viewed" props={{ service: service.slug }} />
    </>
  );
}

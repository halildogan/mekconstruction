import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinkButton } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { BidCta } from "@/components/sections/BidCta";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = createMetadata({
  title: "Commercial Interior Trade Services",
  description:
    "Commercial drywall, metal stud framing, taping, plastering, insulation, painting, acoustic ceilings, flooring, renovations and demolition in Toronto and the GTA.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Interior trade services for commercial projects."
        lead={
          <p>
            MEK prices and installs interior trade scopes for general contractors, construction managers and building
            owners across Toronto and the GTA — individually, or combined into one interior package.
          </p>
        }
        breadcrumbs={[{ name: "Services", path: "/services" }]}
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

      <Section aria-labelledby="all-services-heading">
        <Container>
          <SectionHeader
            eyebrow={`${services.length} trades`}
            id="all-services-heading"
            title="Scopes MEK prices and installs."
            description={
              <p>
                Each trade is installed to the approved drawings and specifications for the project. Select a service for
                typical applications, capabilities and the systems involved.
              </p>
            }
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <li key={service.slug}>
                <ServiceCard service={service} index={i} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white" aria-labelledby="scope-table-heading">
        <Container>
          <SectionHeader
            eyebrow="At a glance"
            id="scope-table-heading"
            title="Trade scope summary."
            description={<p>A quick reference for estimators assembling trade packages.</p>}
          />
          <div className="relative mt-10 overflow-x-auto border border-ink/15">
            <table className="w-full min-w-[40rem] text-left text-[0.9375rem]">
              <caption className="sr-only">Summary of MEK trade services and typical applications</caption>
              <thead className="bg-paper">
                <tr>
                  <th scope="col" className="eyebrow px-5 py-4 text-steel-600">
                    Service
                  </th>
                  <th scope="col" className="eyebrow px-5 py-4 text-steel-600">
                    Typical applications
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 bg-white">
                {services.map((s) => (
                  <tr key={s.slug}>
                    <th scope="row" className="px-5 py-4 align-top font-semibold">
                      <Link href={`/services/${s.slug}`} className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-ink">
                        {s.name}
                      </Link>
                    </th>
                    <td className="px-5 py-4 text-steel-700">{s.applications.slice(0, 3).join(" · ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <BidCta />
      <CTASection />
    </>
  );
}

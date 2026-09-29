import type { Metadata } from "next";
import Link from "next/link";
import { audiences, processSteps, selectionCriteria } from "@/content/company";
import { images } from "@/content/images";
import { siteConfig } from "@/content/site";
import { getServices } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinkButton } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { CapabilityList } from "@/components/sections/CapabilityList";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "MEK Construction Inc. is a commercial interior trade contractor in Etobicoke, Toronto, working with general contractors, CMs, developers and property managers.",
  path: "/about",
});

export default async function AboutPage() {
  const services = await getServices();
  const { address } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A commercial interior trade contractor."
        lead={
          <p>
            {siteConfig.legalName} is an Ontario construction company based in {address.locality}, {address.city}. We work
            primarily as a subcontractor on commercial projects across the Greater Toronto Area, pricing and installing
            interior trade scopes for general contractors, construction managers, developers and building owners.
          </p>
        }
        breadcrumbs={[{ name: "About", path: "/about" }]}
        image={images.about}
      />

      <Section aria-labelledby="focus-heading">
        <Container>
          <SectionHeader
            index="01"
            eyebrow="Commercial focus"
            id="focus-heading"
            title="Built around the interior trade package."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="prose-mek lg:col-span-7 lg:col-start-4">
              <p>
                MEK is organized around the work that happens between the structure and the finished space: layout and
                metal stud framing, gypsum board, insulation, taping and finishing, ceilings and paint — plus the selective
                demolition and renovation work that often comes first.
              </p>
              <p>
                We work within the contract structure of commercial construction. On most projects that means pricing a
                trade package from tender documents, then working under the general contractor or construction manager
                to their schedule, site rules and quality requirements.
              </p>
              <p>
                Everything MEK installs is built to the approved drawings and specifications. We do not provide
                architectural or engineering design; where an assembly is rated, engineered or specified, we install it to
                the documents issued for the project and raise questions through the proper channels.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white" aria-labelledby="capabilities-heading">
        <Container>
          <SectionHeader
            index="02"
            eyebrow="Trade capabilities"
            id="capabilities-heading"
            title="Interior trades, individually or as one package."
            actions={
              <LinkButton href="/services" variant="outline" arrow>
                All services
              </LinkButton>
            }
          />
          <ul className="mt-10 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s, i) => (
              <li key={s.slug} className="border-b border-ink/15 sm:odd:border-r lg:border-r lg:[&:nth-child(5n)]:border-r-0">
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col gap-2 p-5 hover:bg-paper">
                  <span className="eyebrow text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-semibold group-hover:underline">{s.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="process-heading">
        <Container>
          <SectionHeader
            index="03"
            eyebrow="How a project runs"
            id="process-heading"
            title="From invitation to closeout."
            description={<p>Estimating, coordination, execution and quality — the stages every trade package goes through.</p>}
          />
          <div className="mt-12">
            <CapabilityList items={processSteps} columns={3} />
          </div>
        </Container>
      </Section>

      <Section tone="ink" aria-labelledby="standards-heading">
        <Container>
          <SectionHeader
            dark
            index="04"
            eyebrow="Quality, safety and communication"
            id="standards-heading"
            title="Working practices on site."
            description={
              <p>
                Work is planned to comply with Ontario&apos;s Occupational Health and Safety Act and its construction
                regulations, and with the constructor&apos;s site-specific safety program. Prequalification requirements —
                safety documentation, insurance or references — can be sent with your bid invitation and we will respond to
                them directly.
              </p>
            }
          />
          <div className="mt-12 lg:ml-[25%] lg:pl-2.5">
            <CapabilityList dark items={selectionCriteria} />
          </div>
        </Container>
      </Section>

      <Section tone="white" aria-labelledby="clients-heading">
        <Container>
          <SectionHeader index="05" eyebrow="Who we work with" id="clients-heading" title="How MEK works with each client." />
          <ul className="mt-12 grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-2 xl:grid-cols-3">
            {audiences.map((a) => (
              <li key={a.title} className="bg-white p-7">
                <h3 className="heading text-xl">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-steel-600">{a.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}

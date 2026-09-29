import { MapPin } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Service-area overview. Regions come from siteConfig.serviceRegions, which
 * carry slugs so that individual, genuinely useful area pages can be added
 * later — do not generate thin city pages automatically.
 */
export function ServiceArea({ index = "05" }: { index?: string }) {
  const { address } = siteConfig;
  return (
    <Section tone="white" aria-labelledby="service-area-heading">
      <Container>
        <SectionHeader
          index={index}
          eyebrow="Service area"
          id="service-area-heading"
          title="Toronto and the Greater Toronto Area."
          description={
            <p>
              Based in {address.locality}, {address.city}, MEK works on commercial projects across the City of Toronto and
              the surrounding regions of the GTA. {siteConfig.serviceAreaNote}
            </p>
          }
        />
        <div className="mt-12 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-5">
          {siteConfig.serviceRegions.map((region) => (
            <div key={region.slug} className="bg-white p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                {region.slug === "toronto" && <MapPin aria-hidden="true" className="size-4 text-accent-ink" />}
                {region.name}
              </h3>
              <ul className="mt-3 grid gap-1.5 text-[0.9375rem] text-steel-600">
                {region.municipalities.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

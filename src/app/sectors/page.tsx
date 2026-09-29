import type { Metadata } from "next";
import Link from "next/link";
import { getSectors, getServices } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = createMetadata({
  title: "Sectors",
  description:
    "Interior trade work for commercial, retail, office, institutional and industrial projects, tenant improvements and renovations across the GTA.",
  path: "/sectors",
});

export default async function SectorsPage() {
  const [sectors, services] = await Promise.all([getSectors(), getServices()]);

  return (
    <>
      <PageHero
        eyebrow="Sectors"
        title="Sectors we work in."
        lead={
          <p>
            Each sector brings its own schedule pressures, specifications and site conditions. The interior trades stay the
            same; how the work is planned around them changes.
          </p>
        }
        breadcrumbs={[{ name: "Sectors", path: "/sectors" }]}
      />

      <nav aria-label="Sectors on this page" className="border-b border-ink/10 bg-white">
        <Container>
          <ul className="flex gap-1 overflow-x-auto py-3">
            {sectors.map((s) => (
              <li key={s.slug} className="shrink-0">
                <a href={`#${s.slug}`} className="inline-flex min-h-10 items-center px-3 text-[0.9375rem] font-medium text-steel-700 hover:text-ink">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <div className="divide-y divide-ink/10">
        {sectors.map((sector, i) => {
          const relevant = services.filter((svc) => svc.sectors.includes(sector.slug));
          return (
            <section key={sector.slug} id={sector.slug} aria-labelledby={`${sector.slug}-heading`} className="scroll-mt-24 py-14 sm:py-16 lg:py-20">
              <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className={i % 2 === 1 ? "lg:order-2 lg:col-span-5" : "lg:col-span-5"}>
                  <Photo image={sector.image} sizes="(min-width: 1024px) 38vw, 100vw" ratio="aspect-[4/3]" />
                </div>
                <div className="lg:col-span-7">
                  <p className="eyebrow text-accent-ink">{String(i + 1).padStart(2, "0")} / Sector</p>
                  <h2 id={`${sector.slug}-heading`} className="heading mt-3 text-3xl sm:text-4xl">
                    {sector.name}
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-700">{sector.description}</p>
                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="eyebrow text-steel-600">Typical scopes</h3>
                      <ul className="mt-3 grid gap-2">
                        {sector.typicalScopes.map((scope) => (
                          <li key={scope} className="flex gap-3 leading-relaxed">
                            <span aria-hidden="true" className="mt-2.5 block size-1.5 shrink-0 bg-accent" />
                            {scope}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {relevant.length > 0 && (
                      <div>
                        <h3 className="eyebrow text-steel-600">Related services</h3>
                        <ul className="mt-3 grid gap-2">
                          {relevant.map((svc) => (
                            <li key={svc.slug}>
                              <Link href={`/services/${svc.slug}`} className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-ink">
                                {svc.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>
      <CTASection />
    </>
  );
}

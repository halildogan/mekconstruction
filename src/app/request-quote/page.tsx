import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/content/site";
import { QUOTE_SERVICE_EXTRAS } from "@/lib/forms/options";
import { getServices } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = createMetadata({
  title: "Request a Quote",
  description:
    "Request a quotation for commercial drywall, framing, taping and finishing, insulation, painting, acoustic ceilings or interior renovations in Toronto and the GTA.",
  path: "/request-quote",
});

const pricingInputs = [
  "Drawings or sketches with dimensions, even if preliminary",
  "Finish requirements (e.g. Level 4 or Level 5, paint system)",
  "Photos of existing conditions for renovations",
  "Building rules: working hours, access, occupied areas",
  "Target start date and duration",
];

export default async function RequestQuotePage() {
  const services = await getServices();
  const serviceOptions = [...services.map((s) => ({ value: s.slug, label: s.name })), ...QUOTE_SERVICE_EXTRAS];

  return (
    <>
      <PageHero
        eyebrow="Owners, property managers, tenants & contractors"
        title="Request a quote."
        lead={
          <p>
            For pricing on a defined interior scope — a tenant improvement, a suite re-configuration, a repaint or a
            single trade package. General contractors tendering a project should use{" "}
            <Link href="/invite-to-bid" className="font-semibold text-white underline decoration-accent decoration-2 underline-offset-4">
              Invite MEK to Bid
            </Link>{" "}
            so the bid due date and addenda are tracked.
          </p>
        }
        breadcrumbs={[{ name: "Request a Quote", path: "/request-quote" }]}
      />

      <Container className="grid gap-14 py-14 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="min-w-0 lg:col-span-8">
          <QuoteForm services={serviceOptions} phone={siteConfig.phone} />
        </div>
        <aside className="lg:col-span-4" aria-label="Quote request guidance">
          <div className="grid gap-6 lg:sticky lg:top-28">
            <div className="border border-ink/15 bg-white p-6">
              <h2 className="eyebrow text-steel-600">What helps us price accurately</h2>
              <ul className="mt-4 grid gap-3">
                {pricingInputs.map((item) => (
                  <li key={item} className="border-l-2 border-accent pl-3 text-[0.9375rem] leading-relaxed text-steel-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-ink/15 bg-white p-6">
              <h2 className="eyebrow text-steel-600">Quote or bid invitation?</h2>
              <dl className="mt-4 grid gap-4 text-[0.9375rem] leading-relaxed">
                <div>
                  <dt className="font-semibold">Request a Quote</dt>
                  <dd className="text-steel-600">A defined scope priced directly for you — owner, manager, tenant or contractor.</dd>
                </div>
                <div>
                  <dt className="font-semibold">Invite MEK to Bid</dt>
                  <dd className="text-steel-600">A tendered project with a bid due date, trade package and addenda.</dd>
                </div>
              </dl>
            </div>
            <div className="surface-dark bg-ink p-6 text-white">
              <h2 className="eyebrow text-steel-400">Prefer to talk it through?</h2>
              <a
                href={`tel:${siteConfig.phone.e164}`}
                data-track-location="request-quote"
                className="mt-3 inline-flex min-h-11 items-center gap-2 text-lg font-semibold hover:text-accent"
              >
                <Phone aria-hidden="true" className="size-5 text-accent" />
                {siteConfig.phone.display}
              </a>
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { bidChecklist, responseSteps } from "@/content/procurement";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { BidInvitationForm } from "@/components/forms/BidInvitationForm";

export const metadata: Metadata = createMetadata({
  title: "Invite MEK to Bid",
  description:
    "General contractors and construction managers: send tender invitations, IFT drawings, specifications and addenda to MEK Construction Inc. for drywall, framing, finishing, ceilings and paint pricing in the GTA.",
  path: "/invite-to-bid",
});

export default function InviteToBidPage() {
  return (
    <>
      <PageHero
        eyebrow="For general contractors & construction managers"
        title="Invite MEK to bid."
        lead={
          <p>
            Send the tender invitation and bid documents for your project. We review the scope and bid due date and
            confirm whether MEK will submit a price. For a direct price on a defined scope, use{" "}
            <Link href="/request-quote" className="font-semibold text-white underline decoration-accent decoration-2 underline-offset-4">
              Request a Quote
            </Link>{" "}
            instead.
          </p>
        }
        breadcrumbs={[{ name: "Invite MEK to Bid", path: "/invite-to-bid" }]}
      />

      <Container className="grid gap-14 py-14 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="min-w-0 lg:col-span-8">
          <BidInvitationForm phone={siteConfig.phone} />
        </div>

        <aside className="lg:col-span-4" aria-label="Bid invitation guidance">
          <div className="grid gap-6 lg:sticky lg:top-28">
            <div className="border border-ink/15 bg-white p-6">
              <h2 className="eyebrow text-steel-600">What to include</h2>
              <ul className="mt-4 grid gap-4">
                {bidChecklist.map((item) => (
                  <li key={item.title} className="border-l-2 border-accent pl-3">
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-steel-600">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-ink/15 bg-white p-6">
              <h2 className="eyebrow text-steel-600">After you submit</h2>
              <ol className="mt-4 grid gap-4">
                {responseSteps.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2rem_1fr]">
                    <span className="eyebrow pt-1 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block font-semibold">{step.title}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-steel-600">{step.description}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="surface-dark bg-ink p-6 text-white">
              <h2 className="eyebrow text-steel-400">Bid closing soon?</h2>
              <p className="mt-3 leading-relaxed text-concrete-300">Call to confirm we have received your invitation.</p>
              <a
                href={`tel:${siteConfig.phone.e164}`}
                data-track-location="invite-to-bid"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-lg font-semibold hover:text-accent"
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

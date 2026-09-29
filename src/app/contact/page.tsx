import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatAddressInline, siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCard } from "@/components/contact/ContactCard";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: `Contact MEK Construction Inc. in Etobicoke, Toronto. Call ${siteConfig.phone.display}, send a message, invite MEK to bid or request a quote.`,
  path: "/contact",
});

const routes = [
  {
    href: "/invite-to-bid",
    title: "Invite MEK to Bid",
    description: "General contractors and CMs: send tender documents with a bid due date.",
  },
  {
    href: "/request-quote",
    title: "Request a Quote",
    description: "Owners, managers and tenants: get pricing on a defined scope.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact MEK."
        lead={<p>Call, send a message, or use the bid and quote forms so your documents reach us with the details we need.</p>}
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <Container className="py-14 sm:py-16 lg:py-20">
        <ul className="grid gap-4 md:grid-cols-2">
          {routes.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group flex h-full items-center justify-between gap-6 border border-ink/15 bg-white p-6 hover:border-ink">
                <span>
                  <span className="heading block text-2xl">{r.title}</span>
                  <span className="mt-2 block text-steel-600">{r.description}</span>
                </span>
                <ArrowRight aria-hidden="true" className="size-6 shrink-0 text-accent-ink transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <section className="min-w-0 lg:col-span-7" aria-labelledby="message-heading">
            <p className="eyebrow text-accent-ink">General enquiries</p>
            <h2 id="message-heading" className="heading mt-2 mb-8 text-3xl">
              Send a message
            </h2>
            <ContactForm phone={siteConfig.phone} />
          </section>
          <section className="lg:col-span-5" aria-labelledby="details-heading">
            <p className="eyebrow text-accent-ink">Office</p>
            <h2 id="details-heading" className="heading mt-2 mb-8 text-3xl">
              Contact details
            </h2>
            <ContactCard />
            <div className="mt-6">
              <MapEmbed query={formatAddressInline()} label={formatAddressInline()} />
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}

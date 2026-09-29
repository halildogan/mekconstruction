import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested could not be found.",
  robots: { index: false, follow: true },
};

const destinations = [
  { href: "/services", label: "Services", description: "Interior trade scopes MEK prices and installs" },
  { href: "/invite-to-bid", label: "Invite MEK to Bid", description: "Send tender documents and a bid due date" },
  { href: "/request-quote", label: "Request a Quote", description: "Pricing for a defined scope" },
  { href: "/contact", label: "Contact", description: `Call ${siteConfig.phone.display} or send a message` },
];

export default function NotFound() {
  return (
    <section className="surface-dark grid-lines-dark bg-ink text-white">
      <Container className="py-20 sm:py-28">
        <p className="eyebrow text-accent">Error 404</p>
        <h1 className="display mt-4 text-5xl sm:text-6xl lg:text-7xl">Page not found.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-concrete-300">
          The page you requested doesn&apos;t exist or has moved. If you followed a link to our previous website, the
          content has been reorganized — the pages below are the best place to start.
        </p>
        <div className="mt-8">
          <LinkButton href="/" size="lg" arrow>
            Go to the homepage
          </LinkButton>
        </div>
        <ul className="mt-14 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <li key={d.href} className="border-b border-white/15 lg:border-r lg:last:border-r-0">
              <Link href={d.href} className="block p-5 hover:bg-white/5">
                <span className="block font-semibold">{d.label}</span>
                <span className="mt-1 block text-sm text-concrete-300">{d.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

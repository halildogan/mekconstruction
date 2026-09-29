import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

interface CTASectionProps {
  title?: ReactNode;
  description?: ReactNode;
}

/** Closing call to action: quote or bid invitation, plus phone. */
export function CTASection({
  title = "Need pricing for an upcoming project?",
  description = "Send the drawings and scope for a quotation, or invite MEK to bid your next tender. Prefer to talk it through? Call us.",
}: CTASectionProps) {
  return (
    <section className="grid-lines border-t border-ink/10 bg-paper py-16 sm:py-20 lg:py-24" aria-labelledby="final-cta-heading">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 id="final-cta-heading" className="display text-4xl sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-600">{description}</p>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:justify-end">
            <LinkButton href="/request-quote" size="lg" variant="secondary" arrow>
              Request a Quote
            </LinkButton>
            <LinkButton href="/invite-to-bid" size="lg" arrow>
              Invite MEK to Bid
            </LinkButton>
          </div>
          <a
            href={`tel:${siteConfig.phone.e164}`}
            data-track-location="final-cta"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink hover:text-accent-ink"
          >
            <Phone aria-hidden="true" className="size-4" />
            {siteConfig.phone.display}
          </a>
        </div>
      </Container>
    </section>
  );
}

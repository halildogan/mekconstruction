import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { HeaderBar } from "@/components/layout/HeaderBar";
import { Logo } from "@/components/layout/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { NavLinks } from "@/components/layout/NavLinks";

export function Header() {
  const { phone } = siteConfig;
  return (
    <header>
      {/* Utility bar — scrolls away; the main bar below stays sticky. */}
      <div className="surface-dark hidden bg-ink text-white md:block">
        <Container className="flex h-10 items-center justify-between gap-6 text-[0.8125rem]">
          <p className="eyebrow text-steel-400">{siteConfig.tagline}</p>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${phone.e164}`}
              data-track-location="utility-bar"
              className="inline-flex items-center gap-2 font-medium hover:text-accent"
            >
              <Phone aria-hidden="true" className="size-3.5 text-accent" />
              {phone.display}
            </a>
            <Link href="/request-quote" className="font-medium underline-offset-4 hover:text-accent hover:underline">
              Request a Quote
            </Link>
          </div>
        </Container>
      </div>

      <HeaderBar>
        <Container className="flex h-full items-center justify-between gap-4">
          <Link href="/" aria-label="MEK Construction Inc. — home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <NavLinks items={siteConfig.primaryNavigation} />
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${phone.e164}`}
              data-track-location="header"
              className="hidden min-h-11 items-center gap-2 px-2 text-[0.9375rem] font-semibold text-ink hover:text-accent-ink xl:inline-flex"
            >
              <Phone aria-hidden="true" className="size-4" />
              {phone.display}
            </a>
            <a
              href={`tel:${phone.e164}`}
              data-track-location="header-mobile"
              aria-label={`Call MEK at ${phone.display}`}
              className="inline-flex min-h-11 min-w-11 items-center justify-center bg-ink text-white hover:bg-graphite lg:hidden"
            >
              <Phone aria-hidden="true" className="size-5" />
            </a>
            <LinkButton href="/invite-to-bid" variant="primary" className="hidden sm:inline-flex">
              Invite MEK to Bid
            </LinkButton>
            <div className="lg:hidden">
              <MobileNavigation
                items={siteConfig.primaryNavigation}
                phone={phone}
                serviceArea={`Serving ${siteConfig.primaryMarket}`}
              />
            </div>
          </div>
        </Container>
      </HeaderBar>
    </header>
  );
}

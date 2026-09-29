import Link from "next/link";
import { formatAddressLines, siteConfig } from "@/content/site";
import { getServices } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { Logo } from "@/components/layout/Logo";

export async function Footer() {
  const services = await getServices();
  const year = new Date().getFullYear();
  const { phone, publicEmail } = siteConfig;

  return (
    <footer className="surface-dark bg-ink text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-4">
          <Link href="/" aria-label="MEK Construction Inc. — home" className="inline-block">
            <Logo dark />
          </Link>
          <p className="mt-6 max-w-sm leading-relaxed text-concrete-300">
            Commercial construction trade contractor providing drywall, metal stud framing, taping and finishing,
            insulation, painting, acoustic ceilings and interior renovation scopes across Toronto and the GTA.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/invite-to-bid"
              className="inline-flex min-h-11 items-center bg-accent px-4 text-sm font-semibold text-ink hover:bg-accent-hover"
            >
              Invite MEK to Bid
            </Link>
            <Link
              href="/request-quote"
              className="inline-flex min-h-11 items-center border border-white/40 px-4 text-sm font-semibold hover:border-white"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        <nav aria-label="Services" className="lg:col-span-3">
          <p className="eyebrow text-steel-400">Services</p>
          <ul className="mt-5 grid gap-2.5 text-[0.9375rem]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-concrete-300 hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="lg:col-span-2">
          <p className="eyebrow text-steel-400">Company</p>
          <ul className="mt-5 grid gap-2.5 text-[0.9375rem]">
            {siteConfig.footerNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-concrete-300 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="eyebrow text-steel-400">Contact</p>
          <address className="mt-5 grid gap-4 text-[0.9375rem] not-italic">
            <a href={`tel:${phone.e164}`} data-track-location="footer" className="text-lg font-semibold hover:text-accent">
              {phone.display}
            </a>
            {publicEmail && (
              <a href={`mailto:${publicEmail}`} data-track-location="footer" className="hover:text-accent">
                {publicEmail}
              </a>
            )}
            <span className="leading-relaxed text-concrete-300">
              {siteConfig.legalName}
              {formatAddressLines().map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </address>
          <p className="eyebrow mt-8 text-steel-400">Service area</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-concrete-300">
            {siteConfig.primaryMarket}. {siteConfig.serviceAreaNote}
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-sm text-steel-400 md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear buildYear={year} /> {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {siteConfig.legalNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}

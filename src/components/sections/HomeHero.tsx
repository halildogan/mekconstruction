import Link from "next/link";
import { Phone } from "lucide-react";
import { images } from "@/content/images";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";

const capabilities = [
  { label: "Commercial construction", detail: "Subcontract trade packages for general contractors and construction managers" },
  { label: "Toronto & GTA", detail: "Based in Etobicoke. Projects elsewhere in Ontario reviewed case by case" },
  { label: "Interior trades", detail: "Framing · Drywall · Finishing · Insulation · Ceilings · Paint" },
  { label: "Project coordination", detail: "Sequenced with the GC's schedule and the trades before and after us" },
];

export function HomeHero() {
  return (
    <section className="surface-dark relative isolate overflow-hidden bg-ink text-white" aria-labelledby="hero-heading">
      <Photo
        image={images.hero}
        preload
        sizes="100vw"
        cover
        className="-z-20 bg-ink"
        imageClassName="object-[60%_center] grayscale-[35%] contrast-[1.05]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(17_19_21/0.96)_0%,rgb(17_19_21/0.88)_45%,rgb(17_19_21/0.55)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(17_19_21/0.82)_0%,rgb(17_19_21/0.94)_70%)]"
      />
      <div aria-hidden="true" className="grid-lines-dark absolute inset-0 -z-10 opacity-60" />

      <Container className="pt-14 pb-10 sm:pt-20 lg:pt-28 lg:pb-14">
        <div className="max-w-4xl">
          <p className="eyebrow text-accent">{siteConfig.legalName} — Toronto &amp; GTA</p>
          <h1 id="hero-heading" className="display mt-5 text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Commercial interior trades.
            <span className="block text-concrete-300">Built to specification.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-concrete-200 sm:text-xl">
            {siteConfig.legalName} is a commercial construction subcontractor serving Toronto and the Greater Toronto
            Area. We price and install drywall, metal stud framing, taping and finishing, insulation, painting, acoustic
            ceilings and related interior scopes for general contractors, construction managers, developers and property
            owners.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <LinkButton href="/invite-to-bid" size="lg" arrow>
              Invite MEK to Bid
            </LinkButton>
            <LinkButton href="/services" size="lg" variant="outline-light">
              View Capabilities
            </LinkButton>
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9375rem] text-concrete-300">
            <Link href="/request-quote" className="font-semibold text-white underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent">
              Request a Quote
            </Link>
            <span aria-hidden="true" className="hidden text-steel-400 sm:inline">/</span>
            <a
              href={`tel:${siteConfig.phone.e164}`}
              data-track-location="hero"
              className="inline-flex items-center gap-2 font-semibold text-white hover:text-accent"
            >
              <Phone aria-hidden="true" className="size-4 text-accent" />
              {siteConfig.phone.display}
            </a>
          </p>
        </div>

        <ul className="mt-16 grid border-t border-white/15 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {capabilities.map((item, i) => (
            <li
              key={item.label}
              className="border-b border-white/15 py-5 sm:odd:pr-6 sm:even:pl-6 lg:border-b-0 lg:border-l lg:px-6 lg:py-7 lg:first:border-l-0 lg:first:pl-0 lg:even:pl-6"
            >
              <p className="eyebrow text-steel-400">{String.fromCharCode(65 + i)}</p>
              <p className="mt-2 text-lg font-semibold">{item.label}</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-concrete-300">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

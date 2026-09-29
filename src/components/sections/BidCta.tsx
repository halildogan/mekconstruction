import { Check } from "lucide-react";
import { bidChecklist, tradePackageSections } from "@/content/procurement";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export function BidCta({ index }: { index?: string }) {
  return (
    <section className="surface-dark relative overflow-hidden bg-charcoal py-16 text-white sm:py-20 lg:py-28" aria-labelledby="bid-cta-heading">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-accent" />
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow text-steel-400">
            {index && <span className="text-accent">{index} / </span>}For general contractors &amp; construction managers
          </p>
          <h2 id="bid-cta-heading" className="display mt-5 text-4xl sm:text-5xl lg:text-6xl">
            Invite MEK to bid.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-concrete-300">
            Send tender invitations and bid documents directly to MEK. Each invitation is reviewed against the scope and
            bid due date, and we confirm whether we will submit a price.
          </p>

          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {bidChecklist.map((item) => (
              <li key={item.title} className="flex gap-3 border-t border-white/12 py-4">
                <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={2.5} />
                <span>
                  <span className="block font-semibold">{item.title}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-concrete-300">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <LinkButton href="/invite-to-bid" size="lg" arrow>
              Submit Bid Invitation
            </LinkButton>
            <p className="max-w-sm text-sm leading-relaxed text-steel-400">
              Large tender package? Share a BuildingConnected, Procore or file-sharing link in the form.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5 lg:pl-6" aria-labelledby="trade-package-heading">
          <div className="border border-white/15 bg-ink">
            <div className="flex items-center justify-between border-b border-white/15 px-6 py-4">
              <h3 id="trade-package-heading" className="eyebrow text-concrete-300">
                Typical trade package
              </h3>
              <span className="eyebrow text-steel-400">MasterFormat</span>
            </div>
            <table className="w-full text-left text-[0.9375rem]">
              <caption className="sr-only">Specification sections MEK typically prices</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Section</th>
                  <th scope="col">Title</th>
                </tr>
              </thead>
              <tbody>
                {tradePackageSections.map((section) => (
                  <tr key={section.number} className="border-b border-white/8 last:border-b-0">
                    <td className="w-32 py-3 pl-6 font-mono text-sm text-accent">{section.number}</td>
                    <td className="py-3 pr-6 text-concrete-200">{section.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-steel-400">
            Scope is confirmed per project against the specification sections and drawings issued.
          </p>
        </aside>
      </Container>
    </section>
  );
}

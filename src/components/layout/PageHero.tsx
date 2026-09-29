import type { ReactNode } from "react";
import type { ImageAsset } from "@/types/content";
import type { Crumb } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  breadcrumbs: Crumb[];
  image?: ImageAsset;
  actions?: ReactNode;
  /** Extra content under the lead (e.g. key facts). */
  children?: ReactNode;
}

/** Interior page header: breadcrumbs, the page's single H1, lead copy and an optional image. */
export function PageHero({ eyebrow, title, lead, breadcrumbs, image, actions, children }: PageHeroProps) {
  return (
    <section className="surface-dark relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="grid-lines-dark pointer-events-none absolute inset-0" />
      <Container className="relative grid gap-10 pt-8 pb-14 sm:pb-16 lg:grid-cols-12 lg:gap-12 lg:pt-10 lg:pb-20">
        <div className="lg:col-span-7">
          <Breadcrumbs items={breadcrumbs} dark />
          <p className="eyebrow mt-10 text-accent lg:mt-14">{eyebrow}</p>
          <h1 className="display mt-4 text-[2.5rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem]">{title}</h1>
          {lead && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-concrete-300 sm:text-xl">{lead}</div>}
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
          {children}
        </div>
        {image && (
          <div className="lg:col-span-5 lg:pt-14">
            <Photo
              image={image}
              preload
              sizes="(min-width: 1440px) 560px, (min-width: 1024px) 38vw, 100vw"
              ratio="aspect-[4/3] lg:aspect-[4/5]"
              className="border border-white/10"
            />
          </div>
        )}
      </Container>
    </section>
  );
}

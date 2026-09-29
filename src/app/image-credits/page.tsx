import type { Metadata } from "next";
import { imageCredits } from "@/content/images";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = createMetadata({
  title: "Image Credits",
  description: "Credits and licences for representative photography used on the MEK Construction Inc. website.",
  path: "/image-credits",
});

export default function ImageCreditsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Image credits"
        lead={
          <p>
            Some photographs on this website are representative images of commercial interior trade work, used under the
            licences below. They are not MEK projects. Images have been resized and cropped.
          </p>
        }
        breadcrumbs={[{ name: "Image credits", path: "/image-credits" }]}
      />
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="relative overflow-x-auto border border-ink/15">
          <table className="w-full min-w-[44rem] text-left text-[0.9375rem]">
            <caption className="sr-only">Photograph credits and licences</caption>
            <thead className="bg-paper">
              <tr>
                <th scope="col" className="eyebrow px-5 py-4 text-steel-600">Photograph</th>
                <th scope="col" className="eyebrow px-5 py-4 text-steel-600">Author</th>
                <th scope="col" className="eyebrow px-5 py-4 text-steel-600">Licence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10 bg-white">
              {imageCredits.map((c) => (
                <tr key={c.id}>
                  <td className="px-5 py-4 align-top">
                    <a href={c.sourceUrl} rel="noopener noreferrer" target="_blank" className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-ink">
                      {c.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </td>
                  <td className="px-5 py-4 align-top text-steel-700">{c.author}</td>
                  <td className="px-5 py-4 align-top">
                    {c.licenseUrl ? (
                      <a href={c.licenseUrl} rel="noopener noreferrer license" target="_blank" className="underline underline-offset-4">
                        {c.license}
                      </a>
                    ) : (
                      c.license
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-steel-600">
          Adaptations of images licensed CC BY-SA 4.0 are shared under the same licence. Source files are hosted on
          Wikimedia Commons.
        </p>
      </Container>
    </>
  );
}

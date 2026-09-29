import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = createMetadata({
  title: "Terms of Use",
  description: "Terms governing the use of the MEK Construction Inc. website and the information and documents submitted through it.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        lead={<p>Last updated September 29, 2026.</p>}
        breadcrumbs={[{ name: "Terms of Use", path: "/terms" }]}
      />
      <Container size="narrow" className="py-14 sm:py-16 lg:py-20">
        <div className="prose-mek">
          <p>
            These terms apply to your use of {siteConfig.url.replace("https://", "")} (the “website”), operated by{" "}
            {siteConfig.legalName} (“MEK”). By using the website you agree to them.
          </p>

          <h2>Information on this website</h2>
          <p>
            Content on this website is general information about MEK and the services it offers. It is not an offer,
            quotation or contract. Scope, pricing, schedule and terms for any work are established only in a written
            quotation or contract issued by MEK.
          </p>
          <p>
            Photographs identified as representative imagery illustrate the type of work described and are not
            necessarily MEK projects. See <Link href="/image-credits">Image credits</Link>.
          </p>

          <h2>Submissions</h2>
          <p>
            When you submit a bid invitation, quote request, message or documents, you confirm that the information is
            accurate to the best of your knowledge and that you are authorized to share it, including any documents
            belonging to owners, consultants or other parties. Submitting a form does not create a contract or oblige MEK
            to submit a price. Our handling of submitted information is described in the{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <h2>Acceptable use</h2>
          <p>
            Do not use the website to upload malicious files, send unsolicited advertising, attempt to access systems
            without authorization, or interfere with its operation. We may block or remove submissions that breach these
            terms.
          </p>

          <h2>Intellectual property</h2>
          <p>
            MEK&apos;s name, logo and original website content belong to MEK. Third-party images are used under their
            respective licences, credited on the <Link href="/image-credits">Image credits</Link> page.
          </p>

          <h2>Third-party links</h2>
          <p>Links to other websites are provided for convenience. MEK is not responsible for their content or practices.</p>

          <h2>Limitation of liability</h2>
          <p>
            The website is provided “as is”. To the extent permitted by law, MEK is not liable for losses arising from use
            of, or inability to use, the website or reliance on its general information.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there.</p>

          <h2>Changes</h2>
          <p>
            We may update these terms from time to time. Questions? <Link href="/contact">Contact us</Link>.
          </p>
        </div>
      </Container>
    </>
  );
}

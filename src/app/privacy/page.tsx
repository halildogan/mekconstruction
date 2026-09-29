import type { Metadata } from "next";
import Link from "next/link";
import { formatAddressInline, siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "How MEK Construction Inc. collects, uses, stores and protects contact details, project information and documents submitted through this website.",
  path: "/privacy",
});

const UPDATED = "September 29, 2026";

export default function PrivacyPage() {
  const contact = siteConfig.publicEmail
    ? `by email at ${siteConfig.publicEmail} or by phone at ${siteConfig.phone.display}`
    : `by phone at ${siteConfig.phone.display} or through our contact form`;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead={<p>Last updated {UPDATED}.</p>}
        breadcrumbs={[{ name: "Privacy Policy", path: "/privacy" }]}
      />
      <Container size="narrow" className="py-14 sm:py-16 lg:py-20">
        <div className="prose-mek">
          <p>
            This policy explains how {siteConfig.legalName} (“MEK”, “we”, “us”) handles personal information and project
            documents submitted through this website. Canada&apos;s Personal Information Protection and Electronic
            Documents Act (PIPEDA) governs how private-sector organizations handle personal information in the course of
            commercial activity; this policy describes our practices in that context.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Contact details</strong> you enter in a form: name, company, email address and phone number.
            </li>
            <li>
              <strong>Project information</strong>: project name, location, type, bid dates, requested trades, scope
              descriptions and messages.
            </li>
            <li>
              <strong>Documents</strong> you upload, such as drawings, specifications, addenda, bid forms and photos, and
              any document links you provide.
            </li>
            <li>
              <strong>Technical information</strong> needed to operate and protect the site, such as IP address, browser
              type and request logs, processed by our hosting and by Cloudflare, which provides network security for the
              site.
            </li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To review bid invitations and quote requests, prepare pricing and respond to you.</li>
            <li>To communicate with you about the project, including clarifications, addenda and follow-up.</li>
            <li>To keep business records of enquiries, bids and quotations.</li>
            <li>To protect the website and its forms against spam, abuse and security threats.</li>
          </ul>
          <p>We do not sell personal information and we do not use it for third-party advertising.</p>

          <h2>Tender documents and commercial information</h2>
          <p>
            Drawings, specifications and other project documents are used only to evaluate and price the work described.
            They are stored privately — never at a public web address — and access is limited to people at MEK who need
            them for that purpose. Where pricing requires it, relevant portions may be shared with material suppliers
            solely to obtain quotations for the project. We do not publish your documents or project details.
          </p>

          <h2>Service providers</h2>
          <p>
            We use service providers to host the website, deliver email, store files and protect the site against abuse
            (for example, Cloudflare). They process information on our behalf and only as needed to provide their
            services. Some providers may process or store information outside Canada, in which case it may be subject to
            the laws of those jurisdictions.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This website does not use advertising or tracking cookies. If website analytics are enabled, we use a
            privacy-focused, cookieless tool that measures page views and form usage in aggregate, without identifying
            individual visitors. Our spam protection may process technical signals from your browser to tell people and
            automated software apart.
          </p>

          <h2>Retention</h2>
          <p>
            We keep submissions and documents for as long as needed for the purposes described above — typically for the
            duration of the bid or project and our related business and legal record-keeping obligations — and then
            delete them. You can ask us to delete your information earlier where we are not required to keep it.
          </p>

          <h2>Security</h2>
          <p>
            The site is served over HTTPS. Uploaded files are checked on receipt, stored in private storage and are not
            accessible by public link. No method of transmission or storage is completely secure, but we take reasonable
            measures appropriate to the sensitivity of the information.
          </p>

          <h2>Your choices and rights</h2>
          <p>
            You may ask to access or correct the personal information we hold about you, or withdraw consent to its use
            subject to legal or contractual restrictions. Contact us {contact}.
          </p>

          <h2>Contact</h2>
          <p>
            {siteConfig.legalName}
            <br />
            {formatAddressInline()}
            <br />
            <Link href="/contact">Contact page</Link>
          </p>

          <h2>Changes to this policy</h2>
          <p>We may update this policy from time to time. The date at the top of this page shows when it last changed.</p>
        </div>
      </Container>
    </>
  );
}

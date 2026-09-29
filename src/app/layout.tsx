import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/content/site";
import { getServices } from "@/lib/content";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/analytics/Analytics";
import "./globals.css";

/*
 * Fonts are self-hosted from the repository (no build-time or runtime calls to
 * Google Fonts). Archivo is a variable font with weight and width axes; the
 * width axis gives the condensed, engineered headline style.
 */
const archivo = localFont({
  src: "../assets/fonts/archivo-latin-wdth-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  adjustFontFallback: "Arial",
});

const plexMono = localFont({
  src: "../assets/fonts/ibm-plex-mono-latin-500-normal.woff2",
  variable: "--font-plex-mono",
  weight: "500",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.legalName} — Commercial Interior Trade Contractor, Toronto & GTA`,
    template: `%s | ${siteConfig.legalName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.legalName,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: siteConfig.legalName,
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#111315",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const services = await getServices();
  return (
    <html lang="en-CA" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main-content"
          className="sr-only z-50 bg-accent px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileActionBar phone={siteConfig.phone} />
        <JsonLd data={[organizationJsonLd(services), websiteJsonLd()]} />
        <Analytics />
      </body>
    </html>
  );
}

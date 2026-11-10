import { siteConfig } from "@/content/site";
import { getServiceBySlug, getServices } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";
import { notFound } from "next/navigation";

export const alt = "MEK Construction Inc. service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
const CATEGORY_LABELS: Record<string, string> = {
  "facade-cladding": "Façade & Cladding",
  "building-envelope": "Building Envelope",
  "facade-repair": "Repair & Restoration",
  interior: "Interior Construction",
  "residential-renovations": "Residential Renovations",
  "construction-management": "Construction Management",
};
export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) {
    notFound();
  }
  const category =
    CATEGORY_LABELS[service.category] ?? "Construction Services";
  const projectTypes = service.projectTypes ?? [];
  const market =
    projectTypes.includes("commercial") &&
    projectTypes.includes("residential")
      ? "Commercial & Residential"
      : projectTypes.includes("residential")
        ? "Residential"
        : projectTypes.includes("commercial")
          ? "Commercial"
          : "Construction";
  return renderOgImage({ 
    eyebrow: `${category} · Ontario, Canada`,
    title: service?.name ?? "Commercial interior trades",
    description: service?.tagline,
    market,
    location: "Ontario, Canada",
    email: siteConfig.email.default,
    phone: siteConfig.phone.display,
    domain: siteConfig.domain.display
  });
}

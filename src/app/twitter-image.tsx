import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "MEK Construction Inc. — commercial interior trade contractor, Toronto & GTA";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({ eyebrow: "Drywall · Framing · Finishing · Ceilings · Paint", title: "Commercial interior trades. Built to specification." });
}

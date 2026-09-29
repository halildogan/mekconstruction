import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const fontDir = path.join(process.cwd(), "src", "assets", "og");

async function loadFonts() {
  const [bold, medium, mono] = await Promise.all([
    readFile(path.join(fontDir, "archivo-latin-700-normal.woff")),
    readFile(path.join(fontDir, "archivo-latin-500-normal.woff")),
    readFile(path.join(fontDir, "ibm-plex-mono-latin-500-normal.woff")),
  ]);
  return [
    { name: "Archivo", data: bold, weight: 700 as const, style: "normal" as const },
    { name: "Archivo", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Plex Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

/** Branded social-share card: dark field, MEK mark, eyebrow, title, footer line. */
export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111315",
          color: "#ffffff",
          padding: "64px 72px",
          fontFamily: "Archivo",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          borderBottom: "10px solid #e3a21a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 48 48">
            <rect width="48" height="48" fill="#111315" stroke="#3b4147" />
            <rect x="10" y="11" width="28" height="5" fill="#f5f4f0" />
            <rect x="10" y="11" width="5" height="22" fill="#f5f4f0" />
            <rect x="21.5" y="11" width="5" height="22" fill="#f5f4f0" />
            <rect x="33" y="11" width="5" height="22" fill="#f5f4f0" />
            <rect x="10" y="35" width="28" height="3" fill="#e3a21a" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 2 }}>MEK</span>
            <span style={{ fontFamily: "Plex Mono", fontSize: 15, color: "#9aa2a9", letterSpacing: 3 }}>
              CONSTRUCTION INC.
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "Plex Mono", fontSize: 22, color: "#e3a21a", letterSpacing: 2, textTransform: "uppercase" }}>
            {eyebrow}
          </span>
          <span style={{ marginTop: 18, fontSize: title.length > 40 ? 64 : 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 1000 }}>
            {title}
          </span>
        </div>
        <span style={{ fontSize: 24, fontWeight: 500, color: "#b9bfc4" }}>
          Commercial interior trade contractor · Toronto &amp; GTA · mekdomain.ca
        </span>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}

/**
 * Transactional email layout.
 *
 * Every dynamic value passes through `escapeHtml`. Layout uses tables and
 * inline styles for compatibility with Outlook and mobile mail clients.
 */

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const multiline = (value: string) => escapeHtml(value).replace(/\r?\n/g, "<br>");

export interface EmailRow {
  label: string;
  value: string;
  href?: string;
}

export interface EmailSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

export interface EmailDocument {
  name: string;
  detail: string;
  href?: string;
}

export interface EmailLayout {
  /** Small label above the heading, e.g. "Bid invitation". */
  kicker: string;
  heading: string;
  preheader: string;
  intro?: string[];
  reference: string;
  rows?: EmailRow[];
  sections?: EmailSection[];
  documents?: EmailDocument[];
  documentsNote?: string;
  footer: string[];
}

const C = {
  ink: "#111315",
  steel: "#5c646c",
  line: "#d9dcde",
  paper: "#f5f4f0",
  accent: "#e3a21a",
};

const FONT = "Arial, Helvetica, sans-serif";
const MONO = "'Courier New', Courier, monospace";

export function renderEmailHtml(layout: EmailLayout): string {
  const rows = (layout.rows ?? [])
    .filter((r) => r.value)
    .map(
      (r) => `<tr>
        <td style="padding:10px 12px 10px 0;border-bottom:1px solid ${C.line};font:600 12px ${FONT};color:${C.steel};text-transform:uppercase;letter-spacing:0.04em;vertical-align:top;width:34%">${escapeHtml(r.label)}</td>
        <td style="padding:10px 0;border-bottom:1px solid ${C.line};font:15px/1.5 ${FONT};color:${C.ink};vertical-align:top">${
          r.href
            ? `<a href="${escapeHtml(r.href)}" style="color:${C.ink};text-decoration:underline">${multiline(r.value)}</a>`
            : multiline(r.value)
        }</td>
      </tr>`,
    )
    .join("");

  const sections = (layout.sections ?? [])
    .filter((s) => (s.paragraphs?.some(Boolean) ?? false) || (s.items?.length ?? 0) > 0)
    .map(
      (s) => `<tr><td style="padding:24px 0 0">
        <p style="margin:0 0 8px;font:700 12px ${FONT};color:${C.steel};text-transform:uppercase;letter-spacing:0.06em">${escapeHtml(s.title)}</p>
        ${(s.paragraphs ?? [])
          .filter(Boolean)
          .map((p) => `<p style="margin:0 0 10px;font:15px/1.6 ${FONT};color:${C.ink}">${multiline(p)}</p>`)
          .join("")}
        ${
          s.items?.length
            ? `<ul style="margin:0;padding:0 0 0 18px;font:15px/1.6 ${FONT};color:${C.ink}">${s.items
                .map((i) => `<li>${escapeHtml(i)}</li>`)
                .join("")}</ul>`
            : ""
        }
      </td></tr>`,
    )
    .join("");

  const documents = layout.documents?.length
    ? `<tr><td style="padding:24px 0 0">
        <p style="margin:0 0 8px;font:700 12px ${FONT};color:${C.steel};text-transform:uppercase;letter-spacing:0.06em">Documents (${layout.documents.length})</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
          ${layout.documents
            .map(
              (d) => `<tr><td style="padding:8px 0;border-bottom:1px solid ${C.line};font:14px/1.4 ${FONT};color:${C.ink}">
                ${d.href ? `<a href="${escapeHtml(d.href)}" style="color:${C.ink}">${escapeHtml(d.name)}</a>` : escapeHtml(d.name)}
                <span style="color:${C.steel};font-size:12px"> — ${escapeHtml(d.detail)}</span>
              </td></tr>`,
            )
            .join("")}
        </table>
        ${layout.documentsNote ? `<p style="margin:8px 0 0;font:13px/1.5 ${FONT};color:${C.steel}">${escapeHtml(layout.documentsNote)}</p>` : ""}
      </td></tr>`
    : "";

  return `<!doctype html>
<html lang="en-CA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(layout.heading)}</title></head>
<body style="margin:0;padding:0;background:${C.paper}">
<span style="display:none!important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden">${escapeHtml(layout.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper}">
<tr><td align="center" style="padding:24px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${C.line}">
    <tr><td style="background:${C.ink};padding:18px 28px;border-bottom:3px solid ${C.accent}">
      <p style="margin:0;font:800 16px ${FONT};letter-spacing:0.08em;color:#ffffff">MEK CONSTRUCTION INC.</p>
    </td></tr>
    <tr><td style="padding:28px">
      <p style="margin:0 0 6px;font:700 12px ${MONO};color:${C.steel};text-transform:uppercase;letter-spacing:0.08em">${escapeHtml(layout.kicker)}</p>
      <h1 style="margin:0 0 16px;font:700 22px/1.3 ${FONT};color:${C.ink}">${escapeHtml(layout.heading)}</h1>
      ${(layout.intro ?? []).map((p) => `<p style="margin:0 0 12px;font:15px/1.6 ${FONT};color:${C.ink}">${multiline(p)}</p>`).join("")}
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 8px;border:1px solid ${C.line};background:${C.paper}">
        <tr><td style="padding:10px 14px;font:12px ${FONT};color:${C.steel};text-transform:uppercase;letter-spacing:0.06em">Reference</td>
        <td style="padding:10px 14px;font:700 15px ${MONO};color:${C.ink}">${escapeHtml(layout.reference)}</td></tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:12px">${rows}</table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${sections}${documents}</table>
    </td></tr>
    <tr><td style="padding:18px 28px;border-top:1px solid ${C.line};background:${C.paper}">
      ${layout.footer.map((f) => `<p style="margin:0 0 4px;font:12px/1.5 ${FONT};color:${C.steel}">${escapeHtml(f)}</p>`).join("")}
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

export function renderEmailText(layout: EmailLayout): string {
  const lines: string[] = [];
  lines.push("MEK CONSTRUCTION INC.", "", layout.kicker.toUpperCase(), layout.heading, "");
  for (const p of layout.intro ?? []) lines.push(p, "");
  lines.push(`Reference: ${layout.reference}`, "");
  for (const r of layout.rows ?? []) if (r.value) lines.push(`${r.label}: ${r.value}`);
  for (const s of layout.sections ?? []) {
    const paragraphs = (s.paragraphs ?? []).filter(Boolean);
    if (!paragraphs.length && !s.items?.length) continue;
    lines.push("", s.title.toUpperCase());
    lines.push(...paragraphs);
    for (const i of s.items ?? []) lines.push(`- ${i}`);
  }
  if (layout.documents?.length) {
    lines.push("", `DOCUMENTS (${layout.documents.length})`);
    for (const d of layout.documents) lines.push(`- ${d.name} (${d.detail})${d.href ? `\n  ${d.href}` : ""}`);
    if (layout.documentsNote) lines.push(layout.documentsNote);
  }
  lines.push("", "--", ...layout.footer);
  return lines.join("\n");
}

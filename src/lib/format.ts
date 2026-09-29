/** Formatting helpers (Canadian English conventions). */

/** "2026-10-15" → "Thursday, October 15, 2026" (date-only, no timezone shift). */
export function formatDateLong(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** "2026-10" or "2026-10-15" → "October 2026". */
export function formatMonthYear(isoDate: string): string {
  const [y, m] = isoDate.split("-").map(Number);
  if (!y || !m) return isoDate;
  return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, 1)),
  );
}

/** "14:30" → "2:30 p.m." */
export function formatTime12(hhmm: string): string {
  const match = /^(\d{2}):(\d{2})$/.exec(hhmm);
  if (!match) return hhmm;
  const h = Number(match[1]);
  const suffix = h < 12 ? "a.m." : "p.m.";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${match[2]} ${suffix}`;
}

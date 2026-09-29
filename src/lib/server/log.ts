/**
 * Minimal structured logger (one JSON object per line → journald friendly).
 *
 * Never pass form contents, names, email addresses, phone numbers or file
 * names to the logger. Log submission references, counts and error classes.
 */

type Level = "info" | "warn" | "error";
type Fields = Record<string, string | number | boolean | undefined | null>;

function write(level: Level, event: string, fields: Fields = {}) {
  const line = JSON.stringify({ time: new Date().toISOString(), level, event, ...fields });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}

export const logger = {
  info: (event: string, fields?: Fields) => write("info", event, fields),
  warn: (event: string, fields?: Fields) => write("warn", event, fields),
  error: (event: string, fields?: Fields) => write("error", event, fields),
};

export function errorName(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`.slice(0, 300);
  return "UnknownError";
}

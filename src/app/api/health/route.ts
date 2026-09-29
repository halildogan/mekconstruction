import { json } from "@/lib/server/api";

/** Liveness check for monitoring (e.g. `curl -fsS http://127.0.0.1:3000/api/health`). */
export function GET() {
  return json({ status: "ok" });
}

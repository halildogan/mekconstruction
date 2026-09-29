"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { torontoToday } from "@/lib/forms/schemas";
import type { SubmissionKind } from "@/lib/forms/schemas";

export type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string };

interface ServerResponse {
  ok: boolean;
  reference?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

/**
 * Posts a validated form to /api/submissions/<kind> with anti-spam metadata.
 * Field errors returned by the server are handed back so they can be shown
 * inline — the form's values are never cleared on failure.
 */
export function useSubmission(kind: SubmissionKind) {
  const startedAt = useRef<number>(0);
  const [state, setState] = useState<SubmissionState>({ status: "idle" });

  const markStarted = useCallback(() => {
    if (!startedAt.current) startedAt.current = Date.now();
  }, []);

  const submit = useCallback(
    async (
      data: unknown,
      extras: { honeypot: string; turnstileToken?: string },
    ): Promise<{ ok: true; reference: string } | { ok: false; fieldErrors?: Record<string, string[]> }> => {
      setState({ status: "submitting" });
      const elapsedMs = startedAt.current ? Date.now() - startedAt.current : undefined;
      try {
        const response = await fetch(`/api/submissions/${kind}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data,
            meta: { website: extras.honeypot, elapsedMs, turnstileToken: extras.turnstileToken },
          }),
        });
        const body = (await response.json().catch(() => ({}))) as ServerResponse;
        if (response.ok && body.ok && body.reference) {
          setState({ status: "success", reference: body.reference });
          return { ok: true, reference: body.reference };
        }
        setState({
          status: "error",
          message: body.error ?? "Your submission could not be sent. Please try again.",
        });
        return { ok: false, fieldErrors: body.fieldErrors };
      } catch {
        setState({
          status: "error",
          message: "We couldn't reach the server. Check your connection and try again — your entries are still here.",
        });
        return { ok: false };
      }
    },
    [kind],
  );

  return { state, submit, markStarted, reset: () => setState({ status: "idle" }) };
}

const noopSubscribe = () => () => {};

/** Today's date in Toronto, only after hydration (static pages can't know "today"). */
export function useTorontoToday(): string | undefined {
  return useSyncExternalStore(noopSubscribe, () => torontoToday(), () => undefined);
}

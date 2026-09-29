import type { FieldErrors, FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { SummaryError } from "@/components/forms/FormErrorSummary";

/** Convert React Hook Form errors into an ordered error-summary list. */
export function summarize<T extends FieldValues>(errors: FieldErrors<T>, order: readonly string[]): SummaryError[] {
  return order
    .map((field) => {
      const error = errors[field as keyof typeof errors] as { message?: unknown } | undefined;
      const message = typeof error?.message === "string" ? error.message : undefined;
      return message ? { field, message } : null;
    })
    .filter((e): e is SummaryError => e !== null);
}

/** Apply server-side field errors to the form so they appear inline. */
export function applyServerErrors<T extends FieldValues>(
  fieldErrors: Record<string, string[]> | undefined,
  order: readonly string[],
  setError: UseFormSetError<T>,
): SummaryError[] {
  if (!fieldErrors) return [];
  const summary: SummaryError[] = [];
  for (const field of order) {
    const message = fieldErrors[field]?.[0];
    if (message) {
      setError(field as Path<T>, { type: "server", message });
      summary.push({ field, message });
    }
  }
  return summary;
}

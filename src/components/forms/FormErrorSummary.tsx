"use client";

import { forwardRef } from "react";
import { AlertTriangle } from "lucide-react";

export interface SummaryError {
  field: string;
  message: string;
}

/**
 * Error summary shown at the top of a form after a failed submit attempt.
 * It receives focus so screen-reader and keyboard users land on it, and each
 * entry links to the field that needs attention.
 */
export const FormErrorSummary = forwardRef<HTMLDivElement, { errors: SummaryError[]; message?: string }>(
  function FormErrorSummary({ errors, message }, ref) {
    if (errors.length === 0 && !message) return null;
    return (
      <div
        ref={ref}
        tabIndex={-1}
        role="alert"
        aria-labelledby="form-error-summary-title"
        className="border-l-4 border-danger bg-danger-soft p-5 outline-none sm:p-6"
      >
        <h2 id="form-error-summary-title" className="flex items-center gap-2 text-lg font-semibold text-ink">
          <AlertTriangle aria-hidden="true" className="size-5 text-danger" />
          {errors.length > 0 ? "Please check the highlighted fields" : "Your submission wasn't sent"}
        </h2>
        {message && <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink">{message}</p>}
        {errors.length > 0 && (
          <ul className="mt-3 grid gap-1.5 text-[0.9375rem]">
            {errors.map((e) => (
              <li key={e.field}>
                <a
                  href={`#${e.field}`}
                  className="font-medium text-danger underline underline-offset-4 hover:text-ink"
                  onClick={(event) => {
                    const target = document.getElementById(e.field);
                    if (target) {
                      event.preventDefault();
                      target.focus();
                      target.scrollIntoView({ block: "center" });
                    }
                  }}
                >
                  {e.message}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

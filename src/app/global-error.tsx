"use client";

/**
 * Last-resort error page (replaces the root layout), so it is self-contained
 * with inline styles and no imports that could themselves fail.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-CA">
      <body style={{ margin: 0, background: "#111315", color: "#fff", fontFamily: "Arial, Helvetica, sans-serif" }}>
        <main style={{ maxWidth: 720, margin: "0 auto", padding: "96px 24px" }}>
          <p style={{ color: "#e3a21a", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            MEK Construction Inc.
          </p>
          <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: "16px 0" }}>Something went wrong.</h1>
          <p style={{ color: "#b9bfc4", fontSize: 18, lineHeight: 1.6 }}>
            Please try again. If the problem continues, call us at <a href="tel:+16479791421" style={{ color: "#fff" }}>(647) 979-1421</a>.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 24, background: "#e3a21a", color: "#111315", border: 0, padding: "14px 22px", fontWeight: 700, fontSize: 16, cursor: "pointer" }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}

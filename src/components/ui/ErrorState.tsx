"use client";

import Link from "next/link";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** User-facing error panel. Never shows technical details. */
export function ErrorState({ onRetry, phone }: { onRetry?: () => void; phone: { display: string; e164: string } }) {
  return (
    <section className="bg-paper">
      <Container className="py-20 sm:py-28">
        <p className="eyebrow text-accent-ink">Something went wrong</p>
        <h1 className="display mt-4 text-5xl sm:text-6xl">We couldn&apos;t load this page.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel-600">
          This is a problem on our side. Please try again. If it keeps happening, call us at {phone.display} — we can take
          your bid invitation or quote request by phone.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {onRetry && (
            <Button onClick={onRetry} size="lg" arrow>
              Try again
            </Button>
          )}
          <Link href="/" className={buttonClasses("outline", "lg")}>
            Go to the homepage
          </Link>
          <a href={`tel:${phone.e164}`} data-track-location="error" className={buttonClasses("outline", "lg")}>
            Call {phone.display}
          </a>
        </div>
      </Container>
    </section>
  );
}

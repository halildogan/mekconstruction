"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

interface SubmissionSuccessProps {
  title: string;
  reference: string;
  children: ReactNode;
  nextSteps: string[];
  phone: { display: string; e164: string };
}

/** Confirmation state shown in place of the form. Focus moves to the heading. */
export function SubmissionSuccess({ title, reference, children, nextSteps, phone }: SubmissionSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <div className="border border-ink/15 bg-white">
      <div className="h-1 bg-success" aria-hidden="true" />
      <div className="p-6 sm:p-10">
        <CheckCircle2 aria-hidden="true" className="size-9 text-success" />
        <h2 ref={headingRef} tabIndex={-1} className="heading mt-5 text-3xl outline-none sm:text-4xl">
          {title}
        </h2>
        <div className="mt-4 max-w-2xl text-lg leading-relaxed text-steel-700">{children}</div>

        <div className="mt-8 inline-flex flex-col border border-ink/15 bg-paper sm:flex-row sm:items-center">
          <span className="eyebrow border-ink/15 px-5 pt-4 text-steel-600 sm:border-r sm:py-4">Reference</span>
          <span className="px-5 pt-1 pb-4 font-mono text-lg font-medium tracking-wide select-all sm:py-4">{reference}</span>
        </div>
        <p className="mt-3 text-sm text-steel-600">Quote this reference in any follow-up. A copy has been sent to your email.</p>

        <h3 className="mt-10 text-lg font-semibold">What happens next</h3>
        <ol className="mt-4 grid gap-3">
          {nextSteps.map((step, i) => (
            <li key={step} className="grid grid-cols-[2.5rem_1fr] text-[0.9375rem] leading-relaxed text-steel-700">
              <span className="eyebrow pt-1 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/services" className={buttonClasses("secondary")}>
            View services
          </Link>
          <a href={`tel:${phone.e164}`} data-track-location="form-success" className={buttonClasses("outline")}>
            Call {phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}

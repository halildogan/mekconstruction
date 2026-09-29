"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/*
 * Accessible form primitives. Each control is linked to its label, hint and
 * error message; errors set aria-invalid and are announced via the error
 * summary on submit and inline on blur.
 */

export const controlClasses = (invalid: boolean) =>
  cn(
    "block w-full border bg-white px-3.5 text-base text-ink placeholder:text-steel-400",
    "transition-colors focus:border-ink focus:outline-2 focus:outline-offset-0 focus:outline-ink",
    "disabled:bg-concrete-100",
    invalid ? "border-danger" : "border-ink/25 hover:border-ink/50",
  );

export const describedBy = (name: string, hint?: ReactNode, error?: string) =>
  [hint ? `${name}-hint` : null, error ? `${name}-error` : null].filter(Boolean).join(" ") || undefined;

interface FieldProps {
  name: string;
  label: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ name, label, required, hint, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={name} className="mb-2 text-[0.9375rem] font-semibold text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-sm font-normal text-steel-600">(optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${name}-hint`} className="-mt-1 mb-2 text-sm leading-relaxed text-steel-600">
          {hint}
        </p>
      )}
      {children}
      <FieldError name={name} error={error} />
    </div>
  );
}

export function FieldError({ name, error }: { name: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${name}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger">
      <span aria-hidden="true" className="mt-[0.4rem] block size-1.5 shrink-0 bg-danger" />
      {error}
    </p>
  );
}

type InputProps = ComponentPropsWithoutRef<"input"> & { invalid?: boolean };

export const TextInput = forwardRef<HTMLInputElement, InputProps>(function TextInput(
  { invalid = false, className, ...props },
  ref,
) {
  return <input ref={ref} aria-invalid={invalid || undefined} className={cn(controlClasses(invalid), "min-h-12", className)} {...props} />;
});

type TextAreaProps = ComponentPropsWithoutRef<"textarea"> & { invalid?: boolean };

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { invalid = false, className, rows = 5, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(controlClasses(invalid), "min-h-32 py-3 leading-relaxed", className)}
      {...props}
    />
  );
});

type SelectProps = ComponentPropsWithoutRef<"select"> & { invalid?: boolean; placeholder?: string };

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid = false, className, children, placeholder, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(controlClasses(invalid), "min-h-12 appearance-none pr-10", className)}
        {...props}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {children}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-steel-600" />
    </div>
  );
});

type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & { label: ReactNode; invalid?: boolean };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, invalid = false, className, id, ...props },
  ref,
) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex min-h-12 cursor-pointer items-start gap-3 border bg-white px-3.5 py-3 transition-colors has-[:checked]:border-ink has-[:checked]:bg-paper",
        invalid ? "border-danger" : "border-ink/20 hover:border-ink/50",
        className,
      )}
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        aria-invalid={invalid || undefined}
        className="mt-0.5 size-5 shrink-0 cursor-pointer accent-ink"
        {...props}
      />
      <span className="text-[0.9375rem] leading-snug">{label}</span>
    </label>
  );
});

/** A labelled group of related fields with a numbered heading. */
export function FormSection({
  index,
  title,
  description,
  children,
}: {
  index: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  const headingId = `section-${index}`;
  return (
    <div role="group" aria-labelledby={headingId} className="grid gap-6 border-t border-ink/15 pt-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="eyebrow text-accent-ink" aria-hidden="true">
          {index}
        </p>
        <h2 id={headingId} className="heading mt-2 text-2xl">
          {title}
        </h2>
        {description && <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel-600">{description}</p>}
      </div>
      <div className="grid content-start gap-6 lg:col-span-8">{children}</div>
    </div>
  );
}

/** Invisible-to-humans honeypot field. Bots that fill it are silently discarded. */
export const Honeypot = forwardRef<HTMLInputElement>(function Honeypot(_props, ref) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input ref={ref} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
});

"use client";

import { siteConfig } from "@/content/site";
import { ErrorState } from "@/components/ui/ErrorState";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorState onRetry={reset} phone={siteConfig.phone} />;
}

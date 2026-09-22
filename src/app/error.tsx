"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-32">
      <div className="max-w-xl">
        <p className="text-label uppercase tracking-[0.18em] text-danger mb-4">
          Something went wrong
        </p>
        <h1 className="text-display-3 text-text-primary">
          We hit an unexpected error.
        </h1>
        <p className="mt-4 text-body-lg text-text-secondary">
          The page failed to load. You can retry, or head back to safety.
        </p>
        {error.digest && (
          <p className="mt-2 text-body-sm text-text-tertiary font-mono">
            Reference: {error.digest}
          </p>
        )}
        <div className="mt-8 flex gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button asChild href="/" variant="outline">
            Back to home
          </Button>
        </div>
      </div>
    </Container>
  );
}
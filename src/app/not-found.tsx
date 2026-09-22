import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-32">
      <div className="max-w-xl">
        <p className="text-label uppercase tracking-[0.18em] text-accent mb-4">
          404
        </p>
        <h1 className="text-display-2 text-text-primary text-balance">
          We can&apos;t find that page.
        </h1>
        <p className="mt-4 text-body-lg text-text-secondary">
          The link may have changed or the page may have moved. Try the homepage,
          or send us a message and we&apos;ll help.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild href="/">
            Back to home
          </Button>
          <Button asChild href="/contact" variant="outline">
            Contact us
          </Button>
        </div>
      </div>
    </Container>
  );
}
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/animation/animated-background";
import { siteConfig } from "@/lib/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-40">
      <AnimatedBackground />

      <Container className="relative">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-surface/60 backdrop-blur-sm px-3 py-1.5 text-label uppercase tracking-[0.16em] text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft" />
            Web · AI · Automation · Digital Systems
          </div>

          <h1 className="mt-8 text-display-1 text-text-primary text-balance">
            <span className="block">Build.</span>
            <span className="block">Automate.</span>
            <span className="block gradient-text">Evolve.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-body-lg text-text-secondary text-pretty">
            We build modern websites, web applications, AI-powered solutions
            and automated digital systems that help businesses work smarter.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild href="/start-project" size="lg">
              Start a Project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button asChild size="lg" variant="outline" href="/work">
              Explore Our Work
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-2 text-body-sm text-text-tertiary">
            <MapPin className="h-4 w-4 text-accent" aria-hidden />
            Serving businesses across {siteConfig.location}.
          </div>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}

/**
 * Subtle decorative visual anchored to the right of the hero. Pure SVG so
 * it scales crisply and stays light on the bundle.
 */
function HeroVisual() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
      style={{ width: "min(560px, 50%)", height: "560px" }}
    >
      <svg
        viewBox="0 0 560 560"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="560" y2="560">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="node" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Concentric rings */}
        {[140, 220, 320].map((r, i) => (
          <circle
            key={r}
            cx="280"
            cy="280"
            r={r}
            stroke="url(#ring)"
            strokeWidth="1"
            strokeDasharray={i % 2 === 0 ? "4 8" : "2 6"}
            opacity={0.6 - i * 0.15}
          />
        ))}

        {/* Orbital nodes */}
        {[
          { x: 280, y: 140 },
          { x: 460, y: 280 },
          { x: 280, y: 460 },
          { x: 100, y: 280 },
          { x: 200, y: 200 },
          { x: 360, y: 360 },
          { x: 360, y: 200 },
          { x: 200, y: 360 },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="22" fill="url(#node)" opacity="0.4" />
            <circle cx={p.x} cy={p.y} r="3" fill="var(--accent)" />
          </g>
        ))}

        {/* Connecting lines */}
        <g stroke="var(--accent)" strokeWidth="0.6" opacity="0.4">
          <line x1="280" y1="140" x2="200" y2="200" />
          <line x1="200" y1="200" x2="100" y2="280" />
          <line x1="100" y1="280" x2="200" y2="360" />
          <line x1="200" y1="360" x2="280" y2="460" />
          <line x1="280" y1="460" x2="360" y2="360" />
          <line x1="360" y1="360" x2="460" y2="280" />
          <line x1="460" y1="280" x2="360" y2="200" />
          <line x1="360" y1="200" x2="280" y2="140" />
          <line x1="200" y1="200" x2="360" y2="200" />
          <line x1="200" y1="200" x2="360" y2="360" />
          <line x1="200" y1="360" x2="360" y2="200" />
          <line x1="200" y1="360" x2="360" y2="360" />
        </g>

        {/* Center mark */}
        <circle cx="280" cy="280" r="6" fill="var(--accent)" />
        <circle cx="280" cy="280" r="14" stroke="var(--accent)" strokeWidth="0.5" opacity="0.6" />
      </svg>
    </div>
  );
}
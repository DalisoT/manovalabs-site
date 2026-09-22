import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Pillars } from "@/components/sections/pillars";
import { FeaturedWork } from "@/components/sections/featured-work";
import { AIDemo } from "@/components/sections/ai-demo";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { WhyManova } from "@/components/sections/why-manova";
import { FinalCTA } from "@/components/sections/final-cta";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <Pillars />
      <FeaturedWork />
      <AIDemo />
      <ProcessTimeline />
      <WhyManova />
      <FinalCTA />
    </>
  );
}
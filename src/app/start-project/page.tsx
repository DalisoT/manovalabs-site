import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectWizard } from "@/components/forms/project-wizard";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell MANOVA LABS about your project — a short, structured brief that helps us come back with the right next step.",
};

export default function StartProjectPage() {
  return (
    <Container className="py-16 lg:py-24 max-w-3xl">
      <SectionHeading
        eyebrow="Start a Project"
        title="Tell us what you're working on."
        description="A short, structured brief. The clearer you are about the problem, the faster we can come back with a useful response."
      />
      <div className="mt-12">
        <ProjectWizard />
      </div>
    </Container>
  );
}
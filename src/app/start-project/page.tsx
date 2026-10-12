import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectWizard } from "@/components/forms/project-wizard";

export const metadata: Metadata = {
  title: "Start a conversation",
  description:
    "Tell Richard what you're working on — a short, structured brief that helps me come back with the right next step.",
};

export default function StartProjectPage() {
  return (
    <Container className="py-16 lg:py-24 max-w-3xl">
      <SectionHeading
        eyebrow="Start a conversation"
        title="Tell me what you're working on."
        description="A short, structured brief. The clearer you are about the problem, the faster I can come back with a useful response."
      />
      <div className="mt-12">
        <ProjectWizard />
      </div>
    </Container>
  );
}
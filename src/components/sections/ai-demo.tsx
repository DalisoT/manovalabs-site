"use client";

import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { ManovaAI } from "@/components/ai/manova-ai";
import { track } from "@/lib/utils/analytics";

/**
 * Homepage demonstration of MANOVA AI. Full functionality (chat, lead
 * capture, route to /start-project) is wired in Phase 6. Until then the
 * button opens the assistant overlay; the assistant renders a graceful
 * notice when its backend isn't configured.
 */
export function AIDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="py-24 lg:py-32 border-t border-border-subtle">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Ask MANOVA AI"
                title="A small taste of what we build."
                description="MANOVA AI is the same kind of capability we can embed into your website — answering questions about your services, routing visitors to the right next step, and turning conversations into qualified briefs."
              />

              <ul className="mt-10 space-y-4 text-body text-text-secondary">
                <li className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  Trained on MANOVA LABS services — no hallucinated pricing or clients.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  Routes complex questions to the human team via /start-project.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  Same architecture we can build for your business — grounded in your data.
                </li>
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    setOpen(true);
                    track("ai_open", { source: "homepage" });
                  }}
                >
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Open MANOVA AI
                </Button>
                <Button asChild variant="outline" href="/services/ai-integration">
                  How AI integration works
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>

            <ChatPreview onTryIt={() => setOpen(true)} />
          </div>
        </Container>
      </section>

      <ManovaAI open={open} onOpenChange={setOpen} />
    </>
  );
}

function ChatPreview({ onTryIt }: { onTryIt: () => void }) {
  return (
    <button
      type="button"
      onClick={onTryIt}
      className="group relative w-full rounded-lg border border-border-subtle bg-bg-surface/60 p-6 text-left transition-all hover:border-accent/40 hover:bg-bg-elevated/60"
    >
      <div className="flex items-center gap-2 text-label uppercase tracking-[0.18em] text-text-tertiary mb-6">
        <span className="h-2 w-2 rounded-full bg-accent animate-pulse-soft" />
        Live preview
      </div>

      <div className="space-y-4">
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-lg rounded-tl-sm bg-bg-elevated border border-border-subtle px-4 py-3 text-body-sm text-text-primary">
            Hi, I&apos;m MANOVA AI. I can tell you what we build, help you
            understand our services, or help you start a project.
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-lg rounded-tr-sm bg-accent/10 border border-accent/30 px-4 py-3 text-body-sm text-text-primary">
            I run a school. Can you build something for student records?
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-lg rounded-tl-sm bg-bg-elevated border border-border-subtle px-4 py-3 text-body-sm text-text-primary">
            MANOVA could potentially build a system for student records,
            attendance, reporting and automated notifications. Would you like
            to tell me more about the current process?
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border-subtle text-body-sm text-accent inline-flex items-center gap-2 group-hover:text-accent-soft">
        Try it yourself
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </div>
    </button>
  );
}
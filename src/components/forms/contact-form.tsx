"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label, FieldError, FieldHint } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const { push } = useToast();
  const [state, setState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
    if (errors[key]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!state.name.trim()) next.name = "Please tell us your name.";
    if (!state.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(state.email)) {
      next.email = "That doesn't look like a valid email.";
    }
    if (!state.message.trim() || state.message.trim().length < 10) {
      next.message = "Please share a little more — at least 10 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Phase 5 will replace this with /api/leads. For now we just confirm.
      await new Promise((r) => setTimeout(r, 600));
      setDone(true);
      push({
        kind: "success",
        title: "Message received",
        description: "We'll get back to you within one business day.",
      });
      setState({ name: "", email: "", subject: "", message: "" });
    } catch {
      push({
        kind: "error",
        title: "Something went wrong",
        description: "Please try again or reach out via WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-8 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent mb-4">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </span>
        <h2 className="text-h3 text-text-primary">Message received.</h2>
        <p className="mt-2 text-body text-text-secondary">
          We&apos;ll review it and come back to you within one business day.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setDone(false)}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <Label htmlFor="contact-name" required>
          Your name
        </Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          value={state.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={!!errors.name}
        />
        <FieldError>{errors.name}</FieldError>
      </div>

      <div>
        <Label htmlFor="contact-email" required>
          Email
        </Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={state.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={!!errors.email}
        />
        <FieldError>{errors.email}</FieldError>
      </div>

      <div>
        <Label htmlFor="contact-subject">Subject</Label>
        <Input
          id="contact-subject"
          name="subject"
          value={state.subject}
          onChange={(e) => update("subject", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="contact-message" required>
          Message
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="Tell us about your project or question."
          value={state.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
        />
        <FieldHint>We never share your details with anyone.</FieldHint>
        <FieldError>{errors.message}</FieldError>
      </div>

      <Button type="submit" disabled={submitting} fullWidth size="lg">
        <Send className="h-4 w-4" aria-hidden />
        {submitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
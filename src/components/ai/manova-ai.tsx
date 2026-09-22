"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, X as CloseIcon, Send, AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { track } from "@/lib/utils/analytics";
import { cn } from "@/lib/utils/cn";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface ManovaAIProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QUICK_ACTIONS = [
  "What do you build?",
  "I need a website",
  "I want AI",
  "I want automation",
  "Start a project",
];

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I'm MANOVA AI. I can tell you what we build, help you understand our services, or help you start a project.",
};

export function ManovaAI({ open, onOpenChange }: ManovaAIProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, busy, open]);

  useEffect(() => {
    if (!open) {
      setError(null);
      setBusy(false);
    }
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setBusy(true);
    setError(null);
    track("ai_message_sent", { length: trimmed.length });

    const history = messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (res.status === 429) {
        setError(
          "You've reached the assistant's hourly limit. Please try again later or use the Start a Project form."
        );
        return;
      }

      if (!res.ok) {
        setError(
          "MANOVA AI is temporarily unavailable. You can still tell us about your project using the Start a Project form."
        );
        return;
      }

      const data = (await res.json()) as {
        content: string;
        suggestsStartProject?: boolean;
      };

      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: data.content,
        },
      ]);
    } catch {
      setError(
        "MANOVA AI is temporarily unavailable. You can still tell us about your project using the Start a Project form."
      );
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="MANOVA AI assistant"
      className="fixed bottom-4 right-4 z-[80] w-[min(380px,calc(100vw-2rem))] h-[min(620px,calc(100vh-6rem))] max-h-[80vh] glass rounded-lg shadow-2xl flex flex-col animate-fade-up"
    >
      <header className="flex items-center justify-between p-4 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent/15 border border-accent/30 text-accent">
            <Sparkles className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-body-sm font-semibold text-text-primary leading-tight">
              MANOVA AI
            </p>
            <p className="text-label uppercase tracking-wider text-text-tertiary">
              Assistant
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close assistant"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors"
        >
          <CloseIcon className="h-4 w-4" aria-hidden />
        </button>
      </header>

      <div
        ref={scrollerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        aria-live="polite"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {busy && (
          <div className="flex justify-start">
            <div className="rounded-lg rounded-tl-sm bg-bg-elevated border border-border-subtle px-4 py-3">
              <Spinner size={16} label="Thinking" />
            </div>
          </div>
        )}
        {error && (
          <div className="rounded-md border border-warning/40 bg-warning/10 p-3 flex gap-2 text-body-sm text-text-primary">
            <AlertTriangle
              className="h-4 w-4 text-warning shrink-0 mt-0.5"
              aria-hidden
            />
            <p>{error}</p>
          </div>
        )}
      </div>

      {messages.length <= 2 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              disabled={busy}
              className="text-body-sm rounded-full border border-border-subtle bg-bg-base/60 px-3 py-1.5 text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-border-subtle p-3 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask MANOVA AI…"
          maxLength={500}
          aria-label="Message MANOVA AI"
          disabled={busy}
          className="flex-1 h-10 rounded-md bg-bg-elevated border border-border-subtle px-3 text-body-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none disabled:opacity-50"
        />
        <Button
          type="submit"
          size="icon"
          disabled={busy || input.trim().length === 0}
          aria-label="Send message"
        >
          <Send className="h-4 w-4" aria-hidden />
        </Button>
      </form>

      <div className="border-t border-border-subtle px-3 py-2">
        <a
          href="/start-project"
          onClick={() => {
            track("project_started", { source: "ai_panel" });
            onOpenChange(false);
          }}
          className="flex items-center justify-center gap-2 w-full h-10 rounded-md bg-bg-elevated border border-border-subtle text-body-sm text-text-primary hover:border-accent/40 transition-colors"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Start a Project instead
        </a>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[90%] rounded-lg px-4 py-3 text-body-sm",
          isUser
            ? "rounded-tr-sm bg-accent/10 border border-accent/30 text-text-primary"
            : "rounded-tl-sm bg-bg-elevated border border-border-subtle text-text-primary"
        )}
      >
        <p className="whitespace-pre-wrap text-pretty">{message.content}</p>
      </div>
    </div>
  );
}
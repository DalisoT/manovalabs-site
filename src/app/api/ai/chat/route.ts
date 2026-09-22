import { NextResponse } from "next/server";
import { z } from "zod";
import { getProvider } from "@/lib/ai";
import { SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { consume, clientIp } from "@/lib/ai/rate-limit";
import type { ChatMessage } from "@/lib/ai/provider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  message: z.string().trim().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(2000),
      })
    )
    .max(20)
    .optional()
    .default([]),
});

const WINDOW_MS = 60 * 60 * 1000;

function detectStartProjectIntent(text: string): boolean {
  const t = text.toLowerCase();
  return /\b(start|begin|hire|build\s+(me|us|a|an))\b/.test(t) &&
    /\b(project|website|app|store|system|automation|automation|ai)\b/.test(t);
}

export async function POST(request: Request) {
  // Rate limit by client IP.
  const limit = Number(process.env.AI_RATE_LIMIT_PER_HOUR ?? 30);
  const ip = clientIp(request);
  const rl = consume(`ai:${ip}`, { limit, windowMs: WINDOW_MS });
  if (!rl.ok) {
    return NextResponse.json(
      {
        error: "rate_limited",
        message:
          "You've reached the assistant's hourly limit. Please try again later or use the Start a Project form.",
        resetAt: rl.resetAt,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.floor(rl.resetAt / 1000)),
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const provider = getProvider();
  if (!provider) {
    return NextResponse.json(
      {
        error: "ai_unavailable",
        message:
          "MANOVA AI is temporarily unavailable. You can still tell us about your project using the Start a Project form.",
      },
      { status: 503 }
    );
  }

  const { message, history } = parsed.data;
  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.map((h) => ({ role: h.role, content: h.content }) as ChatMessage),
    { role: "user", content: message },
  ];

  try {
    const response = await provider.chat(messages, {
      maxTokens: 600,
      temperature: 0.5,
    });

    const suggestsStart =
      detectStartProjectIntent(message) ||
      response.content.toLowerCase().includes("start a project");

    return NextResponse.json({
      content: response.content,
      suggestsStartProject: suggestsStart,
    });
  } catch (err) {
    console.error("[ai/chat] provider error:", err);
    return NextResponse.json(
      {
        error: "ai_unavailable",
        message:
          "MANOVA AI is temporarily unavailable. You can still tell us about your project using the Start a Project form.",
      },
      { status: 503 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    provider: process.env.AI_PROVIDER ?? "openai",
    configured: getProvider() !== null,
  });
}
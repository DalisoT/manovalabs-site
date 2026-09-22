import OpenAI from "openai";
import type {
  AIProvider,
  ChatMessage,
  ChatOptions,
  ChatResponse,
  LeadBriefInput,
  LeadClassification,
} from "@/lib/ai/provider";
import { SYSTEM_PROMPT, buildLeadClassifierPrompt } from "@/lib/ai/prompts";

/**
 * OpenAI-compatible provider. Works with OpenAI itself AND any
 * OpenAI-compatible endpoint (MiniMax, Together, Groq, OpenRouter, ...).
 * Selected via OPENAI_BASE_URL.
 */
export class OpenAIProvider implements AIProvider {
  readonly name = "openai";
  private client: OpenAI | null;
  private model: string;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      this.client = null;
      this.model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
      return;
    }
    const baseURL = process.env.OPENAI_BASE_URL || undefined;
    this.client = new OpenAI({
      apiKey,
      baseURL,
      // Conservative default timeouts.
      timeout: 20_000,
      maxRetries: 1,
    });
    this.model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  }

  get isConfigured(): boolean {
    return this.client !== null;
  }

  async chat(
    messages: ChatMessage[],
    opts: ChatOptions = {}
  ): Promise<ChatResponse> {
    if (!this.client) throw new Error("OPENAI_API_KEY is not configured.");
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      temperature: opts.temperature ?? 0.5,
      max_tokens: opts.maxTokens ?? 600,
    });
    const choice = completion.choices[0];
    const content = choice?.message?.content?.trim() ?? "";
    return {
      content,
      usage: completion.usage
        ? {
            inputTokens: completion.usage.prompt_tokens,
            outputTokens: completion.usage.completion_tokens,
          }
        : undefined,
    };
  }

  async classifyLead(
    brief: LeadBriefInput
  ): Promise<LeadClassification | null> {
    if (!this.client) return null;
    try {
      const messages: ChatMessage[] = [
        {
          role: "system",
          content:
            "You classify incoming project briefs for MANOVA LABS. Respond with STRICT JSON only — no prose, no markdown fences.",
        },
        {
          role: "user",
          content: buildLeadClassifierPrompt(brief),
        },
      ];
      const res = await this.chat(messages, {
        temperature: 0.2,
        maxTokens: 250,
      });
      const json = safeParseJson(res.content);
      if (!json) return null;
      const summary = typeof json.summary === "string" ? json.summary : "";
      const priority =
        json.priority === "low" ||
        json.priority === "medium" ||
        json.priority === "high"
          ? json.priority
          : "medium";
      const category = typeof json.category === "string" ? json.category : "general";
      if (!summary) return null;
      return { summary, priority, category };
    } catch (err) {
      console.error("[ai] classifyLead failed:", err);
      return null;
    }
  }
}

function safeParseJson(text: string): Record<string, unknown> | null {
  // Some providers wrap JSON in ``` fences; strip them first.
  const stripped = text
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
  try {
    return JSON.parse(stripped);
  } catch {
    return null;
  }
}

export function buildMessages(
  history: ChatMessage[],
  userMessage: string
): ChatMessage[] {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: userMessage },
  ];
}
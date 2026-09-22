import type {
  AIProvider,
  ChatMessage,
  ChatOptions,
  ChatResponse,
  LeadBriefInput,
  LeadClassification,
} from "@/lib/ai/provider";
import { buildLeadClassifierPrompt, SYSTEM_PROMPT } from "@/lib/ai/prompts";

/**
 * Anthropic (Claude) provider. Uses the fetch API directly so we don't
 * pull another SDK. SERVER ONLY.
 */
export class AnthropicProvider implements AIProvider {
  readonly name = "anthropic";
  private apiKey: string | null;
  private model: string;

  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY ?? null;
    this.model = process.env.ANTHROPIC_MODEL ?? "claude-3-5-sonnet-latest";
  }

  get isConfigured(): boolean {
    return this.apiKey !== null;
  }

  async chat(
    messages: ChatMessage[],
    opts: ChatOptions = {}
  ): Promise<ChatResponse> {
    if (!this.apiKey) throw new Error("ANTHROPIC_API_KEY is not configured.");

    const system = messages.find((m) => m.role === "system")?.content ?? SYSTEM_PROMPT;
    const rest = messages.filter((m) => m.role !== "system");

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        system,
        max_tokens: opts.maxTokens ?? 600,
        temperature: opts.temperature ?? 0.5,
        messages: rest.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!res.ok) {
      throw new Error(`Anthropic request failed: ${res.status}`);
    }
    const json = (await res.json()) as {
      content?: { type: string; text?: string }[];
      usage?: { input_tokens: number; output_tokens: number };
    };
    const text =
      json.content?.find((c) => c.type === "text")?.text?.trim() ?? "";
    return {
      content: text,
      usage: json.usage
        ? {
            inputTokens: json.usage.input_tokens,
            outputTokens: json.usage.output_tokens,
          }
        : undefined,
    };
  }

  async classifyLead(
    brief: LeadBriefInput
  ): Promise<LeadClassification | null> {
    if (!this.apiKey) return null;
    try {
      const res = await this.chat(
        [
          {
            role: "system",
            content:
              "You classify project briefs. Respond with strict JSON only — no prose, no markdown.",
          },
          { role: "user", content: buildLeadClassifierPrompt(brief) },
        ],
        { temperature: 0.2, maxTokens: 250 }
      );
      const text = res.content
        .replace(/^\s*```(?:json)?\s*/i, "")
        .replace(/\s*```\s*$/i, "")
        .trim();
      const json = JSON.parse(text);
      if (
        typeof json.summary === "string" &&
        (json.priority === "low" || json.priority === "medium" || json.priority === "high") &&
        typeof json.category === "string"
      ) {
        return {
          summary: json.summary,
          priority: json.priority,
          category: json.category,
        };
      }
      return null;
    } catch (err) {
      console.error("[ai] anthropic classifyLead failed:", err);
      return null;
    }
  }
}
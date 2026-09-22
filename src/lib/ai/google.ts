import type {
  AIProvider,
  ChatMessage,
  ChatOptions,
  ChatResponse,
  LeadBriefInput,
  LeadClassification,
} from "@/lib/ai/provider";
import { buildLeadClassifierPrompt } from "@/lib/ai/prompts";

/**
 * Google (Gemini) provider. SERVER ONLY. Uses the public generative
 * language endpoint.
 */
export class GoogleProvider implements AIProvider {
  readonly name = "google";
  private apiKey: string | null;
  private model: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_AI_API_KEY ?? null;
    this.model = process.env.GOOGLE_AI_MODEL ?? "gemini-1.5-pro";
  }

  get isConfigured(): boolean {
    return this.apiKey !== null;
  }

  async chat(
    messages: ChatMessage[],
    opts: ChatOptions = {}
  ): Promise<ChatResponse> {
    if (!this.apiKey) throw new Error("GOOGLE_AI_API_KEY is not configured.");

    // Convert to Gemini's expected contents structure.
    const systemParts = messages
      .filter((m) => m.role === "system")
      .map((m) => ({ text: m.content }));
    const contents = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: systemParts },
        contents,
        generationConfig: {
          temperature: opts.temperature ?? 0.5,
          maxOutputTokens: opts.maxTokens ?? 600,
        },
      }),
    });

    if (!res.ok) throw new Error(`Gemini request failed: ${res.status}`);
    const json = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
    return { content: text };
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
              "You classify project briefs. Respond with strict JSON only.",
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
      console.error("[ai] google classifyLead failed:", err);
      return null;
    }
  }
}
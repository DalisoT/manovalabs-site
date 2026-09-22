import type { AIProvider } from "@/lib/ai/provider";
import { OpenAIProvider } from "@/lib/ai/openai";
import { AnthropicProvider } from "@/lib/ai/anthropic";
import { GoogleProvider } from "@/lib/ai/google";

/**
 * Provider factory. Selects the active provider via AI_PROVIDER env var.
 * Returns null if no provider is configured — caller must handle.
 */
export function getProvider(): AIProvider | null {
  const choice = (process.env.AI_PROVIDER ?? "openai").toLowerCase();
  switch (choice) {
    case "openai":
    case "minimax": {
      const p = new OpenAIProvider();
      return p.isConfigured ? p : null;
    }
    case "anthropic": {
      const p = new AnthropicProvider();
      return p.isConfigured ? p : null;
    }
    case "google": {
      const p = new GoogleProvider();
      return p.isConfigured ? p : null;
    }
    default:
      return null;
  }
}

export function isProviderConfigured(): boolean {
  return getProvider() !== null;
}

export type { AIProvider } from "@/lib/ai/provider";
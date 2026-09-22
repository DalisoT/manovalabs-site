/**
 * AI provider abstraction. Every adapter implements the same shape so the
 * caller never sees provider-specific details.
 *
 * SECURITY: All implementations must read keys from server-only env vars
 * (no NEXT_PUBLIC_). The route layer is responsible for rate limiting,
 * system-prompt injection, and refusing to expose internal details.
 */

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatOptions {
  maxTokens?: number;
  temperature?: number;
}

export interface ChatResponse {
  content: string;
  usage?: { inputTokens: number; outputTokens: number };
}

export interface LeadBriefInput {
  services: string[];
  description?: string | null;
  businessProblem?: string | null;
  desiredOutcome?: string | null;
  budget?: string | null;
  timeline?: string | null;
  contactPreference?: string | null;
}

export interface LeadClassification {
  summary: string;
  priority: "low" | "medium" | "high";
  category: string;
}

export interface AIProvider {
  readonly name: string;
  chat(messages: ChatMessage[], opts?: ChatOptions): Promise<ChatResponse>;
  classifyLead(brief: LeadBriefInput): Promise<LeadClassification | null>;
}
/**
 * Lightweight analytics helper. No-op unless an env var is set.
 *
 * Supports Plausible (via NEXT_PUBLIC_PLAUSIBLE_DOMAIN) and Google Analytics
 * (via NEXT_PUBLIC_GA_MEASUREMENT_ID). Add other providers here as needed.
 */

export type AnalyticsEvent =
  | "page_view"
  | "service_view"
  | "project_view"
  | "ai_open"
  | "ai_message_sent"
  | "project_started"
  | "project_submitted"
  | "whatsapp_clicked"
  | "email_clicked"
  | "booking_clicked"
  | "contact_submitted";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    if (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && window.plausible) {
      window.plausible(event, { props });
    }
    if (
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
      window.gtag
    ) {
      window.gtag("event", event, props ?? {});
    }
  } catch {
    // analytics must never break the app
  }
}
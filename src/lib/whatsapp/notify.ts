/**
 * WhatsApp Business notification. Optional — silently no-ops unless the
 * WHATSAPP_API_* env vars are configured.
 *
 * Wire this up when you have a WhatsApp Business API account (Twilio,
 * 360dialog, Meta Cloud API, etc.). The shape is generic — pass an
 * object describing the message body to whatever endpoint the provider
 * exposes.
 */

export interface NotifyOptions {
  message: string;
}

export async function sendWhatsAppNotification(
  opts: NotifyOptions
): Promise<{ sent: boolean; reason?: string }> {
  const url = process.env.WHATSAPP_API_URL;
  const token = process.env.WHATSAPP_API_TOKEN;
  const recipient = process.env.WHATSAPP_RECIPIENT_NUMBER;

  if (!url || !token || !recipient) {
    return { sent: false, reason: "not_configured" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        to: recipient,
        message: opts.message,
      }),
    });

    if (!res.ok) {
      return { sent: false, reason: `http_${res.status}` };
    }
    return { sent: true };
  } catch (err) {
    console.error("[whatsapp] notify failed:", err);
    return { sent: false, reason: "exception" };
  }
}

export function leadNotificationMessage(lead: {
  name: string;
  email: string;
  services: string[];
  budget?: string | null;
  timeline?: string | null;
}): string {
  return [
    "📥 New MANOVA LABS project brief",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Services: ${lead.services.join(", ")}`,
    `Budget: ${lead.budget ?? "—"}`,
    `Timeline: ${lead.timeline ?? "—"}`,
  ].join("\n");
}
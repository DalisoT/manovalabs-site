import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation/lead-schema";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { getProvider } from "@/lib/ai";
import {
  leadNotificationMessage,
  sendWhatsAppNotification,
} from "@/lib/whatsapp/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface LeadInsertRow {
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  location: string | null;
  services: string[];
  description: string | null;
  business_problem: string | null;
  desired_outcome: string | null;
  existing_system: string | null;
  budget: string | null;
  timeline: string | null;
  contact_preference: string | null;
  source: string;
  status: "new";
  metadata: Record<string, unknown>;
}

const trimToNull = (v: string | undefined): string | null => {
  if (!v) return null;
  const t = v.trim();
  return t.length === 0 ? null : t;
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const row: LeadInsertRow = {
    name: data.name,
    company: trimToNull(data.company),
    email: data.email,
    phone: trimToNull(data.phone),
    whatsapp: trimToNull(data.whatsapp),
    location: trimToNull(data.location),
    services: data.services,
    description: trimToNull(data.description),
    business_problem: trimToNull(data.businessProblem),
    desired_outcome: trimToNull(data.desiredOutcome),
    existing_system: trimToNull(data.existingSystem),
    budget: trimToNull(data.budget),
    timeline: trimToNull(data.timeline),
    contact_preference: trimToNull(data.contactPreference),
    source: "website",
    status: "new",
    metadata: {
      user_agent: request.headers.get("user-agent") ?? null,
      referer: request.headers.get("referer") ?? null,
    },
  };

  const admin = createAdminSupabase();
  if (!admin) {
    // Supabase not configured — accept the lead into a graceful fallback log
    // so the wizard still succeeds during local dev without secrets.
    console.warn(
      "[leads] Supabase admin client not configured — lead not persisted. Set SUPABASE_SERVICE_ROLE_KEY to enable persistence."
    );
    return NextResponse.json({
      ok: true,
      persisted: false,
      message:
        "Lead received. Database is not configured in this environment.",
    });
  }

  const { data: inserted, error } = await admin
    .from("leads")
    .insert(row)
    .select("id")
    .single();

  if (error || !inserted) {
    console.error("[leads] insert error:", error?.message);
    return NextResponse.json(
      { error: "Could not save lead. Please try again or message us on WhatsApp." },
      { status: 500 }
    );
  }

  // Phase 6: best-effort AI classification. NEVER block the response.
  const provider = getProvider();
  if (provider) {
    provider
      .classifyLead({
        services: data.services,
        description: data.description,
        businessProblem: data.businessProblem,
        desiredOutcome: data.desiredOutcome,
        budget: data.budget,
        timeline: data.timeline,
        contactPreference: data.contactPreference,
      })
      .then(async (classification) => {
        if (!classification) return;
        await admin
          .from("leads")
          .update({
            ai_summary: classification.summary,
            ai_priority: classification.priority,
            ai_category: classification.category,
          })
          .eq("id", inserted.id);
      })
      .catch((err) => {
        console.error("[leads] ai classification error:", err);
      });
  }

  // Phase 7: optional WhatsApp Business notification (degrades silently).
  sendWhatsAppNotification({
    message: leadNotificationMessage({
      name: data.name,
      email: data.email,
      services: data.services,
      budget: data.budget,
      timeline: data.timeline,
    }),
  }).catch((err) => console.error("[leads] whatsapp notify error:", err));

  return NextResponse.json({ ok: true, persisted: true, id: inserted.id });
}
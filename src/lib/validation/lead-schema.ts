import { z } from "zod";

/**
 * Validation for the project wizard submission. Server-side authoritative —
 * the client wizard does a soft check, the API route re-validates.
 */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().toLowerCase().email("Please enter a valid email."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  location: z.string().trim().max(160).optional().or(z.literal("")),

  services: z
    .array(z.string().min(1).max(40))
    .min(1, "Pick at least one service.")
    .max(20),

  description: z.string().trim().max(2000).optional().or(z.literal("")),
  businessProblem: z.string().trim().max(2000).optional().or(z.literal("")),
  desiredOutcome: z.string().trim().max(2000).optional().or(z.literal("")),
  existingSystem: z.string().trim().max(2000).optional().or(z.literal("")),

  budget: z.string().max(40).optional().or(z.literal("")),
  timeline: z.string().max(40).optional().or(z.literal("")),
  contactPreference: z.string().max(40).optional().or(z.literal("")),
});

export type LeadPayload = z.infer<typeof leadSchema>;

/**
 * Per-step guards. Used by the wizard to disable "Continue" until each
 * step's required fields are filled.
 */
export const step1Required = leadSchema.pick({ name: true, email: true });
export const step2Required = leadSchema.pick({ services: true });

export function isStepValid(step: number, data: Partial<LeadPayload>): boolean {
  if (step === 1) {
    const r = step1Required.safeParse(data);
    return r.success;
  }
  if (step === 2) {
    const r = step2Required.safeParse(data);
    return r.success;
  }
  return true;
}
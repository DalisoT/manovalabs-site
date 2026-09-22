"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/config/site";
import { track } from "@/lib/utils/analytics";

export interface WhatsAppButtonProps {
  label?: string;
  message?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function WhatsAppButton({
  label = "Chat on WhatsApp",
  message,
  variant = "outline",
  size = "md",
  fullWidth,
}: WhatsAppButtonProps) {
  const href = whatsappLink(message);
  if (href === "#") return null;

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={() => {
        track("whatsapp_clicked", { label });
        window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      {label}
    </Button>
  );
}
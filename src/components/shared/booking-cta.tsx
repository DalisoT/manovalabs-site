"use client";

import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
import { track } from "@/lib/utils/analytics";

export interface BookingCTAProps {
  label?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BookingCTA({
  label = "Book a Consultation",
  variant = "secondary",
  size = "md",
  className,
}: BookingCTAProps) {
  if (!siteConfig.bookingUrl) {
    return (
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => {
          track("booking_clicked", { configured: false });
          window.location.href = "/contact";
        }}
      >
        <CalendarCheck className="h-4 w-4" aria-hidden />
        {label}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        track("booking_clicked", { configured: true });
        window.open(siteConfig.bookingUrl, "_blank", "noopener,noreferrer");
      }}
    >
      <CalendarCheck className="h-4 w-4" aria-hidden />
      {label}
    </Button>
  );
}
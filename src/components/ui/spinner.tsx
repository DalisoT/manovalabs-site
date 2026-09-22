import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface SpinnerProps {
  className?: string;
  size?: number;
  label?: string;
}

export function Spinner({ className, size = 20, label }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-2 text-text-secondary", className)}
    >
      <Loader2
        className="animate-spin"
        style={{ width: size, height: size }}
        aria-hidden
      />
      {label && <span className="text-body-sm">{label}</span>}
    </span>
  );
}
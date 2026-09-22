import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block text-label uppercase tracking-[0.18em] text-accent mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-display-3 text-text-primary text-balance">{title}</h2>
      {description && (
        <p className="mt-5 text-body-lg text-text-secondary text-pretty">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
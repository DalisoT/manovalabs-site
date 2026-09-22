"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: string;
}

export function Accordion({ items, className, defaultOpen }: AccordionProps) {
  const [openId, setOpenId] = useState<string | undefined>(defaultOpen);

  return (
    <div className={cn("divide-y divide-border-subtle", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? undefined : item.id)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
            >
              <span className="text-h4 text-text-primary">{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-text-tertiary transition-transform duration-200",
                  isOpen && "rotate-180 text-accent"
                )}
                aria-hidden
              />
            </button>
            <div
              id={`accordion-${item.id}`}
              role="region"
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-5 text-body text-text-secondary">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
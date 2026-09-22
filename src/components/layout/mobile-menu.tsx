"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { navItems, siteConfig, whatsappLink } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";

export interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[60] lg:hidden transition-opacity duration-200",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute right-0 top-0 h-full w-[min(360px,85vw)] bg-bg-surface border-l border-border-subtle shadow-2xl transition-transform duration-300 ease-out flex flex-col",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-border-subtle">
          <span className="text-body font-semibold text-text-primary">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle text-text-secondary hover:text-text-primary"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-5">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between rounded-md px-4 py-3 text-body transition-colors",
                      active
                        ? "bg-bg-elevated text-text-primary"
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/60"
                    )}
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-5 border-t border-border-subtle space-y-3">
          <Link
            href="/start-project"
            onClick={onClose}
            className="flex h-12 items-center justify-center rounded-md bg-accent text-bg-base font-medium hover:bg-accent-soft transition-colors"
          >
            Start a Project
          </Link>
          {siteConfig.whatsapp && (
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 items-center justify-center rounded-md border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
            >
              Chat on WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
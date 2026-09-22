"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ToastKind = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  kind: ToastKind;
  title: string;
  description?: string;
}

interface ToastContextValue {
  push: (t: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const iconFor = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

const colorFor = {
  success: "text-success",
  error: "text-danger",
  warning: "text-warning",
  info: "text-text-secondary",
} as const;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 5000);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-[min(360px,90vw)]"
      >
        {toasts.map((t) => {
          const Icon = iconFor[t.kind];
          return (
            <div
              key={t.id}
              className={cn(
                "glass rounded-md p-4 flex gap-3 animate-fade-up shadow-lg"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", colorFor[t.kind])} aria-hidden />
              <div className="min-w-0">
                <p className="text-body-sm font-medium text-text-primary">{t.title}</p>
                {t.description && (
                  <p className="text-body-sm text-text-tertiary mt-1">{t.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
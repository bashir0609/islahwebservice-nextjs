"use client";

import * as React from "react";

type ToastVariant = "default" | "success" | "error";

export interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastState {
  toasts: ToastItem[];
}

const TOAST_TIMEOUT = 4000;
let addToastFn: ((toast: Omit<ToastItem, "id">) => string) | null = null;
let dismissToastFn: ((id: string) => void) | null = null;

export function useToast() {
  const [state, setState] = React.useState<ToastState>({ toasts: [] });

  React.useEffect(() => {
    addToastFn = (toast) => {
      const id = crypto.randomUUID();
      setState((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
      setTimeout(() => dismissToastFn?.(id), TOAST_TIMEOUT);
      return id;
    };
    dismissToastFn = (id) => {
      setState((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    };
    return () => {
      addToastFn = null;
      dismissToastFn = null;
    };
  }, []);

  const toast = React.useCallback(
    (toast: Omit<ToastItem, "id">) => addToastFn?.(toast) ?? "",
    []
  );
  const dismiss = React.useCallback((id: string) => dismissToastFn?.(id), []);

  return { toast, dismiss, toasts: state.toasts };
}

export function toast(toast: Omit<ToastItem, "id">) {
  return addToastFn?.(toast) ?? "";
}

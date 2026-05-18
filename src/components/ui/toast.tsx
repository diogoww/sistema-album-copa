"use client";

import { create } from "zustand";

type ToastState = {
  message: string | null;
  show: (message: string) => void;
  hide: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  show: (message) => set({ message }),
  hide: () => set({ message: null })
}));

export function Toast() {
  const message = useToastStore((state) => state.message);
  const hide = useToastStore((state) => state.hide);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-brand-ink px-4 py-3 text-sm text-white shadow-soft">
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button className="text-white/70" onClick={hide}>
          Fechar
        </button>
      </div>
    </div>
  );
}

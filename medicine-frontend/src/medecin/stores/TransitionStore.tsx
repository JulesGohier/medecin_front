import React from "react";
import { create } from "zustand";

interface TransitionState {
    isPending: boolean;
    startTransition: (callback: () => void) => void;
}

export const useTransitionStore = create<TransitionState>((set) => ({
    isPending: false,
    startTransition: (callback) => {
        set({ isPending: true });
        React.startTransition(() => {
            callback();
            set({ isPending: false });
        });
    },
}));
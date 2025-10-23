"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteTag } from "@/types/note";

export type DraftNote = {
    title: string;
    content: string;
    tag: NoteTag;
};

export const initialDraft: DraftNote = {
    title: "",
    content: "",
    tag: "Todo",
};

type NoteStore = {
    draft: DraftNote;
    setDraft: (draft: DraftNote) => void;
    clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
    
            setDraft: (draft: DraftNote) => set({ draft }),

            clearDraft: () => set({ draft: initialDraft }),
        }),
        {
            name: "notehub-draft", // Ключ для localStorage
            version: 1,
        }
    )
);
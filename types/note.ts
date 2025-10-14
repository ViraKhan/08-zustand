export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
export const NoteTagAll = [
  "All",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;

export interface Note {
    id: string;
    title: string;
    content: string;
    tag: NoteTag;
    createdAt: string;
    updatedAt: string;
}
export type Category = (typeof NoteTagAll)[number];
export type SortBy = "title" | "createdAt" | "updatedAt";
export type Tag = Note["tag"];
export type NoteId = Note["id"];

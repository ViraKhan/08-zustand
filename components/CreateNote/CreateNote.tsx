"use client";

import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm/NoteForm";

// useRouter&Cancel
export default function CreateNotePage() {
    const router = useRouter();
    return <NoteForm onCancel={() => router.back()} />;
}
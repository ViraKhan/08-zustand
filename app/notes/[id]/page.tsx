import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import type { Metadata } from "next";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params; // Очікуємо на Promise

    try {
        const note = await fetchNoteById(id);
        const snippet =
            note.content.length > 150
                ? `${note.content.slice(0, 150)}…`
                : note.content || "Note details";

        const title = `${note.title} | NoteHub`;
        const url = `${siteUrl}/notes/${id}`;

        return {
            title,
            description: snippet,
            openGraph: {
                title,
                description: snippet,
                url,
                images: ["/notehub-og-meta.webp"],
                type: "article",
            },
        };
    } catch (error) {
       console.error("Failed to fetch note:", error);
        return {
            title: "Note Not Found | NoteHub",
            description: "Could not find the requested note.",
        };
    }
}



const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
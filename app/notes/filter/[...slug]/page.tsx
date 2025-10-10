import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { type Category, type CategoryNoAll } from "@/types/note";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface NotesProps {
    params: Promise<{ slug?: string[] }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL  || 'http://localhost:3000';
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
    const { slug } = await params; 
    const rawTag = slug?.[0];
    const tag = rawTag && rawTag !== "All" ? rawTag : "All";

    const title = `Notes – ${tag} | NoteHub`;
    const description =
        tag === "All"
            ? "Browse all your NoteHub notes."
            : `Browse your NoteHub notes filtered by tag: ${tag}.`;

    const url = `${siteUrl}/notes/filter/${tag}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
        },
    };
}

export default async function Page({ params }: NotesProps) {
  const { slug = [] } = await params;
  const tag = slug[0] as Category | undefined;

  // якщо немає slug  → 404
  if (!tag) notFound();

  const category: CategoryNoAll | undefined =
    tag === "All" ? undefined : (tag as CategoryNoAll);

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: [
      "notes",
      { page: 1, perPage: 8, search: "", tag: category ?? null },
    ],
    queryFn: () => fetchNotes(1, 8, undefined, category),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
}
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const staticTags: NoteTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

type Props = {
  params: { slug?: string[] }; 
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.slug?.[0] ?? 'All';

  if (tag !== 'All' && !staticTags.includes(tag as NoteTag)) notFound();

  return {
    title: `Category: ${tag}`,
    description: `List of notes for a category ${tag}`,
    openGraph: {
      title: `Category: ${tag}`,
      description: `NoteHub list of notes for a category ${tag}`,
      url: `https://08-zustand-six-opal.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub',
        },
      ],
    },
  };
}

const NotesPage = async ({ params }: Props) => {
  const tag = params.slug?.[0] ?? 'All';

  if (tag !== 'All' && !staticTags.includes(tag as NoteTag)) notFound();

  const queryClient = new QueryClient();
  const search = '';
  const page = 1;
  const perPage = 10;

  //  NoteTag | undefined для fetchNotes і NotesClient
  const tagForFetch: NoteTag | undefined = tag === 'All' ? undefined : (tag as NoteTag);

  // Prefetch даних
  await queryClient.prefetchQuery({
    queryKey: ['notes', search, page, perPage, tagForFetch],
    queryFn: () =>
      fetchNotes({
        page,
        query: search,
        tag: tagForFetch,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tagForFetch} />
    </HydrationBoundary>
  );
};

export default NotesPage;

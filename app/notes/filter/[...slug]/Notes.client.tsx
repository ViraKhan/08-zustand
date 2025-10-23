'use client';

import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import css from './Notes.client.module.css';
import Link from 'next/link';
import type { NoteTag } from '@/types/note';

const NotesClient = ({ tag }: { tag?: NoteTag }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const perPage = 12;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', searchQuery, currentPage, perPage, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        query: searchQuery,
        tag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  const { notes = [], totalPages } = data || {};

  const handleSearch = useDebouncedCallback((val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {notes.length > 0 && totalPages && totalPages > 1 && (
  <Pagination
    pageCount={totalPages}
    currentPage={currentPage}
     onPageChange={setCurrentPage}
  />
)}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to load notes.</p>}
      {!isLoading && notes.length === 0 && <p>No notes found.</p>}

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
};

export default NotesClient;

"use client";

import { useState, useEffect } from "react";
import css from "./Notes.client.module.css";
import {
  useQuery,
  keepPreviousData
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteForm from "@/components/NoteForm/NoteForm";
import { type CategoryNoAll } from "@/types/note";



type NotesClientProps = {
  category: string | undefined;
};

export default function NotesClient({ category }: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const perPage = 8;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [
      "notes",
      { page: currentPage, perPage, search, tag: category ?? null },
    ],
    queryFn: () =>
      fetchNotes(currentPage, perPage, search || undefined, category as CategoryNoAll | undefined),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 30_000,
  });

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput.trim());
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(t);
  }, [searchInput, category]);

  const hasResults = !!data?.notes?.length;
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={setSearchInput} />

        {hasResults && totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main  className={css.notesList}>
        {isLoading && <p>Loading…</p>}
        {isError && <p>Something went wrong.</p>}
       

        {data && !isLoading && <NoteList notes={data.notes ?? []} />}

       
        {isFetching && !isLoading && <p>Updating…</p>}

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onCancel={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </main>
    </div>
  );
}

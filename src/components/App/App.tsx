import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import { NoteList } from '../NoteList/NoteList';
import css from './App.module.css';
import Pagination from '../Pagination/Pagination';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { useDebouncedCallback } from 'use-debounce';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchBox from '../SearchBox/SearchBox';
import NoteForm from '../NoteForm/NoteForm';

export default function App() {
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchValues, setSearchValues] = useState('');
    const { data, isLoading, isError } = useQuery({
        queryKey: ['note', page, searchValues],
        queryFn: () => fetchNotes(page, searchValues),
        placeholderData: keepPreviousData,
    });

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    const notes = data?.notes || [];
    const totalPages = data?.totalPages || 0;

    const handleChange = useDebouncedCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValues(e.target.value);
            setPage(1);
        },
        300
    );

    return (
        <>
            <div className={css.app}>
                <header className={css.toolbar}>
                    <SearchBox onSearch={handleChange} search={searchValues} />
                    {totalPages > 1 && (
                        <Pagination
                            totalPages={totalPages}
                            page={page}
                            onPage={page => {
                                setPage(page);
                            }}
                        />
                    )}
                    <button className={css.button} onClick={openModal}>
                        Create note +
                    </button>
                </header>
            </div>
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {notes.length > 0 && <NoteList notes={notes} />}
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <NoteForm onClose={closeModal} />
                </Modal>
            )}
        </>
    );
}

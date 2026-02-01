import axios from "axios";
import type { Note, NoteId } from "../types/note";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface GetNotesResponse {
    notes: Note[];
    totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export async function fetchNotes(page:number, search:string):Promise<GetNotesResponse> {
    const {data} = await axios.get<GetNotesResponse>('/notes', {
        params: {
            page: page,
            perPage: 12,
            search: search,
        },
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    }
        
    )
    return data
}

export async function createNote(newNote:Note) {
    const { data } = await axios.post<Note>('/notes', newNote, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })

    return data;
}


export async function deleteNote(id: NoteId) {
    const { data } = await axios.delete<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    return data;
}
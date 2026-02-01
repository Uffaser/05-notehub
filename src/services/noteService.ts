import axios from "axios";
import type { Note } from "../types/note";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface GetNotesResponse {
    notes: Note[];
    totalPages: number;
}

interface PostNote {
    title: string;
    content: string;
    tag: string;
}

const noteInstance = axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {
        Authorization: `Bearer ${myKey}`
    }
})

export async function fetchNotes(page:number, search:string):Promise<GetNotesResponse> {
    const {data} = await noteInstance.get<GetNotesResponse>('/notes', {
        params: {
            page: page,
            perPage: 15,
            search: search,
        },
    })
    return data
}

export async function createNote(newNote:PostNote):Promise<Note> {
    const { data } = await noteInstance.post<Note>('/notes', newNote)

    return data;
}


export async function deleteNote(id: string):Promise<Note> {
    const { data } = await noteInstance.delete<Note>(`/notes/${id}`)

    return data;
}
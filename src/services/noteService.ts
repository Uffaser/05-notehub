import axios from "axios";
import type { Note} from "../types/note";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

interface GetNotesResponse {
    notes: Note[];
    totalPages: number;
}

interface PostNotesResponse {
    title: string;
    content: string;
    tag: string;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export async function fetchNotes(page:number, search:string):Promise<GetNotesResponse> {
    const {data} = await axios.get<GetNotesResponse>('/notes', {
        params: {
            page: page,
            perPage: 15,
            search: search,
        },
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    }
        
    )
    return data
}

export async function createNote(newNote:PostNotesResponse):Promise<PostNotesResponse> {
    const { data } = await axios.post<PostNotesResponse>('/notes', newNote, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })

    return data;
}


export async function deleteNote(id: string) {
    const { data } = await axios.delete<PostNotesResponse>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    return data;
}
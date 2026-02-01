export interface Note {
    content: string;
    id?: string;
    title: string;
    tag: string;
}

export type NoteId = Note['id']
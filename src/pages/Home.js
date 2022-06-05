import { getInitialData } from "../utils";
import { useState } from "react";
import NoteCard from "../components/NoteCard";
import NoteCreate from "../components/NoteCreate";
import NoteSearch from "../components/NoteSearch";
import NoteEmpty from "../components/NoteEmpty";

export default function Home() {
    const [searchValue, setSearchValue] = useState("");
    const [notes, setNotes] = useState(getInitialData().reverse());

    function addNoteHandler({ title, body }) {
        setNotes((notes) => [
            {
                id: +new Date(),
                title,
                body,
                createdAt: new Date(),
                archived: false,
            },
            ...notes,
        ]);
    }

    function removeNoteHandler(id) {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    }

    function toggleArchivedNoteHandler(id) {
        const newNotes = notes.map((note) =>
            note.id === id ? { ...note, archived: !note.archived } : note
        );

        setNotes(newNotes);
    }

    function SearchNoteHandler(title) {
        setSearchValue(title);
    }

    return (
        <div className="note-app__body">
            <NoteCreate addNote={addNoteHandler.bind(this)} />
            <NoteSearch search={SearchNoteHandler.bind(this)} />

            <h2>Catatan Aktif</h2>
            {notes.filter(
                (note) =>
                    !note.archived &&
                    note.title.toLowerCase().includes(searchValue.toLowerCase())
            ).length ? (
                <div className="notes-list">
                    {notes.map((note) =>
                        !note.archived &&
                        note.title
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()) ? (
                            <NoteCard
                                {...note}
                                key={note.id}
                                onDelete={removeNoteHandler.bind(this)}
                                toggleArchive={toggleArchivedNoteHandler.bind(
                                    this
                                )}
                            />
                        ) : null
                    )}
                </div>
            ) : (
                <NoteEmpty />
            )}

            <h2>Arsip</h2>
            {notes.filter(
                (note) =>
                    note.archived &&
                    note.title.toLowerCase().includes(searchValue.toLowerCase())
            ).length ? (
                <div className="notes-list">
                    {notes.map((note) =>
                        note.archived &&
                        note.title
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()) ? (
                            <NoteCard
                                {...note}
                                key={note.id}
                                onDelete={removeNoteHandler.bind(this)}
                                toggleArchive={toggleArchivedNoteHandler.bind(
                                    this
                                )}
                            />
                        ) : null
                    )}
                </div>
            ) : (
                <NoteEmpty />
            )}
        </div>
    );
}

import { getInitialData } from "../utils";
import { useState } from "react";
import NoteCard from "../components/NoteCard";
import NoteCreate from "../components/NoteCreate";
import NoteSearch from "../components/NoteSearch";
import NoteEmpty from "../components/NoteEmpty";

export default function Home() {
    // dibuat variabel terpisah agar bisa mendapatkan jumlah array note
    // sehingga bisa memenuhi permintaan kondisi note kosong
    // kalau ada yg lebih optimal dari ini mohon masukannya

    const [searchValue, setSearchValue] = useState("");
    const [activeNotes, setActiveNotes] = useState(
        getInitialData()
            .reverse()
            .filter((note) => note.archived === false)
    );
    const [archivedNotes, setArchivedNotes] = useState(
        getInitialData()
            .reverse()
            .filter((note) => note.archived === true)
    );

    function addNoteHandler({ title, body, archived }) {
        archived
            ? setArchivedNotes((notes) => [
                  {
                      id: notes.length + 1,
                      title,
                      body,
                      createdAt: new Date(),
                      archived: true,
                  },
                  ...notes,
              ])
            : setActiveNotes((notes) => [
                  {
                      id: notes.length + 1,
                      title,
                      body,
                      createdAt: new Date(),
                      archived: false,
                  },
                  ...notes,
              ]);
    }

    function removeNoteHandler(id, archived) {
        if (archived) {
            const newArchivedNotes = archivedNotes.filter(
                (note) => note.id !== id
            );
            setArchivedNotes(newArchivedNotes);
        } else {
            const newActiveNotes = activeNotes.filter((note) => note.id !== id);
            setActiveNotes(newActiveNotes);
        }
    }

    function toggleArchivedNoteHandler(id, archived) {
        if (archived) {
            const theNote = archivedNotes.find((note) => note.id === id);

            // seharusnya dengan cara ini tidak perlu oject archived karena sudah dikelompokkan 
            // dengan variabel, tapi agar satisfy kriteria utama maka masih dicantumkan dan diubah
            // nilainya disini
            
            addNoteHandler({
                ...theNote,
                archived: false,
            });

            removeNoteHandler(id, true);
        } else {
            const theNote = activeNotes.find((note) => note.id === id);

            addNoteHandler({
                ...theNote,
                archived: true,
            });

            removeNoteHandler(id, false);
        }
    }

    function SearchNoteHandler(title) {
        setSearchValue(title);
    }

    return (
        <div className="note-app__body">
            <NoteCreate addNote={addNoteHandler.bind(this)} />
            <NoteSearch search={SearchNoteHandler.bind(this)} />

            <h2>Catatan Aktif</h2>
            {activeNotes.length ? (
                <div className="notes-list">
                    {activeNotes.map((note) =>
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
            {archivedNotes.length ? (
                <div className="notes-list">
                    {archivedNotes.map((note) =>
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

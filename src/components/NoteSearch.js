import { useState } from "react";

export default function NoteSearch({ searchTitle }) {
    const [search, setSearch] = useState("");

    function searchFieldHandler(event) {
        setSearch(event.target.value);
        searchTitle(event.target.value)
    }

    return (
        <div className="note-search">
            <h2>Cari catatan</h2>
            <form className="note-search__form">
                <input
                    className="note-search__search"
                    type="text"
                    placeholder="Cari judul catatan ..."
                    onChange={searchFieldHandler}
                    value={search}
                />
                <button className="submit" type="submit">
                    Cari
                </button>
            </form>
        </div>
    );
}

import { useState } from "react";

export default function NoteSearch(props) {
    const [search, setSearch] = useState("");

    function searchFieldHandler(event) {
        setSearch(event.target.value);
    }

    function onSubmitEventHandler(event) {
        event.preventDefault();
        props.search(search);
    }

    return (
        <div className="note-search">
            <h2>Cari catatan</h2>
            <form className="note-search__form" onSubmit={onSubmitEventHandler.bind(this)}>
                <input
                    className="note-search__search"
                    type="text"
                    placeholder="Cari judul catatan ..."
                    onChange={searchFieldHandler.bind(this)}
                    value={search}
                />
                <button className="submit" type="submit">Cari</button>
            </form>
        </div>
    );
}

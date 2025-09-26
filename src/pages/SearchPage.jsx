import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getAllNotes } from '../utils/local-data';
import { showFormattedDate } from '../utils';

const SearchPage = () => {

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const notes = getAllNotes();
  const filtered = notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <h2>
        Halaman Pencarian
      </h2>

      {filtered.length > 0 ? (
        <section>

          {filtered.map((note) => (
            <Link to={`/detail/${note.id}`} key={note.id}>
              <h2>{note.title}</h2>
              <p>{showFormattedDate(note.createdAt)}</p>
              <p>{note.body}</p>
            </Link>
          ))}
        </section>
      ) : (
        <section>
          <h2>Tidak ada Notes yang dicari</h2>
        </section>
      )}

    </div>
  )
}

export default SearchPage
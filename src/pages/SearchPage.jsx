import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { showFormattedDate } from '../utils';
import { getActiveNotes } from '../utils/network-data';

const SearchPage = () => {

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const filtered = notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const fetchData = async () => {
      const {error, data} = await getActiveNotes();
      if(!error) {
        setNotes(data);
        setLoading(false);
      }
    }
    fetchData();
  },[])

  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>
        Halaman Pencarian
      </h2>

      {filtered.length > 0 ? (
        <section>

          {filtered.map((note) => (
            <Link to={`/notes/${note.id}`} key={note.id}>
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
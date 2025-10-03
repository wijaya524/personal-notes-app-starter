import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import { getActiveNotes } from '../utils/network-data';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const filtered = notes.filter((note) =>
    note.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      const { error, data } = await getActiveNotes();
      if (!error) {
        setNotes(data);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-4">
        <AiOutlineLoading3Quarters className="text-blue-500 text-4xl animate-spin" />
        <p className="text-blue-500 text-lg font-semibold">Loading....</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-50 p-4">
      <h2 className="text-xl font-bold mb-6 text-center">
        Halaman Pencarian
      </h2>

      {filtered.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((note) => (
            <Link
              to={`/notes/${note.id}`}
              key={note.id}
              className="block p-4  rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-500"
            >
              <h3 className="text-xl font-semibold  mb-1">{note.title}</h3>
              <p className="text-sm  mb-2">{showFormattedDate(note.createdAt)}</p>
              <p className=" line-clamp-3">{note.body}</p>
            </Link>
          ))}
        </section>
      ) : (
        <section className="text-center mt-10">
          <h2 className="text-xl ">Tidak ada Notes yang dicari</h2>
        </section>
      )}
    </div>
  );
};

export default SearchPage;

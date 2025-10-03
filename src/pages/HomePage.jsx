import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import Lang from '../context/languageContext';
import { getActiveNotes } from '../utils/network-data';
import { Button } from '@heroui/react';
import { FaPlus } from "react-icons/fa6";

const HomePage = () => {
  const { lang } = useContext(Lang);
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${keyword}`);
  }

  useEffect(() => {
    const fetchNotes = async () => {
      const { error, data } = await getActiveNotes();
      if (!error) {
        setNotes(data);
      }
    }
    fetchNotes();
  }, []);

  return (
    <div className="relative px-4 sm:px-8 md:px-16 py-6 dark:text-slate-50 transition-colors ">
     
      <form
        className="search-bar flex flex-row items-center justify-center gap-2 mb-6"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          required
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={lang === "id" ? "Cari catatan..." : "Search notes..."}
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <Button type='submit' color="primary" className="px-4 py-2 bg-blue-600 text-slate-50 rounded-2xl ">
          {lang === "id" ? "Kirim" : "Submit"}
        </Button>
      </form>

      {notes.length === 0 ? (
        <section className="notes-list-empty text-center mt-10 text-gray-500 dark:text-gray-400">
          <p>Tidak ada catatan yang tersedia</p>
        </section>
      ) : (
        <section className="notes-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {notes.filter(note => !note.archived).map(note => (
            <Link
              key={note.id}
              to={`/notes/${note.id}`}
              className="block p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
            >
              <p className="note-item__title font-bold text-lg mb-1">{note.title}</p>
              <p className="note-item__createdAt text-sm text-gray-500 dark:text-gray-400 mb-2">
                {showFormattedDate(note.createdAt)}
              </p>
              <p className="note-item__body text-gray-700 dark:text-gray-300">{note.body}</p>
            </Link>
          ))}
        </section>
      )}

      {/* Floating Add Button */}
      <section className="fixed bottom-4 sm:bottom-10 right-4 sm:right-10 z-50">
        <Link to="/notes/new">
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110">
            <FaPlus className="text-xl" />
          </button>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;

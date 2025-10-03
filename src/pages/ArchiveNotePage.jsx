import React, { useEffect, useState } from 'react';
import { showFormattedDate } from '../utils';
import { getArchivedNotes, unarchiveNote } from '../utils/network-data';

const ArchiveNotePage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { error, data } = await getArchivedNotes();
      if (!error) {
        setNotes(data);
      }
    };
    fetchData();
  }, []);

  if (!notes) {
    return <p className="text-center text-gray-500 dark:text-gray-400 mt-6">Data tidak ditemukan</p>;
  }

  const handleUnarchive = (id) => {
    unarchiveNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="px-4 sm:px-6 md:px-12 py-6 dark:text-slate-50 transition-colors">
      <h1 className="text-2xl font-bold mb-6">Halaman Arsip</h1>
      {notes.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
          <p>Halaman Arsip Kosong</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg mb-1">{note.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{showFormattedDate(note.createdAt)}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{note.body}</p>
              <button
                onClick={() => handleUnarchive(note.id)}
                className="unarchive-button w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-2xl shadow transition-transform "
              >
                UNARCHIVE
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArchiveNotePage;

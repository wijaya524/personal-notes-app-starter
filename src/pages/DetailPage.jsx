import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { archiveNote, deleteNote, getNote, unarchiveNote } from '../utils/network-data'
import { showFormattedDate } from '../utils'
import { useState } from 'react'
import NotFoundPage from './404NotFound'
import { useEffect } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DetailPage = () => {

  const { id } = useParams();
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      const { error, data } = await getNote((id));
      if (!error) {
        setNotes(data);
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  if (loading) {
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-4">
      <AiOutlineLoading3Quarters className="text-blue-500 text-4xl animate-spin" />
      <p className="text-blue-500 text-lg font-semibold">Loading....</p>
    </div>
  }


  if (!notes) {
    return <> <NotFoundPage /> </>
  };

  const handleDelete = (e) => {
    e.preventDefault()
    deleteNote(notes.id)
    navigate("/");
  };


  const handleArchive = (e) => {
    e.preventDefault()
    archiveNote(notes.id)
    setNotes({ ...notes, archived: true });
  };

  const handleUnarchive = (e) => {
    e.preventDefault()
    unarchiveNote(notes.id)
    setNotes({ ...notes, archived: false });
  };




  return (
    <>
      <section className='detail-page max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8  bg-gray-50 dark:bg-gray-900 dark:text-slate-50 transition-colors'>
        <h3 className='detail-page__title text-3xl font-bold mb-2'>{notes.title}</h3>
        <p className='detail-page__createdA text-sm text-gray-500 dark:text-gray-400 mb-6'>
          {showFormattedDate(notes.createdAt)}
        </p>
        <p className='detail-page__body text-gray-700 dark:text-gray-300 mb-8 whitespace-pre-line'>
          {notes.body}
        </p>
        <section className='button-page flex flex-wrap gap-4'>
          <button
            className='delete_button bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow transition-transform hover:scale-105'
            onClick={handleDelete}
          >
            DELETE
          </button>
          {notes.archived === false ? (
            <button
              className='archive-button bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow transition-transform hover:scale-105'
              onClick={handleArchive}
            >
              ARCHIVE
            </button>
          ) : (
            <button
              className='unarchive-button bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded shadow transition-transform hover:scale-105'
              onClick={handleUnarchive}
            >
              UNARCHIVE
            </button>
          )}
        </section>
      </section>
    </>

  )
}

export default DetailPage
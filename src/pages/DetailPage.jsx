import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { archiveNote, deleteNote, getNote, unarchiveNote } from '../utils/local-data'
import { showFormattedDate } from '../utils'
import { useState } from 'react'
import NotFoundPage from './404NotFound'

const DetailPage = () => {

  const { id } = useParams();
  const [notes, setNotes] = useState(getNote((id)));
  const navigate = useNavigate();

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
      <section className='detail-page '>
        <h3 className='detail-page__title'>
          {notes.title}
        </h3>
        <p className='detail-page__createdA'>{showFormattedDate(notes.createdAt)}</p>
        <p className='detail-page__body'>{notes.body}</p>
        <section className='button-page'>
          <button className='delete_button' onClick={handleDelete}>DELETE</button>
          {notes.archived === false ? (
            <button className='archive-button' onClick={handleArchive}>
              ARCHIVE
            </button>
          ) : (
            <button className='unarchive-button' onClick={handleUnarchive}>
              UNARCHIVE
            </button>
          )}
        </section>
      </section>
    </>
  )
}

export default DetailPage
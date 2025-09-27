import React, { useEffect } from 'react'
import { useState } from 'react';
import { showFormattedDate } from '../utils';
import { getArchivedNotes, unarchiveNote } from '../utils/network-data';

const ArchiveNotePage = () => {


  const [notes, setNotes] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      const {error, data} = await getArchivedNotes();

      if(!error) {
        setNotes(data);
      }

    }

    fetchData();
  },[])


  if (!notes) {
    return <p>Data tidak ditemukan</p>
  };

  const handleUnarchive = (id) => {
    
    unarchiveNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };



  return (
    <div>
      <h1>Halo</h1>
      {notes.length  === 0 ? (
           <div>
          <p>Halaman Arsip Kosong</p>
        </div>
      ) : (
        notes.map((note) => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{showFormattedDate(note.createdAt)}</p>
            <p>{note.body}</p>
            <button className='unarchive-button' onClick={() => handleUnarchive(note.id)}>
              UNARCHIVE
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default ArchiveNotePage
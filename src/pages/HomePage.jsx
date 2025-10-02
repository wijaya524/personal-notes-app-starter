import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import { useContext } from 'react';
import ThemeContext from '../context/themeContext';
import Lang from '../context/languageContext';
import { getActiveNotes } from '../utils/network-data';
import { useEffect } from 'react';



const HomePage = () => {


  const { lang, setLang } = useContext(Lang);
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
  }, [])



  return (
    <div >
      <form className='search-bar' onSubmit={handleSearch}>
        <input placeholder={lang === "id" ? "Cari catatan..." : "Search notes..."} required type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <button type='submit' className='submit-search'>
          {lang === "id" ? "Kirim" : "Submit"}
        </button>
        
      </form>

      {notes.length === 0 ? (
        <section className='notes-list-empty'>
          <p >Tidak ada catatan yag tersedia</p>
        </section>
      ) : (
        <section className='notes-list'>

          {
            notes.filter((note) => note.archived == false).map((note) => (
              <section key={note.id}>
                <Link to={`/notes/${note.id}`}  >
                  <p className='note-item__title'>
                    {note.title}
                  </p>
                  <p className='note-item__createdAt'>{showFormattedDate(note.createdAt)}</p>
                  <p className='note-item__body'>{note.body}</p>
                </Link>
              </section>
            ))
          }
        </section>
      )}


    </div>
  )
}


export default HomePage;
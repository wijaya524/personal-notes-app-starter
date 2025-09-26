import React, { useState } from 'react'
import { getAllNotes } from '../utils/local-data';
import { Link, useNavigate } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import { useContext } from 'react';
import ThemeContext from '../context/themeContext';
import Lang from '../context/languageContext';

const HomePage = () => {
  
  const {theme, setTheme} = useContext(ThemeContext);
  const {lang, setLang} = useContext(Lang);
  const [notes, setNotes] = useState(getAllNotes());
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${keyword}`);
  }


  return (
    <div>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        ganti tema
      </button>
      <button onClick={() => setLang(lang === "id" ? "eng" : "id")}>Ganti Bahasa</button>
      <form className='search-bar' onSubmit={handleSearch}>
        <input placeholder='Cari catatan....' required type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
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
                <Link to={`/detail/${note.id}`}  >
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
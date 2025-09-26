import React, {  useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import ArchiveNotePage from './pages/ArchiveNotePage'
import AddNotePage from './pages/AddNote';
import NotFoundPage from './pages/404NotFound';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaArchive } from "react-icons/fa";
import ThemeContext from './context/themeContext';
import Lang from './context/languageContext';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';

function App() {

  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("id")


  return (
    <BrowserRouter>
    <ThemeContext.Provider value={{theme, setTheme}}>
      <Lang.Provider value={{lang, setLang}}>
      <div className="app-container" data-theme={theme} lang={lang}>
        <header>
          <h1>Hello, React</h1>
          <nav className="navigation">

            <ul>
              <li className='botton-home'>
                <Link to={'/'}>
                  <IoHome />   
                </Link>
              </li>
              <li className='add-new-page__action'>
                <Link to={'/notes/new'}>
                  <FaPlus />
                </Link>
              </li>
              <li>
                <Link to={"/archive"}>
                  <FaArchive />
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/detail/:id' element={<DetailPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/archive' element={<ArchiveNotePage />} />
            <Route path='/notes/new' element={<AddNotePage />} />
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </main>
      </div>
      </Lang.Provider>
    </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useMatch } from 'react-router-dom';
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
import { getAccessToken, getUserLogged } from './utils/network-data';
import ProtectRoute from './utils/protect';
import { MdOutlineGTranslate } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";
import { GoSun } from 'react-icons/go';


function App() {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  })
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "id"
  });
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
 

    useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  },[theme])


  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang])


  useEffect(() => {
    const checkAuth = async () => {

      const token = getAccessToken();
      if (!token) {
        setLoading(false);
        setIsLogged(false);
        return;
      }

      const response = await getUserLogged();
      if (!response.error) {
        setIsLogged(true);
        setUser(response.data);
      } else {
        setIsLogged(false);
        setUser(null);
        localStorage.removeItem("accessToken");
      };
      setLoading(false);
    };

    checkAuth()
  }, [])

  const deleteToken = () => {

    localStorage.removeItem('accessToken');
    window.location.href = "/login";
  }




  return (
    <>
      {loading ? (
        <div>
          <p>Loading....</p>
        </div>
      ) : (
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Lang.Provider value={{ lang, setLang }}>
            <div className="app-container" lang={lang}>
              {isLogged && (
                <header>
                  <h1>Project Asah</h1>
                  <nav className="navigation">
                    <ul>

                      <li>
                        <button className='button-logout' onClick={deleteToken}>LogOut</button>
                      </li>
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
                        <Link to={"/notes/archived"}>
                          <FaArchive />
                        </Link>
                      </li>
                      <li>
                        <button onClick={() => setLang(lang === "id" ? "eng" : "id")}><MdOutlineGTranslate /></button>
                      </li>
                      <li>
                        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                          {theme === "dark" ? <GoSun /> : <FaRegMoon />}
                        </button>
                      </li>
                    </ul>
                  </nav>
                </header>
              )}
              <main>
                <Routes>
                  <Route path='/' element={
                    <ProtectRoute isLogged={isLogged}>
                      <HomePage />
                    </ProtectRoute>
                  } />
                  <Route path='/notes/:id' element={
                    <ProtectRoute isLogged={isLogged}>
                      <DetailPage />
                    </ProtectRoute>
                  } />
                  <Route path='/search' element={
                    <ProtectRoute isLogged={isLogged}>
                      <SearchPage />
                    </ProtectRoute>
                  } />
                  <Route path='/notes/archived' element={
                    <ProtectRoute isLogged={isLogged}>
                      <ArchiveNotePage />
                    </ProtectRoute>
                  } />
                  <Route path='/notes/new' element={
                    <ProtectRoute isLogged={isLogged}>
                      <AddNotePage />
                    </ProtectRoute>
                  } />
                  <Route path='*' element={
                    <ProtectRoute isLogged={isLogged}>
                      <NotFoundPage />
                    </ProtectRoute>
                  } />
                  <Route path='/register' element={
                    <Register />
                  } />
                  <Route path='/login' element={
                    <LoginPage setIsLogged={setIsLogged} />
                  } />
                </Routes>
              </main>
            </div>
          </Lang.Provider>
        </ThemeContext.Provider>
      )}

    </>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useMatch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import ArchiveNotePage from './pages/ArchiveNotePage'
import AddNotePage from './pages/AddNote';
import NotFoundPage from './pages/404NotFound';
import { Link } from 'react-router-dom';
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
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRef } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const btnRef = useRef(null);


  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme])


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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        btnRef.current &&
        !btnRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  return (
    <>
      {loading ? (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-4">
          <AiOutlineLoading3Quarters className="text-blue-500 text-4xl animate-spin" />
          <p className="text-blue-500 text-lg font-semibold">Loading....</p>
        </div>
      ) : (
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Lang.Provider value={{ lang, setLang }}>
            <div className="app-container max-w-7xl min-h-screen  dark:text-slate-50" lang={lang}>
              {isLogged && (
                <header className="flex items-center justify-between px-4 md:px-10 bg-white dark:bg-gray-900 dark:text-slate-50 shadow-md">
                  <Link to={"/"}>
                    <img src="/public/logo-header.png" alt="logo-header" width={120} />
                  </Link>
                  <button
                    ref={btnRef}
                    className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <svg
                      className="w-6 h-6 text-gray-700 dark:text-slate-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                      />
                    </svg>
                  </button>
                  <nav
                    ref={navRef}
                    className={`flex bg-gray-100  md:flex-row md:flex absolute md:static top-16 left-0 w-full md:w-auto  dark:bg-gray-900 md:bg-transparent transition-all duration-300 ease-in-out z-50 ${isOpen ? "flex" : "hidden"
                      } md:flex`}
                  >
                    <ul className="w-full flex  items-center justify-evenly   md:flex-row md:items-center gap-4 p-4 md:p-0">
                      <li>
                        <Link
                          to="/notes/archived"
                          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          <FaArchive size={20} />
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => setLang(lang === "id" ? "eng" : "id")}
                          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          <MdOutlineGTranslate size={20} />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          {theme === "dark" ? <GoSun size={20} /> : <FaRegMoon size={20} />}
                        </button>
                      </li>
                      <li>
                        <button
                          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                          onClick={deleteToken}
                        >
                          LogOut
                        </button>
                      </li>
                    </ul>
                  </nav>
                </header>
              )}
              <main className='relative px-10 py-5'>

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

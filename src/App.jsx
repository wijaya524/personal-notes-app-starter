import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
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


function App() {

  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("id");
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const checkAuth = async () => {

      const token = getAccessToken();
      if (!token) {
        setLoading(false);
        setIsLogged(false);
        return;
      }

      const { error } = await getUserLogged();
      if (error) {
        setIsLogged(!error);
        setLoading(false);
      };

    };

    checkAuth()
  }, [])



  const deleteToken = () => {

    localStorage.removeItem('accessToken');
    window.location.href = "/login";
  }


  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Lang.Provider value={{ lang, setLang }}>
          <div className="app-container" data-theme={theme} lang={lang}>
            {isLogged && (
              <header>
                <h1>Hello, React</h1>
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

    </BrowserRouter>
  );
}

export default App;

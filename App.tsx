
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import GalleryPage from './pages/GalleryPage';
import ImageDetailPage from './pages/ImageDetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AdminPage from './pages/AdminPage';
import { AuthState } from './types';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('air_auth');
    return saved ? JSON.parse(saved) : { 
      isLoggedIn: false, 
      anonId: null, 
      code: null, 
      isAdmin: false,
      roomId: null,
      roomName: null
    };
  });

  useEffect(() => {
    localStorage.setItem('air_auth', JSON.stringify(auth));
  }, [auth]);

  const logout = () => {
    setAuth({ isLoggedIn: false, anonId: null, code: null, isAdmin: false, roomId: null, roomName: null });
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        {auth.isLoggedIn && (
          <nav className="bg-white shadow-sm border-b px-4 py-3 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Link to="/gallery" className="font-bold text-blue-600 text-xl tracking-tight">AIR 🖼️</Link>
                {auth.roomName && (
                  <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-md border border-blue-100">
                    {auth.roomName}
                  </span>
                )}
              </div>
              <div className="flex gap-4 items-center">
                <Link to="/gallery" className="text-sm font-medium text-gray-600 hover:text-blue-600">Galereya</Link>
                <Link to="/leaderboard" className="text-sm font-medium text-gray-600 hover:text-blue-600">Reyting</Link>
                {auth.isAdmin && (
                  <Link to="/admin" className="text-sm font-medium text-purple-600 hover:text-purple-800">Admin</Link>
                )}
                <button 
                  onClick={logout}
                  className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-200"
                >
                  Chiqish
                </button>
              </div>
            </div>
          </nav>
        )}

        <main className="flex-grow flex flex-col">
          <Routes>
            <Route 
              path="/" 
              element={auth.isLoggedIn ? <Navigate to="/gallery" /> : <LoginPage setAuth={setAuth} />} 
            />
            <Route 
              path="/admin-login" 
              element={auth.isAdmin ? <Navigate to="/admin" /> : <AdminLoginPage setAuth={setAuth} />} 
            />
            <Route 
              path="/gallery" 
              element={auth.isLoggedIn ? <GalleryPage auth={auth} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/image/:id" 
              element={auth.isLoggedIn ? <ImageDetailPage auth={auth} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/leaderboard" 
              element={auth.isLoggedIn ? <LeaderboardPage auth={auth} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/admin" 
              element={auth.isAdmin ? <AdminPage /> : <Navigate to="/admin-login" />} 
            />
          </Routes>
        </main>

        <footer className="py-8 text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} Anonymous Image Rating (AIR) MVP | <Link to="/admin-login" className="hover:underline">Admin</Link>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;

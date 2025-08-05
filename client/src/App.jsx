import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import Navbar from './components/Navbar';

// A component to manage layouts and theme
const AppLayout = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-primary-light dark:bg-primary-dark text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {!isAuthPage && <Navbar isDark={isDark} toggleTheme={toggleTheme} />}
      <Routes>
        <Route path="/login" element={<Login isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/register" element={<Register isDark={isDark} toggleTheme={toggleTheme} />} />
        <Route path="/dashboard" element={
            <PrivateRoute> <Dashboard /> </PrivateRoute>
          }
        />
        <Route path="/editor" element={
            <PrivateRoute> <Editor isDark={isDark} /> </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

// PrivateRoute to protect dashboard and editor
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
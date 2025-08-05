import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const getActiveStyle = ({ isActive }) => {
    if (!isActive) return;
    return {
      color: theme === 'light' ? '#6366F1' : '#818CF8', // primary or dark-primary
    };
  };

  return (
    <header className="bg-card dark:bg-dark-card shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary dark:text-dark-primary">
          CodeAnalytics
        </div>
        <div className="flex items-center space-x-4 md:space-x-6">
          <NavLink to="/dashboard" style={getActiveStyle} className="hidden md:block text-text-secondary hover:text-primary dark:text-dark-text-secondary dark:hover:text-dark-primary font-medium transition-colors">Dashboard</NavLink>
          <NavLink to="/editor" style={getActiveStyle} className="hidden md:block text-text-secondary hover:text-primary dark:text-dark-text-secondary dark:hover:text-dark-primary font-medium transition-colors">Editor</NavLink>
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
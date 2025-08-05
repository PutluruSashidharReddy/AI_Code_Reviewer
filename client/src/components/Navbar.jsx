import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

const Navbar = ({ isDark, toggleTheme }) => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const activeLinkStyle = {
    color: '#3b82f6',
    borderBottom: '2px solid #3b82f6'
  };

  return (
    <nav className="bg-white/80 dark:bg-secondary-dark/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/dashboard" className="text-2xl font-bold text-accent">Erralyze</NavLink>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <NavLink to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:text-accent dark:hover:text-accent transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Dashboard</NavLink>
            <NavLink to="/editor" className="px-3 py-2 rounded-md text-sm font-medium hover:text-accent dark:hover:text-accent transition-colors" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Editor</NavLink>
            
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>

            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            <motion.button
              onClick={handleSignout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors"
              title="Sign Out"
            >
              <ArrowLeftOnRectangleIcon className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
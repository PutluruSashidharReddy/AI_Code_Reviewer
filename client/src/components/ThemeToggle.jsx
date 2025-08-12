import React from 'react';
import { MoonIcon } from '@heroicons/react/24/solid';

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark theme"
      className="flex items-center justify-center w-10 h-10 rounded-full 
                 bg-black/50 text-white hover:bg-black/70 
                 transition duration-300 shadow-md"
    >
      <MoonIcon className="w-5 h-5" />
    </button>
  );
};

export default ThemeToggle;

import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = 'button', isLoading = false, variant = 'primary' }) => {
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-white focus:ring-primary dark:focus:ring-dark-primary",
    secondary: "bg-secondary hover:bg-secondary/90 text-white focus:ring-secondary dark:focus:ring-dark-secondary",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`w-full px-4 py-2.5 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-card disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 ${variants[variant]}`}
      whileHover={{ scale: isLoading ? 1 : 1.05 }}
      whileTap={{ scale: isLoading ? 1 : 0.95 }}
    >
      {isLoading ? 'Loading...' : children}
    </motion.button>
  );
};

export default Button;
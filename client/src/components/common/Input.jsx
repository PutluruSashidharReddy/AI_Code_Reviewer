import React from 'react';

const Input = ({ name, type, placeholder, value, onChange, icon }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      // Add padding-left to make space for the icon
      className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-dark-background border border-gray-300 dark:border-gray-700 rounded-md text-text-primary dark:text-dark-text-primary placeholder-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary transition"
    />
  </div>
);

export default Input;
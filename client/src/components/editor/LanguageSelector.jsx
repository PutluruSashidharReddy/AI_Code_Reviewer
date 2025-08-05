import React from 'react';

// Define the supported languages
const LANGUAGES = [
{ value: 'python', label: 'Python' },
{ value: 'cpp', label: 'C++' },
{ value: 'java', label: 'Java' },
];

const LanguageSelector = ({ language, onLanguageChange }) => {
return (
<div className="relative">
<select
value={language}
onChange={(e) => onLanguageChange(e.target.value)}
className="w-full px-4 py-2 text-base font-medium bg-gray-100 dark:bg-dark-card border border-gray-300 dark:border-gray-600 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary text-text-primary dark:text-dark-text-primary transition"
>
{LANGUAGES.map((lang) => (
<option key={lang.value} value={lang.value}>
{lang.label}
</option>
))}
</select>
<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
<svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
</svg>
</div>
</div>
);
};

export default LanguageSelector;
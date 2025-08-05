/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode
        'primary': '#6366F1',
        'secondary': '#10B981',
        'background': '#F9FAFB',
        'card': '#FFFFFF',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        
        // Dark Mode
        'dark-primary': '#818CF8',
        'dark-secondary': '#34D399',
        'dark-background': '#111827',
        'dark-card': '#1F2937',
        'dark-text-primary': '#F9FAFB',
        'dark-text-secondary': '#9CA3AF',
      }
    },
  },
  plugins: [],
}
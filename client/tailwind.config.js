/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-light': '#f9fafb',
        'primary-dark': '#0d1117',
        'secondary-dark': '#161b22',
        'accent': '#3b82f6',
        'accent-hover': '#2563eb',
        'border-dark': '#30363d',
        'danger': '#ef4444',
        'success': '#10b981',
        'info': '#3b82f6',
        'warning': '#f59e0b',
      },
      backgroundImage: {
        'login-dark': 'linear-gradient(to bottom right, #1e3a8a, #6b21a8, #111827)',
        'register-dark': 'linear-gradient(to bottom right, #065f46, #0f766e, #111827)',
        'login-light': 'linear-gradient(to bottom right, #e0f2fe, #cbd5e1)',
        'register-light': 'linear-gradient(to bottom right, #d1fae5, #cbd5e1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in-up': 'slideInUp 0.6s ease-in-out',
        'gradient-pan': 'gradientPan 10s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradientPan: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(59, 130, 246, 0.6)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Optional: improves form controls
    require('@tailwindcss/typography'), // Optional: improves text content formatting
  ],
};

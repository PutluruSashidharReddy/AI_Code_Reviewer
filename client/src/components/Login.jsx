import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { UserIcon, LockClosedIcon, ChartBarIcon, SparklesIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const Login = ({ isDark, toggleTheme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // The backend login URL is /users/login/
      const response = await axios.post('http://localhost:8000/users/login/', { username, password });
      // The backend returns an 'access' token, not 'token'. This is the fix.
      localStorage.setItem('token', response.data.access);
      navigate('/editor'); // Redirects to the code editor
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  // --- LEFT SIDE: ABOUT THE PROJECT ---
  const AboutSection = () => (
    <div className={`w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center ${isDark ? 'bg-black/20 text-white' : 'bg-blue-50/80 text-gray-800'}`}>
      <h2 className="text-3xl font-bold mb-6">Erralyze: Your Personal Coding Coach</h2>
      <ul className="space-y-5">
        <li className="flex items-start">
          <ChartBarIcon className="w-7 h-7 text-blue-500 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Track Your Progress</h3>
            <p className={`${isDark ? 'text-white/70' : 'text-gray-600'}`}>Visualize your most common errors and submission trends on a personalized dashboard.</p>
          </div>
        </li>
        <li className="flex items-start">
          <SparklesIcon className="w-7 h-7 text-blue-500 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Get AI-Powered Feedback</h3>
            <p className={`${isDark ? 'text-white/70' : 'text-gray-600'}`}>Receive precise, AI-generated suggestions to fix logic errors and improve code quality.</p>
          </div>
        </li>
        <li className="flex items-start">
          <MagnifyingGlassIcon className="w-7 h-7 text-blue-500 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Deep Code Analysis</h3>
            <p className={`${isDark ? 'text-white/70' : 'text-gray-600'}`}>Our pipeline uses static and dynamic testing to uncover silent bugs and edge-case failures.</p>
          </div>
        </li>
        <li className="flex items-start">
          <UserCircleIcon className="w-7 h-7 text-blue-500 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Personalized Analytics</h3>
            <p className={`${isDark ? 'text-white/70' : 'text-gray-600'}`}>Focus on your weakest patterns and measure your improvement over time with detailed logs.</p>
          </div>
        </li>
      </ul>
    </div>
  );

  return (
    <div className={`relative flex items-center justify-center min-h-screen overflow-hidden p-4 ${isDark ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-blue-100 via-purple-100 to-gray-100'} animate-gradient-pan`}>
      <div className="absolute top-5 right-5 z-10">
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className={`relative w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden ${isDark ? 'bg-black/40 border-white/20' : 'bg-white/60 border-gray-300/80'} border backdrop-blur-xl flex flex-col lg:flex-row`}
      >
        <AboutSection />
        
        {/* --- RIGHT SIDE: LOGIN FORM --- */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 space-y-6 flex flex-col justify-center">
          <div className="text-center">
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Welcome Back</h1>
            <p className={`${isDark ? 'text-white/70' : 'text-gray-600'}`}>Sign in to continue your journey</p>
          </div>

          {error && (
            <p className={`p-3 rounded-lg text-sm font-medium text-center animate-fade-in ${isDark ? 'bg-red-500/40 text-yellow-300' : 'bg-red-100 text-red-700'}`}>
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <UserIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-white/10 text-white placeholder-slate-300 border-transparent' : 'bg-gray-50 text-gray-800 placeholder-gray-500 border-gray-300'}`}
                required
              />
            </div>
            <div className="relative">
              <LockClosedIcon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-white/10 text-white placeholder-slate-300 border-transparent' : 'bg-gray-50 text-gray-800 placeholder-gray-500 border-gray-300'}`}
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              type="submit"
              className="w-full py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg hover:shadow-lg hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              Login
            </motion.button>
          </form>
          <p className={`text-sm text-center ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-400 hover:text-blue-300 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

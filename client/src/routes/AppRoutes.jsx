import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/Dashboard';
import EditorPage from '../pages/EditorPage';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

// AnimatedPage wrapper is optional but nice for clean page transitions
const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute><AnimatedPage><DashboardPage /></AnimatedPage></PrivateRoute>}
        />
        <Route
          path="/editor"
          element={<PrivateRoute><AnimatedPage><EditorPage /></AnimatedPage></PrivateRoute>}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
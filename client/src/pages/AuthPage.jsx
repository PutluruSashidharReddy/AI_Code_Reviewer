import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ProjectDescription from '../components/auth/ProjectDescription';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background dark:bg-dark-background">
      {/* Left side: Project Description - hidden on small screens */}
      <div className="hidden lg:block lg:w-3/5">
        <ProjectDescription />
      </div>

      {/* Right side: Authentication Forms */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {isLoginView ? (
            <Login onToggle={toggleView} key="login" />
          ) : (
            <Register onToggle={toggleView} key="register" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthPage;
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { useTheme } from './context/ThemeContext';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  // Get the current theme from our custom hook
  const { theme } = useTheme();

  return (
    <Router>
      <AppRoutes />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // Set theme dynamically based on our context
        theme={theme}
      />
    </Router>
  );
}

export default App;
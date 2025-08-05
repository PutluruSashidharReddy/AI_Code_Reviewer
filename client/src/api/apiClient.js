import axios from 'axios';

// Create a new Axios instance with a custom configuration
const apiClient = axios.create({
  // Read the base URL from the environment variables
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios Request Interceptor
 * 
 * This function will be called before every single request is sent.
 * Its purpose is to check if we have an auth token in localStorage.
 * If a token exists, it adds it to the 'Authorization' header.
 * This ensures that all your API calls to protected routes are authenticated.
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Add the token as a Bearer token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default apiClient;
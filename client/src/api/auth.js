import apiClient from './apiClient';

/**
 * Registers a new user.
 * @param {object} userData - { username, email, password }
 * @returns {Promise<object>} The response data from the server.
 */
export const register = async (userData) => {
  try {
    // Makes a POST request to http://127.0.0.1:8000/users/register/
    const response = await apiClient.post('/users/register/', userData);
    return response.data;
  } catch (error) {
    // If the API call fails, throw the error so the component can catch it
    // and display an appropriate message to the user.
    throw error.response.data || new Error('An unknown registration error occurred.');
  }
};

/**
 * Logs in a user.
 * @param {object} credentials - { email, password }
 * @returns {Promise<object>} The response data from the server.
 */
export const login = async (credentials) => {
  try {
    // Makes a POST request to http://127.0.0.1:8000/users/login/
    const response = await apiClient.post('/users/login/', credentials);
    
    // Check if the response contains the access token.
    // **IMPORTANT**: Adjust 'access' if your backend API returns the token under a different key (e.g., 'token').
    if (response.data && response.data.access) {
      const token = response.data.access;
      // Store the token in the browser's local storage.
      // This makes it persistent across page reloads.
      localStorage.setItem('token', token);
    }
    
    return response.data;
  } catch (error) {
    // If login fails, throw the error for the component.
    throw error.response.data || new Error('An unknown login error occurred.');
  }
};
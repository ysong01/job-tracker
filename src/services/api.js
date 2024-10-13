// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Request interceptor to add the Authorization header
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Optional: Response interceptor for handling errors globally
api.interceptors.response.use(
  response => response,
  error => {
    // Handle specific error statuses if needed
    if (error.response && error.response.status === 401) {
      // Optionally, trigger a logout or redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;

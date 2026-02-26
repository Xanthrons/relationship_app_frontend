import axios from 'axios';

// ✅ Use Environment Variable for Production, fallback to localhost for Dev
export const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API = axios.create({
    baseURL: `${SOCKET_URL}/api`, 
});

// Automatically attaches JWT token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle auto-logout if token is invalid/expired
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Logic to redirect to login could go here
        }
        return Promise.reject(error);
    }
);

export default API;
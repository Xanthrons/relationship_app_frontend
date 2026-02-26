import axios from 'axios';

// The root URL for Sockets - Keeping your Render URL
export const SOCKET_URL = 'https://relationship-app-backend-gcil.onrender.com';

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
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;
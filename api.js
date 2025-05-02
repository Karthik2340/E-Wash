import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api',
});

// Secure API calls
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const registerUser = (userData) => API.post('/users/register', userData);
export const loginUser = (credentials) => API.post('/users/login', credentials);
export const fetchServiceCenters = () => API.get('/services');
export const bookService = (bookingData) => API.post('/bookings', bookingData);
export const trackBooking = (bookingId) => API.get(`/bookings/status/${bookingId}`);

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://replit.com/@noumanarshad159/AI-commerce-backend-1',
    withCredentials: true,
});

export default axiosInstance;
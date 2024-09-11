import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000',
    // baseURL: 'https://ai-commerce-backend-1-sarfrazkhan18.replit.app',
    baseURL: 'https://d562108f-32d3-4317-8500-ec1af97cd89d-00-3ljhkv9buvdbe.kirk.replit.dev/',

    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

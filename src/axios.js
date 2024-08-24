import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    // baseURL: 'https://ai-commerce-backend-1-sarfrazkhan18.replit.app/',
    baseURL: 'https://d1d4ba12-e4cf-4ff1-8293-b022fdc6b36b-00-1n9hfpf0bvkns.spock.replit.dev/',

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

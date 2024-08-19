import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://6459c1e4-7ca2-4b60-b590-2ca4bb2deb7e-00-h2ik2yni0ke7.worf.replit.dev',
    headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Credentials': true
    },
    // withCredentials: true,
    // credentials: 'include',
});

export default axiosInstance;
import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
            setErrors({ password: "Password must be at least 8 characters long." });
            return;
        }
        try {
            const response = await axiosInstance.post('/user/login', {
                email: formData.email,
                password: formData.password
            }, { withCredentials: true });

            if (response.status === 200) {
                const userId = response.data.userId;
                localStorage.setItem('userId', userId)
                navigate('/');
            }
        } catch (error) {
            console.log(error.response)
            if (error.response && error.response.data.errors) {
                const backendErrors = {};
                if (error.response.data.errors) {
                    backendErrors['password'] = error.response.data.errors;
                } else {
                    backendErrors.general = error.response.data.errors.message || "An error occurred.";
                }
                setErrors(backendErrors);
            } else {
                setErrors({ general: "Invalid email or password." });
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                        </div>
                        <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">Login</button>
                        {errors.general && <p className="text-xs text-red-500 mt-1">{errors.general}</p>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;

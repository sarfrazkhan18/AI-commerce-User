import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const navRef = useRef();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setNavOpen(false);
        }
    };

    useEffect(() => {
        if (navOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [navOpen]);

    const navItemClasses = (path) =>
        `text-xl block lg:inline-block font-bold uppercase max-sm:text-xl max-sm:ml-3 p-4 lg:p-0 ${activeTab === path ? 'text-blue-500' : 'text-black max-sm:text-gray-400'
        }`;

    const handleLinkClick = () => {
        setNavOpen(false);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get('/user/logout');

            if (response.status === 200) {
                Cookies.remove('userToken')
                localStorage.removeItem('userId');
                localStorage.removeItem('authToken');
                localStorage.removeItem('canvasImageURL');
                localStorage.removeItem('canvasState');
                localStorage.removeItem('userId');
                setIsAuthenticated(false);
                navigate('/login');
            }
        } catch (error) {
            console.log(error.response)
        }
    };

    return (
        <header className="bg-white shadow-md border-b-[1px] border-black">
            <nav className="container mx-auto p-4 flex justify-between items-center relative">
                <Link to="/" className="flex items-center" onClick={handleLinkClick}>
                    <h1 className='text-2xl font-semibold'>Printful PK</h1>
                </Link>
                <ul
                    ref={navRef}
                    className={`${navOpen ? 'block' : 'hidden'} lg:flex lg:items-center max-sm:mt-12 max-sm:bg-black max-sm:font-semibold lg:space-x-8 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent z-50`}
                >
                    {isAuthenticated ? (
                        <>
                            <li className="border-t max-sm:border-none lg:border-none relative">
                                <Link to="/contact" className={navItemClasses('/contact')} onClick={handleLinkClick}>
                                    Contact Us
                                </Link>
                                <span className="underline"></span>
                            </li>
                            <li className="border-t max-sm:border-none lg:border-none relative">
                                <Link to="/cart" className={navItemClasses('/cart')} onClick={handleLinkClick}>
                                    Cart
                                </Link>
                                <span className="underline"></span>
                            </li>
                            <li className="border-t max-sm:border-none lg:border-none relative">
                                <button onClick={handleLogout} className="text-xl block lg:inline-block font-bold uppercase max-sm:text-xl max-sm:ml-3 p-4 lg:p-0 text-black max-sm:text-gray-400">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <></>
                    )}
                </ul>
                {
                    isAuthenticated ?
                        <div className="lg:hidden">
                            <button onClick={() => setNavOpen(!navOpen)} className="text-black text-2xl">
                                <FaBars />
                            </button>
                        </div> : ""
                }
            </nav>
        </header>
    );
};

export default Navbar;
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate()

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axiosInstance.get(`/user/get-cart/${userId}`);
                console.log(response)
                setCartItems(response.data.items);
            } catch (err) {
                if (err.response.status === 401) {
                    localStorage.removeItem('userId');
                    navigate('/login')
                }
                setError('Failed to fetch cart items.');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleCheckout = () => {

    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                {error && <p className="text-red-500 text-center">{error}</p>}
                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-500">No cart items found.</div>
                ) : (<>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {cartItems.map((item, index) => (
                            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                                    <img
                                        src={item.finalImage}
                                        alt="Cart item"
                                        className="w-full h-72 object-cover mb-2 rounded"
                                    />
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-lg">Rs {item.price.toFixed(2)}</span>
                                        <span className="text-gray-600">x{item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <button
                            onClick={handleCheckout}
                            className={`bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={cartItems.length === 0}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
                )}
            </div>
        </>
    );
};

export default Cart;

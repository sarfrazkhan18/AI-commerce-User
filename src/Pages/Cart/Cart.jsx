import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { Check, Trash2 } from 'lucide-react';
import Checkout from '../Checkout/Checkout';

const Cart = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState('Cart');
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState('');
    const [cartId, setCartId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axiosInstance.get(`/user/get-cart/${userId}`);
                setCartId(response.data._id);
                setUserId(response.data.userId);
                setCartItems(response.data.items);
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.removeItem('userId');
                    navigate('/login');
                }
                setError('Failed to fetch cart items.');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleClick = () => {
        setPage('Checkout');
    };

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setLoading(true);
            console.log(itemToDelete._id + "   " + userId)
            await axiosInstance.delete(`/user/delete-cart-item/${itemToDelete._id}/${userId}`);
            setCartItems(cartItems.filter(cartItem => cartItem._id !== itemToDelete._id));
            setIsModalOpen(false);
            setItemToDelete(null);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('userId');
                navigate('/login');
            }
            console.error('Error deleting cart item:', error);
            setError('Failed to delete cart item.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {
                page === 'Cart' ?
                    <>
                        <Navbar />
                        <div className="container mx-auto p-4">
                            {error && <p className="text-red-500 text-center">{error}</p>}
                            {cartItems.length === 0 ? (
                                <div className="text-center text-gray-500">No cart items found.</div>
                            ) : (
                                <>
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
                                                    <button
                                                        onClick={() => handleDeleteClick(item)}
                                                        className="mt-2 flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-700 w-full"
                                                    >
                                                        <Trash2 className="w-5 h-5 mr-2" />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            onClick={handleClick}
                                            className={`bg-blue-500 flex text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={cartItems.length === 0}
                                        >
                                            Proceed to Checkout
                                            <Check className='ml-4 w-5' />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Confirmation Modal */}
                        {isModalOpen && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                                    <p>Are you sure you want to delete this item from your cart?</p>
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleDeleteConfirm}
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                    : <div>
                        <Checkout cartItems={cartItems} userId={userId} cartId={cartId} />
                    </div>
            }
        </>
    );
};

export default Cart;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems, userId, cartId }) => {
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        city: '',
        paymentMethod: 'COD',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalPrice);
    }, [cartItems]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            userId: userId,
            cartId: cartId,
            deliveryInfo: formData,
            paymentMethod: formData.paymentMethod,
            totalAmount: total
        };

        try {
            await axiosInstance.post('/user/place-order', payload);
            alert('Order Placed, Our team will contact you soon')
            navigate('/');
        } catch (err) {
            console.error('Error placing order:', err);
            setError('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    {cartItems.map((item, index) => (
                        <div key={item._id} className="flex flex-col md:flex-row justify-between items-center mb-4">
                            <img src={item.finalImage} alt="Shirt Design" className="w-24 h-24 object-cover mb-2 md:mb-0" />
                            <div className="flex-1 md:ml-4">
                                <h3 className="text-lg font-medium">{`Item ${index + 1}`}</h3>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <p className="text-gray-600">Price: PKR {item.price}</p>
                            </div>
                        </div>
                    ))}
                    <hr className="my-4" />
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">Total:</span>
                        <span className="font-semibold text-lg">PKR {total}</span>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row md:space-x-4">
                            <div className="flex-1">
                                <label className="block text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                placeholder="Enter your delivery address"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                placeholder="Enter your city"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Payment Method</label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                                required
                            >
                                <option value="COD">Cash on Delivery</option>
                                <option value="WhatsApp">Proceed to WhatsApp</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className={`w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </form>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Checkout;

import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const FinalView = ({ latestPrice }) => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [finalImage, setFinalImage] = useState(localStorage.getItem('canvasImageURL'));
    const [price, setPrice] = useState(latestPrice);
    const [errors, setErrors] = useState({});
    const imageRef = useRef(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login')
        }
    }, [])

    const base64ToBlob = (base64, mime) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mime });
    };

    useEffect(() => {
        const canvasImageURL = localStorage.getItem('canvasImageURL');
        if (canvasImageURL && imageRef.current) {
            imageRef.current.src = canvasImageURL;
        }
    }, []);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        setErrors({});

        const base64Data = finalImage.replace(/^data:image\/[a-z]+;base64,/, '');
        const blob = base64ToBlob(base64Data, 'image/png');
        const formData = new FormData();
        formData.append('image', blob, 'image.png');

        try {
            const uploadResponse = await axiosInstance.post('/user/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (uploadResponse.status === 200) {
                const imageUrl = uploadResponse.data.imageUrl;

                try {
                    const cartResponse = await axiosInstance.post('/user/add-to-cart', {
                        userId: userId,
                        finalImage: imageUrl,
                        price: price
                    }, { withCredentials: true });

                    if (cartResponse.status === 200) {
                        toast.success('Item added to cart');
                        navigate('/cart')
                    }
                } catch (cartError) {
                    if (cartError.response.status === 401) {
                        localStorage.removeItem('userId');
                        navigate('/login')
                    }
                    if (cartError.response && cartError.response.data.errors) {
                        const backendErrors = {};
                        cartError.response.data.errors.forEach((err) => {
                            backendErrors[err.param] = err.msg;
                        });
                        setErrors(backendErrors);
                    } else {
                        setErrors({ general: "An error occurred while adding to cart." });
                    }
                }
            }
        } catch (uploadError) {
            if (uploadError.response.status === 401) {
                localStorage.removeItem('userId');
                navigate('/login')
            }
            if (uploadError.response && uploadError.response.data.error) {
                setErrors({ general: uploadError.response.data.error });
            } else {
                setErrors({ general: "An error occurred while uploading the image." });
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 py-4">
            <div className="w-full md:w-2/3 max-w-xl p-4">
                <img ref={imageRef} alt="Final Design" className="border border-gray-300 shadow-lg w-full h-auto" />
            </div>
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4">
                <button
                    onClick={handleAddToCart}
                    className="mt-4 flex md:mt-0 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700"
                >
                    Add to Cart
                    <ShoppingCart className='ml-4 w-5 text-white' />
                </button>
                {errors.general && <p className="text-xs text-red-500 mt-1">{errors.general}</p>}
            </div>
        </div>
    );
};

export default FinalView;

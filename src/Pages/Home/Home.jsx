import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import Customization from './Customization';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

const Home = () => {

    const navigate = useNavigate();

    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [page, setPage] = useState('home');


    useEffect(() => {
        const handleVerify = async () => {
            try {
                if (!localStorage.getItem('userId')) {
                    navigate('/login')
                }
                await axiosInstance.get('/user/verify');
            } catch (error) {
                if (error.response.status === 401) {
                    localStorage.removeItem('userId')
                    navigate('/login')
                }
            }
        }
        handleVerify()
    }, [])

    const handleChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleGenerate = async () => {
        if (!prompt) {
            setError('Prompt cannot be empty.');
            return;
        } else if (prompt.length < 10) {
            setError('Prompt must be at least 10 characters long.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await axiosInstance.post('/user/image-generate', { prompt });
            if (response.status === 200) {
                setImageUrl(response.data.filePath);
                setPrompt('')
            }
            else {
                setError('Failed to generate image. Please try again.');
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.removeItem('userId');
                navigate('/login')
            }
            setError('Error generating image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCustomize = () => {
        setPage('customize');
    };

    return (
        <div>
            <Navbar />
            {
                page === 'home' ?
                    <div className="flex flex-col lg:flex-row min-h-screen bg-white text-black">
                        <div className="w-full lg:w-1/3 p-8 space-y-4 lg:ml-20">
                            <h1 className="text-3xl font-bold">Shirt Design Generator</h1>
                            <p>Create Stunning AI Generated Shirt Designs</p>
                            <div>
                                <textarea
                                    className="w-full p-2 mt-4 border border-gray-700 rounded"
                                    rows="4"
                                    placeholder="Describe an image you want to generate..."
                                    value={prompt}
                                    onChange={handleChange}
                                ></textarea>
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                            <button
                                className={`w-full px-4 py-2 rounded mt-4 ${loading ? 'bg-gray-600' : 'bg-green-600'} ${loading ? 'cursor-not-allowed' : ''}`}
                                onClick={handleGenerate}
                                disabled={loading}
                            >
                                {loading ? 'Generating...' : 'Generate Design'}
                            </button>
                            <div>
                                <span>
                                    Disclamiar :
                                </span>
                                <p className='text-red-500'>
                                    The designs are AI generated so 100% cloning will be impossible in some cases
                                </p>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 lg:ml-auto p-8">
                            <div className="h-72 lg:h-[80%] flex items-center justify-center">
                                {imageUrl ? (
                                    <div className='flex flex-col mt-36 lg:mt-2'>
                                        <img src={imageUrl} alt="Generated" id="canvas-image" className="h-[500px] w-auto mt-8 lg:mt-16" />
                                        <button
                                            className={`w-full px-4 py-2 rounded mt-4 ${'bg-green-600'}`}
                                            onClick={handleCustomize}
                                        >
                                            Customize this design
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-400">
                                        "Generate Design"
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    :
                    <Customization
                        imageUrl={imageUrl}
                    />
            }
        </div>

    );
};

export default Home;
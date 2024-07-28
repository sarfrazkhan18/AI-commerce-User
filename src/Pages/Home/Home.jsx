import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import Navbar from '../../Components/Navbar/Navbar';
import Customization from './Customization';

const Home = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [page, setPage] = useState('home');

    useEffect(() => {
        console.log(imageUrl)
    }, [imageUrl])


    const handleChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleGenerate = async () => {
        // Validation
        if (!prompt) {
            setError('Prompt cannot be empty.');
            return;
        } else if (prompt.length < 10) {
            setError('Prompt must be at least 10 characters long.');
            return;
        }

        // Clear previous errors
        setError('');
        setLoading(true);

        try {
            const response = await axiosInstance.post('/user/image-generate', { prompt });
            if (response.status === 200) {
                console.log(response)
                setImageUrl(response.data.filePath);
            } else {
                setError('Failed to generate image. Please try again.');
            }
        } catch (error) {
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
                    <div className="flex flex-col lg:flex-row h-screen lg:h-[640px] bg-gray-900 text-white">
                        {/* Left Section */}
                        <div className="w-full lg:w-1/3 p-8 space-y-4 lg:ml-20">
                            <h1 className="text-3xl font-bold">Image Generator</h1>
                            <p>Create Stunning AI Generated Images</p>
                            <div>
                                <textarea
                                    className="w-full p-2 mt-4 bg-gray-800 border border-gray-700 rounded"
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
                        </div>

                        {/* Right Section */}
                        <div className="w-full lg:w-1/2 lg:ml-auto p-8">
                            <div className="h-[50vh] lg:h-[80%] flex items-center justify-center">
                                {imageUrl ? (
                                    <div className='flex flex-col'>
                                        <img src={imageUrl} alt="Generated" id="canvas-image" className="h-[500px] mt-16 w-auto" />
                                        <button
                                            className={`w-full px-4 py-2 rounded mt-4 ${'bg-green-600'}`}
                                            onClick={handleCustomize}
                                        >
                                            Customize this design
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <img src="/dummy.jfif" alt="Dummy" className="h-full w-auto" />
                                        <button
                                            className={`w-full px-4 py-2 rounded mt-4 ${'bg-green-600'}`}
                                            onClick={handleCustomize}
                                        >
                                            Customize this design
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    :
                    <Customization
                        // imageURL={imageUrl}
                        imageUrl="http://localhost:5000/images/image_1722090192727.png"
                    />
            }
        </div>
    );
};

export default Home;
import React, { useEffect, useRef } from 'react';

const Dummy = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const blobURL = localStorage.getItem('canvasBlobURL');
        if (blobURL && canvasRef.current) {
            const img = new Image();
            img.src = blobURL;
            img.onload = () => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-4">
            <div className="w-full max-w-xl">
                <canvas
                    ref={canvasRef}
                    id="c"
                    className="border border-gray-300 shadow-lg w-full h-full"
                />
            </div>
        </div>
    );
};

export default Dummy;

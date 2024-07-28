import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { BASE_PRICE, MEDIUM_PRICE, HIGH_PRICE } from '../constants';

const Customization = ({ imageUrl }) => {

    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [rectangleCount, setRectangleCount] = useState(0);
    const [triangleCount, setTriangleCount] = useState(0);
    const [circleCount, setCircleCount] = useState(0);
    const [textCount, setTextCount] = useState(0);
    const [imageCount, setImageCount] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [complexity, setComplexity] = useState('Basic');
    const [price, setPrice] = useState(BASE_PRICE);
    const [deleteButtonActive, setDeleteButtonActive] = useState(false);

    useEffect(() => {
        if (complexity === 'Basic') {
            setPrice(BASE_PRICE);
        } else if (complexity === 'Medium') {
            setPrice(MEDIUM_PRICE);
        } else {
            setPrice(HIGH_PRICE);
        }
    }, [complexity]);

    useEffect(() => {
        console.log('Points : ' + totalPoints + '  and  Complexity is : ' + complexity);
    }, [complexity, totalPoints]);

    useEffect(() => {
        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            width: 500,
            height: 500,
            isDrawingMode: false,
            allowTouchScrolling: true,
        });
        console.log(fabricCanvas)
        setCanvas(fabricCanvas);

        //     fabric.Image.fromURL(imageUrl)
        //         .then((oImg) => {
        //             oImg.crossOrigin = 'anonymous';
        //             oImg.lockScalingX = true;
        //             oImg.lockScalingY = true;
        //             oImg.lockMovementX = true;
        //             oImg.lockMovementY = true;
        //             oImg.hasControls = false;
        //             oImg.evented = false;
        //             oImg.src = imageUrl;
        //             oImg.set({
        //                 left: 0,
        //                 top: 0,
        //                 scaleX: fabricCanvas.width / oImg.width,
        //                 scaleY: fabricCanvas.height / oImg.height,
        //             });
        //             console.log("oImg is here : " + oImg)
        //             fabricCanvas.add(oImg);

        //             const editableArea = new fabric.Rect({
        //                 left: fabricCanvas.width * 0.25,
        //                 top: fabricCanvas.height * 0.15,
        //                 width: fabricCanvas.width * 0.5,
        //                 height: fabricCanvas.height * 0.7,
        //                 fill: 'rgba(255, 255, 255, 0)',
        //                 stroke: '#e6e3e3',
        //                 strokeWidth: 0.3,
        //                 selectable: false,
        //                 evented: false,
        //                 name: 'editableArea'
        //             });
        //             fabricCanvas.add(editableArea);
        //             fabricCanvas.renderAll();

        //             fabricCanvas.on('object:moving', (e) => {
        //                 if (e.target && e.target !== editableArea) {
        //                     constrainObjectPosition(e.target, fabricCanvas, editableArea);
        //                 }
        //             });

        //             fabricCanvas.on('object:scaling', (e) => {
        //                 if (e.target && e.target !== editableArea) {
        //                     constrainObjectSize(e.target, fabricCanvas, editableArea);
        //                 }
        //             });

        //             fabricCanvas.on('object:modified', (e) => {
        //                 if (e.target && e.target !== editableArea) {
        //                     constrainObjectPosition(e.target, fabricCanvas, editableArea);
        //                     constrainObjectSize(e.target, fabricCanvas, editableArea);
        //                 }
        //             });

        //             fabricCanvas.on('selection:created', () => setDeleteButtonActive(true));
        //             fabricCanvas.on('selection:cleared', () => setDeleteButtonActive(false));
        //             fabricCanvas.on('selection:updated', () => setDeleteButtonActive(true));
        //         })
        //         .catch((error) => {
        //             console.error("Error loading image:", error);
        //         });

        //     return () => {
        //         fabricCanvas.dispose();
        //     };
        // }, [imageUrl]);

        const imgElement = new Image();
        imgElement.crossOrigin = 'anonymous';
        imgElement.src = imageUrl;

        imgElement.onload = () => {
            const img = new fabric.Image(imgElement, {
                left: 0,
                top: 0,
                scaleX: fabricCanvas.width / imgElement.width,
                scaleY: fabricCanvas.height / imgElement.height,
                selectable: false,
                evented: false
            });
            fabricCanvas.add(img);

            const editableArea = new fabric.Rect({
                left: fabricCanvas.width * 0.25,
                top: fabricCanvas.height * 0.15,
                width: fabricCanvas.width * 0.5,
                height: fabricCanvas.height * 0.7,
                fill: 'rgba(255, 255, 255, 0)',
                stroke: '#e6e3e3',
                strokeWidth: 0.3,
                selectable: false,
                evented: false,
                name: 'editableArea'
            });
            fabricCanvas.add(editableArea);
            fabricCanvas.renderAll();

            fabricCanvas.on('object:moving', (e) => {
                if (e.target && e.target !== editableArea) {
                    constrainObjectPosition(e.target, fabricCanvas, editableArea);
                }
            });

            fabricCanvas.on('object:scaling', (e) => {
                if (e.target && e.target !== editableArea) {
                    constrainObjectSize(e.target, fabricCanvas, editableArea);
                }
            });

            fabricCanvas.on('object:modified', (e) => {
                if (e.target && e.target !== editableArea) {
                    constrainObjectPosition(e.target, fabricCanvas, editableArea);
                    constrainObjectSize(e.target, fabricCanvas, editableArea);
                }
            });

            fabricCanvas.on('selection:created', () => setDeleteButtonActive(true));
            fabricCanvas.on('selection:cleared', () => setDeleteButtonActive(false));
            fabricCanvas.on('selection:updated', () => setDeleteButtonActive(true));
        };

        imgElement.onerror = (error) => {
            console.error("Error loading image:", error);
        };

        return () => {
            fabricCanvas.dispose();
        };
    }, [imageUrl]);


    const updatePoints = (points) => {
        setTotalPoints(totalPoints + points);
    };

    const addRectangle = () => {
        if (!canvas) return;

        if (rectangleCount >= 2) {
            alert('You can only add up to 2 rectangles.');
            return;
        }

        const editableArea = canvas.getObjects('rect').find(r => r.name === 'editableArea');
        if (editableArea) {
            const rect = new fabric.Rect({
                left: editableArea.left + 10,
                top: editableArea.top + 10,
                width: 100,
                height: 100,
                fill: 'rgba(0, 255, 0, 0.5)',
                selectable: true,
                evented: true
            });
            applyClippingPath(rect, editableArea);
            canvas.add(rect);
            canvas.renderAll();
            setRectangleCount(rectangleCount + 1);
            updatePoints(1);
        }
    };

    const addTriangle = () => {
        if (!canvas) return;

        if (triangleCount >= 2) {
            alert('You can only add up to 2 triangles.');
            return;
        }

        const editableArea = canvas.getObjects('rect').find(r => r.name === 'editableArea');
        if (editableArea) {
            const triangle = new fabric.Triangle({
                left: editableArea.left + 10,
                top: editableArea.top + 10,
                width: 100,
                height: 100,
                fill: 'rgba(0, 0, 255, 0.5)',
                selectable: true,
                evented: true
            });
            applyClippingPath(triangle, editableArea);
            canvas.add(triangle);
            canvas.renderAll();
            setTriangleCount(triangleCount + 1);
            updatePoints(1);
        }
    };

    const addCircle = () => {
        if (!canvas) return;

        if (circleCount >= 2) {
            alert('You can only add up to 2 circles.');
            return;
        }

        const editableArea = canvas.getObjects('rect').find(r => r.name === 'editableArea');
        if (editableArea) {
            const circle = new fabric.Circle({
                left: editableArea.left + 10,
                top: editableArea.top + 10,
                radius: 50,
                fill: 'rgba(255, 0, 0, 0.5)',
                selectable: true,
                evented: true
            });
            applyClippingPath(circle, editableArea);
            canvas.add(circle);
            canvas.renderAll();
            setCircleCount(circleCount + 1);
            updatePoints(1);
        }
    };

    const addText = () => {
        if (!canvas) return;

        if (textCount >= 2) {
            alert('You can only add up to 2 texts.');
            return;
        }

        const editableArea = canvas.getObjects('rect').find(r => r.name === 'editableArea');
        if (editableArea) {
            const text = new fabric.Text('Hello', {
                left: editableArea.left + 10,
                top: editableArea.top + 10,
                fontSize: 20,
                fill: 'black',
                selectable: true,
                evented: true
            });
            applyClippingPath(text, editableArea);
            canvas.add(text);
            canvas.renderAll();
            setTextCount(textCount + 1);
            updatePoints(0.5);
        }
    };

    const addImage = (file) => {
        if (!canvas) return;

        if (imageCount >= 2) {
            alert('You can only add up to 2 images.');
            return;
        }

        const editableArea = canvas.getObjects('rect').find(r => r.name === 'editableArea');
        if (editableArea) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgElement = new Image();
                imgElement.crossOrigin = 'anonymous'; // Handle CORS
                imgElement.src = `${e.target.result}`;

                fabric.Image.fromURL(imgElement.src)
                    .then((img) => {
                        const width = editableArea.width * 0.30;
                        const height = editableArea.height * 0.20;

                        img.set({
                            left: editableArea.left + (editableArea.width - width) / 2,
                            top: editableArea.top + (editableArea.height - height) / 2,
                            scaleX: width / img.width,
                            scaleY: height / img.height,
                            selectable: true,
                            evented: true
                        });

                        applyClippingPath(img, editableArea);
                        canvas.add(img);
                        canvas.renderAll();
                        setImageCount(imageCount + 1);
                        updatePoints(3);
                    })
                    .catch((error) => {
                        console.error("Error loading image:", error);
                    });
            };
            reader.readAsDataURL(file);
        }
    };

    const applyClippingPath = (obj, editableArea) => {
        const clipPath = new fabric.Rect({
            left: editableArea.left,
            top: editableArea.top,
            width: editableArea.width,
            height: editableArea.height,
            absolutePositioned: true
        });

        obj.clipPath = clipPath;
        obj.setCoords();
        canvas.renderAll();
    };

    const constrainObjectPosition = (obj, fabricCanvas, editableArea) => {
        if (!editableArea) return;

        const bounds = {
            left: editableArea.left,
            top: editableArea.top,
            right: editableArea.left + editableArea.width,
            bottom: editableArea.top + editableArea.height
        };

        obj.set({
            left: Math.max(bounds.left, Math.min(bounds.right - (obj.width * obj.scaleX || 0), obj.left)),
            top: Math.max(bounds.top, Math.min(bounds.bottom - (obj.height * obj.scaleY || 0), obj.top))
        });

        obj.setCoords();
        fabricCanvas.renderAll();
    };

    const constrainObjectSize = (obj, fabricCanvas, editableArea) => {
        if (!editableArea) return;

        const bounds = {
            left: editableArea.left,
            top: editableArea.top,
            right: editableArea.left + editableArea.width,
            bottom: editableArea.top + editableArea.height
        };

        if (obj instanceof fabric.Rect || obj instanceof fabric.Triangle) {
            obj.set({
                width: Math.max(10, Math.min(bounds.right - obj.left, obj.width)),
                height: Math.max(10, Math.min(bounds.bottom - obj.top, obj.height))
            });
        } else if (obj instanceof fabric.Circle) {
            const maxRadius = Math.min(bounds.right - obj.left, bounds.bottom - obj.top) / obj.scaleX;
            obj.set({
                radius: Math.max(10, Math.min(maxRadius, obj.radius))
            });
        }

        obj.setCoords();
        fabricCanvas.renderAll();
    };

    const handleDelete = () => {
        if (!canvas) return;

        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            if (activeObject instanceof fabric.Rect) {
                setRectangleCount(rectangleCount - 1);
                updatePoints(-1);
            }
            if (activeObject instanceof fabric.Triangle) {
                setTriangleCount(triangleCount - 1);
                updatePoints(-1);
            }
            if (activeObject instanceof fabric.Circle) {
                setCircleCount(circleCount - 1);
                updatePoints(-1);
            }
            if (activeObject instanceof fabric.Text) {
                setTextCount(textCount - 1);
                updatePoints(-0.5);
            }
            if (activeObject instanceof fabric.Image) {
                setImageCount(imageCount - 1);
                updatePoints(-3);
            }

            canvas.remove(activeObject);
            canvas.discardActiveObject();
            canvas.renderAll();
            setDeleteButtonActive(false);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            addImage(file);
        }
    };

    const updateComplexity = (points) => {
        if (points < 3) setComplexity('Basic');
        else if (points >= 3 && points <= 5) setComplexity('Medium');
        else setComplexity('High');
    };

    const handleDownload = async () => {
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1.0
        });

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'downloaded-image.png';
        console.log('Link : ' + link.href)
        link.click();
    };

    useEffect(() => {
        updateComplexity(totalPoints);
    }, [totalPoints]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-4">
            <div className="w-full max-w-xl">
                <canvas
                    ref={canvasRef}
                    id="c"
                    className="border border-gray-300 shadow-lg w-full h-full"
                />
            </div>
            <div className="mt-8">
                <button onClick={addRectangle} className="py-2 px-4 bg-green-400 text-white rounded mr-2">
                    Add Rectangle
                </button>
                <button onClick={addTriangle} className="py-2 px-4 bg-blue-400 text-white rounded mr-2">
                    Add Triangle
                </button>
                <button onClick={addCircle} className="py-2 px-4 bg-red-400 text-white rounded mr-2">
                    Add Circle
                </button>
                <button onClick={addText} className="py-2 px-4 bg-yellow-400 text-white rounded mr-2">
                    Add Text
                </button>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
                <button
                    onClick={handleDelete}
                    disabled={!deleteButtonActive}
                    className={`py-2 px-4 ${deleteButtonActive ? 'bg-red-600' : 'bg-gray-400'} text-white rounded`}
                >
                    Delete
                </button>
                <button onClick={handleDownload}>Download</button>
            </div>
            <div className="mt-4">
                <p>Total Points: {totalPoints}</p>
                <p>Design Complexity: {complexity}</p>
                <p>PRICE: {price}</p>
            </div>
        </div>
    );
};

export default Customization;


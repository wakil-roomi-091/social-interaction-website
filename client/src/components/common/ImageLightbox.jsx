import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

const ImageLightbox = ({
    isOpen,
    onClose,
    images = [],
    currentIndex = 0,
    onPrevious,
    onNext,
    alt = 'Image'
}) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const currentImage = images[currentIndex] || '';

    // ✅ ALL HOOKS MUST BE CALLED BEFORE ANY RETURN
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
                setScale(1);
                setPosition({ x: 0, y: 0 });
            }
            if (e.key === 'ArrowLeft' && onPrevious && images.length > 1) {
                onPrevious();
                setScale(1);
                setPosition({ x: 0, y: 0 });
            }
            if (e.key === 'ArrowRight' && onNext && images.length > 1) {
                onNext();
                setScale(1);
                setPosition({ x: 0, y: 0 });
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose, onPrevious, onNext, images.length]);

    // ✅ RETURN CHECKS GO HERE - AFTER ALL HOOKS
    if (!isOpen) return null;
    if (!currentImage) {
        console.warn('⚠️ ImageLightbox: No image to display');
        return null;
    }

    const handleZoomIn = () => {
        setScale(prev => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = () => {
        setScale(prev => Math.max(prev - 0.25, 0.5));
    };

    const handleResetZoom = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e) => {
        if (scale > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && scale > 1) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            setScale(prev => Math.min(prev + 0.1, 3));
        } else {
            setScale(prev => Math.max(prev - 0.1, 0.5));
        }
    };

    return (
        <div
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                    setScale(1);
                    setPosition({ x: 0, y: 0 });
                }
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Close Button */}
            <button
                onClick={() => {
                    onClose();
                    setScale(1);
                    setPosition({ x: 0, y: 0 });
                }}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white/80 hover:text-white z-20"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Zoom Controls */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-pill px-4 py-2 z-20">
                <button
                    onClick={handleZoomOut}
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                    title="Zoom out"
                >
                    <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-white/60 text-sm font-mono min-w-[40px] text-center">
                    {Math.round(scale * 100)}%
                </span>
                <button
                    onClick={handleZoomIn}
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                    title="Zoom in"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>
                <button
                    onClick={handleResetZoom}
                    className="px-3 py-1 text-xs text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-pill transition-colors"
                >
                    Reset
                </button>
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-pill text-white/80 text-sm z-20">
                    {currentIndex + 1} / {images.length}
                </div>
            )}

            {/* Previous Button */}
            {images.length > 1 && onPrevious && (
                <button
                    onClick={() => {
                        onPrevious();
                        setScale(1);
                        setPosition({ x: 0, y: 0 });
                    }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white/80 hover:text-white z-20"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            )}

            {/* Next Button */}
            {images.length > 1 && onNext && (
                <button
                    onClick={() => {
                        onNext();
                        setScale(1);
                        setPosition({ x: 0, y: 0 });
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white/80 hover:text-white z-20"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            )}

            {/* Image Container */}
            <div
                className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onWheel={handleWheel}
            >
                <img
                    src={currentImage}
                    alt={alt}
                    className="max-w-[90vw] max-h-[90vh] object-contain transition-transform duration-200 select-none"
                    style={{
                        transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                    }}
                    loading="lazy"
                    draggable={false}
                    onError={(e) => {
                        console.error('❌ Image failed to load:', currentImage);
                        e.target.style.display = 'none';
                    }}
                />

                {/* Keyboard Hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-sm rounded-pill px-4 py-2 text-white/40 text-xs z-10">
                    <span>← → Navigate</span>
                    <span className="w-px h-4 bg-white/20" />
                    <span>ESC Close</span>
                    <span className="w-px h-4 bg-white/20" />
                    <span>Scroll Zoom</span>
                </div>
            </div>
        </div>
    );
};

export default ImageLightbox;
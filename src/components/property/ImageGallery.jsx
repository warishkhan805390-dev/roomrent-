import { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);

  const goTo = useCallback((index) => {
    if (index < 0) setCurrentIndex(images.length - 1);
    else if (index >= images.length) setCurrentIndex(0);
    else setCurrentIndex(index);
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  }, [images.length]);

  const openFullscreen = () => {
    setIsFullscreen(true);
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setZoomPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - zoomPosition.x, y: e.clientY - zoomPosition.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setZoomPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStart({ x: 0, y: 0, dist, isPinch: true });
    }
  };

  const handleTouchMove = (e) => {
    if (touchStart?.isPinch && e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (dist > touchStart.dist) handleZoomIn();
      else handleZoomOut();
      setTouchStart({ ...touchStart, dist });
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStart && !touchStart.isPinch && e.changedTouches.length === 1) {
      const diff = e.changedTouches[0].clientX - touchStart.x;
      if (Math.abs(diff) > 50) {
        goTo(currentIndex + (diff > 0 ? -1 : 1));
      }
    }
    setTouchStart(null);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (!isFullscreen) return;
      if (e.key === 'Escape') closeFullscreen();
      if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
      if (e.key === 'ArrowRight') goTo(currentIndex + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen, currentIndex, goTo]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen]);

  return (
    <>
      <div className="space-y-4">
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 group cursor-pointer">
          <div className="aspect-[16/10] md:aspect-[16/9]">
            <img
              src={images[currentIndex]}
              alt={`Property image ${currentIndex + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              onClick={openFullscreen}
            />
          </div>

          <button
            onClick={() => goTo(currentIndex - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => goTo(currentIndex + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={openFullscreen}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Maximize className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-1.5 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 md:gap-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-primary-500 ring-2 ring-primary-200'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-black/50">
              <div className="text-white text-sm">
                {currentIndex + 1} / {images.length}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleZoomOut}
                  className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                  disabled={zoomLevel <= 1}
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <span className="text-white text-sm min-w-[3rem] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                  disabled={zoomLevel >= 4}
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={closeFullscreen}
                  className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div
              className="flex-1 flex items-center justify-center relative overflow-hidden select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
              <button
                onClick={() => goTo(currentIndex - 1)}
                className="absolute left-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              <div
                className="transition-transform duration-200 ease-out"
                style={{
                  transform: `scale(${zoomLevel}) translate(${zoomPosition.x / zoomLevel}px, ${zoomPosition.y / zoomLevel}px)`,
                }}
              >
                <img
                  src={images[currentIndex]}
                  alt={`Fullscreen ${currentIndex + 1}`}
                  className="max-h-[85vh] max-w-[95vw] object-contain"
                  draggable={false}
                />
              </div>

              <button
                onClick={() => goTo(currentIndex + 1)}
                className="absolute right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;

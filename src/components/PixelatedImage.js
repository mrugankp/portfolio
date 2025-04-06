import React, { useEffect, useRef, useState } from 'react';

const PixelatedImage = ({ onTransitionComplete, imageUrl }) => {
  const canvasRef = useRef(null);
  const [isZooming, setIsZooming] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageUrl;
    console.log('Attempting to load image from:', img.src);
    
    img.onerror = (e) => {
      console.error('Error loading image:', e);
      console.log('Current working directory:', window.location.href);
    };
    
    img.onload = () => {
      console.log('Image loaded successfully');
      // Initial pixelation effect
      const pixelSize = 12;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Center the image and make it larger
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.7;
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      
      ctx.imageSmoothingEnabled = false;
      
      // Draw pixelated version
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      
      // Draw at a smaller size and scale up for pixelation
      const smallSize = 100;
      const tempCanvas2 = document.createElement('canvas');
      const tempCtx2 = tempCanvas2.getContext('2d');
      tempCanvas2.width = smallSize;
      tempCanvas2.height = smallSize;
      
      // Draw small
      tempCtx2.drawImage(img, 0, 0, smallSize, smallSize);
      // Draw back to original size
      tempCtx.drawImage(tempCanvas2, 0, 0, img.width, img.height);
      
      ctx.drawImage(
        tempCanvas,
        0, 0, img.width, img.height,
        x, y, img.width * scale, img.height * scale
      );
    };
  }, [imageUrl]);

  const startZoomTransition = () => {
    setIsZooming(true);
    const canvas = canvasRef.current;
    
    // Animate the canvas
    canvas.style.transform = 'scale(2.5)';
    canvas.style.opacity = '0';
    
    // After animation completes, trigger the callback
    setTimeout(() => {
      onTransitionComplete();
    }, 1000);
  };

  return (
    <div className="pixelated-container">
      <canvas
        ref={canvasRef}
        className={`pixelated-canvas ${isZooming ? 'zooming' : ''}`}
        style={{
          opacity: opacity,
          transition: 'transform 1s ease-in-out, opacity 1s ease-in-out',
        }}
      />
      <button
        className="start-journey-btn"
        onClick={startZoomTransition}
        style={{
          opacity: isZooming ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        Start My Journey
      </button>
    </div>
  );
};

export default PixelatedImage; 
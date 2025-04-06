import React, { useEffect, useRef, useState } from 'react';

const DigitalPortrait = ({ theme }) => {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createDotPattern();
    };

    const createDotPattern = () => {
      const dotSize = 3;
      const spacing = 12;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set color based on theme
      ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000';
      
      // Create dot pattern with varying opacity
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          // Calculate distance from center
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const distanceFromCenter = Math.sqrt(
            Math.pow((x - centerX) / (canvas.width / 4), 2) +
            Math.pow((y - centerY) / (canvas.height / 4), 2)
          );
          
          // Create gradient effect
          const opacity = Math.max(0.02, Math.min(0.15, 1 - distanceFromCenter));
          ctx.globalAlpha = opacity;
          
          // Random size variation
          const size = Math.random() * dotSize;
          
          ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Reset global alpha
      ctx.globalAlpha = 1;
    };

    // Initial setup
    updateCanvasSize();
    setImageLoaded(true);

    // Handle window resize
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [theme]);

  return (
    <div className="digital-portrait-background">
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: imageLoaded ? 0.4 : 0,
          transition: 'opacity 0.5s ease'
        }}
      />
    </div>
  );
};

export default DigitalPortrait; 
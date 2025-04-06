import React, { useEffect, useRef, useState } from 'react';

const GridBackground = ({ theme }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set canvas size to window size with proper scaling
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      context.scale(dpr, dpr);
      drawGrid();
    };

    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Setup drawing context
    context.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';
    context.lineWidth = 2;
    context.lineCap = 'round';
    contextRef.current = context;

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [theme]);

  useEffect(() => {
    // Redraw grid when theme changes
    drawGrid();
  }, [theme]);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const gridSize = 20;
    const rect = canvas.getBoundingClientRect();

    // Clear canvas
    context.clearRect(0, 0, rect.width, rect.height);

    // Set colors based on theme
    const lightColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const darkColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';

    // Draw vertical lines
    for (let x = 0; x <= rect.width; x += gridSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, rect.height);
      context.strokeStyle = x % 100 === 0 ? darkColor : lightColor;
      context.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= rect.height; y += gridSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(rect.width, y);
      context.strokeStyle = y % 100 === 0 ? darkColor : lightColor;
      context.stroke();
    }
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPos({ x, y });
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.beginPath();
    context.moveTo(lastPos.x, lastPos.y);
    context.lineTo(x, y);
    context.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';
    context.stroke();

    setLastPos({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      className="grid-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        touchAction: 'none',
        background: 'var(--bg-color)'
      }}
    />
  );
};

export default GridBackground; 
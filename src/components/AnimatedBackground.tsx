
import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Define our colors
    const colors = [
      [101, 238, 179],  // lime green
      [217, 70, 239],   // magenta
      [34, 211, 238],   // cyan
      [14, 165, 233]    // ocean blue
    ];
    
    // Blob class
    class Blob {
      x: number;
      y: number;
      radius: number;
      color: number[];
      velocity: { x: number; y: number };
      opacity: number;
      
      constructor(x: number, y: number, radius: number, color: number[]) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3
        };
        this.opacity = 0.5 + Math.random() * 0.2;
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        const [r, g, b] = this.color;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        ctx.fill();
      }
      
      update() {
        if (!canvas) return;
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        // Boundary check
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.velocity.x = -this.velocity.x;
        }
        
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.velocity.y = -this.velocity.y;
        }
        
        this.draw();
      }
    }
    
    // Create blobs
    const blobs: Blob[] = [];
    for (let i = 0; i < 8; i++) {
      const radius = Math.random() * 300 + 200;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const color = colors[Math.floor(Math.random() * colors.length)];
      blobs.push(new Blob(x, y, radius, color));
    }
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(250, 250, 250, 1)');
      gradient.addColorStop(1, 'rgba(245, 245, 245, 1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw blobs
      blobs.forEach(blob => blob.update());
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;

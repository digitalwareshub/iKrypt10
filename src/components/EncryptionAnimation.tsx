// src/components/EncryptionAnimation.tsx

import React, { useEffect, useRef, useState } from 'react';

const EncryptionAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  
  // Animation state
  const blockchainRef = useRef<{
    blocks: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      hash: string;
      connections: number[];
    }>;
    particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      direction: number;
      connected: boolean;
    }>;
  }>({
    blocks: [],
    particles: []
  });
  
  // Initialize the animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create initial blockchain blocks
    const initBlockchain = () => {
      const colors = ['#6366F1', '#8B5CF6', '#EC4899']; // Indigo, Purple, Pink
      
      // Create 5 blocks in a horizontal chain
      const blocks = [];
      const blockWidth = 80;
      const blockHeight = 60;
      const blockSpacing = 140;
      
      const startX = (canvas.width - (blockWidth * 5 + blockSpacing * 4)) / 2;
      const y = canvas.height / 2 - blockHeight / 2;
      
      for (let i = 0; i < 5; i++) {
        blocks.push({
          x: startX + i * (blockWidth + blockSpacing),
          y,
          width: blockWidth,
          height: blockHeight,
          color: colors[i % colors.length],
          hash: generateFakeHash(),
          connections: i < 4 ? [i + 1] : [] // Connect to next block
        });
      }
      
      // Create particles
      const particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 2 + 0.5,
          direction: Math.random() * Math.PI * 2,
          connected: false
        });
      }
      
      blockchainRef.current = { blocks, particles };
    };
    
    // Generate a random hash-like string for visualization
    const generateFakeHash = () => {
      const chars = '0123456789abcdef';
      let hash = '';
      for (let i = 0; i < 8; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
      }
      return hash;
    };
    
    // Animation frame
    let animationFrame: number;
    
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const { blocks, particles } = blockchainRef.current;
      
      // Draw connections between blocks
      ctx.lineWidth = 2;
      blocks.forEach((block) => {  // Removed unused 'index' parameter
        block.connections.forEach(targetIndex => {
          const target = blocks[targetIndex];
          ctx.beginPath();
          ctx.moveTo(block.x + block.width, block.y + block.height / 2);
          ctx.lineTo(target.x, target.y + target.height / 2);
          ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
          ctx.stroke();
          
          // Draw animated data particles along connections
          if (animationStarted) {
            const dataParticles = particles.filter(p => !p.connected).slice(0, 5);
            dataParticles.forEach(particle => {
              particle.connected = true;
              
              // Position at start of connection
              particle.x = block.x + block.width;
              particle.y = block.y + block.height / 2;
              
              // Set direction toward target block
              const dx = target.x - particle.x;
              const dy = target.y + target.height / 2 - particle.y;
              particle.direction = Math.atan2(dy, dx);
            });
          }
        });
      });
      
      // Draw blocks
      blocks.forEach((block, index) => {
        // Draw block
        ctx.fillStyle = block.color + '30'; // Add transparency
        ctx.strokeStyle = block.color;
        ctx.lineWidth = 2;
        
        // Draw block with rounded corners
        const radius = 8;
        ctx.beginPath();
        ctx.moveTo(block.x + radius, block.y);
        ctx.lineTo(block.x + block.width - radius, block.y);
        ctx.arcTo(block.x + block.width, block.y, block.x + block.width, block.y + radius, radius);
        ctx.lineTo(block.x + block.width, block.y + block.height - radius);
        ctx.arcTo(block.x + block.width, block.y + block.height, block.x + block.width - radius, block.y + block.height, radius);
        ctx.lineTo(block.x + radius, block.y + block.height);
        ctx.arcTo(block.x, block.y + block.height, block.x, block.y + block.height - radius, radius);
        ctx.lineTo(block.x, block.y + radius);
        ctx.arcTo(block.x, block.y, block.x + radius, block.y, radius);
        ctx.closePath();
        
        ctx.fill();
        ctx.stroke();
        
        // Draw block number
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`#${index + 1}`, block.x + block.width / 2, block.y + block.height / 2 - 10);
        
        // Draw hash text
        ctx.font = '12px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText(block.hash, block.x + block.width / 2, block.y + block.height / 2 + 12);
      });
      
      // Update and draw particles
      particles.forEach(particle => {
        if (particle.connected) {
          // Move along connection line
          particle.x += Math.cos(particle.direction) * particle.speed;
          particle.y += Math.sin(particle.direction) * particle.speed;
          
          // Check if reached destination
          const targetBlock = blocks.find(b => 
            particle.x >= b.x - particle.radius && 
            particle.x <= b.x + particle.radius && 
            particle.y >= b.y - particle.radius && 
            particle.y <= b.y + particle.radius
          );
          
          if (targetBlock) {
            particle.connected = false;
            particle.x = Math.random() * canvas.width;
            particle.y = Math.random() * canvas.height;
          }
        } else {
          // Random movement for free particles
          particle.x += Math.cos(particle.direction) * particle.speed * 0.2;
          particle.y += Math.sin(particle.direction) * particle.speed * 0.2;
          
          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.direction = Math.PI - particle.direction;
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.direction = -particle.direction;
          }
          
          // Occasionally change direction
          if (Math.random() < 0.01) {
            particle.direction += (Math.random() * 0.5 - 0.25);
          }
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + (particle.connected ? '80' : '40'); // More opaque if connected
        ctx.fill();
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    initBlockchain();
    animate();
    
    // Start the animation after a short delay
    const timer = setTimeout(() => setAnimationStarted(true), 1000);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <div className="h-64 w-full bg-gray-800/40 rounded-lg relative overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute bottom-4 left-4 text-xs text-gray-400">
        End-to-end encrypted with blockchain verification
      </div>
    </div>
  );
};

export default EncryptionAnimation;
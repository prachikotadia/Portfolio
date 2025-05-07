
import { useState, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  perspective?: number;
  shine?: boolean;
}

const Card3D = ({ 
  children, 
  className, 
  intensity = 10, 
  perspective = 1000,
  shine = true
}: Card3DProps) => {
  const [style, setStyle] = useState({
    transform: 'rotateX(0deg) rotateY(0deg)',
    shinePosition: { x: 0, y: 0 }
  });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to rotation (from center, -1 to 1)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Invert the rotation direction and scale
    const rotateY = ((x - centerX) / centerX) * intensity;
    const rotateX = -((y - centerY) / centerY) * intensity;
    
    // Update transform
    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      shinePosition: { x: (x / rect.width) * 100, y: (y / rect.height) * 100 }
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      shinePosition: { x: 0, y: 0 }
    });
  };

  return (
    <div 
      ref={cardRef}
      className={cn("relative transition-transform duration-200 ease-out transform-style-3d", className)}
      style={{ 
        transform: style.transform,
        transition: 'transform 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-magnetic
    >
      {children}
      
      {/* Reflection effect */}
      {shine && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${style.shinePosition.x}% ${style.shinePosition.y}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)`,
            opacity: 0.5
          }}
        ></div>
      )}
    </div>
  );
};

export default Card3D;

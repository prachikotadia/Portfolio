
import { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TextGradientAnimationProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
  hoverGradient?: string;
  animate?: boolean;
  duration?: number;
  hoverEffect?: 'tilt' | 'shine' | 'scale' | 'color' | 'none';
}

const TextGradientAnimation = ({ 
  children, 
  className,
  gradient = 'from-primary via-accent to-secondary',
  hoverGradient = 'from-secondary via-accent to-primary',
  animate = false,
  duration = 3,
  hoverEffect = 'none'
}: TextGradientAnimationProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Effect for making gradient animation
  useEffect(() => {
    if (!animate || !elementRef.current) return;
    
    const element = elementRef.current;
    let rotation = 0;
    let animationId: number;
    
    const updateGradient = () => {
      rotation = (rotation + 1) % 360;
      if (element) {
        element.style.backgroundImage = `linear-gradient(${rotation}deg, var(--gradient-start), var(--gradient-middle), var(--gradient-end))`;
      }
      animationId = requestAnimationFrame(updateGradient);
    };
    
    // Start animation
    animationId = requestAnimationFrame(updateGradient);
    
    // Clean up animation
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [animate]);
  
  // Event handler for hover state
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  // Event handler for mouse position (for tilt effect)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverEffect !== 'tilt') return;
    
    const rect = elementRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };
  
  // Calculate tilt transform
  const getTiltTransform = () => {
    if (!elementRef.current || hoverEffect !== 'tilt' || !isHovered) return '';
    
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (mousePosition.y - centerY) / 10;
    const rotateY = (centerX - mousePosition.x) / 10;
    
    return `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  // Determine hover animation
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'shine':
        return isHovered ? 'after:opacity-100' : 'after:opacity-0';
      case 'scale':
        return isHovered ? 'scale-110 drop-shadow-lg' : 'scale-100';
      case 'color':
        return '';
      case 'tilt':
        return '';
      default:
        return '';
    }
  };

  return (
    <div 
      ref={elementRef}
      className={cn(
        // Base classes
        "relative inline-block bg-clip-text text-transparent transition-all hover:shadow-lg",
        // Gradient classes
        `bg-gradient-to-r ${isHovered ? hoverGradient : gradient}`,
        // Animation duration
        animate ? `duration-${duration}` : '',
        // Hover animation classes
        getHoverAnimation(),
        // Shine effect
        hoverEffect === 'shine' ? "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:transition-opacity after:translate-x-full after:skew-x-12 after:-skew-y-12 after:duration-1000 overflow-hidden" : "",
        // Additional classes
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ 
        // CSS variables for the gradient colors
        '--gradient-start': `hsl(var(--${isHovered ? 'secondary' : 'primary'}))`,
        '--gradient-middle': `hsl(var(--${isHovered ? 'accent' : 'accent'}))`,
        '--gradient-end': `hsl(var(--${isHovered ? 'primary' : 'secondary'}))`,
        // Apply tilt transform if hover effect is tilt
        transform: getTiltTransform(),
        // Transition for hover effects
        transition: 'all 0.3s ease-out',
        // Apply animation if specified
        animation: animate ? `gradient ${duration}s linear infinite` : 'none',
      } as React.CSSProperties}
    >
      {children}
      {hoverEffect === 'shine' && isHovered && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine pointer-events-none"
          style={{ animationDuration: '1s' }}
        />
      )}
    </div>
  );
};

export default TextGradientAnimation;

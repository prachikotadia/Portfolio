
import { useRef, useState, useEffect, ReactNode } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { playHoverSound, playClickSound } from '@/utils/soundEffects';

interface MagneticButtonProps extends ButtonProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  magnetic?: boolean;
  effectOnHover?: 'ripple' | 'glow' | 'scale' | 'none';
  glowColor?: string;
  soundEffects?: boolean;
}

const MagneticButton = ({
  children,
  className,
  strength = 30,
  radius = 150,
  magnetic = true,
  effectOnHover = 'ripple',
  glowColor = "var(--primary)",
  soundEffects = true,
  onClick,
  ...props
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
  const [showRipple, setShowRipple] = useState(false);

  // Handle magnetic effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !magnetic) return;
    
    const btn = buttonRef.current;
    const rect = btn.getBoundingClientRect();
    
    // Calculate the center of the button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from cursor to center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
    // Only apply effect if cursor is within defined radius
    if (distance < radius) {
      // Calculate strength based on distance (stronger when closer to center)
      const magnetStrength = (1 - distance / radius) * strength;
      
      // Calculate the movement
      const moveX = (distanceX / distance) * magnetStrength;
      const moveY = (distanceY / distance) * magnetStrength;
      
      // Apply the transform
      setPosition({ x: moveX, y: moveY });
    }
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
    
    setTimeout(() => {
      setShowRipple(false);
    }, 300);
  };

  // Set hovered state
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (soundEffects) {
      playHoverSound(0.1);
    }
  };

  // Handle click effect
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (effectOnHover === 'ripple') {
      const btn = buttonRef.current;
      if (!btn) return;
      
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create ripple effect
      setRippleStyle({
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%) scale(0)',
      });
      
      setShowRipple(true);
      
      // Animate the ripple
      setTimeout(() => {
        setRippleStyle(prev => ({
          ...prev,
          transform: `translate(-50%, -50%) scale(${Math.max(rect.width, rect.height) / 5})`,
          opacity: 0,
        }));
      }, 10);
    }
    
    if (soundEffects) {
      playClickSound(0.15);
    }
    
    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  // Clean up effect when unmounting
  useEffect(() => {
    return () => {
      setShowRipple(false);
    };
  }, []);

  // Get effect classes based on hover effect type
  const getEffectClasses = () => {
    if (!isHovered) return '';
    
    switch (effectOnHover) {
      case 'glow':
        return 'shadow-[0_0_15px_3px_var(--glow-color)]';
      case 'scale':
        return 'scale-105';
      default:
        return '';
    }
  };

  return (
    <Button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        getEffectClasses(),
        className
      )}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered ? 'transform 0.2s ease-out' : 'transform 0.5s ease-out',
        '--glow-color': glowColor
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {children}
      
      {/* Ripple effect */}
      {showRipple && effectOnHover === 'ripple' && (
        <span
          className="absolute rounded-full bg-white/30 pointer-events-none transition-all duration-700"
          style={{
            ...rippleStyle,
          }}
        />
      )}
    </Button>
  );
};

export default MagneticButton;

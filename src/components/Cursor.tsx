
import { useEffect, useState, useRef } from 'react';
import { playHoverSound } from '@/utils/soundEffects';

interface Position {
  x: number;
  y: number;
}

const Cursor = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [magnetTarget, setMagnetTarget] = useState<Position>({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const lastPlayTime = useRef<number>(0);
  
  // Create trail elements
  useEffect(() => {
    const trailCount = 5;
    const trailContainer = document.createElement('div');
    trailContainer.className = 'fixed top-0 left-0 pointer-events-none z-40';
    document.body.appendChild(trailContainer);
    
    // Create trail elements
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = 'fixed rounded-full pointer-events-none';
      trail.style.width = `${8 - i * 1}px`;
      trail.style.height = `${8 - i * 1}px`;
      trail.style.backgroundColor = 'var(--primary)';
      trail.style.opacity = `${0.3 - i * 0.05}`;
      trail.style.transition = `transform ${0.1 + i * 0.04}s ease-out`;
      trailContainer.appendChild(trail);
      trailsRef.current.push(trail);
    }
    
    return () => {
      document.body.removeChild(trailContainer);
    };
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Update trail positions with delay
      trailsRef.current.forEach((trail, i) => {
        setTimeout(() => {
          trail.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        }, i * 40);
      });
      
      // Check what element we're hovering
      const targetElement = document.elementFromPoint(e.clientX, e.clientY);
      
      // Detect pointer state
      if (targetElement) {
        const isHoveringClickable = 
          targetElement.tagName === 'A' || 
          targetElement.tagName === 'BUTTON' || 
          targetElement.closest('a') !== null || 
          targetElement.closest('button') !== null ||
          getComputedStyle(targetElement).cursor === 'pointer';
          
        // Only play sound when transitioning to hovering state
        if (!isPointer && isHoveringClickable) {
          // Debounce sound to avoid too frequent playback
          const now = Date.now();
          if (now - lastPlayTime.current > 100) {
            playHoverSound(0.08);
            lastPlayTime.current = now;
          }
        }
        
        setIsPointer(Boolean(isHoveringClickable));
        
        // Check for magnetic elements
        const magneticElement = 
          targetElement.hasAttribute('data-magnetic') || 
          targetElement.closest('[data-magnetic]');
          
        if (magneticElement && magneticElement instanceof Element) {
          setIsMagnetic(true);
          
          // Get the magnetic element's bounds
          const bounds = magneticElement.getBoundingClientRect();
          const centerX = bounds.left + bounds.width / 2;
          const centerY = bounds.top + bounds.height / 2;
          
          // Calculate the magnetic pull (stronger near center)
          const magnetStrength = 0.4; // Adjust magnetic pull strength
          const pullX = (centerX - e.clientX) * magnetStrength;
          const pullY = (centerY - e.clientY) * magnetStrength;
          
          setMagnetTarget({
            x: e.clientX + pullX,
            y: e.clientY + pullY
          });
          
          // Add magnetic effect to the element itself
          if (magneticElement instanceof HTMLElement) {
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            magneticElement.style.transform = `translate(${dx * 0.1}px, ${dy * 0.1}px)`;
            magneticElement.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
          }
        } else {
          setIsMagnetic(false);
          
          // Reset any previously affected magnetic elements
          document.querySelectorAll('[data-magnetic]').forEach(el => {
            if (el instanceof HTMLElement) {
              el.style.transform = '';
            }
          });
        }
      }
    };
    
    const handleMouseLeave = () => {
      // Hide cursor when mouse leaves the window
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
      
      // Hide trails
      trailsRef.current.forEach((trail) => {
        trail.style.opacity = '0';
      });
    };
    
    const handleMouseEnter = () => {
      // Show cursor when mouse enters the window
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
      
      // Show trails
      trailsRef.current.forEach((trail, i) => {
        trail.style.opacity = `${0.3 - i * 0.05}`;
      });
    };
    
    // Reset magnetic elements when clicking
    const handleClick = () => {
      document.querySelectorAll('[data-magnetic]').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.transform = '';
          el.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('click', handleClick);
    };
  }, []);
  
  // Calculate the cursor position based on whether we're in magnetic mode or not
  const cursorPosition = isMagnetic ? magnetTarget : position;
  
  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block transition-opacity duration-300"
      style={{
        transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
        transition: `transform ${isMagnetic ? '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : '0.1s ease-out'}`
      }}
    >
      <div 
        className={`w-8 h-8 -ml-4 -mt-4 rounded-full border transition-all duration-300 ${
          isPointer ? 
            'scale-150 bg-primary/20 backdrop-blur-sm border-primary' : 
            'scale-100 bg-transparent border-primary/80'
        }`}
      >
        {isPointer && (
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/50 opacity-75" style={{animationDuration: '1.5s'}}></span>
        )}
      </div>
    </div>
  );
};

export default Cursor;

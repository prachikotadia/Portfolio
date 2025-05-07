
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  animation?: 'fade' | 'slide' | 'scale';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const TextReveal = ({
  text,
  className,
  delay = 0,
  duration = 0.6,
  stagger = 0.03,
  once = true,
  animation = 'fade',
  tag: Tag = 'div'
}: TextRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setIsVisible(false);
      }
    }, {
      threshold: 0.2,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [once]);

  // Define animation styles
  const getAnimationStyle = (index: number) => {
    const baseStyle = {
      opacity: 0,
      transform: 'translateY(0)',
      animation: 'none',
      display: 'inline-block',
      whiteSpace: 'pre',
      animationFillMode: 'forwards',
      animationDelay: `${delay + index * stagger}s`,
      animationDuration: `${duration}s`,
    };

    if (!isVisible) return baseStyle;

    let animationType = 'fade-in';
    switch (animation) {
      case 'slide':
        animationType = 'slide-up-fade';
        break;
      case 'scale':
        animationType = 'scale-in';
        break;
      default:
        animationType = 'fade-in';
    }

    return {
      ...baseStyle,
      animation: `${animationType} ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1) forwards`,
      animationDelay: `${delay + index * stagger}s`,
    };
  };

  return (
    <Tag ref={containerRef} className={cn("", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em] last:mr-0">
          <span
            style={getAnimationStyle(i)}
            className="inline-block"
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
};

export default TextReveal;

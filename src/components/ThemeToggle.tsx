
import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { Palette, Wand } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle = ({ className, size = 'md' }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only show the theme toggle when mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  const isLightMode = theme === 'light';
  
  // Size classes for the wrapper
  const sizeClasses = {
    sm: 'w-[70px] h-[30px]',
    md: 'w-[90px] h-[36px]',
    lg: 'w-[110px] h-[42px]',
  };
  
  // Icon sizes based on toggle size
  const iconSize = {
    sm: 14,
    md: 16,
    lg: 18,
  };
  
  // Text sizes based on toggle size
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
  };
  
  // Circle sizes based on toggle size
  const circleClasses = {
    sm: 'w-[24px] h-[24px]',
    md: 'w-[30px] h-[30px]',
    lg: 'w-[36px] h-[36px]',
  };
  
  return (
    <div className={cn('relative group', className)}>
      <div 
        className={cn(
          'flex items-center justify-between rounded-full p-1 transition-colors duration-300 overflow-hidden',
          isLightMode ? 'bg-white border border-gray-200 group-hover:shadow-md' : 'bg-[#222222] group-hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]',
          'transform transition-all duration-300 group-hover:scale-[1.03]',
          sizeClasses[size]
        )}
      >
        <div className={cn(
          'absolute inset-0 flex justify-between items-center px-2',
          'pointer-events-none'
        )}>
          <span className={cn(
            'font-medium uppercase transition-opacity truncate',
            textSizeClasses[size],
            isLightMode ? 'opacity-100 text-black' : 'opacity-30 text-white'
          )}>
            
          </span>
          <span className={cn(
            'font-medium uppercase transition-opacity truncate',
            textSizeClasses[size],
            !isLightMode ? 'opacity-100 text-white' : 'opacity-30 text-black'
          )}>
            
          </span>
        </div>
        
        <div className={cn(
          'absolute inset-0 flex items-center',
          isLightMode ? 'justify-start' : 'justify-end',
          'px-1 pointer-events-none'
        )}>
          <div className={cn(
            'rounded-full flex items-center justify-center bg-[#4052b7] transition-all',
            'transform group-hover:scale-110 group-hover:shadow-lg',
            circleClasses[size]
          )}>
            {isLightMode ? (
              <Palette className="text-white animate-pulse" size={iconSize[size]} />
            ) : (
              <Wand className="text-white animate-pulse" size={iconSize[size]} />
            )}
          </div>
        </div>
        
        <Switch 
          className="opacity-0 cursor-pointer w-full h-full absolute inset-0 z-10" 
          checked={theme === 'dark'}
          onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        />
      </div>
    </div>
  );
};

export default ThemeToggle;

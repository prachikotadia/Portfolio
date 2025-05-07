
import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { Sun, Moon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from './ThemeToggle';

// Theme options with their display names and icons
const themes = [
  {
    id: 'light',
    name: 'Light',
    icon: <Sun className="h-4 w-4 text-amber-500" />
  },
  {
    id: 'dark',
    name: 'Dark',
    icon: <Moon className="h-4 w-4 text-blue-400" />
  },
  {
    id: 'hacker',
    name: 'Hacker',
    icon: <div className="w-4 h-4 bg-green-500 rounded-full" />
  },
  {
    id: 'calm',
    name: 'Calm',
    icon: <div className="w-4 h-4 bg-blue-200 rounded-full" />
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    icon: <div className="w-4 h-4 bg-yellow-400 rounded-full border border-black" />
  }
];

interface ThemeSwitcherProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ThemeSwitcher = ({ className, size = 'md' }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only show the theme switcher when mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Play sound effect when switching themes
  const playSwitchSound = () => {
    const audio = new Audio('/sounds/hover.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log("Audio play prevented:", e));
  };

  return (
    <div className={cn('relative', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            className="rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 hover:scale-105"
            aria-label="Switch theme"
          >
            <ThemeToggle size={size} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-48 animation-slide-up-fade"
        >
          {themes.map(({ id, name, icon }) => (
            <DropdownMenuItem
              key={id}
              onClick={() => {
                setTheme(id);
                playSwitchSound();
              }}
              className={cn(
                "flex items-center gap-2 cursor-pointer transition-colors",
                theme === id ? "bg-primary/10 text-primary" : ""
              )}
            >
              <div className="flex items-center justify-center w-6 h-6">
                {icon}
              </div>
              <span>{name}</span>
              {theme === id && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary"></div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeSwitcher;

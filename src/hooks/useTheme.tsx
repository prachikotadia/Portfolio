
import { createContext, useContext, useEffect, useState } from 'react';

// Extend the Theme type to include our new theme options
type Theme = 'light' | 'dark' | 'hacker' | 'calm' | 'high-contrast';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
      
      if (savedTheme) {
        console.log(`Loading saved theme from localStorage: ${savedTheme}`);
        setTheme(savedTheme);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme: Theme = prefersDark ? 'dark' : 'light';
        console.log(`No saved theme, using system preference: ${systemTheme}`);
        setTheme(systemTheme);
      }
    } catch (error) {
      console.error("Error initializing theme:", error);
      // Fallback to light theme
      setTheme('light');
    }
    setIsInitialized(true);
  }, []);

  // Apply theme changes to document and localStorage
  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      console.log(`Applying theme to document: ${theme}`);
      
      // Remove all theme classes
      document.documentElement.classList.remove('light', 'dark', 'theme-hacker', 'theme-calm', 'theme-high-contrast');
      
      // Add the appropriate class based on the theme name
      if (theme === 'light' || theme === 'dark') {
        document.documentElement.classList.add(theme);
      } else {
        document.documentElement.classList.add(`theme-${theme}`);
      }
      
      // Store in localStorage
      localStorage.setItem('portfolio-theme', theme);
      
      // Play sound effect based on theme change
      const soundFile = theme === 'light' ? 'light-switch.mp3' : 'dark-switch.mp3';
      const audio = new Audio(`/sounds/${soundFile}`);
      audio.volume = 0.3;
      audio.play().catch(e => console.log("Audio play prevented:", e));
      
      // Log theme change for debugging
      console.log(`Theme successfully set to: ${theme}`);
    } catch (error) {
      console.error("Error applying theme:", error);
    }
  }, [theme, isInitialized]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default useTheme;

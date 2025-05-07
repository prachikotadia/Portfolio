
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, GraduationCap, FileText, Book, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Basic scrolled state
      setIsScrolled(window.scrollY > 20);
      
      // For floating navbar behavior - hide on scroll down, show on scroll up
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up or at the top - show navbar
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Play hover sound effect on link hover
  const playHoverSound = () => {
    const audio = new Audio('/sounds/hover.mp3');
    audio.volume = 0.1;
    audio.play().catch(e => console.log("Audio play prevented:", e));
  };

  // Primary navigation items (first row)
  const primaryNavLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // Secondary navigation items (second row)
  const secondaryNavLinks = [
    { name: 'Education', href: '#education', icon: <GraduationCap className="h-4 w-4 mr-1" /> },
    { name: 'Research Papers', href: '#research-papers', icon: <FileText className="h-4 w-4 mr-1" /> },
    { name: 'Blog', href: '#blog', icon: <Book className="h-4 w-4 mr-1" /> },
    { name: 'Certificates', href: '#certifications', icon: <Award className="h-4 w-4 mr-1" /> },
    { name: 'Achievements', href: '#achievements', icon: <Award className="h-4 w-4 mr-1" /> },
  ];

  // Combined links for mobile view with appropriate type handling
  // Modify this to create a new array with consistent structure
  const allNavLinks = [
    ...primaryNavLinks.map(link => ({ ...link, icon: null })), // Add null icon for primary links
    ...secondaryNavLinks
  ];

  return (
    <>
      {/* Floating NavBar that appears on scroll */}
      <div className={cn(
          'floating-nav transition-all duration-300 ease-in-out',
          isScrolled && isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        )}
      >
        <div className="flex items-center space-x-6">
          {primaryNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium relative overflow-hidden group"
              onMouseEnter={playHoverSound}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
          ))}
        </div>
      </div>
      
      {/* Main Header */}
      <header 
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500',
          isVisible ? 'translate-y-0' : '-translate-y-full',
          isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-sm dark:bg-background/60' : 'bg-transparent'
        )}
      >
        <div className="container py-2">
          <div className="flex items-center justify-between">
            <a href="#home" className="text-2xl font-display font-bold">
              <span className="neon-text">Portfolio</span>
            </a>
            
            {/* Mobile Menu Button and Theme Toggle */}
            <div className="flex items-center md:hidden gap-4">
              <div className="relative z-10">
                <ThemeSwitcher size="sm" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
            
            {/* Desktop Resume Button and Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative z-10">
                <ThemeSwitcher size="md" />
              </div>
              <Button 
                className="apple-button ml-4 group"
                onClick={() => window.open('assets/Prachi_Kotadia_Resume_2025.pdf', '_blank')}
                onMouseEnter={playHoverSound}
              >
                <span className="relative overflow-hidden inline-block">
                  <span className="relative z-10">Resume</span>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </Button>
            </div>
          </div>
          
          {/* Desktop Navigation - Two Row Layout */}
          <nav className="hidden md:block mt-2">
            {/* Primary Navigation - First Row */}
            <div className="flex justify-center mb-1">
              {primaryNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 text-sm font-medium rounded-md transition-colors hover:text-primary flex items-center relative group overflow-hidden"
                  onMouseEnter={playHoverSound}
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </a>
              ))}
            </div>
            
            {/* Secondary Navigation - Second Row */}
            <div className="flex justify-center">
              {secondaryNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 text-sm font-medium rounded-md transition-colors hover:text-primary flex items-center relative group overflow-hidden"
                  onMouseEnter={playHoverSound}
                >
                  <span className="mr-1 group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </a>
              ))}
            </div>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 w-full bg-background/95 dark:bg-background/90 backdrop-blur-lg shadow-lg p-4 border-t border-border/50 animate-fade-in-up max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-3">
              {allNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-base font-medium rounded-md hover:bg-primary/5 flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                  onTouchStart={playHoverSound}
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
              <Button 
                className="apple-button mt-2"
                onClick={() => {
                  window.open('/resume.pdf', '_blank');
                  setIsMobileMenuOpen(false);
                }}
              >
                Resume
              </Button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Navbar;

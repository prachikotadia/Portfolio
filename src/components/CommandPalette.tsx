
import { useState, useEffect } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search, Command as CommandIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ThemeToggle from "@/components/ThemeToggle";

// Define the navigation items for the command palette
const navigationItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" }
];

// Define commands for actions
const actionItems = [
  { name: "Download Resume", action: () => window.open('/Prachi_Kotadia_Resume_2025.pdf', '_blank') },
  { name: "Copy Email", action: () => {
    navigator.clipboard.writeText('iprachikotadia@gmail.com');
    // Show toast notification
    console.log('Email copied to clipboard');
  }}
];

// Define external links
const externalLinks = [
  { name: "GitHub", href: "https://github.com/prachikotadia" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/prachi-kotadia/" },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  // Handle keyboard shortcut to open command palette (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(open => !open);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Handle navigation
  const handleNavigation = (href: string) => {
    setOpen(false);
    
    // Smooth scroll to the section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Handle external link
  const handleExternalLink = (href: string) => {
    setOpen(false);
    window.open(href, '_blank');
  };
  
  // Handle action
  const handleAction = (actionName: string) => {
    setOpen(false);
    
    const action = actionItems.find(item => item.name === actionName);
    if (action && action.action) {
      action.action();
    }
  };
  
  return (
    <>
      <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
        {/* Theme Toggle */}
        <div className="mb-2">
          <ThemeToggle size="sm" />
        </div>
        
        {/* Command Palette Button */}
        <Button
          variant="outline"
          size="sm"
          className="h-10 w-10 rounded-full p-0 sm:h-12 sm:w-12 sm:p-1 shadow-md bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={() => setOpen(true)}
        >
          <CommandIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sr-only">Command Menu</span>
        </Button>
      </div>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            
            <CommandGroup heading="Navigation">
              {navigationItems.map((item) => (
                <CommandItem
                  key={item.name}
                  onSelect={() => handleNavigation(item.href)}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
            
            <CommandSeparator />
            
            <CommandGroup heading="Actions">
              {actionItems.map((item) => (
                <CommandItem
                  key={item.name}
                  onSelect={() => handleAction(item.name)}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
            
            <CommandSeparator />
            
            <CommandGroup heading="Links">
              {externalLinks.map((item) => (
                <CommandItem
                  key={item.name}
                  onSelect={() => handleExternalLink(item.href)}
                >
                  {item.name}
                  <CommandShortcut>↗</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};

export default CommandPalette;

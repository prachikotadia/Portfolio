
import { useEffect } from 'react';

const CustomScrollbar = () => {
  useEffect(() => {
    // Add custom scrollbar styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      /* Custom Apple-like scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      
      ::-webkit-scrollbar-thumb {
        background: hsl(var(--primary) / 0.3);
        border-radius: 100px;
        transition: background 0.3s ease;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: hsl(var(--primary) / 0.5);
      }
      
      /* Firefox scrollbar */
      html {
        scrollbar-width: thin;
        scrollbar-color: hsl(var(--primary) / 0.3) transparent;
      }
      
      /* Smooth scrolling for the whole page */
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

export default CustomScrollbar;

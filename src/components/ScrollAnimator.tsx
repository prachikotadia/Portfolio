
import { useEffect, useRef } from 'react';

const ScrollAnimator = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Initialize animation for elements that are already in view
    const initializeAnimations = () => {
      const elements = document.querySelectorAll('[data-animate]');
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.85;
        
        if (isVisible) {
          animateElement(el);
        }
      });
    };

    // Function to animate an element when it becomes visible
    const animateElement = (element: Element) => {
      const animation = element.getAttribute('data-animate');
      if (animation) {
        element.classList.add(`animate-${animation}`);
      }
      
      // Handle progress bars
      const progressBar = element.querySelector('[data-progress]');
      if (progressBar && progressBar instanceof HTMLElement) {
        const progress = progressBar.getAttribute('data-progress');
        if (progress) {
          progressBar.style.transform = `scaleX(${progress})`;
        }
      }
      
      // Handle staggered text animations
      const staggerText = element.querySelectorAll('[data-stagger]');
      if (staggerText.length > 0) {
        staggerText.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('animate-fade-in');
          }, i * 100);
        });
      }
      
      // Handle parallax elements
      const parallaxElements = element.querySelectorAll('[data-parallax]');
      parallaxElements.forEach(parallaxEl => {
        if (parallaxEl instanceof HTMLElement) {
          const speed = parallaxEl.getAttribute('data-parallax') || '0.1';
          parallaxEl.style.transition = 'transform 0.1s ease-out';
          parallaxEl.setAttribute('data-parallax-active', 'true');
        }
      });
    };
    
    // Use Intersection Observer for better performance
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateElement(entry.target);
          observerRef.current?.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });
    
    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
      observerRef.current?.observe(el);
    });
    
    // Add parallax effect on scroll
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('[data-parallax-active="true"]');
      parallaxElements.forEach(el => {
        if (el instanceof HTMLElement) {
          const speed = parseFloat(el.getAttribute('data-parallax') || '0.1');
          const yScroll = window.scrollY;
          const yPos = -(yScroll * speed);
          el.style.transform = `translateY(${yPos}px)`;
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize animations for elements already in viewport
    setTimeout(initializeAnimations, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);
  
  return null;
};

export default ScrollAnimator;

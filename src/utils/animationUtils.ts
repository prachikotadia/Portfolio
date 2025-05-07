
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Helper function to create staggered text reveals
export const createStaggeredTextReveal = (element: Element, delay = 0) => {
  if (!element) return;
  
  // Split the text into words
  const words = element.textContent?.split(' ') || [];
  if (words.length === 0) return;
  
  // Clear the element
  element.textContent = '';
  
  // Create span for each word
  words.forEach((word, i) => {
    const wordSpan = document.createElement('span');
    wordSpan.textContent = word + ' ';
    wordSpan.style.display = 'inline-block';
    wordSpan.style.opacity = '0';
    wordSpan.style.transform = 'translateY(20px)';
    element.appendChild(wordSpan);
    
    // Animate each word with stagger
    gsap.to(wordSpan, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
      delay: delay + i * 0.1
    });
  });
};

// Helper function for scroll-triggered animations
export const createScrollAnimation = (element: Element, animation: gsap.TweenVars, trigger: Element = element, options = {}) => {
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none none",
      ...options
    }
  });
};

// Helper function for parallax effects
export const createParallaxEffect = (elements: NodeListOf<Element> | Element[], intensity = 20) => {
  elements.forEach((element) => {
    gsap.to(element, {
      y: `${-intensity}%`,
      ease: "none",
      scrollTrigger: {
        trigger: element.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
};

// Helper function for text typing animation
export const createTypingAnimation = (element: Element, text: string, options = {}) => {
  return gsap.to(element, {
    duration: text.length * 0.05,
    text: {
      value: text,
      delimiter: ''
    },
    ease: "none",
    ...options
  });
};

// Helper function for animated counters
export const createCounterAnimation = (
  element: Element, 
  startValue: number, 
  endValue: number, 
  duration = 2,
  prefix = '',
  suffix = ''
) => {
  const obj = { value: startValue };
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: "power1.inOut",
    onUpdate: function() {
      element.textContent = prefix + Math.floor(obj.value) + suffix;
    },
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
};

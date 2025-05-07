
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import TextReveal from '@/components/TextReveal';
import { playHoverSound, playClickSound } from '@/utils/soundEffects';

const Hero = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const profileImageRef = useRef<HTMLDivElement>(null);
  const decorativeElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Generate animated particles
    const particles = particlesRef.current;
    if (!particles) return;
    
    particles.innerHTML = '';
    
    // Generate random particles with more vibrant colors
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 15 + 5;
      
      // More vibrant colors for particles - includes neon green
      const hue = i % 3 === 0 ? 142 : Math.random() * 360; // Every third particle is neon green
      const saturation = Math.random() * 30 + 70; // Higher saturation
      const lightness = Math.random() * 20 + 60; // Brighter
      
      particle.className = 'absolute rounded-full opacity-20 dark:opacity-30';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      // Random position
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      
      // Random animation duration and delay
      particle.style.animation = `float ${Math.random() * 10 + 8}s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      particles.appendChild(particle);
    }
    
    // Text animation
    const textElement = textRef.current;
    if (textElement) {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let iterations = 0;
      const originalText = textElement.textContent || "";
      
      const interval = setInterval(() => {
        textElement.textContent = originalText
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");
        
        if (iterations >= originalText.length) {
          clearInterval(interval);
        }
        
        iterations += 1 / 3;
      }, 30);
    }
    
    // 3D tilt effect for profile image
    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update state for cursor follow effect
      setMousePosition({ x, y });
      
      // Move profile image with mouse (subtle parallax)
      if (profileImageRef.current) {
        const profileRect = profileImageRef.current.getBoundingClientRect();
        const profileCenterX = profileRect.left + profileRect.width / 2;
        const profileCenterY = profileRect.top + profileRect.height / 2;
        
        const deltaX = (e.clientX - profileCenterX) * 0.01;
        const deltaY = (e.clientY - profileCenterY) * 0.01;
        
        profileImageRef.current.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
      }
      
      // Move decorative elements with mouse (floating effect)
      decorativeElementsRef.current.forEach((el, i) => {
        if (el) {
          const factor = i === 0 ? 0.04 : i === 1 ? -0.03 : 0.02;
          el.style.transform = `translate(${x * factor}px, ${y * factor}px) ${el.style.transform.split(')')[1] || ''}`;
        }
      });
    };
    
    // Sound effects
    const addHoverSoundToButtons = () => {
      const buttons = section?.querySelectorAll('button, a');
      buttons?.forEach(button => {
        button.addEventListener('mouseenter', () => {
          playHoverSound();
        });
        button.addEventListener('click', () => {
          playClickSound();
        });
      });
    };
    
    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }
    
    addHoverSoundToButtons();
    
    return () => {
      while (particles.firstChild) {
        particles.removeChild(particles.firstChild);
      }
      
      section?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update cursor position with smooth animation
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    cursor.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
  }, [mousePosition]);

  // Save refs to decorative elements
  const setDecorativeRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      decorativeElementsRef.current[index] = el;
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      ref={sectionRef}
    >
      {/* Custom cursor follower */}
      <div 
        ref={cursorRef}
        className="fixed w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-70 hidden md:block"
        style={{ transition: "transform 0.2s ease-out" }}
      ></div>
      
      {/* Animated background particles */}
      <div ref={particlesRef} className="absolute inset-0 -z-10 overflow-hidden"></div>
      
      {/* Enhanced gradient background with multiple colors */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-background via-primary/5 to-accent/10"></div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-2">
              <TextReveal 
                text="Hello, I'm"
                className="text-primary font-medium tracking-wide inline-block"
                animation="slide"
                delay={0.2}
              />
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold">
                <span ref={textRef} className="animate-reveal-text">
                  Prachi Kotadia
                </span>
              </h1>
              
              {/* Enhanced typewriter animation */}
              <div className="relative h-14 sm:h-16 opacity-0 animate-slide-up-fade" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-2xl sm:text-3xl font-display font-medium">
                  <span>I'm a </span>
                  <span className="text-primary">Creative Technologist</span>
                  <span className="absolute -right-1 top-0 w-1 h-full bg-primary animate-blink"></span>
                </h2>
              </div>
            </div>
            
            <TextReveal 
              text="I'm a passionate full-stack developer specializing in creating exceptional digital experiences. With expertise in modern web technologies, I bring ideas to life with clean code and stunning design."
              tag="p"
              className="text-muted-foreground max-w-lg text-lg"
              animation="fade"
              delay={0.5}
              stagger={0.01}
            />
            
            <div className="flex flex-wrap gap-4 pt-4 opacity-0 animate-slide-up-fade" style={{ animationDelay: '0.7s' }}>
              <Button 
                className="apple-button-ripple group"
                onClick={() => window.open('assets/Prachi_Kotadia_Resume_2025.pdf', '_blank')}
                data-magnetic
              >
                <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Download Resume</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                data-magnetic
              >
                <span className="mr-2">View Projects</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <div className="flex gap-4 pt-4 opacity-0 animate-slide-up-fade" style={{ animationDelay: '0.9s' }}>
              {[
                { Icon: Github, href: "https://github.com/prachikotadia" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/prachi-kotadia/" },
                { Icon: Mail, href: "mailto:iprachikotadia@gmail.com" }
              ].map((item, i) => (
                <a 
                  key={i}
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={cn(
                    "p-3 rounded-full bg-background/80 shadow-md transition-all duration-300",
                    "hover:bg-primary/10 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                  )}
                  data-magnetic
                >
                  <item.Icon size={20} className="text-foreground hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end opacity-0 animate-slide-up-fade" style={{ animationDelay: '1.1s' }}>
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Apple-style image container with custom shadows and reflections */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent backdrop-blur-sm shadow-xl"></div>
              
              <div 
                ref={profileImageRef}
                className="absolute inset-8 rounded-full overflow-hidden border-4 border-white/20 dark:border-white/10 shadow-inner animate-glow-pulse transition-transform duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img 
                  src= "assets\linkedin.jpg"
                  alt="Prachi Kotadia's Profile" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                
                {/* Apple-style reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 dark:to-white/10"></div>
              </div>
              
              {/* Decorative floating elements - using primary color */}
              <div 
                ref={(el) => setDecorativeRef(el, 0)}
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 animate-float" 
                style={{ animationDelay: '0.5s' }}
              ></div>
              <div 
                ref={(el) => setDecorativeRef(el, 1)}
                className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-tr from-primary/50 to-secondary/50 animate-float" 
                style={{ animationDelay: '1.2s' }}
              ></div>
              <div 
                ref={(el) => setDecorativeRef(el, 2)}
                className="absolute top-1/2 -right-8 w-8 h-8 rounded-full bg-gradient-to-bl from-primary/70 to-accent/70 animate-float" 
                style={{ animationDelay: '0.8s' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator - using primary color */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slight opacity-0 animate-slide-up-fade" style={{ animationDelay: '1.3s' }}>
        <span className="text-sm font-medium text-primary mb-2">Scroll Down</span>
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-primary/70 animate-bounce-slight"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

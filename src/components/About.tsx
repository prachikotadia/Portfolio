
import { ArrowRight, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import Card3D from '@/components/Card3D';
import TextReveal from '@/components/TextReveal';
import { playClickSound } from '@/utils/soundEffects';

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight * 0.8;
      
      if (isInView) {
        const items = element.querySelectorAll('[data-animate]');
        items.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('animate-slide-up-fade');
          }, i * 150);
        });
      }
    };
    
    // Parallax effect for the image container
    const handleParallax = () => {
      if (!imageRef.current) return;
      
      const scrollY = window.scrollY;
      const element = imageRef.current;
      const rect = element.getBoundingClientRect();
      
      // Only apply parallax when the element is in view
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (scrollY - rect.top + window.innerHeight) * 0.05;
        element.style.transform = `translateY(${offset}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleParallax);
    
    // Check on initial load
    handleScroll();
    handleParallax();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return (
    <section id="about" className="apple-section-spacing bg-muted/30 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-8 lg:px-16 max-w-7xl">
        {/* Decorative background circles - subtle and Apple-like */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute w-[500px] h-[500px] rounded-full bg-primary/3 blur-3xl -right-28 -top-28"
            data-parallax="0.02"
          ></div>
          <div 
            className="absolute w-[400px] h-[400px] rounded-full bg-secondary/3 blur-3xl -left-28 -bottom-28"
            data-parallax="0.04" 
          ></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8">
            <div className="space-y-3 opacity-0" data-animate>
              <TextReveal 
                text="About Me" 
                tag="h2"
                className="headline-medium" 
                animation="slide"
                delay={0.3}
              />
              <div className="h-1 w-24 bg-primary rounded-full"></div>
            </div>

            <div className="opacity-0 space-y-6 stagger-text-parent" data-animate>
              <TextReveal
                text="I'm a Full Stack Developer with a passion for creating elegant, efficient, and user-centered digital experiences."
                tag="p"
                className="body-large"
                animation="fade"
                delay={0.5}
                stagger={0.02}
              />
              
              <p className="body-medium" data-stagger>
              I'm Prachi Kotadia, a passionate Full Stack Developer currently pursuing my Master's in Computer Science at Illinois Institute of Technology. I specialize in building modern web applications using Python, React, and cloud technologies like AWS. My projects often combine clean architecture, microservices, and seamless user experience. I enjoy solving real-world problems through code, exploring system design, and continuously learning new tools and frameworks. With a strong foundation in both frontend and backend, I aim to create impactful, scalable solutions.              </p>
              
              <p className="body-medium" data-stagger>
                I love solving complex problems and turning ideas into reality through clean code and thoughtful design. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor adventures.
              <p className="body-medium" data-stagger>

...
              </p>   
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 opacity-0" data-animate>
              <Button 
                className="apple-button-ripple group"
                onClick={() => {
                  playClickSound();
                  window.open('assets/Prachi_Kotadia_Resume_2025.pdf', '_blank');
                }}
                data-magnetic
              >
                <FileText className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Download Resume</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                onClick={() => {
                  playClickSound();
                  window.open('https://www.linkedin.com/in/prachi-kotadia/', '_blank');
                }}
                data-magnetic
              >
                <span className="mr-2">LinkedIn</span>
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Right column - Image with Apple-style treatment */}
          <div className="opacity-0" data-animate ref={imageRef}>
            <Card3D className="relative" intensity={5}>
              {/* Main image with subtle shadow and border */}
              <div className="rounded-2xl overflow-hidden apple-shadow transition-all duration-300 border border-white/20 dark:border-white/5">
              <img 
                src="/assets/IMG_20241203_224014_383.webp" 
                alt="Prachi Kotadia portrait" 
                className="w-full h-full object-cover"
              />

              </div>
              
              {/* Decorative elements */}
              <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-primary/10 backdrop-blur-md rounded-xl border border-primary/20 rotate-12 flex items-center justify-center">
                <div className="bg-primary text-primary-foreground w-16 h-16 rounded-lg flex items-center justify-center font-display font-bold text-xl rotate-12">
                  PK
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

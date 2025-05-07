
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import FrontendProjects from '@/components/FrontendProjects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Courses from '@/components/Courses';
import Certifications from '@/components/Certifications';
import Projects from '@/components/Projects';
import ResearchPapers from '@/components/ResearchPapers';
import Achievements from '@/components/Achievements';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollAnimator from '@/components/ScrollAnimator';
import Cursor from '@/components/Cursor';
import CustomScrollbar from '@/components/CustomScrollbar';
import CommandPalette from '@/components/CommandPalette';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    // Set page title with Apple-style typography
    document.title = 'Prachi Kotadia | Creative Technologist';
    
    // Track scroll position for navbar visibility
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar based on scroll direction
      // Only hide after scrolling down a bit (100px)
      if (currentScrollY > 100) {
        setShowNav(currentScrollY < lastScrollY);
      } else {
        setShowNav(true);
      }
      
      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize GSAP ScrollTrigger animations for sections
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;
      
      // Animate section when scrolled into view
      gsap.fromTo(section.querySelectorAll('.gsap-reveal'), 
        { 
          y: 40, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none"
          } 
        }
      );
      
      // Parallax background elements
      const parallaxElements = section.querySelectorAll('.parallax-bg');
      if (parallaxElements.length) {
        parallaxElements.forEach(element => {
          gsap.to(element, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        });
      }
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(false));
    };
  }, [lastScrollY]);

  // Collect refs for all sections
  const addSectionRef = (el: HTMLElement | null, index: number) => {
    sectionsRef.current[index] = el;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollAnimator />
      <Cursor />
      <CustomScrollbar />
      <CommandPalette />
      
      {/* Floating navigation bar */}
      <div 
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
          scrollY > 50 ? (showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20') : ''
        }`}
      >
        {scrollY > 50 && (
          <div className="bg-background/70 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border border-border">
            <Navbar />
          </div>
        )}
      </div>
      
      {/* Regular navbar at the top */}
      <Navbar />
      
      {/* Sections with reduced spacing */}
      <section ref={(el) => addSectionRef(el, 0)} className="apple-section-spacing">
        <Hero />
      </section>
      <section ref={(el) => addSectionRef(el, 1)} className="apple-section-spacing">
        <About />
      </section>
      <section ref={(el) => addSectionRef(el, 2)} className="apple-section-spacing">
        <Skills />
      </section>
      <section ref={(el) => addSectionRef(el, 3)} className="apple-section-spacing">
        <FrontendProjects />
      </section>
      <section ref={(el) => addSectionRef(el, 4)} className="apple-section-spacing">
        <Education />
      </section>
      <section ref={(el) => addSectionRef(el, 5)} className="apple-section-spacing">
        <Experience />
      </section>
      <section ref={(el) => addSectionRef(el, 6)} className="apple-section-spacing">
        <Courses />
      </section>
      <section ref={(el) => addSectionRef(el, 7)} className="apple-section-spacing">
        <ResearchPapers />
      </section>
      <section ref={(el) => addSectionRef(el, 8)} className="apple-section-spacing">
        <Certifications />
      </section>
      <section ref={(el) => addSectionRef(el, 9)} className="apple-section-spacing">
        <Projects />
      </section>
      <section ref={(el) => addSectionRef(el, 10)} className="apple-section-spacing">
        <Achievements />
      </section>
      <section ref={(el) => addSectionRef(el, 11)} className="apple-section-spacing">
        <Blog />
      </section>
      <section ref={(el) => addSectionRef(el, 12)} className="apple-section-spacing">
        <Contact />
      </section>
      <Footer />

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 h-1 bg-primary z-50" style={{ width: `${(scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%` }}></div>
    </div>
  );
};

export default Index;

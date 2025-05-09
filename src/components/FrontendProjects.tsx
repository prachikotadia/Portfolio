
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Code, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";

// Sample frontend project data
const frontendProjects = [
  {
    id: 1,
    name: "Product Launch Website",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    description: "Showcase a new tech product with cinematic scroll animations, 3D renders, and interactive transitions. Website with a non-overlapping, cinematic, 3D, parallax scroll feel — tailored for light/dark themes, Framer Motion, GSAP, and glassmorphism.",
    technologies: ["TypeScript"],
    link: "https://product-intro.netlify.app/",
    github: "https://github.com/prachikotadia/parallax-product-pulse",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 2,
    name: "Atlternate Future App",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "FutureBeyond is a modern React-based web application that explores alternate future scenarios through interactive storytelling and thematic visuals.",
    technologies: [ "TypeScript"],
    link: "https://futurebeyond.netlify.app/",
    github: "https://github.com/prachikotadia/alternate-journey-creator",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 3,
    name: "Fitness Tracker",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    description: "This website is a modern Health Dashboard UI for HealthAssist AI, providing users with a personalized overview of their daily health metrics. It features a sleek dark theme with clean, accessible cards displaying steps, heart rate, water intake, sleep, and a timeline of daily activities. The intuitive side navigation allows easy access to detailed health categories like nutrition, workouts, vaccine records, and more.",
    technologies: ["TypeScript.js"],
    link: "https://stayhealty.netlify.app/",
    github: "https://github.com/prachikotadia/fitnesstrove",
    color: "from-green-500/20 to-emerald-500/20"
  }
];

const FrontendProjects = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [autoplay, setAutoplay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();
  
  // Handle card flip
  const toggleFlip = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Handle link click
  const handleLinkClick = (project: typeof frontendProjects[0], type: 'website' | 'github') => {
    toast({
      title: `Visiting ${type === 'github' ? 'GitHub repo' : 'live site'} for ${project.name}`,
      description: `Opening ${type === 'github' ? project.github : project.link} in a new tab`,
      duration: 2000,
    });
  };
  
  // Auto-rotate cards
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % frontendProjects.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoplay]);
  
  return (
    <section id="frontend-projects" className="py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute opacity-10 animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              borderRadius: `${Math.random() * 50}%`,
              background: `linear-gradient(45deg, rgba(139, 92, 246, ${Math.random() * 0.3}), rgba(236, 72, 153, ${Math.random() * 0.3}))`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4 relative inline-flex items-center">
            <Sparkles className="mr-2 h-6 w-6 text-primary animate-pulse-glow" />
            Frontend Showcase
            <Sparkles className="ml-2 h-6 w-6 text-primary animate-pulse-glow" style={{animationDelay: '1s'}} />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactive frontend projects and web interfaces I've designed and developed
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <Carousel
            opts={{
              loop: true,
              align: "center",
            }}
            className="w-full"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <CarouselContent>
              {frontendProjects.map((project, index) => (
                <CarouselItem key={project.id} className="md:basis-2/3">
                  <div className="p-2">
                    <div 
                      className={`perspective-1000 w-full cursor-pointer group h-[400px]`} 
                      onClick={() => toggleFlip(project.id)}
                      data-animate="fade-in"
                    >
                      <div 
                        className={`relative w-full h-full preserve-3d transition-all duration-500 ${flippedCards[project.id] ? 'rotate-y-180' : ''}`}
                      >
                        {/* Front of card - Project Image */}
                        <div className={`absolute w-full h-full backface-hidden rounded-xl overflow-hidden bg-gradient-to-br ${project.color} border border-primary/20 shadow-lg`}>
                          <img 
                            src={project.image} 
                            alt={project.name} 
                            className="w-full h-full object-cover opacity-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-2xl font-display font-bold mb-2">{project.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex gap-2 flex-wrap">
                                {project.technologies.map((tech, index) => (
                                  <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              <div className="text-sm text-muted-foreground animate-bounce-slight">
                                Click to flip
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Back of card - Project Details */}
                        <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden bg-gradient-to-br ${project.color} border border-primary/20 shadow-lg p-6 flex flex-col justify-between`}>
                          <div>
                            <h3 className="text-2xl font-display font-bold mb-4">{project.name}</h3>
                            <p className="text-base mb-6">{project.description}</p>
                            <ul className="space-y-2">
                              {project.technologies.map((tech, index) => (
                                <li key={index} className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                                  <span>{tech}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex justify-between mt-6">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFlip(project.id);
                              }}
                              className="hover:bg-background/20"
                            >
                              Back to image
                            </Button>
                            
                            <div className="flex gap-2">
                              <a 
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLinkClick(project, 'github');
                                }}
                              >
                                <Button size="sm" variant="outline" className="hover:animate-jelly flex items-center gap-2">
                                  <Code className="h-4 w-4" />
                                  <span>GitHub</span>
                                </Button>
                              </a>
                              
                              <a 
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLinkClick(project, 'website');
                                }}
                              >
                                <Button size="sm" className="hover:animate-jelly flex items-center gap-2">
                                  <span>Visit Website</span>
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
          </Carousel>
          
          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-6">
            {frontendProjects.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index ? 'bg-primary scale-125' : 'bg-primary/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrontendProjects;

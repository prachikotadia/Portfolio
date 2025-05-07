
import { useState, useEffect } from 'react';
import { Trophy, Award, Medal, ChevronLeft, ChevronRight } from 'lucide-react';

const Achievements = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  const achievements = [
    {
      title: "Marathon Champion",
      event: "City Marathon 2022",
      description: "Completed a full marathon in under 3 hours, ranking in the top 5% of all participants.",
      icon: <Trophy className="h-8 w-8" />,
      color: "from-[#FFD700]/30 to-[#FFA500]/30",
      image: "/placeholder.svg"
    },
    {
      title: "Basketball MVP",
      event: "Regional League 2021",
      description: "Named Most Valuable Player in the regional basketball league, leading the team to championship victory.",
      icon: <Award className="h-8 w-8" />,
      color: "from-[#FF6B6B]/30 to-[#FF8E53]/30",
      image: "/placeholder.svg"
    },
    {
      title: "Swimming Gold Medalist",
      event: "University Championship",
      description: "Won gold medal in 200m freestyle swimming competition, breaking the university record.",
      icon: <Medal className="h-8 w-8" />,
      color: "from-[#4E95FF]/30 to-[#73E0E0]/30",
      image: "/placeholder.svg"
    }
  ];
  
  // Auto-slide functionality
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (!isHovering) {
      interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % achievements.length);
      }, 4000);
    }
    
    return () => clearInterval(interval);
  }, [isHovering, achievements.length]);
  
  const nextSlide = () => {
    setActiveIndex(prev => (prev + 1) % achievements.length);
  };
  
  const prevSlide = () => {
    setActiveIndex(prev => (prev - 1 + achievements.length) % achievements.length);
  };

  return (
    <section id="achievements" className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">Sports Achievements</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Highlights from my sports career and accomplishments outside of professional work.
          </p>
        </div>
        
        <div 
          className="relative max-w-4xl mx-auto" 
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Trophy cabinet background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30 rounded-xl -z-10"></div>
          <div className="absolute top-10 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          <div className="absolute bottom-10 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          
          {/* Shelves */}
          <div className="absolute top-1/4 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-muted to-transparent -z-10 opacity-60"></div>
          <div className="absolute top-3/4 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-muted to-transparent -z-10 opacity-60"></div>
          
          <div className="py-16 px-4">
            <div className="relative h-[400px]">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out
                    ${index === activeIndex ? 'opacity-100 translate-x-0 scale-100 z-10' : 
                      index === (activeIndex + 1) % achievements.length ? 'opacity-30 translate-x-[100%] scale-90 z-0' : 
                      index === (activeIndex - 1 + achievements.length) % achievements.length ? 'opacity-30 translate-x-[-100%] scale-90 z-0' : 
                      'opacity-0 scale-75 z-0'}`}
                >
                  <div className={`flex flex-col md:flex-row gap-8 h-full bg-gradient-to-br ${achievement.color} 
                    backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/10 group overflow-hidden`}>
                    
                    {/* Achievement image */}
                    <div className="relative w-full md:w-1/2 overflow-hidden rounded-lg">
                      <img 
                        src={achievement.image} 
                        alt={achievement.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Shiny overlay effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 
                        group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
                    </div>
                    
                    {/* Achievement details */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                      <div className="mb-6 flex items-center">
                        <div className="p-3 rounded-full bg-background/30 backdrop-blur-sm mr-4 
                          animate-pulse-glow text-primary">
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-display font-bold">{achievement.title}</h3>
                          <p className="text-muted-foreground">{achievement.event}</p>
                        </div>
                      </div>
                      
                      <p className="text-foreground/90 mb-6">{achievement.description}</p>
                      
                      {/* Animated trophy */}
                      <div className="hidden md:block absolute bottom-6 right-8 transform rotate-12 transition-transform duration-300 
                        group-hover:scale-110 group-hover:rotate-[15deg]">
                        <Trophy className="h-16 w-16 text-[#FFD700]/60" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation controls */}
            <div className="flex justify-center gap-4 mt-8">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-background hover:bg-muted transition-colors"
                aria-label="Previous achievement"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              {achievements.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 
                    ${index === activeIndex ? 'bg-primary scale-125' : 'bg-muted hover:bg-primary/50'}`}
                  aria-label={`Go to achievement ${index + 1}`}
                />
              ))}
              
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-background hover:bg-muted transition-colors"
                aria-label="Next achievement"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;

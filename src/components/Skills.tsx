
import { useEffect, useRef } from 'react';
import { Sparkles, Star, TrendingUp, Heart, Coffee, Lightbulb } from 'lucide-react';

// Skill categories with fun icons
const skillGroups = [
  {
    category: "Frontend",
    icon: <Sparkles className="h-6 w-6 text-purple-500" />,
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 90 },
      { name: "TailwindCSS", level: 85 },
      { name: "Next.js", level: 80 },
    ],
    emoji: "🎨",
    color: "from-purple-500/40 to-pink-500/40"
  },
  {
    category: "Backend",
    icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "GraphQL", level: 65 },
      { name: "REST API", level: 90 },
    ],
    emoji: "⚙️",
    color: "from-blue-500/40 to-cyan-500/40"
  },
  {
    category: "Tools & Others",
    icon: <Lightbulb className="h-6 w-6 text-amber-500" />,
    skills: [
      { name: "Git", level: 85 },
      { name: "Docker", level: 70 },
      { name: "Figma", level: 75 },
      { name: "CI/CD", level: 80 },
      { name: "Jest", level: 75 },
      { name: "Webpack", level: 65 },
    ],
    emoji: "🛠️",
    color: "from-amber-500/40 to-yellow-500/40"
  }
];

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = skillsRef.current;
      if (!element) return;
      
      const position = element.getBoundingClientRect();
      const isVisible = position.top < window.innerHeight * 0.8;
      
      if (isVisible) {
        const skills = element.querySelectorAll('[data-animate]');
        skills.forEach((skill, index) => {
          setTimeout(() => {
            skill.classList.add('animate-fade-in-up');
          }, index * 100);
        });
        
        // Animate skill bars
        const bars = element.querySelectorAll('[data-progress]');
        bars.forEach((bar) => {
          if (bar instanceof HTMLElement) {
            const progress = bar.getAttribute('data-progress');
            if (progress) {
              setTimeout(() => {
                bar.style.transform = `scaleX(${progress})`;
              }, 500);
            }
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="skills" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full opacity-30 animate-float"
            style={{
              width: `${Math.random() * 60 + 40}px`,
              height: `${Math.random() * 60 + 40}px`,
              background: `radial-gradient(circle, rgba(var(--primary), 0.4) 0%, rgba(var(--primary), 0.1) 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4 relative inline-flex items-center">
            <Star className="mr-2 h-6 w-6 text-yellow-500 animate-spin-slow" />
            Skills & Expertise
            <Star className="ml-2 h-6 w-6 text-yellow-500 animate-spin-slow" style={{animationDelay: '2s', animationDirection: 'reverse'}} />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My technical skills and areas of expertise in software development.
          </p>
        </div>
        
        <div ref={skillsRef} className="grid md:grid-cols-3 gap-8">
          {skillGroups.map((group, groupIndex) => (
            <div 
              key={groupIndex} 
              className="opacity-0 transform"
              data-animate="fade-in-up"
              style={{ animationDelay: `${groupIndex * 0.2}s` }}
            >
              <div className={`h-full rounded-xl p-6 bg-gradient-to-br ${group.color} 
                border border-border shadow-lg transition-all duration-500 hover:shadow-xl relative overflow-hidden group`}>
                
                {/* Decorative emoji */}
                <div className="absolute -right-6 -top-6 text-8xl opacity-10 group-hover:opacity-20 
                              transition-all duration-500 transform group-hover:scale-125">
                  {group.emoji}
                </div>
                
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 bg-background/30 rounded-full mr-3">
                    {group.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-center">
                    {group.category}
                  </h3>
                </div>
                
                <div className="space-y-6 relative z-10">
                  {group.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2 opacity-0" data-animate="fade-in">
                      <div className="flex justify-between">
                        <span className="font-medium flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transform origin-left transition-transform duration-1000 relative"
                          style={{ transform: 'scaleX(0)' }}
                          data-progress={skill.level / 100}
                        >
                          {/* Moving shine effect */}
                          <div className="absolute inset-0 w-full h-full animate-pulse-glow"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced circular skill badges */}
        <div className="mt-16 flex justify-center flex-wrap gap-6">
          {['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'Figma', 'Git'].map((skill, i) => (
            <div
              key={i}
              className="w-20 h-20 flex items-center justify-center rounded-full 
                       bg-gradient-to-br from-primary/10 to-secondary/10 
                       hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 
                       border border-primary/10 hover:border-primary/30 opacity-0 
                       hover:scale-110 group relative"
              data-animate="fade-in"
              style={{ animationDelay: `${0.5 + i * 0.1}s` }}
            >
              <span className="font-medium text-sm group-hover:scale-110 transition-transform duration-300">{skill}</span>
              
              {/* Orbiting dot */}
              <div className="absolute w-3 h-3 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity"
                   style={{
                     animation: 'spin-slow 3s linear infinite',
                     transformOrigin: 'center',
                     top: '-4px',
                     left: 'calc(50% - 6px)'
                   }}>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

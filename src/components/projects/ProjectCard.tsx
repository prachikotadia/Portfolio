import { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ProjectType } from './types';

interface ProjectCardProps {
  project: ProjectType;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const ProjectCard = ({ project, index, hoveredIndex, setHoveredIndex }: ProjectCardProps) => {
  const { toast } = useToast();
  const [confetti, setConfetti] = useState<Array<{ x: number; y: number; size: number; color: string }>>([]);

  useEffect(() => {
    if (hoveredIndex === index) {
      const newConfetti = Array.from({ length: 15 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 2,
        color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`
      }));
      setConfetti(newConfetti);
    }
  }, [hoveredIndex, index]);

  const handleProjectClick = (type: 'code' | 'demo') => {
    toast({
      title: `${project.emoji} ${type === 'code' ? 'Checking out code for' : 'Visiting'} ${project.title}!`,
      description: type === 'code' ? "Exploring the source code..." : "Opening the live demo...",
      duration: 3000,
    });
  };

  return (
    <div 
      key={index}
      className="glass-card group overflow-hidden rounded-xl perspective-1000 opacity-0 transform transition-all duration-500 relative hover:shadow-xl hover:scale-[1.03]"
      data-animate="fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {hoveredIndex === index && confetti.map((particle, i) => (
        <div 
          key={i}
          className="absolute z-20 rounded-full animate-confetti"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        ></div>
      ))}

      <div className={`transform transition-all duration-500 preserve-3d ${hoveredIndex === index ? 'rotateY(10deg) rotateX(5deg)' : ''}`}>
        <div className="absolute top-4 right-4 z-10 text-xl opacity-70 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 group-hover:rotate-12">
          {project.emoji}
        </div>

        <div className="aspect-video overflow-hidden relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-6 relative">
          <div className="flex items-center mb-2">
            <div className="p-1.5 rounded-full bg-primary/10 mr-2 group-hover:scale-110 group-hover:bg-primary/20 transition-transform duration-300">
              {project.icon}
            </div>
            <h3 className="text-xl font-display font-bold">{project.title}</h3>
          </div>

          <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag, tagIndex) => (
              <span 
                key={tagIndex} 
                className="px-2.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300 hover:scale-105 hover:bg-primary/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 🌟 Add the "Code" Button here */}
          <button
            onClick={() => window.open(project.githubUrl, '_blank')}
            className="z-30 relative inline-flex items-center bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm7 1.414L15.586 11H11a1 1 0 00-1 1v4H4V4h6v1.414z" clipRule="evenodd" />
            </svg>
            Code
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
};

export default ProjectCard;

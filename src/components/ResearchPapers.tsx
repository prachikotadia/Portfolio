
import { useState, useRef, useEffect } from 'react';
import { FileText, Book, Calendar, ExternalLink, ChevronUp, ChevronDown, Sparkles, Award } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ResearchPapers = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const { toast } = useToast();
  
  const papers = [
    {
      title: "Research Paper 1",
      journal: "Software Engineering Techniques for Building Adaptive Awareness in Robotic Systems",
      date: "2024",
      abstract: "Explores strategies to engineer adaptive behavior in robotic systems through intelligent software design.",
      link: "https://prachikotadia.github.io/prachiKotadia/static/media/SE_ResearchPaper.dc470da4625f563f310c.pdf",
      color: "from-indigo-400 to-violet-500",
      emoji: "💻"
    },
    {
      title: "Research Paper 2",
      journal: "Emotional Intelligence in AI Quality Assurance: Ensuring Empathetic and Culturally Sensitive AI Interactions",
      date: "2024",
      abstract: "Discusses the role of emotional and cultural intelligence in testing and evaluating AI-driven systems.",
      link: "https://prachikotadia.github.io/prachiKotadia/static/media/SQM_ResearchPaper.575492264598d7d63e9b.pdf",
      color: "from-yellow-400 to-amber-400",
      emoji: "🧠"
    },
    {
      title: "Report",
      journal: "Continuous Integration and Continuous Deployment, DevOps, and MLOps",
      date: "2023",
      abstract: "A technical overview of CI/CD processes and DevOps practices with a focus on modern ML pipelines.",
      link: "https://prachikotadia.github.io/prachiKotadia/static/media/Final_Term_Paper_SPM.a61cf3aa573986568623.pdf",
      color: "from-rose-400 to-pink-400",
      emoji: "📱"
    }
  ];
  
  
  // Show a confetti effect when a card is flipped
  const toggleFlip = (index: number) => {
    if (flippedCard !== index) {
      toast({
        title: "Research Unlocked! 🎉",
        description: `You're exploring: ${papers[index].title}`,
        duration: 3000,
      });
    }
    setFlippedCard(flippedCard === index ? null : index);
  };

  // Float animation for decorative elements
  const floatingElements = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const elements = floatingElements.current?.querySelectorAll('.floating-element');
    if (elements) {
      elements.forEach((el, i) => {
        if (el instanceof HTMLElement) {
          el.style.animationDelay = `${i * 0.5}s`;
        }
      });
    }
  }, []);

  return (
    <section id="research" className="py-20 bg-gradient-to-b from-muted/10 to-background/80 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div ref={floatingElements} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="floating-element absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 50 + 20}px`,
              height: `${Math.random() * 50 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`,
              animation: `float ${Math.random() * 8 + 6}s ease-in-out infinite`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4 text-gradient relative inline-flex items-center">
            <Sparkles className="mr-2 h-6 w-6 text-primary animate-pulse-glow" />
            Research & Report
            <Sparkles className="ml-2 h-6 w-6 text-primary animate-pulse-glow" style={{animationDelay: '0.5s'}} />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of my published research papers and academic contributions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {papers.map((paper, index) => (
            <div 
              key={index}
              className="perspective-1000 w-full h-80 opacity-0"
              data-animate="fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div 
                className={`relative w-full h-full preserve-3d transition-all duration-700 ${flippedCard === index ? 'rotate-y-180' : ''}`}
                onClick={() => toggleFlip(index)}
              >
                {/* Front of Card */}
                <div className={`absolute inset-0 backface-hidden rounded-xl overflow-hidden border shadow-xl
                  bg-gradient-to-br ${paper.color} cursor-pointer group`}>
                  
                  <div className="h-full p-6 flex flex-col text-white">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-white/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <FileText className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-display font-bold">{paper.title}</h3>
                    </div>
                    
                    <div className="mt-auto space-y-2">
                      <div className="flex items-center text-white/80">
                        <Book className="h-5 w-5 mr-2" />
                        <span>{paper.journal}</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>{paper.date}</span>
                      </div>
                      
                      <div className="pt-4 flex justify-center">
                        <span className="flex items-center text-sm text-white/90 animate-pulse">
                          Click to flip <ChevronUp className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative emoji */}
                  <div className="absolute top-4 right-4 text-2xl opacity-50 group-hover:opacity-80 
                                 group-hover:scale-150 transition-all duration-500">
                    {paper.emoji}
                  </div>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                    <div className="absolute transform rotate-45 bg-white/10 w-16 h-16 top-[-32px] left-[-32px]"></div>
                  </div>
                </div>
                
                {/* Back of Card */}
                <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden 
                  border shadow-xl bg-white/95 dark:bg-background/95 cursor-pointer flex flex-col p-6 group`}>
                  
                  <div className="flex items-center mb-3">
                    <Award className="h-5 w-5 mr-2 text-primary animate-bounce-slight" />
                    <h3 className="text-xl font-display font-bold">{paper.title}</h3>
                  </div>
                  
                  <div className="flex-grow">
                    <p className="text-muted-foreground">{paper.abstract}</p>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                    <a 
                      href={paper.link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 flex items-center
                               group-hover:scale-105 transition-transform duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Read Paper <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                    
                    <span className="flex items-center text-sm text-muted-foreground">
                      Back <ChevronDown className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-3 right-3 opacity-20">{paper.emoji}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchPapers;

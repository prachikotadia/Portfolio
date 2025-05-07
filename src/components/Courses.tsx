
import { useState, useEffect } from 'react';
import { Calendar, ExternalLink, BookOpen, Award, Gift } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Courses = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { toast } = useToast();
  
  const courses = [
    {
      title: "Advanced React Development",
      about: "In-depth React concepts with modern patterns and state management techniques",
      year: "2022",
      skills: ["React Hooks", "Context API", "Redux", "React Router", "Next.js"],
      color: "from-purple-500/20 to-pink-500/20",
      icon: <Gift className="h-6 w-6 text-purple-500" />
    },
    {
      title: "The Complete JavaScript Course",
      about: "Comprehensive JavaScript from fundamentals to advanced concepts",
      year: "2021",
      skills: ["ES6+", "Asynchronous JS", "OOP", "Functional Programming", "Modern JS Development"],
      color: "from-amber-500/20 to-yellow-500/20",
      icon: <BookOpen className="h-6 w-6 text-amber-500" />
    },
    {
      title: "TypeScript: The Complete Developer's Guide",
      about: "Deep dive into TypeScript with practical examples and applications",
      year: "2022",
      skills: ["TypeScript Basics", "Types & Interfaces", "Generics", "Type Guards", "Advanced Types"],
      color: "from-blue-500/20 to-sky-500/20",
      icon: <Award className="h-6 w-6 text-blue-500" />
    },
    {
      title: "CSS Flexbox & Grid Mastery",
      about: "Modern CSS layout techniques for responsive designs",
      year: "2021",
      skills: ["Flexbox Layouts", "CSS Grid", "Responsive Design", "Modern CSS", "CSS Variables"],
      color: "from-green-500/20 to-emerald-500/20",
      icon: <BookOpen className="h-6 w-6 text-green-500" />
    },
    {
      title: "UI/UX Design Fundamentals",
      about: "Creating user-centered designs with focus on usability and accessibility",
      year: "2023",
      skills: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Accessibility"],
      color: "from-red-500/20 to-rose-500/20",
      icon: <Award className="h-6 w-6 text-red-500" />
    }
  ];

  // Show a fun toast when a course card is clicked
  const handleCardClick = (index: number) => {
    toast({
      title: `🎉 ${courses[index].title}`,
      description: "That's an awesome course you've completed!",
      duration: 3000,
    });
  };

  return (
    <section id="courses" className="py-20 bg-gradient-to-b from-muted/30 to-background/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r from-blue-300/20 to-teal-300/20 blur-3xl"></div>
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-primary/10 animate-float"
          style={{
            width: `${Math.random() * 40 + 10}px`,
            height: `${Math.random() * 40 + 10}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 5}s`
          }}
        ></div>
      ))}
      
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4 text-gradient relative inline-block">
            Courses & Training
            <span className="absolute -right-4 -top-2 animate-bounce-slight" style={{ animationDelay: '0.5s' }}>🎓</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and professional development I've pursued.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div 
                key={index}
                className="opacity-0 animate-hover"
                data-animate="fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => handleCardClick(index)}
              >
                <div className={`h-full rounded-xl p-6 bg-gradient-to-br ${course.color} 
                  border border-border shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl
                  group cursor-pointer`}>
                  
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-full bg-background/50 mr-3 transition-all duration-300 group-hover:scale-110">
                      {course.icon}
                    </div>
                    <h3 className="text-xl font-display font-bold">{course.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{course.about}</p>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{course.year}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {course.skills.slice(0, 3).map((skill, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary
                                   transition-all duration-300 group-hover:bg-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                    {course.skills.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground
                                      transition-all duration-300 group-hover:bg-muted/80">
                        +{course.skills.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                    <div className="absolute transform rotate-45 bg-primary/10 text-primary w-16 h-16 top-[-32px] right-[-32px] flex items-end justify-start pb-1 pl-1">
                      <span className="text-xs">✨</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;

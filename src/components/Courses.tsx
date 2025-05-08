
import { useState, useEffect } from 'react';
import { Calendar, ExternalLink, BookOpen, Award, Gift } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Courses = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { toast } = useToast();
  
  const courses = [
    {
      title: "Data Structures & Algorithms",
      about: "Covered arrays, trees, sorting algorithms, and graph theory.",
      year: "2024",
      color: "from-green-500/20 to-blue-500/20",
      icon: <Gift className="h-6 w-6 text-green-500" />
    },
    {
      title: "Mobile Application and Development",
      about: "Explored tools and principles for designing and building mobile applications.",
      year: "2024",
      color: "from-orange-500/20 to-red-400/20",
      icon: <Award className="h-6 w-6 text-orange-500" />
    },
    {
      title: "Advanced Database Organization",
      about: "Focused on efficient data storage, retrieval, and indexing techniques.",
      year: "2024",
      color: "from-yellow-400/20 to-blue-400/20",
      icon: <BookOpen className="h-6 w-6 text-yellow-400" />
    },
    {
      title: "Software Project Management",
      about: "Learned project planning, scheduling, and team coordination for software projects.",
      year: "2024",
      color: "from-red-500/20 to-yellow-500/20",
      icon: <Award className="h-6 w-6 text-red-500" />
    },
    {
      title: "Big Data Technology",
      about: "Handled large-scale data sets and processing with big data frameworks.",
      year: "2024",
      color: "from-blue-500/20 to-green-400/20",
      icon: <Gift className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Computer Networks",
      about: "Studied OSI model, TCP/IP, routing, and communication protocols.",
      year: "2023",
      color: "from-cyan-500/20 to-teal-400/20",
      icon: <BookOpen className="h-6 w-6 text-cyan-500" />
    },
    {
      title: "Software Engineering",
      about: "Understood software development principles and engineering methodologies.",
      year: "2024",
      color: "from-emerald-500/20 to-lime-400/20",
      icon: <Award className="h-6 w-6 text-emerald-500" />
    },
    {
      title: "Web Application",
      about: "Built web-based applications using modern frontend/backend technologies.",
      year: "2024",
      color: "from-indigo-500/20 to-sky-400/20",
      icon: <Gift className="h-6 w-6 text-indigo-500" />
    },
    {
      title: "Science of Programming",
      about: "Learned foundational programming concepts and techniques.",
      year: "2024",
      color: "from-blue-500/20 to-indigo-400/20",
      icon: <Award className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Data Preparation and Analysis",
      about: "Worked on manipulating and transforming data for analysis and insights.",
      year: "2025",
      color: "from-green-500/20 to-teal-300/20",
      icon: <BookOpen className="h-6 w-6 text-green-500" />
    },
    {
      title: "Software Quality Management",
      about: "Focused on SDLC, testing methods, and quality assurance practices.",
      year: "2024",
      color: "from-amber-400/20 to-yellow-400/20",
      icon: <Award className="h-6 w-6 text-amber-400" />
    }
  ];

  // Show a fun toast when a course card is clicked
  const handleCardClick = (index: number) => {
    toast({
      title: `🎉 ${courses[index].title}`,
      description: "This course I've completed!",
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
            Courses
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

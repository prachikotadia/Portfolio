
import { useEffect } from 'react';
import { GraduationCap, BookOpen, Calendar, MapPin, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Education = () => {
  const educations = [
    {
      degree: "Master's in Computer Science",
      institution: "Illinois Institute of Technology",
      location: "Chicago, IL, USA",
      date: "August 2023 - May 2025",
      description:
        "Coursework includes Mobile App Development, Advanced Databases, Software Engineering, and Science of Programming. Focused on full-stack systems and cloud-native solutions.",
      color: "from-purple-500/40 to-indigo-500/40",
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      image:
        "https://www.diamondvogel.com/shop/powder/sites/shop.powder/files/styles/product_first/public/images/products/BrightRed.jpg?itok=Wk7L3yfY",
      website: "https://www.iit.edu/"
    },
    {
      degree: "Bachelor of Technology in Electronics and Communication",
      institution: "Charotar University of Science and Technology",
      location: "Gujarat, India",
      date: "August 2019 - May 2023",
      description:
       "Gained comprehensive knowledge in electronic circuit design, embedded systems, signal processing, and communication technologies. Developed strong analytical and problem-solving skills through hands-on lab work, technical projects, and interdisciplinary coursework.",
      color: "from-blue-500/40 to-cyan-500/40",
      icon: <BookOpen className="h-6 w-6 text-accent" />,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/21/Solid_black.svg",
      website: "https://www.charusat.ac.in/"
    }
  ];

  return (
    <section id="education" className="py-20 bg-gradient-to-b from-background/50 to-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">Education</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and qualifications.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {educations.map((edu, index) => (
            <div 
              key={index}
              className="relative rounded-xl overflow-hidden shadow-xl opacity-0 transform"
              data-animate="fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={edu.image} 
                  alt={edu.degree} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${edu.color} backdrop-blur-sm opacity-90`}></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-full bg-background/30 backdrop-blur-sm mr-4 shadow-lg">
                    {edu.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">{edu.degree}</h3>
                </div>
                
                <div className="space-y-4 text-white">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 mr-3 text-white/80" />
                    <span className="font-medium">{edu.institution}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-white/80" />
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-white/80" />
                    <span>{edu.date}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-white/90 mb-4">{edu.description}</p>
                  
                  <Button 
                    variant="outline" 
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={() => window.open(edu.website, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit University Website
                  </Button>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-white/30 rounded-tr-xl"></div>
                <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-white/30 rounded-bl-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

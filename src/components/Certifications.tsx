import { useState, useEffect } from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Certifications = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const certifications = [
    {
      title: "Crash Course on Python",
      organization: "Google (Coursera)",
      credentialLink: "https://coursera.org/verify/LHGQ1SX2M40N",
      skills: ["Python Basics", "Control Structures", "Loops", "Functions"],
      color: "from-yellow-300/20 to-blue-300/20",
      logo: "https://www.svgrepo.com/show/303108/google-icon-logo.svg"
    },
    {
      title: "Coding Interview Preparation",
      organization: "Meta (Coursera)",
      credentialLink: "https://coursera.org/verify/B6DU13XTR6AT",
      skills: ["Data Structures", "Algorithms", "Interview Strategy", "Problem Solving"],
      color: "from-purple-500/20 to-pink-400/20",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
    },
    {
      title: "Foundations: Data, Data, Everywhere",
      organization: "Google (Coursera)",
      credentialLink: "https://coursera.org/verify/7NEFJ74GA66B",
      skills: ["Data Analysis", "Data Lifecycle", "Business Intelligence", "Visualization"],
      color: "from-green-300/20 to-blue-400/20",
      logo: "https://www.svgrepo.com/show/303108/google-icon-logo.svg"
    },
    {
      title: "Foundations of Project Management",
      organization: "Google (Coursera)",
      credentialLink: "https://coursera.org/verify/5TH1FGFD1ZHJ",
      skills: ["Project Planning", "Stakeholder Management", "Agile", "Scrum"],
      color: "from-red-400/20 to-amber-300/20",
      logo: "https://www.svgrepo.com/show/303108/google-icon-logo.svg"
    },
    {
      title: "Foundations of User Experience (UX) Design",
      organization: "Google (Coursera)",
      credentialLink: "https://coursera.org/verify/BPE6U7LVW7RM",
      skills: ["UX Principles", "Accessibility", "Design Thinking", "Wireframing"],
      color: "from-pink-400/20 to-indigo-300/20",
      logo: "https://www.svgrepo.com/show/303108/google-icon-logo.svg"
    },
    {
      title: "Technical Support Fundamentals",
      organization: "Google (Coursera)",
      credentialLink: "https://coursera.org/verify/D15A5AY8QXSO",
      skills: ["Computer Hardware", "Networking", "Troubleshooting", "Linux"],
      color: "from-teal-400/20 to-blue-400/20",
      logo: "https://www.svgrepo.com/show/303108/google-icon-logo.svg"
    },
    {
      title: "The Data Scientist’s Toolbox",
      organization: "Johns Hopkins University (Coursera)",
      credentialLink: "https://coursera.org/verify/NSRORKMUYQG2",
      skills: ["R Programming", "Data Science Workflow", "Version Control", "GitHub"],
      color: "from-blue-300/20 to-indigo-400/20",
      logo: "https://commons.wikimedia.org/wiki/File:Echo_link-blue_icon_slanted.svg#/media/File:Echo_link-blue_icon.svg"
    },
    {
      title: "What is Data Science?",
      organization: "IBM (Coursera)",
      credentialLink: "https://coursera.org/verify/6ZVETUKCLJDI",
      skills: ["Data Science Basics", "Big Data", "Business Use Cases", "Analytics"],
      color: "from-blue-500/20 to-cyan-300/20",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
    },
    {
      title: "Amazon DynamoDB Service Introduction",
      organization: "Amazon Web Services",
      credentialLink: "",
      skills: ["NoSQL", "DynamoDB", "AWS Cloud", "Key-Value Databases"],
      color: "from-yellow-400/20 to-orange-300/20",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
    }
  ];

  // Auto shuffle effect
  useEffect(() => {
    const id = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * certifications.length);
      setActiveIndex(randomIndex);
      setTimeout(() => setActiveIndex(null), 2000);
    }, 5000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    if (!intervalId) {
      const id = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * certifications.length);
        setActiveIndex(randomIndex);
        setTimeout(() => setActiveIndex(null), 2000);
      }, 5000);
      setIntervalId(id);
    }
  };

  return (
    <section id="certifications" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">Professional Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry credentials and certifications that validate my expertise.
          </p>
        </div>

        <div className="max-w-6xl mx-auto perspective-1000">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={cn(
                  "h-80 w-full opacity-100", // changed from opacity-0
                  "relative preserve-3d transition-all duration-700"
                )}
                style={{
                  transform: activeIndex === index ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Front */}
                <Card className={cn(
                  "absolute inset-0 backface-hidden",
                  `bg-gradient-to-br ${cert.color} border border-white/10`,
                  "rounded-xl overflow-hidden shadow-lg hover:shadow-xl",
                  "flex flex-col p-6"
                )}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-display font-bold mb-1">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">{cert.organization}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/90 rounded-full p-2 flex items-center justify-center">
                      <img src={cert.logo} alt={cert.organization} className="max-w-full max-h-full" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {cert.credentialLink && (
                    <a
                      href={cert.credentialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm font-semibold text-black bg-[#00f1e] px-3 py-1.5 rounded-md 
                        hover:scale-105 transition-transform w-max"
                    >
                      Click here
                    </a>
                  )}
                </div>

                </Card>

                {/* Back */}
                <Card className={cn(
                  "absolute inset-0 backface-hidden rotate-y-180",
                  "bg-card text-card-foreground rounded-xl overflow-hidden shadow-lg flex flex-col p-6"
                )}>
                  <div className="flex flex-col mb-6">
                    <h3 className="text-lg font-display font-bold mb-1">{cert.title}</h3>
                    <p className="text-sm text-primary">{cert.organization}</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {cert.skills.map((skill, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>

                  {cert.credentialLink && (
                    <a
                      href={cert.credentialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto text-sm flex items-center justify-center py-2 px-4 rounded-lg
                        bg-[#22ff7e] text-black font-semibold hover:scale-105 transition-transform"
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;

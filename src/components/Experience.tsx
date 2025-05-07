
import { Calendar, Briefcase, Award, MapPin } from 'lucide-react';
import { useState } from 'react';

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const experiences = [
    {
      title: "Research Assistant – Microservices Performance Analysis",
      company: "Illinois Institute of Technology",
      location: "Chicago, IL, USA",
      date: "Apr 2025 – Present",
      description: "Analyzing the performance of microservices built using various programming languages and deployment patterns, with a focus on benchmarking scalability, latency, and efficiency across architectures.",
      icon: <Briefcase className="h-3 w-3 text-primary" />,
      skills: ["Microservices", "Benchmarking", "Containers", "System Design", "Cloud-native"],
      achievements: [
        "Researched the impact of different programming languages (Python, Go, Java, Rust) on microservice performance, focusing on execution speed, CPU usage, and memory overhead.",
        "Designed a containerized testing framework using Docker Compose to deploy and isolate services across test environments.",
        "Built automated scripts to benchmark API response time, request throughput, and failure recovery latency under load.",
        "Visualized collected metrics using Prometheus and Grafana dashboards to analyze trends and identify bottlenecks.",
        "Contributed to academic documentation with recommendations for language selection in cloud-native architectures."
      ]      
    },
    
    {
      title: "Web Developer Intern",
      company: "GroupedIn",
      location: "New Jersey, USA (Remote)",
      date: "Sep 2024 – Dec 2024",
      description: "Built and optimized a full-stack expense management system using AWS Lambda, DynamoDB, and React.js, focused on performance, scalability, and secure user authentication.",
      icon: <Briefcase className="h-3 w-3 text-primary" />,
      skills: ["React.js", "AWS Lambda", "DynamoDB", "CI/CD", "API Gateway", "GitHub Actions"],
      achievements: [
        "Developed and deployed a responsive expense management platform using a full-stack serverless architecture on AWS.",
        "Reduced API response latency by 40% by leveraging DynamoDB auto-scaling and optimized Lambda functions.",
        "Designed frontend in React.js with dynamic data visualization and seamless AWS integration using Amplify.",
        "Integrated AWS Cognito for secure authentication, managing user sessions and password policies.",
        "Built CI/CD pipelines using GitHub Actions to automate deployment and testing workflows across environments.",
        "Collaborated within an Agile team, participating in sprint reviews, daily standups, and cross-functional development."
      ]      
    },
    {
      title: "Software Developer Intern",
      company: "GroupedIn",
      location: "New Jersey, USA (Remote)",
      date: "Jun 2024 – Aug 2024",
      description: "Worked on scalable RESTful API systems using Python, Flask, and PostgreSQL. Focused on performance tuning, Docker-based deployments, and open-source collaboration.",
      icon: <Briefcase className="h-3 w-3 text-primary" />,
      skills: ["Python", "Flask", "PostgreSQL", "MongoDB", "Docker", "Open Source"],
      achievements: [
        "Created scalable RESTful APIs using Flask and PostgreSQL for internal analytics tools with 5,000+ user reach.",
        "Wrote complex SQL queries, achieving a 20% reduction in query latency and enhancing backend responsiveness.",
        "Integrated dual-database architecture using MongoDB for flexible data ingestion and PostgreSQL for relational querying.",
        "Participated in peer code reviews, debugging sessions, and feature design discussions in open-source Slack channels.",
        "Dockerized microservices with clean environment variables and production-ready containers for deployment efficiency.",
        "Used Git and GitHub for team collaboration, maintaining high code quality and clear version control."
      ]
      
    },
    {
      title: "Research Intern – Computational Antenna Design",
      company: "CHARUSAT",
      location: "Gujarat, India",
      date: "Jun 2022 – Jul 2022",
      description: "Worked on design optimization of circularly polarized antennas using computational modeling, simulation, and algorithm-based data tuning.",
      icon: <Briefcase className="h-3 w-3 text-primary" />,
      skills: ["Antenna Design", "Data Modeling", "RF Systems", "Simulation", "Optimization"],
      achievements: [
        "Developed scripts to automate parameter tuning for antenna optimization",
        "Applied algorithmic modeling to optimize bandwidth, gain, and axial ratio",
        "Enhanced understanding of RF and wireless system design"
      ]
    },
    {
      title: "Software Engineer Intern",
      company: "Ekarshi OpenSource Foundation",
      location: "Ahmedabad, Gujarat, India",
      date: "Jun 2020 – Oct 2020",
      description: "Worked on core programming concepts, evaluating new software designs for memory optimization, data structures, and function efficiency.",
      icon: <Briefcase className="h-3 w-3 text-primary" />,
      skills: ["C++", "Algorithms", "Memory Management", "Design Analysis"],
      achievements: [
        "Explored advanced concepts in memory allocation and function calls",
        "Contributed to functional modules in open-source codebases",
        "Improved understanding of efficient coding practices and code refactoring"
      ]
    }        
  ];

  const handleScroll = (index: number) => {
    const elements = document.querySelectorAll('.timeline-item');
    if (elements[index]) {
      elements[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="experience" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">Professional Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey that has shaped my skills and expertise.
          </p>
        </div>
        
        {/* Quick nav for experiences */}
        <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
          {experiences.map((item, i) => (
            <button 
              key={i}
              onClick={() => handleScroll(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeIndex === i 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                  : 'bg-primary/10 hover:bg-primary/20'}`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {item.company}
            </button>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-secondary/50 to-accent/50 rounded-full"></div>
            
            {experiences.map((item, i) => (
              <div 
                key={i} 
                className="timeline-item opacity-0" 
                style={{ animationDelay: `${i * 0.2}s` }}
                data-animate="fade-in-up"
              >
                <div className="timeline-dot group relative cursor-pointer"
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {item.icon}
                  <span className={`absolute -left-2 -top-2 w-9 h-9 rounded-full bg-primary/20 
                    scale-0 group-hover:scale-100 transition-transform duration-300 
                    animate-pulse-glow ${activeIndex === i ? 'scale-100' : ''}`}></span>
                </div>
                
                <div className="card-3d glass-card p-6 mb-8 opacity-90 hover:opacity-100 transition-all duration-300
                  hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
                  
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 relative z-10">
                    <h3 className="font-display font-bold text-lg group-hover:text-gradient transition-all duration-300">{item.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1 sm:mt-0">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3 relative z-10">
                    <p className="text-primary font-medium">{item.company}</p>
                    <span className="text-muted-foreground">•</span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 relative z-10">{item.description}</p>
                  
                  {/* Key Achievements */}
                  <div className="mb-4 relative z-10">
                    <h4 className="text-sm font-semibold mb-2">Key Achievements:</h4>
                    <ul className="space-y-1 pl-5 list-disc text-sm text-muted-foreground">
                      {item.achievements.map((achievement, j) => (
                        <li key={j} 
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ transitionDelay: `${j * 100}ms` }}
                        >
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {item.skills.map((skill, j) => (
                      <span 
                        key={j} 
                        className="px-2.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary
                          hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
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

export default Experience;

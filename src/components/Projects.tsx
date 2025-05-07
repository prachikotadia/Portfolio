
import { useState } from 'react';
import ProjectCard from './projects/ProjectCard';
import ProjectBackground from './projects/ProjectBackground';
import ProjectHeader from './projects/ProjectHeader';
import getProjects from './projects/projectsData';

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const projects = getProjects();

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <ProjectBackground />
      
      <div className="container relative z-10">
        <ProjectHeader />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

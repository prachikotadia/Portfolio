
import React from 'react';

const ProjectHeader = () => {
  return (
    <div className="text-center mb-16 group">
      <div className="inline-block relative hover:scale-105 transition-all duration-300 cursor-default">
        <h2 className="text-3xl font-display font-bold mb-4 relative z-10 group-hover:tracking-wider transition-all duration-500">
          <span className="text-gradient">My Projects</span>
        </h2>
        <div className="absolute -top-2 -right-6 text-2xl animate-bounce-slight group-hover:rotate-12 transition-transform duration-300">🚀</div>
      </div>
      <p className="text-muted-foreground max-w-2xl mx-auto group-hover:text-foreground transition-colors duration-300">
        A collection of my recent work showcasing my skills and experience.
      </p>
    </div>
  );
};

export default ProjectHeader;

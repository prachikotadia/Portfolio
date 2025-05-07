
import { Gift, Coffee, Heart, Star, Code, Award } from 'lucide-react';
import { ProjectType } from './types';
import React from 'react';

// Need to use createElement for the icons since we can't directly export JSX
const projectsData: Array<Omit<ProjectType, 'icon'> & { iconComponent: string; iconColor: string }> = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with authentication, product management, and payment processing.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.example.com",
    iconComponent: "Gift", 
    iconColor: "text-purple-400",
    emoji: "🛍️"
  },
  {
    title: "Task Management App",
    description: "A Kanban-style task management application with drag-and-drop functionality and team collaboration features.",
    tags: ["TypeScript", "React", "Firebase", "Tailwind"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/yourusername/task-management",
    liveUrl: "https://task-app-demo.example.com",
    iconComponent: "Coffee",
    iconColor: "text-amber-400",
    emoji: "✅"
  },
  {
    title: "Social Media Dashboard",
    description: "A responsive dashboard for social media analytics with real-time updates and visualizations.",
    tags: ["React", "D3.js", "GraphQL", "Material UI"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/yourusername/social-dashboard",
    liveUrl: "https://social-dashboard.example.com",
    iconComponent: "Heart",
    iconColor: "text-red-400",
    emoji: "📊"
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website with interactive elements and animations, showcasing my work and skills.",
    tags: ["React", "TailwindCSS", "Framer Motion", "Vite"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://yourportfolio.example.com",
    iconComponent: "Star",
    iconColor: "text-yellow-400",
    emoji: "🌟"
  },
  {
    title: "Weather Application",
    description: "A weather application that provides forecasts and real-time weather updates for locations worldwide.",
    tags: ["JavaScript", "React", "API", "Styled Components"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/yourusername/weather-app",
    liveUrl: "https://weather-app.example.com",
    iconComponent: "Code",
    iconColor: "text-blue-400",
    emoji: "☀️"
  },
  {
    title: "Movie Database",
    description: "A movie database application with search, filtering, and user reviews, powered by a public API.",
    tags: ["React", "Redux", "API", "CSS Modules"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/yourusername/movie-database",
    liveUrl: "https://movie-db.example.com",
    iconComponent: "Award",
    iconColor: "text-green-400",
    emoji: "🎬"
  }
];

// Function to get projects with proper icon components
export const getProjects = (): ProjectType[] => {
  const iconMap = {
    Gift,
    Coffee,
    Heart,
    Star,
    Code,
    Award
  };
  
  return projectsData.map(project => ({
    ...project,
    icon: React.createElement(iconMap[project.iconComponent as keyof typeof iconMap], { 
      className: `h-5 w-5 ${project.iconColor}` 
    })
  }));
};

export default getProjects;

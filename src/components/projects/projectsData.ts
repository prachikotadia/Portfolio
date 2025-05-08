
import { Gift, Coffee, Heart, Star, Code, Award } from 'lucide-react';
import { ProjectType } from './types';
import React from 'react';

// Need to use createElement for the icons since we can't directly export JSX
const projectsData: Array<Omit<ProjectType, 'icon'> & { iconComponent: string; iconColor: string }> = [
    {
      title: "Expense-Management-System",
      description: "A full-stack MERN application with authentication, dashboard, and expense tracking. Supports filtering, analytics, and custom user accounts.",
      tags: ["React", "TypeScript", "MongoDB", "Express", "Tailwind", "JWT"],
      image: "https://cdn.dribbble.com/userupload/30499941/file/original-458b40004252383cccdeec62be7d55b9.png?resize=1600x1200&vertical=center",
      githubUrl: "https://github.com/prachikotadia/Expense-Management-System---Full-Stack-Web-Application-",
      iconComponent: "Gift", 
      iconColor: "text-purple-400",
      emoji: "🛍️"
    },
    {
      title: "Task Management App",
      description: "Microservices-based task manager built with FastAPI, PostgreSQL, and JWT authentication. React frontend with CRUD operations and service orchestration.",
      tags: ["Javascript", "React", "FastAPI", "PostgreSQL", "Docker", "JWT"],
      image: "placeholder.svg",
      githubUrl: "https://github.com/prachikotadia/Task-Manager",
      iconComponent: "Coffee",
      iconColor: "text-amber-400",
      emoji: "✅"
    },
    {
      title: "Portfolio Website",
      description: "A beautifully animated, Apple-inspired personal portfolio built with React, TailwindCSS, and Framer Motion. Includes dark mode, theme switcher, and smooth transitions.",
      tags: ["React", "TailwindCSS", "Framer Motion", "Typecript"],
      image: "Screenshot 2025-05-08 164914.png",
      githubUrl: "https://github.com/prachikotadia/Portfolio",
      iconComponent: "Star",
      iconColor: "text-yellow-400",
      emoji: "🌟"
    },
    {
      title: "Stack-Overflow-Q-A-Data-Storage-Analysis",
      description: "Data engineering project focused on storing and analyzing Q&A data from Stack Overflow using SQL, MongoDB, and data transformation techniques.",
      tags: ["SQL", "MongoDB", "Data Cleaning", "EDA", "Python"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU2CDwDpGBY12uA8COchuX0TAgrQCb9xgttL2yhjqDzA&s&ec=72940542",
      githubUrl: "https://github.com/prachikotadia/Stack-Overflow-Q-A-Data-Storage-Analysis",
      iconComponent: "Award",
      iconColor: "text-green-400",
      emoji: "📊"
    },
    {
      title: "Content Management System",
      description: "A CMS with admin login, content creation, article previews, and page management. Built using PHP, Bootstrap, and MySQL.",
      tags: ["Python", "MySQL", "Bootstrap", "Admin Panel"],
      image: "https://media.istockphoto.com/id/2153797382/video/glowing-blue-command-prompt-icon.jpg?s=640x640&k=20&c=VUdLQrdDbXVuYCTlMVAPp1fubG_6Db16Tf3cuaeweBo=",
      githubUrl: "https://github.com/prachikotadia/Content_Management_System-",
      iconComponent: "Award",
      iconColor: "text-green-400",
      emoji: "📝"
    },
    {
      title: "News Mobile Application",
      description: "A React Native mobile app displaying real-time news using NewsAPI. Features category-based filtering and light/dark theme toggle.",
      tags: ["Flutter", "NewsAPI", "Styled Components", "Expo"],
      image: "https://litslink.com/wp-content/uploads/2023/10/Breaking-News-at-Your-Fingertips-How-to-Build-Your-Own-News-App.png",
      githubUrl: "https://github.com/prachikotadia/News_App",
      iconComponent: "Code",
      iconColor: "text-blue-400",
      emoji: "📰"
    },
    {
      title: "Battleship Mobile Application",
      description: "A React Native mobile version of the Battleship game with drag-and-drop ships, turn-based logic, and multiplayer local support.",
      tags: ["Flutter", "Game Logic", "Expo", "JavaScript"],
      image: "https://cdn.dribbble.com/userupload/3932633/file/original-e824b8cc40540e11397c5b5af105ad40.png?resize=1600x1200&vertical=center",
      githubUrl: "https://github.com/prachikotadia/BattleshipApp",
      iconComponent: "Award",
      iconColor: "text-green-400",
      emoji: "🚢"
    },
    {
      title: "Flashcards Mobile Application",
      description: "A mobile flashcard quiz app built with React Native, using Redux for state management and local storage for data persistence.",
      tags: ["Flutter", "Redux", "AsyncStorage", "Quiz App"],
      image: "https://images.prismic.io/edapp-website/Z1Z3OJbqstJ98Nfz_flashcard-maker.png?auto=format,compress&rect=0,2,1200,627&w=1200&h=627",
      githubUrl: "https://github.com/prachikotadia/Flashcards_App",
      iconComponent: "Award",
      iconColor: "text-green-400",
      emoji: "🧠"
    },
    {
      title: "Yahtzee Mobile Application",
      description: "A full Yahtzee dice game in mobile format built with React Native. Supports score tracking, re-rolls, and rule-based logic.",
      tags: ["Flutter", "Game Development", "Expo"],
      image: "Golden Dice iPhone Wallpaper HD.jpeg",
      githubUrl: "https://github.com/prachikotadia/YahtzeeApp",
      iconComponent: "Heart",
      iconColor: "text-red-400",
      emoji: "🎲"
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

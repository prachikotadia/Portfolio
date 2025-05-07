
import { useState } from 'react';
import { Calendar, Clock, ArrowRight, MessageCircle, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Blog = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const blogPosts = [
    {
      title: "Building Responsive UIs with Tailwind CSS",
      excerpt: "Learn how to create beautiful responsive interfaces with minimal CSS using the utility-first approach of Tailwind.",
      date: "May 15, 2023",
      readTime: "8 min read",
      category: "Frontend",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      comments: 12,
      likes: 45
    },
    {
      title: "State Management in React: Context API vs Redux",
      excerpt: "A comprehensive comparison of different state management approaches in React applications.",
      date: "April 22, 2023",
      readTime: "12 min read",
      category: "React",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      comments: 24,
      likes: 78
    },
    {
      title: "Getting Started with TypeScript in 2023",
      excerpt: "A beginner's guide to setting up and using TypeScript for your JavaScript projects.",
      date: "March 8, 2023",
      readTime: "10 min read",
      category: "TypeScript",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      comments: 8,
      likes: 32
    },
    {
      title: "The Power of GraphQL for Frontend Developers",
      excerpt: "Discover how GraphQL can simplify your API interactions and improve application performance.",
      date: "February 14, 2023",
      readTime: "15 min read",
      category: "GraphQL",
      image: "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      comments: 19,
      likes: 67
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-muted/20 to-background/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">From My Blog</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My thoughts, insights, and tutorials on web development and technology.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {blogPosts.map((post, index) => (
              <div 
                key={index}
                className="group opacity-0"
                data-animate="fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Card 
                  className="overflow-hidden border-0 shadow-lg transition-all duration-500 h-full
                  transform rotate-0 group-hover:-rotate-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500
                      scale-100 group-hover:scale-110"
                      style={{ backgroundImage: `url(${post.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/80 text-white">
                        {post.category}
                      </span>
                      <div className="flex items-center space-x-3 text-white/90">
                        <div className="flex items-center">
                          <MessageCircle className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">{post.comments}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">{post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-display font-bold mb-2 transition-colors duration-300
                      group-hover:text-primary">{post.title}</h3>
                    
                    <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{post.excerpt}</p>
                    
                    <div 
                      className="inline-flex items-center text-sm font-medium text-primary"
                    >
                      <span className="relative group-hover:mr-6 transition-all duration-300">
                        Read article
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300
                          group-hover:w-full"></span>
                      </span>
                      <ArrowRight 
                        className="h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-2
                        transition-all duration-300"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="#" 
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground
                shadow-md hover:shadow-lg hover:bg-primary/90 transition-all duration-300
                animate-pulse-glow"
            >
              <span>View all posts</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;

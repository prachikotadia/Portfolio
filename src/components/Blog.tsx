
import { useState } from 'react';
import { Calendar, Clock, ArrowRight, MessageCircle, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Blog = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const blogPosts = [
    {
      title: "Google Gemini Threat Reply: A Conversation With the Void",
      excerpt: "Is Gemini’s threat a one-off incident, or a warning sign that our relationship with AI needs a serious reset?",
      date: "February 22, 2025",
      readTime: "2 min read",
      category: "Frontend",
      link: "https://medium.com/@iprachikotadia/google-gemini-threat-reply-a-conversation-with-the-void-7929a0e845d9",
      image : "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*3v2yQWC53yo6P9P2.JPG",

    },
    {
      title: "The Easiest Way to Understand Data Structures and Algorithms: Visualize It!",
      excerpt: "The key to understanding algorithms is not just reading about them — it’s seeing them in action.",
      date: "February 23, 2025",
      readTime: "3 min read",
      category: "Computer Science",
      link: "https://medium.com/@iprachikotadia/the-easiest-way-to-understand-data-structures-and-algorithms-visualize-it-baa2f3e70f97",
      image : "https://miro.medium.com/v2/resize:fit:640/format:webp/0*Q08MjFYMKB-d3ECR.png"
    },
    {
      title: "Learn About Color Contrast in UI/UX Design: A Unique Approach",
      excerpt: "contrast isn’t just about what’s seen — it’s about what’s felt.",
      date: "February 21, 2025",
      readTime: "2 min read",
      category: "UI/UX Design",
      link: "https://medium.com/@iprachikotadia/learn-about-color-contrast-in-ui-ux-design-a-unique-approach-3b27f5f4d5a2",
      image : "https://miro.medium.com/v2/resize:fit:720/format:webp/0*TQW8xTDPARjEcO-5",
    },
    {
      title: "AI Will Not Replace You, But People Who Are Using AI Can!",
      excerpt: "AI is a companion, not a competitor.",
      date: "February 21, 2025",
      readTime: "2 min read",
      category: "Artificial Intelligence",
      link: "https://medium.com/@iprachikotadia/ai-will-not-replace-you-but-people-who-are-using-ai-can-d83d24a58990",
      image : "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*IzMqNqlCmarQAK6q",

    },
    {
      title: "Sophia Robot: A Woman Without a Heart",
      excerpt: "Sophia might be a woman without a heart, but her existence challenges the very nature of what it means to be alive.",
      date: "February 21, 2025",
      readTime: "2 min read",
      category: "AI & Robotics",
      link: "https://medium.com/@iprachikotadia/sophia-robot-a-woman-without-a-heart-ff1634939d26",
      image : "https://miro.medium.com/v2/resize:fit:720/format:webp/0*b0G5JXsKBC8hJLmQ.jpg",
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
                          <span className="text-xs">{}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">{}</span>
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
                    
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
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
                    </a>

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

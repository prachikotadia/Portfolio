
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="glass-card p-8 opacity-0" data-animate="fade-in-up">
            <h3 className="text-xl font-display font-bold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name" 
                  required
                  className="backdrop-blur-sm bg-white/5 border-primary/20 focus:border-primary/60 h-12"
                />
              </div>
              
              <div>
                <Input 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email" 
                  required
                  className="backdrop-blur-sm bg-white/5 border-primary/20 focus:border-primary/60 h-12"
                />
              </div>
              
              <div>
                <Input 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject" 
                  required
                  className="backdrop-blur-sm bg-white/5 border-primary/20 focus:border-primary/60 h-12"
                />
              </div>
              
              <div>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message" 
                  required
                  className="resize-none min-h-[120px] backdrop-blur-sm bg-white/5 border-primary/20 focus:border-primary/60"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="neon-button w-full group overflow-hidden h-12"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Send Message
                    <span className="absolute inset-0 w-0 bg-primary group-hover:w-full transition-all duration-300 -z-10"></span>
                  </>
                )}
              </Button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col justify-center opacity-0" data-animate="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mr-4">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-medium mb-1">Email</h4>
                  <a href="mailto:example@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                    example@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mr-4">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-medium mb-1">Phone</h4>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mr-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-medium mb-1">Location</h4>
                  <p className="text-muted-foreground">
                    San Francisco, California
                  </p>
                </div>
              </div>
            </div>
            
            {/* Social Media Floating Icons */}
            <div className="mt-12">
              <h4 className="font-display font-medium mb-5">Connect With Me</h4>
              <div className="flex space-x-4">
                {["github", "linkedin", "twitter", "instagram"].map((social, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 hover:scale-110 transition-all duration-300 animate-bounce-slight"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <span className="text-lg">{social[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

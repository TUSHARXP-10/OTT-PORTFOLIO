import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const About = () => {
  const navigate = useNavigate();

  const timelineData = [
    {
      period: "2024 – Present",
      title: "Freelance Full-Stack Developer", 
      description: "Building custom web applications and providing technical consulting"
    },
    {
      period: "2021 – 2023",
      title: "Self-Taught Developer Journey",
      description: "Mastered full-stack development through hands-on projects"
    },
    {
      period: "Ongoing",
      title: "Cybersecurity & Penetration Testing Expert",
      description: "Specialized in security audits and vulnerability assessments"
    }
  ];

  const skillsData = {
    "Frontend Development": ["React", "TypeScript", "Next.js", "Tailwind CSS", "React Three Fiber", "Framer Motion"],
    "Backend Development": ["Node.js", "Express.js", "GraphQL", "REST API", "MongoDB", "PostgreSQL"],
    "DevOps & Cloud": ["Docker", "Vercel", "GitHub Actions", "AWS", "CI/CD"],
    "Cybersecurity": ["Penetration Testing", "Burp Suite", "Kali Linux", "Security Audits"]
  };

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-netflix-black via-netflix-black/95 to-netflix-black/90 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-netflix-red to-red-600 rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl">
                TC
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 netflix-text-glow">
              Tushar R. Chandane
            </h1>
            
            <p className="text-xl md:text-2xl text-netflix-red font-medium mb-6">
              Full-Stack Developer & AI-dev
            </p>
            
            <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              I craft scalable digital experiences that transform your business vision into powerful, 
              secure web applications. Let's build something amazing together.
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-netflix-red" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-netflix-red" />
                <span>+91 9082301827</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-netflix-red" />
                <span>tusharchandane8@gmail.com</span>
              </div>
            </div>

            <div className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold">
              Available for freelance projects
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white/5 border-white/10 p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
            <p className="text-lg text-white/90 leading-relaxed text-center">
              I'm a passionate self-taught Full-Stack Developer and Cybersecurity Expert based in Mumbai, India. 
              Since 2021, I've been dedicated to building secure, innovative digital experiences that help businesses 
              grow and succeed in the digital landscape.
            </p>
          </Card>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Experience Timeline</h2>
          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <Card key={index} className="bg-white/5 border-white/10 p-6 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="text-netflix-red font-semibold text-sm whitespace-nowrap">
                    {item.period}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/80">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Expertise</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(skillsData).map(([category, technologies]) => {
              const icons = {
                "Frontend Development": "🎨",
                "Backend Development": "⚙️", 
                "DevOps & Cloud": "🚀",
                "Cybersecurity": "🔒"
              };
              
              return (
                <Card key={category} className="bg-white/5 border-white/10 p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl mb-4">{icons[category as keyof typeof icons]}</div>
                  <h3 className="text-xl font-semibold mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-xs bg-netflix-red/20 text-netflix-red rounded-full border border-netflix-red/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-br from-netflix-red/20 to-red-600/20 border-netflix-red/30 p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-lg text-white/90 mb-6">
              Ready to transform your business vision into powerful digital experiences? 
              Let's discuss your project and build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-netflix-red hover:bg-red-600 text-white font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View Projects
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
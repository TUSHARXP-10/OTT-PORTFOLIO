import { useAbout } from "@/hooks/useAbout";
import { MapPin, Phone, Mail, Code2, Shield, Cloud, Rocket, Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

const AboutSectionPortfolio = () => {
  const { data: about } = useAbout();

  if (!about) return null;

  const skillIcons: Record<string, any> = {
    "Frontend Development": Code2,
    "Backend Development": Rocket,
    "DevOps & Cloud": Cloud,
    "Cybersecurity": Shield,
  };

  return (
    <section id="about" className="relative scroll-mt-24 pt-8 mb-16">
      {/* Netflix-style Hero Banner for About */}
      <div className="relative h-auto min-h-[60vh] lg:min-h-[70vh]">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/60 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-transparent z-10"></div>
        
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--netflix-red)) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, hsl(var(--netflix-red)) 0%, transparent 50%)`
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-20 h-full flex items-center px-4 lg:px-12 py-16 lg:py-24">
          <div className="max-w-3xl animate-fade-in">
            {/* Profile Image */}
            {about.avatar && (
              <div className="mb-6">
                <img
                  src={about.avatar}
                  alt={about.name}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-netflix-red shadow-glow-red"
                />
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl lg:text-7xl font-bold text-white mb-4 netflix-text-glow">
              {about.name}
            </h1>

            {/* Status Badge */}
            {about.status && (
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/90 text-white text-sm font-semibold rounded-sm backdrop-blur-sm">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  {about.status}
                </span>
              </div>
            )}

            {/* Bio */}
            {about.bio && (
              <p className="text-base lg:text-xl text-netflix-text-primary mb-8 max-w-2xl leading-relaxed">
                {about.bio}
              </p>
            )}

            {/* Contact Info Row */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-netflix-text-secondary">
              {about.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-netflix-red" />
                  <span>{about.location}</span>
                </div>
              )}
              {about.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-netflix-red" />
                  <span>{about.phone}</span>
                </div>
              )}
              {about.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-netflix-red" />
                  <a href={`mailto:${about.email}`} className="hover:text-white transition-colors">
                    {about.email}
                  </a>
                </div>
              )}
            </div>

            {/* Netflix-style Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-white hover:bg-white/90 text-netflix-black font-semibold px-8 py-6 text-base rounded-sm"
                onClick={() => window.location.href = `mailto:${about.email}`}
              >
                <Play className="h-5 w-5 mr-2 fill-current" />
                Get In Touch
              </Button>
              <Button 
                className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-6 text-base rounded-sm backdrop-blur-sm border border-white/40"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Plus className="h-5 w-5 mr-2" />
                View Projects
              </Button>
              <Button 
                size="icon"
                className="bg-white/20 hover:bg-white/30 text-white rounded-full w-12 h-12 backdrop-blur-sm border border-white/40"
              >
                <ThumbsUp className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-float">
          <ChevronDown className="h-8 w-8 text-white/60" />
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-4 lg:px-12 -mt-8 relative z-30 space-y-12">
        {/* Timeline Section - Netflix Style */}
        {about.timeline && about.timeline.length > 0 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-6">
              My Journey
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {about.timeline.map((item, index) => (
                <div
                  key={index}
                  className="group netflix-card bg-netflix-dark/80 backdrop-blur-sm p-6 border border-white/10 hover:border-netflix-red/50 transition-all"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-netflix-red/20 text-netflix-red text-xs font-bold uppercase tracking-wider rounded-full border border-netflix-red/30">
                      {item.period}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-netflix-red transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-netflix-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-netflix-red/20 to-transparent rounded-bl-3xl"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section - Netflix Style Cards */}
        {about.skills && Object.keys(about.skills).length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-6">
              Technical Expertise
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(about.skills).map(([category, technologies], index) => {
                const Icon = skillIcons[category] || Code2;
                return (
                  <div
                    key={category}
                    className="group netflix-card bg-netflix-dark/80 backdrop-blur-sm p-8 border border-white/10 hover:border-netflix-red/50 transition-all relative overflow-hidden"
                  >
                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-netflix-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative z-10">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-netflix-red/20 rounded-lg group-hover:bg-netflix-red/30 transition-colors group-hover:animate-glow-pulse">
                          <Icon className="h-6 w-6 text-netflix-red" />
                        </div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-netflix-red transition-colors">
                          {category}
                        </h3>
                      </div>

                      {/* Technologies Grid */}
                      <div className="flex flex-wrap gap-2">
                        {(technologies as string[]).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1.5 bg-white/10 text-netflix-text-secondary rounded-sm hover:bg-netflix-red/20 hover:text-white hover:border-netflix-red/50 transition-all cursor-default border border-white/5 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Number badge */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-netflix-red/10 flex items-center justify-center border border-netflix-red/20">
                      <span className="text-netflix-red font-bold text-lg">
                        {(technologies as string[]).length}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Call to Action - Netflix Style */}
        <div className="animate-fade-in netflix-card bg-gradient-to-r from-netflix-red/20 via-netflix-red/10 to-transparent p-12 lg:p-16 border border-netflix-red/30 relative overflow-hidden" style={{ animationDelay: '0.3s' }}>
          <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 animate-netflix-shimmer"></div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 netflix-text-glow">
              Let's Create Something Amazing
            </h2>
            <p className="text-lg text-netflix-text-secondary mb-8">
              Ready to bring your ideas to life? Let's collaborate on your next project.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-netflix-red hover:bg-netflix-red-hover text-white font-semibold px-8 py-6 text-base rounded-sm shadow-glow-red"
                onClick={() => window.location.href = `mailto:${about.email}`}
              >
                <Mail className="h-5 w-5 mr-2" />
                Contact Me
              </Button>
              <Button 
                className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-6 text-base rounded-sm backdrop-blur-sm border border-white/40"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionPortfolio;

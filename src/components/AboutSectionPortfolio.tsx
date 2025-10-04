import { useAbout } from "@/hooks/useAbout";
import { MapPin, Phone, Mail, Code2, Shield, Cloud, Rocket, Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

const AboutSectionPortfolio = () => {
  const { data: about } = useAbout();

  const skillIcons: Record<string, any> = {
    "Frontend Development": Code2,
    "Backend Development": Rocket,
    "DevOps & Cloud": Cloud,
    "Cybersecurity": Shield,
  };

  // Always render the section wrapper so the ID exists for navigation
  if (!about) {
    return (
      <section id="about" className="relative scroll-mt-32 py-16 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto text-center py-16">
          <div className="text-6xl mb-6 animate-float">👤</div>
          <h2 className="text-3xl font-bold text-white mb-4">About Section</h2>
          <p className="text-netflix-text-secondary mb-8">
            Add your information in the Admin Panel to display your profile here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="relative scroll-mt-32 py-16 px-4 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Profile Information */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-netflix-dark/80 backdrop-blur-sm rounded-lg border border-white/10 p-8 space-y-6">
              {/* Profile Image */}
              {about.avatar && (
                <div className="flex justify-center">
                  <img
                    src={about.avatar}
                    alt={about.name}
                    className="w-64 h-64 object-cover rounded-lg border-4 border-white/10"
                  />
                </div>
              )}

              {/* Bio */}
              {about.bio && (
                <p className="text-base text-netflix-text-primary leading-relaxed">
                  {about.bio}
                </p>
              )}

              {/* Contact Information */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                {about.location && (
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-netflix-text-secondary font-medium">Location:</span>
                    <span className="text-white font-semibold">{about.location}</span>
                  </div>
                )}
                {about.phone && (
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-netflix-text-secondary font-medium">Phone:</span>
                    <span className="text-white font-semibold">{about.phone}</span>
                  </div>
                )}
                {about.email && (
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-netflix-text-secondary font-medium">Email:</span>
                    <a href={`mailto:${about.email}`} className="text-white font-semibold hover:text-netflix-red transition-colors">
                      {about.email}
                    </a>
                  </div>
                )}
                {about.status && (
                  <div className="flex items-center justify-between py-3">
                    <span className="text-netflix-text-secondary font-medium">Status:</span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 text-green-400 text-sm font-semibold rounded-sm border border-green-600/30">
                      {about.status}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Experience Timeline */}
          <div className="space-y-6">
            {about.timeline && about.timeline.length > 0 && (
              <>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-8">
                  Experience Timeline
                </h2>
                <div className="relative space-y-8">
                  {/* Vertical Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-cyan-400 to-transparent"></div>
                  
                  {about.timeline.map((item, index) => (
                    <div key={index} className="relative pl-8 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1.5 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 border-4 border-netflix-black shadow-lg"></div>
                      
                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">
                          {item.title}
                        </h3>
                        <div className="inline-block px-3 py-1 bg-netflix-red/20 text-netflix-red text-sm font-bold rounded-sm border border-netflix-red/30">
                          {item.period}
                        </div>
                        <p className="text-netflix-text-secondary leading-relaxed mt-3">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Skills Section - Full Width Below */}
        {about.skills && Object.keys(about.skills).length > 0 && (
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-8">
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
                        <div className="p-3 bg-netflix-red/20 rounded-lg group-hover:bg-netflix-red/30 transition-colors">
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

        {/* Call to Action */}
        <div className="mt-16 animate-fade-in netflix-card bg-gradient-to-r from-netflix-red/20 via-netflix-red/10 to-transparent p-12 lg:p-16 border border-netflix-red/30 relative overflow-hidden" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 bg-gradient-shine opacity-0 hover:opacity-100 animate-netflix-shimmer"></div>
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
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionPortfolio;

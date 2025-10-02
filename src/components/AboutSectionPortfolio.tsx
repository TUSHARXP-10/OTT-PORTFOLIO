import { useAbout } from "@/hooks/useAbout";
import { MapPin, Phone, Mail, Code2, Shield, Cloud, Rocket } from "lucide-react";

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
    <section id="about" className="px-4 lg:px-12 py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 netflix-text-glow">
            About Me
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-netflix-red to-netflix-red-dark rounded-full"></div>
        </div>

        {/* Profile Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Left - Avatar & Basic Info */}
          <div className="lg:col-span-1">
            <div className="netflix-card bg-netflix-dark/50 backdrop-blur-sm p-8 sticky top-24">
              {about.avatar ? (
                <img
                  src={about.avatar}
                  alt={about.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-netflix-red shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br from-netflix-red to-netflix-red-dark flex items-center justify-center text-4xl font-bold text-white">
                  {about.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                {about.name}
              </h3>
              
              {about.status && (
                <div className="text-center mb-6">
                  <span className="inline-block px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                    {about.status}
                  </span>
                </div>
              )}

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                {about.location && (
                  <div className="flex items-center gap-3 text-netflix-text-secondary">
                    <MapPin className="h-4 w-4 text-netflix-red" />
                    <span>{about.location}</span>
                  </div>
                )}
                {about.phone && (
                  <div className="flex items-center gap-3 text-netflix-text-secondary">
                    <Phone className="h-4 w-4 text-netflix-red" />
                    <span>{about.phone}</span>
                  </div>
                )}
                {about.email && (
                  <div className="flex items-center gap-3 text-netflix-text-secondary">
                    <Mail className="h-4 w-4 text-netflix-red" />
                    <a href={`mailto:${about.email}`} className="hover:text-white transition-colors">
                      {about.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Bio & Timeline */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            {about.bio && (
              <div className="netflix-card bg-netflix-dark/50 backdrop-blur-sm p-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">👋</span>
                  Introduction
                </h3>
                <p className="text-netflix-text-secondary leading-relaxed">
                  {about.bio}
                </p>
              </div>
            )}

            {/* Timeline */}
            {about.timeline && about.timeline.length > 0 && (
              <div className="netflix-card bg-netflix-dark/50 backdrop-blur-sm p-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  Experience Timeline
                </h3>
                <div className="space-y-6">
                  {about.timeline.map((item, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-netflix-red/30">
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-netflix-red"></div>
                      <div className="mb-1">
                        <span className="inline-block px-3 py-1 bg-netflix-red/20 text-netflix-red text-xs font-semibold rounded-full">
                          {item.period}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-netflix-text-secondary text-sm">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        {about.skills && Object.keys(about.skills).length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">💻</span>
              Technical Expertise
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(about.skills).map(([category, technologies]) => {
                const Icon = skillIcons[category] || Code2;
                return (
                  <div
                    key={category}
                    className="netflix-card bg-netflix-dark/50 backdrop-blur-sm p-6 group hover:bg-netflix-dark/70 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-netflix-red/20 rounded-lg group-hover:bg-netflix-red/30 transition-colors">
                        <Icon className="h-5 w-5 text-netflix-red" />
                      </div>
                      <h4 className="text-white font-semibold text-sm">
                        {category}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(technologies as string[]).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-white/10 text-netflix-text-secondary rounded hover:bg-white/20 hover:text-white transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSectionPortfolio;

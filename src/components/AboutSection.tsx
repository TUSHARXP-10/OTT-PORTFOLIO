import { Code, Zap, TrendingUp, Globe, Shield } from 'lucide-react';
import { useAbout } from '@/hooks/useAbout';

const AboutSection = () => {
  const { data: about } = useAbout();
  
  const skillsData = about?.skills as any || {};
  
  const skills = [
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Frontend Development',
      description: 'Expert in modern JavaScript frameworks and responsive design',
      technologies: skillsData['Frontend Development'] || ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Backend Development',
      description: 'Building scalable server-side applications and APIs',
      technologies: skillsData['Backend Development'] || ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL']
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'DevOps & Cloud',
      description: 'Deployment, automation, and cloud infrastructure management',
      technologies: skillsData['DevOps & Cloud'] || ['Docker', 'Vercel', 'AWS', 'CI/CD']
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Cybersecurity',
      description: 'Security audits, penetration testing, and vulnerability assessments',
      technologies: skillsData['Cybersecurity'] || ['Penetration Testing', 'Burp Suite', 'Kali Linux']
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-6">
            About <span className="text-netflix-red">{about?.name?.split(' ')[0] || 'Tushar'}</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground sm:text-xl leading-relaxed mb-6">
              {about?.bio || "I'm a passionate self-taught Full-Stack Developer and Cybersecurity Expert based in Mumbai, India. Since 2021, I've been dedicated to building secure, innovative digital experiences that help businesses grow and succeed in the digital landscape."}
            </p>
            {about?.location && (
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                <span>📍 {about.location}</span>
                <span>📧 {about.email}</span>
                <span>📱 {about.phone}</span>
              </div>
            )}
            <div className="inline-block bg-netflix-red/10 text-netflix-red px-4 py-2 rounded-full border border-netflix-red/20">
              {about?.status || 'Available for freelance projects'}
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <div 
              key={skill.title}
              className="group bg-gradient-card rounded-lg p-6 shadow-netflix transition-all duration-300 hover:shadow-card-hover hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-netflix-red mb-4 transition-transform duration-300 group-hover:scale-110">
                {skill.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {skill.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {skill.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {skill.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 text-xs bg-netflix-red/10 text-netflix-red rounded-full border border-netflix-red/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
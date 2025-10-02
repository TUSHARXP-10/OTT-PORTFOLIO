import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const profiles = [
  {
    id: 'recruiter',
    name: 'Recruiter',
    color: 'bg-cyan-500',
    description: 'Talent acquisition focused view'
  },
  {
    id: 'developer',
    name: 'Developer',
    color: 'bg-gray-500',
    description: 'Technical project showcase'
  },
  {
    id: 'stakeholder', 
    name: 'Stakeholder',
    color: 'bg-red-500',
    description: 'Business impact perspective'
  },
  {
    id: 'adventurer',
    name: 'Adventurer', 
    color: 'bg-orange-500',
    description: 'Creative projects & experiments'
  }
];

const ProfileSelection = () => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleProfileSelect = (profileId: string) => {
    setSelectedProfile(profileId);
    // Store selected profile in localStorage for persistence
    localStorage.setItem('selectedProfile', profileId);
    // Navigate to main portfolio with a slight delay for better UX
    setTimeout(() => {
      navigate('/portfolio');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--netflix-red)) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, hsl(var(--netflix-red)) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="max-w-6xl w-full text-center relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-12 lg:mb-20 netflix-text-glow animate-fade-in">
          Who's Watching?
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 justify-items-center px-4 animate-scale-in">
          {profiles.map((profile, index) => (
            <div
              key={profile.id}
              className="group cursor-pointer transition-all hover:scale-110 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProfileSelect(profile.id)}
            >
              <div className={`
                w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 ${profile.color} rounded-md mb-4 
                flex items-center justify-center shadow-netflix
                transition-all duration-300 group-hover:shadow-glow-red
                border-4 border-transparent
                ${selectedProfile === profile.id ? 'border-white scale-105' : 'group-hover:border-white/50'}
              `}>
                {/* Profile Icon/Face */}
                <div className="text-black/90 text-3xl md:text-4xl lg:text-5xl">
                  <div className="flex gap-2 md:gap-3 mb-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-black rounded-full"></div>
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-black rounded-full"></div>
                  </div>
                  <div className="w-6 h-3 md:w-8 md:h-4 border-2 border-black border-t-0 rounded-b-full mx-auto"></div>
                </div>
              </div>
              
              <h3 className="text-white text-base md:text-lg lg:text-xl font-medium group-hover:text-netflix-text-primary transition-colors">
                {profile.name}
              </h3>
              
              <p className="text-netflix-text-muted text-xs md:text-sm mt-1 max-w-[150px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {profile.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 lg:mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button 
            variant="outline" 
            className="bg-transparent border-netflix-gray text-netflix-text-secondary hover:border-white hover:text-white hover:bg-white/10 transition-all px-8 py-6 text-lg rounded-sm backdrop-blur-sm"
            onClick={() => navigate('/auth')}
          >
            Manage Profiles
          </Button>
        </div>
      </div>

      {/* Netflix branding footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-netflix-red/10 rounded-full border border-netflix-red/30 backdrop-blur-sm">
          <div className="w-6 h-6 bg-netflix-red rounded flex items-center justify-center">
            <span className="text-white font-black text-sm">N</span>
          </div>
          <span className="text-netflix-text-secondary text-sm">Portfolio Experience</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;
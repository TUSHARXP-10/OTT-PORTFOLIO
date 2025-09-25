import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, RefreshCw } from 'lucide-react';

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
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center p-4">
      {/* Top right icons */}
      <div className="fixed top-6 right-6 flex flex-col gap-4 text-white">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6" />
          <span className="text-2xl font-bold">21.9K</span>
        </div>
        <MessageCircle className="w-8 h-8 opacity-70" />
        <RefreshCw className="w-8 h-8 opacity-70" />
      </div>

      <div className="max-w-4xl w-full text-center">
        <h1 className="text-6xl font-bold text-white mb-16">
          Who's Watching?
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="group cursor-pointer transition-transform hover:scale-110"
              onClick={() => handleProfileSelect(profile.id)}
            >
              <div className={`
                w-32 h-32 md:w-40 md:h-40 ${profile.color} rounded-lg mb-4 
                flex items-center justify-center shadow-netflix
                transition-all duration-200 group-hover:shadow-card
                ${selectedProfile === profile.id ? 'ring-4 ring-white' : ''}
              `}>
                {/* Simple smiley face like in Netflix */}
                <div className="text-black text-4xl md:text-5xl">
                  <div className="flex gap-3 mb-2">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                  </div>
                  <div className="w-8 h-4 border-2 border-black border-t-0 rounded-b-full"></div>
                </div>
              </div>
              
              <h3 className="text-white text-lg font-medium group-hover:text-gray-300 transition-colors">
                {profile.name}
              </h3>
              
              <p className="text-gray-400 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {profile.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Button 
            variant="outline" 
            className="bg-transparent border-gray-600 text-gray-400 hover:border-white hover:text-white transition-colors"
            onClick={() => navigate('/auth')}
          >
            Manage Profiles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;
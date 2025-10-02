import { Home, TrendingUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/contexts/ProfileContext';
import { useNavigate } from 'react-router-dom';

const NetflixBottomNav = () => {
  const { selectedProfile } = useProfile();
  const navigate = useNavigate();

  const getProfileColor = (profile: string) => {
    switch (profile) {
      case 'recruiter': return 'bg-cyan-500';
      case 'developer': return 'bg-gray-500';
      case 'stakeholder': return 'bg-red-500';
      case 'adventurer': return 'bg-orange-500';
      default: return 'bg-netflix-red';
    }
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-netflix-black/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Button 
          variant="ghost" 
          className="flex flex-col items-center space-y-1 text-white hover:text-netflix-red transition-colors group"
          onClick={() => {
            navigate('/portfolio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Home className="h-6 w-6 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium">Home</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex flex-col items-center space-y-1 text-netflix-text-secondary hover:text-white transition-colors group"
          onClick={() => {
            navigate('/portfolio');
            setTimeout(() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        >
          <TrendingUp className="h-6 w-6 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-medium">Projects</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex flex-col items-center space-y-1 text-netflix-text-secondary hover:text-white transition-colors group"
          onClick={() => navigate('/')}
        >
          {selectedProfile ? (
            <div className={`w-7 h-7 ${getProfileColor(selectedProfile)} rounded-sm flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border-2 border-transparent group-hover:border-white/50`}>
              <div className="text-black text-xs">
                <div className="flex gap-1 mb-0.5">
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                </div>
                <div className="w-2 h-1 border border-black border-t-0 rounded-b-sm mx-auto"></div>
              </div>
            </div>
          ) : (
            <User className="h-6 w-6 group-hover:scale-110 transition-transform" />
          )}
          <span className="text-xs capitalize font-medium">{selectedProfile || 'Profile'}</span>
        </Button>
      </div>
    </div>
  );
};

export default NetflixBottomNav;
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-netflix-black border-t border-gray-800 px-4 py-2">
      <div className="flex items-center justify-around">
        <Button 
          variant="ghost" 
          className="flex flex-col items-center space-y-1 text-white hover:text-gray-300"
          onClick={() => navigate('/portfolio')}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex flex-col items-center space-y-1 text-gray-400 hover:text-gray-300"
          onClick={() => navigate('/portfolio#trending')}
        >
          <TrendingUp className="h-5 w-5" />
          <span className="text-xs">New & Hot</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex flex-col items-center space-y-1 text-gray-400 hover:text-gray-300"
          onClick={() => navigate('/')}
        >
          {selectedProfile ? (
            <div className={`w-6 h-6 ${getProfileColor(selectedProfile)} rounded flex items-center justify-center`}>
              <div className="text-black text-xs">
                <div className="flex gap-1 mb-0.5">
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                </div>
                <div className="w-2 h-1 border border-black border-t-0 rounded-b-sm"></div>
              </div>
            </div>
          ) : (
            <User className="h-5 w-5" />
          )}
          <span className="text-xs capitalize">{selectedProfile || 'Profile'}</span>
        </Button>
      </div>
    </div>
  );
};

export default NetflixBottomNav;
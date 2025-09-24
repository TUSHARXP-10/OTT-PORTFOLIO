import { Home, TrendingUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NetflixBottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-netflix-black border-t border-gray-800 px-4 py-2">
      <div className="flex items-center justify-around">
        <Button variant="ghost" className="flex flex-col items-center space-y-1 text-white hover:text-gray-300">
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Button>
        
        <Button variant="ghost" className="flex flex-col items-center space-y-1 text-gray-400 hover:text-gray-300">
          <TrendingUp className="h-5 w-5" />
          <span className="text-xs">New & Hot</span>
        </Button>
        
        <Button variant="ghost" className="flex flex-col items-center space-y-1 text-gray-400 hover:text-gray-300">
          <User className="h-5 w-5" />
          <span className="text-xs">My Netflix</span>
        </Button>
      </div>
    </div>
  );
};

export default NetflixBottomNav;
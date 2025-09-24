import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  FolderOpen, 
  User, 
  LogOut,
  Home,
  BarChart3,
  Layout as LayoutIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.',
    });
  };

  const navItems = [
    { to: '/admin', icon: BarChart3, label: 'Dashboard', exact: true },
    { to: '/admin/projects', icon: FolderOpen, label: 'Projects' },
    { to: '/admin/categories', icon: LayoutIcon, label: 'Categories' },
    { to: '/admin/about', icon: User, label: 'About' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Header */}
      <header className="bg-netflix-dark border-b border-netflix-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-netflix-red hover:text-netflix-red-hover transition-colors">
                <Home size={20} />
                <span className="font-semibold">Back to Portfolio</span>
              </Link>
              <div className="h-6 w-px bg-netflix-gray"></div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-netflix-text-secondary">
                Welcome, {user?.email}
              </span>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-netflix-gray text-netflix-text-secondary hover:text-white hover:border-netflix-red"
              >
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-netflix-dark border-r border-netflix-gray min-h-[calc(100vh-4rem)]">
          <div className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      isActive(item.to, item.exact)
                        ? 'bg-netflix-red text-white'
                        : 'text-netflix-text-secondary hover:text-white hover:bg-netflix-gray'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
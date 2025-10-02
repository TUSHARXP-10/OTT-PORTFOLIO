import { Search, Cast, User, X, Bell, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAbout } from '@/hooks/useAbout';
import { useSearchProjects } from '@/hooks/useSearchProjects';
import { useProfile } from '@/contexts/ProfileContext';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NetflixNavbar = () => {
  const { data: about } = useAbout();
  const { selectedProfile } = useProfile();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { data: searchResults = [] } = useSearchProjects(searchQuery);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchResultClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
    setSearchQuery('');
    setIsSearchOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchOpen || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          handleSearchResultClick(searchResults[selectedIndex].id);
        }
        break;
      case 'Escape':
        setIsSearchOpen(false);
        setSearchQuery('');
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <nav className={`fixed top-0 z-50 w-full px-4 lg:px-12 py-4 transition-all duration-300 ${
      isScrolled ? 'bg-netflix-black shadow-netflix' : 'bg-gradient-to-b from-netflix-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between">
        {/* Left - Netflix Logo + Navigation */}
        <div className="flex items-center space-x-8">
          {/* Back to Profile Selection */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-netflix-text-secondary transition-colors"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* Netflix Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-netflix-red text-white px-2 py-1 font-black text-xl tracking-tight">
              N
            </div>
            <h1 className="text-xl font-medium text-white hidden sm:block">
              {about?.name || 'Portfolio'} {selectedProfile && `• ${selectedProfile}`}
            </h1>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => {
                navigate('/portfolio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-white hover:text-netflix-text-secondary transition-colors text-sm font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => {
                navigate('/portfolio');
                setTimeout(() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-netflix-text-secondary hover:text-white transition-colors text-sm"
            >
              Projects
            </button>
            <button 
              onClick={() => {
                navigate('/portfolio');
                setTimeout(() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-netflix-text-secondary hover:text-white transition-colors text-sm"
            >
              About
            </button>
            <button 
              onClick={() => {
                navigate('/portfolio');
                setTimeout(() => {
                  document.getElementById('my-list')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-netflix-text-secondary hover:text-white transition-colors text-sm"
            >
              My List
            </button>
          </div>
        </div>

        {/* Right - Search, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {!isSearchOpen ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-netflix-text-secondary transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            ) : (
              <div className="flex items-center animate-scale-in">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Titles, genres, developers..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-64 lg:w-80 bg-netflix-dark/90 border-white/20 text-white placeholder:text-netflix-text-muted focus:border-white focus:bg-netflix-dark backdrop-blur-sm"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 text-white hover:text-netflix-text-secondary"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    setSelectedIndex(-1);
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            )}

            {/* Search Results Dropdown */}
            {isSearchOpen && searchQuery && (
              <div 
                ref={dropdownRef}
                className="absolute top-full right-0 mt-2 w-80 lg:w-96 bg-netflix-dark/95 border border-white/10 rounded-lg shadow-netflix backdrop-blur-xl z-50 max-h-80 overflow-y-auto animate-fade-in"
              >
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((project, index) => (
                      <button
                        key={project.id}
                        onClick={() => handleSearchResultClick(project.id)}
                        className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center space-x-3 ${
                          selectedIndex === index ? 'bg-white/10' : ''
                        }`}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-16 h-10 object-cover rounded netflix-card"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">
                            {project.title}
                          </p>
                          <p className="text-netflix-text-secondary text-sm truncate">
                            {project.categories?.name} • {project.status}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            {project.tags?.slice(0, 2).map((tag) => (
                              <span key={tag} className="text-xs text-netflix-text-muted bg-white/10 px-1.5 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="text-netflix-text-secondary">No projects found</p>
                    <p className="text-netflix-text-muted text-sm mt-1">Try different keywords</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="text-white hover:text-netflix-text-secondary transition-colors">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-netflix-red to-netflix-red-dark rounded flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NetflixNavbar;
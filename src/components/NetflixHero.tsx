import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Plus, Info, Volume2, VolumeX } from "lucide-react";
import { useCategories, useFeaturedProjects } from "@/hooks/useProjects";
import { useNavigate } from "react-router-dom";

const NetflixHero = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMuted, setIsMuted] = useState(true);
  const { data: categories = [] } = useCategories();
  const { data: featuredProjects = [] } = useFeaturedProjects();
  
  const featuredProject = featuredProjects[0];
  
  const categoryTabs = ['All', ...categories.map(cat => cat.name)];

  return (
    <>
      {/* Netflix-Style Category Pills */}
      <div className="fixed top-16 z-40 w-full bg-gradient-to-b from-netflix-black to-transparent px-4 py-4">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
          {categoryTabs.map((category) => (
            <button
              key={category}
              className={`rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-black/40 text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Netflix Hero Section */}
      <section className="relative min-h-[75vh] pt-24 overflow-hidden">
        {featuredProject ? (
          <>
            {/* Hero Background */}
            <div className="absolute inset-0">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover object-center scale-105"
              />
              
              {/* Netflix-style Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/90 via-netflix-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-netflix-black/20 via-transparent to-netflix-black/60" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex items-center min-h-[75vh] px-4 md:px-12">
              <div className="max-w-2xl space-y-6 animate-fade-in">
                {/* Netflix N Logo + Featured Badge */}
                <div className="flex items-center space-x-3">
                  <div className="bg-netflix-red text-white px-3 py-1 rounded text-sm font-bold tracking-wider">
                    N SERIES
                  </div>
                  {featuredProject.featured && (
                    <div className="netflix-badge-featured animate-glow-pulse">
                      ⭐ FEATURED
                    </div>
                  )}
                  {featuredProject.status === 'Live' && (
                    <div className="netflix-badge-live">
                      ● LIVE
                    </div>
                  )}
                </div>

                {/* Title with Netflix styling */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight netflix-text-glow">
                  {featuredProject.title}
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-netflix-text-secondary max-w-lg leading-relaxed">
                  {featuredProject.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tags?.slice(0, 4).map((tag) => (
                    <span key={tag} className="netflix-badge-category text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons - Netflix Style */}
                <div className="flex items-center space-x-4 pt-4">
                  <Button 
                    size="lg" 
                    className="netflix-btn-primary text-lg px-8 py-3 h-auto font-bold"
                    onClick={() => navigate(`/project/${featuredProject.id}`)}
                  >
                    <Play className="mr-3 h-6 w-6" fill="currentColor" />
                    View Project
                  </Button>
                  
                  <Button 
                    size="lg" 
                    className="netflix-btn-secondary text-lg px-6 py-3 h-auto font-semibold"
                    onClick={() => navigate(`/project/${featuredProject.id}`)}
                  >
                    <Info className="mr-3 h-5 w-5" />
                    More Info
                  </Button>
                </div>
              </div>
            </div>

            {/* Audio Control - Netflix Style */}
            <div className="absolute bottom-8 right-8 z-20">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-12 h-12 rounded-full border-2 border-white/60 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:border-white hover:bg-black/60 transition-all duration-200"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>

            {/* Category Badge */}
            <div className="absolute bottom-8 left-4 md:left-12 z-20">
              <div className="netflix-badge-category">
                {featuredProject.categories?.name}
              </div>
            </div>
          </>
        ) : (
          <div className="relative z-10 flex items-center justify-center min-h-[75vh] px-4">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="text-6xl animate-float mb-4">🎬</div>
              <h1 className="text-4xl md:text-6xl font-bold text-white netflix-text-glow">
                Coming Soon
              </h1>
              <p className="text-xl text-netflix-text-secondary max-w-md mx-auto">
                Featured projects will appear here. Add projects to your portfolio to get started.
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default NetflixHero;
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Plus, Info, Volume2, VolumeX, Heart } from "lucide-react";
import { useCategories } from "@/hooks/useProjects";
import { useActiveBanners } from "@/hooks/useBanners";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const NetflixHero = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMuted, setIsMuted] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: categories = [] } = useCategories();
  const { data: banners = [] } = useActiveBanners();
  
  const categoryTabs = ['All', ...categories.map(cat => cat.name)];

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  return (
    <>
      {/* Netflix-Style Category Pills */}
      <div className="fixed top-16 z-40 w-full bg-gradient-to-b from-netflix-black via-netflix-black/90 to-transparent px-2 sm:px-4 lg:px-12 py-2 sm:py-3 md:py-4">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide pb-1">
          {categoryTabs.slice(0, 8).map((category) => (
            <button
              key={category}
              className={`rounded-full px-3 sm:px-4 lg:px-5 py-1 sm:py-1.5 lg:py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
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

      {/* Cinematic Netflix Hero Carousel */}
      <section className="relative min-h-screen pt-16 overflow-hidden">
        {banners.length > 0 ? (
          <Carousel className="w-full h-full relative">
            <CarouselContent className="-ml-0">
              {banners.map((banner, index) => (
                <CarouselItem key={banner.id} className="pl-0 basis-full">
                  <Card className="border-0 rounded-none h-screen relative overflow-hidden">
                    {/* Hero Background */}
                    <div className="absolute inset-0">
                      <img
                        src={banner.image_url}
                        alt={banner.title}
                        className="w-full h-full object-cover object-center scale-105"
                      />
                      
                      {/* Cinematic Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/30" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
                      
                      {/* Glossy overlay effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 flex items-center justify-center min-h-screen px-4 md:px-16">
                      <div className="max-w-4xl text-center space-y-8 animate-fade-in">
                        {/* Netflix N Logo + Match Badge */}
                        <div className="flex items-center justify-center space-x-4 mb-6">
                          <div className="bg-netflix-red text-white px-4 py-2 rounded text-sm font-bold tracking-wider flex items-center gap-2">
                            <Heart className="h-4 w-4 animate-pulse text-white" />
                            N ORIGINALS
                          </div>
                          <div className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                            {banner.match_percentage}% Match
                          </div>
                          <div className="text-white/80 text-sm font-medium">
                            {banner.year} • {banner.rating} • {banner.genre}
                          </div>
                        </div>

                        {/* Cinematic Title with Elegant Serif Typography */}
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-serif font-bold text-white leading-tight netflix-text-glow">
                        {banner.title}
                      </h1>

                      {banner.subtitle && (
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/90 font-light">
                          {banner.subtitle}
                        </h2>
                      )}

                      {/* Description */}
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light px-4">
                        {banner.description}
                      </p>

                        {/* Floating Hearts Animation */}
                        <div className="absolute top-1/4 left-1/4 animate-bounce opacity-30">
                          <Heart className="h-8 w-8 text-netflix-red fill-netflix-red" />
                        </div>
                        <div className="absolute top-1/3 right-1/4 animate-pulse opacity-20" style={{ animationDelay: '1s' }}>
                          <Heart className="h-6 w-6 text-pink-400 fill-pink-400" />
                        </div>
                        <div className="absolute bottom-1/4 left-1/3 animate-bounce opacity-25" style={{ animationDelay: '2s' }}>
                          <Heart className="h-10 w-10 text-red-400 fill-red-400" />
                        </div>

                        {/* Action Buttons - Cinematic Style */}
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 pt-6 md:pt-8">
                          <Button 
                            size="lg" 
                            className="bg-white text-black hover:bg-white/90 text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-3 sm:py-4 h-auto font-bold rounded-lg shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                            onClick={() => navigate('/about')}
                          >
                            <Play className="mr-2 sm:mr-3 md:mr-4 h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7" fill="currentColor" />
                            Play
                          </Button>
                        
                        <Button 
                          size="lg" 
                          className="bg-white/20 text-white border-2 border-white/50 hover:bg-white/30 text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 h-auto font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                        >
                          <Info className="mr-2 sm:mr-3 md:mr-4 h-5 sm:h-6 md:h-6 w-5 sm:w-6 md:w-6" />
                          More Info
                        </Button>

                        <Button 
                          size="lg" 
                          className="bg-transparent border-2 border-netflix-red text-netflix-red hover:bg-netflix-red hover:text-white text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-8 py-3 sm:py-4 h-auto font-semibold rounded-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                        >
                          <Plus className="mr-2 sm:mr-3 md:mr-3 h-5 sm:h-6 md:h-6 w-5 sm:w-6 md:w-6" />
                          My List
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Controls */}
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/30 text-white hover:bg-black/70 w-14 h-14" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/30 text-white hover:bg-black/70 w-14 h-14" />
          
          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </Carousel>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-white text-xl">No active banners. Please add some in the admin panel.</p>
          </div>
        )}

        {/* Audio Control */}
        <div className="absolute bottom-8 right-8 z-20">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-14 h-14 rounded-full border-2 border-white/60 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:border-white hover:bg-black/60 transition-all duration-300"
          >
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </button>
        </div>
      </section>
    </>
  );
};

export default NetflixHero;
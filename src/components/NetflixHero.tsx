import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Plus, Info, Volume2, VolumeX, Heart } from "lucide-react";
import { useCategories, useFeaturedProjects } from "@/hooks/useProjects";
import { useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import romanticSlide1 from "@/assets/romantic-slide-1.jpg";
import romanticSlide2 from "@/assets/romantic-slide-2.jpg";
import romanticSlide3 from "@/assets/romantic-slide-3.jpg";

const NetflixHero = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMuted, setIsMuted] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: categories = [] } = useCategories();
  const { data: featuredProjects = [] } = useFeaturedProjects();
  
  const categoryTabs = ['All', ...categories.map(cat => cat.name)];
  
  const cinematicMovies = [
    {
      id: 1,
      title: "The Perfect Match",
      description: "When two hearts collide in the digital age, sparks fly in this modern romantic masterpiece.",
      image: romanticSlide1,
      matchPercentage: 97,
      genre: "Romantic Drama",
      year: 2024,
      rating: "PG-13"
    },
    {
      id: 2,
      title: "Lovable Hearts",
      description: "A tale of passion, dreams, and the courage to love against all odds.",
      image: romanticSlide2,
      matchPercentage: 94,
      genre: "Romance",
      year: 2024,
      rating: "PG"
    },
    {
      id: 3,
      title: "Forever Yours",
      description: "An epic love story that transcends time, space, and everything in between.",
      image: romanticSlide3,
      matchPercentage: 99,
      genre: "Epic Romance",
      year: 2024,
      rating: "PG-13"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cinematicMovies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [cinematicMovies.length]);

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

      {/* Cinematic Netflix Hero Carousel */}
      <section className="relative min-h-screen pt-16 overflow-hidden">
        <Carousel className="w-full h-full relative">
          <CarouselContent className="-ml-0">
            {cinematicMovies.map((movie, index) => (
              <CarouselItem key={movie.id} className="pl-0 basis-full">
                <Card className="border-0 rounded-none h-screen relative overflow-hidden">
                  {/* Hero Background */}
                  <div className="absolute inset-0">
                    <img
                      src={movie.image}
                      alt={movie.title}
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
                          {movie.matchPercentage}% Match
                        </div>
                        <div className="text-white/80 text-sm font-medium">
                          {movie.year} • {movie.rating} • {movie.genre}
                        </div>
                      </div>

                      {/* Cinematic Title with Elegant Serif Typography */}
                      <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-tight netflix-text-glow">
                        {movie.title}
                      </h1>

                      {/* Description */}
                      <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
                        {movie.description}
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
                      <div className="flex items-center justify-center space-x-6 pt-8">
                        <Button 
                          size="lg" 
                          className="bg-white text-black hover:bg-white/90 text-xl px-12 py-4 h-auto font-bold rounded-lg shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                          <Play className="mr-4 h-7 w-7" fill="currentColor" />
                          Play
                        </Button>
                        
                        <Button 
                          size="lg" 
                          className="bg-white/20 text-white border-2 border-white/50 hover:bg-white/30 text-xl px-10 py-4 h-auto font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
                        >
                          <Info className="mr-4 h-6 w-6" />
                          More Info
                        </Button>

                        <Button 
                          size="lg" 
                          className="bg-transparent border-2 border-netflix-red text-netflix-red hover:bg-netflix-red hover:text-white text-xl px-8 py-4 h-auto font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                        >
                          <Plus className="mr-3 h-6 w-6" />
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
            {cinematicMovies.map((_, index) => (
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
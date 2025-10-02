import NetflixNavbar from "@/components/NetflixNavbar";
import NetflixHero from "@/components/NetflixHero";
import ProjectCarousel from "@/components/ProjectCarousel";
import NetflixBottomNav from "@/components/NetflixBottomNav";
import AboutSectionPortfolio from "@/components/AboutSectionPortfolio";
import { Button } from "@/components/ui/button";
import { useCategories, useProjectsByCategory, useProjects, useMyListProjects } from "@/hooks/useProjects";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: categories = [] } = useCategories();
  const { data: allProjects = [] } = useProjects();
  const { data: myListProjects = [] } = useMyListProjects();
  const { user, isAdmin } = useAuth();
  
  // Get projects by category name for dynamic carousels
  const getProjectsForCategory = (categoryName: string) => {
    return allProjects.filter(project => project.categories?.name === categoryName);
  };

  return (
    <div className="min-h-screen bg-netflix-black pb-20">
      {/* Navigation */}
      <NetflixNavbar />
      
      {/* Hero Section */}
      <NetflixHero />
      
      {/* Content Sections */}
      <div className="relative z-10 -mt-32 lg:-mt-48">
        <div className="space-y-12 animate-fade-in">
        {/* Netflix Stats Section */}
        <div className="px-4 lg:px-12">
          <h2 className="mb-6 text-2xl font-semibold text-white">Portfolio Overview</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="netflix-card bg-gradient-to-br from-netflix-red/20 to-netflix-red-dark/20 p-6 text-center border border-netflix-red/20">
              <div className="text-3xl font-bold text-white mb-2">
                {allProjects.filter(p => p.status === 'Live').length}
              </div>
              <div className="text-sm text-netflix-text-secondary">Live Projects</div>
              <div className="text-xs text-netflix-text-muted mt-1">Production Ready</div>
            </div>
            <div className="netflix-card bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-6 text-center border border-yellow-500/20">
              <div className="text-3xl font-bold text-white mb-2">
                {allProjects.filter(p => p.status === 'In Progress').length}
              </div>
              <div className="text-sm text-netflix-text-secondary">In Development</div>
              <div className="text-xs text-netflix-text-muted mt-1">Coming Soon</div>
            </div>
            <div className="netflix-card bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 text-center border border-blue-500/20">
              <div className="text-3xl font-bold text-white mb-2">
                {allProjects.filter(p => p.featured).length}
              </div>
              <div className="text-sm text-netflix-text-secondary">Featured</div>
              <div className="text-xs text-netflix-text-muted mt-1">Editor's Choice</div>
            </div>
            <div className="netflix-card bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 text-center border border-green-500/20">
              <div className="text-3xl font-bold text-white mb-2">{categories.length}</div>
              <div className="text-sm text-netflix-text-secondary">Categories</div>
              <div className="text-xs text-netflix-text-muted mt-1">Diverse Skills</div>
            </div>
          </div>
        </div>

        {/* Netflix-Style Quick Actions */}
        <div className="px-4 lg:px-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Continue Watching</h2>
            <button className="text-netflix-text-secondary hover:text-white text-sm transition-colors">
              View All →
            </button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { icon: "🚀", label: "Live Projects", desc: "Production ready", color: "from-red-500 to-red-600" },
              { icon: "🛠️", label: "In Progress", desc: "Under development", color: "from-yellow-500 to-orange-500" },
              { icon: "⭐", label: "Featured", desc: "Editor's choice", color: "from-blue-500 to-purple-500" },
              { icon: "🏆", label: "Best Rated", desc: "Top performers", color: "from-green-500 to-emerald-600" }
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-48">
                <div className={`netflix-card bg-gradient-to-br ${item.color} p-6 h-32 flex flex-col justify-between group cursor-pointer`}>
                  <div className="flex items-start justify-between">
                    <span className="text-3xl group-hover:animate-float">{item.icon}</span>
                    <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.label}</p>
                    <p className="text-white/80 text-xs">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My List Section */}
        <div id="my-list" className="scroll-mt-20">
          {myListProjects.length > 0 && (
            <ProjectCarousel
              title="📌 My List"
              projects={myListProjects}
            />
          )}
        </div>

        {/* Projects Section */}
        <div id="projects" className="scroll-mt-20">
          {/* Netflix-Style Project Rows */}
          {allProjects.length > 0 && (
          <ProjectCarousel
            title="🔥 Trending Now"
            projects={allProjects.filter(p => p.featured).concat(allProjects.filter(p => !p.featured)).slice(0, 8)}
          />
        )}
        
        {/* Dynamic Category Carousels */}
        {categories.map((category) => {
          const categoryProjects = getProjectsForCategory(category.name);
          return categoryProjects.length > 0 ? (
            <ProjectCarousel
              key={category.id}
              title={`${category.icon || '📂'} ${category.name}`}
              projects={categoryProjects.slice(0, 8)}
            />
          ) : null;
        })}

        {/* Only on Netflix */}
        {allProjects.filter(p => p.status === 'Live').length > 0 && (
          <ProjectCarousel
            title="🏆 Only on This Portfolio"
            projects={allProjects.filter(p => p.status === 'Live').slice(0, 6)}
          />
        )}

        {/* Watch Again */}
        {allProjects.length > 6 && (
          <ProjectCarousel
            title="👁️ Watch Again"
            projects={allProjects.slice(-6)}
          />
        )}
        </div>

        {/* About Section */}
        <AboutSectionPortfolio />
        
        {/* Empty State */}
        {allProjects.length === 0 && (
          <div className="px-4 lg:px-12 py-16 text-center animate-fade-in">
            <div className="text-8xl mb-6 animate-float">🎬</div>
            <h2 className="text-3xl font-bold text-white mb-4 netflix-text-glow">Your Portfolio Awaits</h2>
            <p className="text-xl text-netflix-text-secondary max-w-md mx-auto mb-8">
              Add projects to your Supabase database to see them featured here in true Netflix style.
            </p>
            <div className="flex justify-center space-x-4">
              {user ? (
                isAdmin ? (
                  <Button asChild className="netflix-btn-primary">
                    <Link to="/admin">Admin Panel</Link>
                  </Button>
                ) : (
                  <Button className="netflix-btn-primary">Get Started</Button>
                )
              ) : (
                <>
                  <Button asChild className="netflix-btn-primary">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button className="netflix-btn-secondary">Learn More</Button>
                </>
              )}
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <NetflixBottomNav />
    </div>
  );
};

export default Index;

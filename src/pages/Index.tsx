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
      <div className="relative z-10 -mt-24 lg:-mt-32">
        <div className="space-y-8 lg:space-y-12 animate-fade-in">
        {/* Netflix Stats Section - Compact Cards */}
        <div className="px-4 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            <div className="netflix-card bg-gradient-to-br from-netflix-red/20 to-netflix-red-dark/20 p-3 sm:p-4 lg:p-6 text-center border border-netflix-red/20 group">
              <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                {allProjects.filter(p => p.status === 'Live').length}
              </div>
              <div className="text-xs sm:text-sm text-netflix-text-secondary">Live Projects</div>
            </div>
            <div className="netflix-card bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-3 sm:p-4 lg:p-6 text-center border border-yellow-500/20 group">
              <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                {allProjects.filter(p => p.status === 'In Progress').length}
              </div>
              <div className="text-xs sm:text-sm text-netflix-text-secondary">In Development</div>
            </div>
            <div className="netflix-card bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3 sm:p-4 lg:p-6 text-center border border-blue-500/20 group">
              <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">
                {allProjects.filter(p => p.featured).length}
              </div>
              <div className="text-xs sm:text-sm text-netflix-text-secondary">Featured</div>
            </div>
            <div className="netflix-card bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-3 sm:p-4 lg:p-6 text-center border border-green-500/20 group">
              <div className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">{categories.length}</div>
              <div className="text-xs sm:text-sm text-netflix-text-secondary">Categories</div>
            </div>
          </div>
        </div>

        {/* Netflix-Style Quick Actions */}
        <div className="px-4 lg:px-12">
          <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">Quick Access</h2>
          </div>
          
          <div className="flex gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { icon: "🚀", label: "Live Projects", desc: "Production ready", color: "from-red-500 to-red-600" },
              { icon: "🛠️", label: "In Progress", desc: "Under development", color: "from-yellow-500 to-orange-500" },
              { icon: "⭐", label: "Featured", desc: "Editor's choice", color: "from-blue-500 to-purple-500" },
              { icon: "🏆", label: "Best Rated", desc: "Top performers", color: "from-green-500 to-emerald-600" }
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-32 sm:w-40 lg:w-48">
                <div className={`netflix-card bg-gradient-to-br ${item.color} p-3 sm:p-4 lg:p-6 h-24 sm:h-28 lg:h-32 flex flex-col justify-between group cursor-pointer`}>
                  <div className="flex items-start justify-between">
                    <span className="text-xl sm:text-2xl lg:text-3xl group-hover:animate-float">{item.icon}</span>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/60 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-xs sm:text-sm lg:text-base">{item.label}</p>
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
            <div className="px-4 lg:px-12">
              <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">📌 My List</h2>
                <button className="text-red-500 hover:text-red-400 text-sm sm:text-base">View All</button>
              </div>
              <ProjectCarousel projects={myListProjects} />
            </div>
          )}
        </div>

        {/* Projects Section */}
        <div id="projects" className="scroll-mt-20 space-y-8 lg:space-y-12">
          {/* Featured Projects */}
        <div className="px-4 lg:px-12">
          <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">Featured Projects</h2>
            <button className="text-red-500 hover:text-red-400 text-sm sm:text-base">View All</button>
          </div>
          <ProjectCarousel projects={allProjects.filter(p => p.featured)} />
        </div>
        
          {/* Dynamic Category Carousels */}
          {categories.map((category) => {
            const categoryProjects = getProjectsForCategory(category.name);
            return categoryProjects.length > 0 ? (
              <div key={category.id} className="px-4 lg:px-12">
                <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-6">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
                    {category.icon || '📂'} {category.name}
                  </h2>
                  <button className="text-red-500 hover:text-red-400 text-sm sm:text-base">View All</button>
                </div>
                <ProjectCarousel projects={categoryProjects.slice(0, 10)} />
              </div>
            ) : null;
          })}

          {/* Live Projects */}
          {allProjects.filter(p => p.status === 'Live').length > 0 && (
            <ProjectCarousel
              title="🏆 Production Ready"
              projects={allProjects.filter(p => p.status === 'Live')}
            />
          )}

          {/* Recent Projects */}
          {allProjects.length > 6 && (
            <ProjectCarousel
              title="🆕 Recently Added"
              projects={[...allProjects].reverse().slice(0, 10)}
            />
          )}
        </div>

        {/* About Section */}
        <AboutSectionPortfolio />
        
        {/* Empty State */}
        {allProjects.length === 0 && (
          <div className="text-center py-16 sm:py-20 lg:py-32">
            <div className="max-w-2xl mx-auto px-4">
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 lg:mb-6">
                No Projects Found
              </h3>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 lg:mb-12">
                It looks like there are no projects in the database yet. 
                {user ? "Add some projects to get started!" : "Sign in to add your first project."}
              </p>
              {user ? (
                <Link to="/admin">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg transition-all duration-200">
                    Go to Admin Panel
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg transition-all duration-200">
                    Sign In
                  </button>
                </Link>
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

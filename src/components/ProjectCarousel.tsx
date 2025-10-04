import { useNavigate } from "react-router-dom";
import { Project } from "@/hooks/useProjects";

interface ProjectCarouselProps {
  title: string;
  projects: Project[];
}

const ProjectCarousel = ({ title, projects }: ProjectCarouselProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="mb-2 sm:mb-4 px-2 sm:px-4 text-lg sm:text-xl font-semibold text-white">{title}</h2>
      
      <div className="flex gap-2 sm:gap-3 overflow-x-auto px-2 sm:px-4 scrollbar-hide">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative min-w-[100px] sm:min-w-[120px] md:min-w-[140px] cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-800 group">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Gradient Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Category Badge */}
              <div className="absolute left-1 sm:left-2 top-1 sm:top-2">
                <div className="bg-black/70 px-1.5 sm:px-2 py-0.5 text-xs font-medium text-white rounded backdrop-blur-sm">
                  {project.categories?.name}
                </div>
              </div>
              
              {/* AI Badge (if applicable) */}
              {project.categories?.name === 'AI & Bots' && (
                <div className="absolute left-1 sm:left-2 top-6 sm:top-8">
                  <div className="bg-netflix-red px-1 py-0.5 text-xs font-bold text-white rounded">
                    AI
                  </div>
                </div>
              )}
              
              {/* Status Badge */}
              <div className="absolute right-1 sm:right-2 top-1 sm:top-2">
                <div className={`px-1.5 sm:px-2 py-0.5 text-xs font-bold text-white rounded ${
                  project.status === 'Live' ? 'bg-green-600' : 
                  project.status === 'In Progress' ? 'bg-yellow-600' : 'bg-blue-600'
                }`}>
                  {project.status.toUpperCase()}
                </div>
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute left-1 sm:left-2 bottom-1 sm:bottom-2">
                  <div className="bg-yellow-500 px-1 py-0.5 text-xs font-bold text-black rounded">
                    ⭐
                  </div>
                </div>
              )}
              
              {/* Project Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 line-clamp-2">{project.title}</h3>
                <p className="text-gray-300 text-xs line-clamp-2 mb-1 sm:mb-2">{project.description}</p>
                
                {/* Tech Stack */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-1 sm:mb-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="bg-gray-700/80 px-1 py-0.5 text-xs text-gray-300 rounded">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="text-xs text-gray-400">+{project.tags.length - 2}</span>
                    )}
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-1">
                  {project.vercel_url && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.vercel_url, '_blank');
                      }}
                      className="bg-white/90 text-black px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded hover:bg-white transition-colors"
                    >
                      Demo
                    </button>
                  )}
                  {project.github_url && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github_url, '_blank');
                      }}
                      className="bg-gray-700/90 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium rounded hover:bg-gray-600 transition-colors"
                    >
                      Code
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Download, Plus, ThumbsUp, Share, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProject, useProjects } from "@/hooks/useProjects";
import { useState } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Details');
  
  const { data: project, isLoading, error } = useProject(id!);
  const { data: allProjects = [] } = useProjects();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading project...</p>
        </div>
      </div>
    );
  }
  
  if (error || !project) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const similarProjects = allProjects.filter(p => 
    p.categories?.name === project.categories?.name && p.id !== project.id
  ).slice(0, 6);

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      {/* Header */}
      <div className="relative">
        {/* Background Image with better overlay */}
        <div className="relative h-[50vh] lg:h-[70vh] w-full">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          
          {/* Enhanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/80 via-transparent to-transparent" />
          
          {/* Back Button - Netflix Style */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-4 bg-netflix-black/80 text-white hover:bg-netflix-black backdrop-blur-sm border border-white/20"
            onClick={() => navigate('/portfolio')}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          
          {/* Share Icon */}
          <div className="absolute right-4 top-4">
            <Button
              variant="ghost"
              size="icon"
              className="bg-netflix-black/80 text-white hover:bg-netflix-black backdrop-blur-sm border border-white/20"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>

          {/* Title and Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-4 lg:px-12 pb-8 lg:pb-12">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-3xl lg:text-6xl font-bold netflix-text-glow animate-fade-in">
                {project.title}
              </h1>
              
              {/* Status & Details */}
              <div className="mb-6 flex items-center flex-wrap gap-3 text-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {project.featured && (
                  <span className="netflix-badge netflix-badge-featured">⭐ Featured</span>
                )}
                <span className={`netflix-badge ${
                  project.status === 'Live' ? 'netflix-badge-live' : 
                  project.status === 'In Progress' ? 'netflix-badge-progress' : 'bg-blue-600 text-white'
                }`}>
                  {project.status}
                </span>
                <span className="netflix-badge netflix-badge-category">{project.categories?.name}</span>
                <span className="text-netflix-text-secondary">{new Date().getFullYear()}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {project.vercel_url ? (
                  <Button 
                    size="lg" 
                    className="bg-white hover:bg-white/90 text-netflix-black font-semibold px-8 rounded-sm"
                    onClick={() => window.open(project.vercel_url, '_blank')}
                  >
                    <Play className="mr-2 h-5 w-5 fill-current" />
                    View Live Demo
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    disabled
                    className="bg-netflix-gray text-netflix-text-muted px-8 rounded-sm"
                  >
                    <Play className="mr-2 h-5 w-5 fill-current" />
                    Demo Not Available
                  </Button>
                )}
                
                {project.github_url && (
                  <Button 
                    size="lg" 
                    className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 rounded-sm backdrop-blur-sm border border-white/40"
                    onClick={() => window.open(project.github_url, '_blank')}
                  >
                    <Github className="mr-2 h-5 w-5" />
                    Source Code
                  </Button>
                )}

                <Button 
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full w-12 h-12 backdrop-blur-sm border border-white/40"
                >
                  <Plus className="h-5 w-5" />
                </Button>
                
                <Button 
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full w-12 h-12 backdrop-blur-sm border border-white/40"
                >
                  <ThumbsUp className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 lg:px-12 py-8 lg:py-12 max-w-7xl">
          {/* Description */}
          <div className="mb-8 lg:mb-12">
            <p className="text-base lg:text-lg text-netflix-text-primary leading-relaxed max-w-4xl">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mb-8 lg:mb-12">
            <h3 className="text-white text-lg lg:text-xl font-semibold mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="netflix-badge netflix-badge-category hover:bg-netflix-red/20 hover:border-netflix-red/40 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="mb-8 lg:mb-12">
            <h3 className="text-white text-lg lg:text-xl font-semibold mb-4">Project Details</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="netflix-card bg-netflix-dark/80 backdrop-blur-sm p-6 border border-white/10">
                <div className="text-netflix-text-muted text-sm mb-2">Status</div>
                <div className="text-white font-semibold text-lg">{project.status}</div>
              </div>
              <div className="netflix-card bg-netflix-dark/80 backdrop-blur-sm p-6 border border-white/10">
                <div className="text-netflix-text-muted text-sm mb-2">Category</div>
                <div className="text-white font-semibold text-lg">{project.categories?.name}</div>
              </div>
              <div className="netflix-card bg-netflix-dark/80 backdrop-blur-sm p-6 border border-white/10">
                <div className="text-netflix-text-muted text-sm mb-2">Tech Stack</div>
                <div className="text-white font-semibold text-lg">{project.tags.length} techs</div>
              </div>
              <div className="netflix-card bg-netflix-dark/80 backdrop-blur-sm p-6 border border-white/10">
                <div className="text-netflix-text-muted text-sm mb-2">Featured</div>
                <div className="text-white font-semibold text-lg">{project.featured ? 'Yes ⭐' : 'No'}</div>
              </div>
            </div>
          </div>

          {/* Project Links */}
          {(project.vercel_url || project.github_url) && (
            <div className="mb-8 lg:mb-12">
              <h3 className="text-white text-lg lg:text-xl font-semibold mb-4">Quick Links</h3>
              <div className="space-y-3 max-w-2xl">
                {project.vercel_url && (
                  <div className="flex items-center justify-between netflix-card bg-netflix-dark/80 backdrop-blur-sm p-4 border border-white/10 hover:border-netflix-red/50 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-600/20 rounded-lg group-hover:bg-green-600/30 transition-colors">
                        <ExternalLink className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="text-white font-medium">Live Demo</div>
                        <div className="text-netflix-text-muted text-sm">View production deployment</div>
                      </div>
                    </div>
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-white rounded-sm"
                      onClick={() => window.open(project.vercel_url, '_blank')}
                    >
                      Visit
                    </Button>
                  </div>
                )}
                
                {project.github_url && (
                  <div className="flex items-center justify-between netflix-card bg-netflix-dark/80 backdrop-blur-sm p-4 border border-white/10 hover:border-netflix-red/50 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                        <Github className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">Source Code</div>
                        <div className="text-netflix-text-muted text-sm">Explore on GitHub</div>
                      </div>
                    </div>
                    <Button 
                      className="bg-white/20 hover:bg-white/30 text-white rounded-sm backdrop-blur-sm border border-white/40"
                      onClick={() => window.open(project.github_url, '_blank')}
                    >
                      View
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Similar Projects */}
          {similarProjects.length > 0 && (
            <div>
              <h3 className="text-white text-lg lg:text-xl font-semibold mb-6">More Like This</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
                {similarProjects.map((similarProject) => (
                  <div
                    key={similarProject.id}
                    className="netflix-card cursor-pointer group"
                    onClick={() => {
                      navigate(`/project/${similarProject.id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div className="aspect-[2/3] overflow-hidden bg-netflix-dark">
                      <img
                        src={similarProject.image}
                        alt={similarProject.title}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2 bg-netflix-dark">
                      <p className="text-white text-sm font-medium truncate">{similarProject.title}</p>
                      <p className="text-netflix-text-muted text-xs">{similarProject.categories?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
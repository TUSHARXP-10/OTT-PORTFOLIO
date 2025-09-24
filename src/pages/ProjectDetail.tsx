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
        {/* Background Image */}
        <div className="relative aspect-video w-full">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
          
          {/* Back Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-4 bg-black/50 text-white hover:bg-black/70"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          
          {/* Cast/Share Icons */}
          <div className="absolute right-4 top-4 flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/50 text-white hover:bg-black/70"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          <h1 className="mb-2 text-2xl font-bold">{project.title}</h1>
          
          {/* Status & Details */}
          <div className="mb-4 flex items-center space-x-2 text-sm">
            {project.featured && (
              <span className="font-semibold text-yellow-500">⭐ Featured</span>
            )}
            <span className="text-gray-400">{new Date().getFullYear()}</span>
            <span className={`rounded px-2 py-0.5 text-xs text-white ${
              project.status === 'Live' ? 'bg-green-600' : 
              project.status === 'In Progress' ? 'bg-yellow-600' : 'bg-blue-600'
            }`}>
              {project.status}
            </span>
            <span className="text-gray-400">{project.categories?.name}</span>
          </div>

          {/* Action Buttons */}
          <div className="mb-6 space-y-3">
            {project.vercel_url ? (
              <Button 
                size="lg" 
                className="w-full bg-white text-black hover:bg-gray-200"
                onClick={() => window.open(project.vercel_url, '_blank')}
              >
                <Play className="mr-2 h-5 w-5" fill="currentColor" />
                View Live Demo
              </Button>
            ) : (
              <Button 
                size="lg" 
                disabled
                className="w-full bg-gray-600 text-gray-400"
              >
                <Play className="mr-2 h-5 w-5" fill="currentColor" />
                Demo Not Available
              </Button>
            )}
            
            {project.github_url ? (
              <Button 
                size="lg" 
                variant="outline"
                className="w-full border-gray-600 bg-gray-700/80 text-white hover:bg-gray-600/80"
                onClick={() => window.open(project.github_url, '_blank')}
              >
                <Github className="mr-2 h-5 w-5" />
                View Source Code
              </Button>
            ) : (
              <Button 
                size="lg" 
                variant="outline"
                disabled
                className="w-full border-gray-600 bg-gray-700/80 text-gray-400"
              >
                <Github className="mr-2 h-5 w-5" />
                Source Code Private
              </Button>
            )}
          </div>

          {/* Description */}
          <p className="mb-6 text-gray-300 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <h3 className="text-white text-sm font-semibold mb-2">Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="mb-8 flex items-center justify-around border-b border-gray-700 pb-6">
            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-white">
              <Plus className="h-6 w-6" />
              <span className="text-xs">My List</span>
            </Button>
            
            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-white">
              <ThumbsUp className="h-6 w-6" />
              <span className="text-xs">Rate</span>
            </Button>
            
            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-white">
              <Share className="h-6 w-6" />
              <span className="text-xs">Share</span>
            </Button>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-8 border-b border-gray-700">
              {['Details', 'More Like This'].map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 text-sm ${
                    activeTab === tab 
                      ? 'border-b-2 border-netflix-red text-white' 
                      : 'text-gray-400'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Based on Active Tab */}
          {activeTab === 'Details' && (
            <div className="space-y-4">
              {/* Project Links */}
              <div className="space-y-3">
                {project.vercel_url && (
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="h-5 w-5 text-green-500" />
                      <span className="text-white">Live Demo</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(project.vercel_url, '_blank')}
                    >
                      Visit
                    </Button>
                  </div>
                )}
                
                {project.github_url && (
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <div className="flex items-center space-x-3">
                      <Github className="h-5 w-5 text-gray-400" />
                      <span className="text-white">Source Code</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(project.github_url, '_blank')}
                    >
                      View
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-gray-400 text-xs">Status</div>
                  <div className="text-white font-semibold">{project.status}</div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-gray-400 text-xs">Category</div>
                  <div className="text-white font-semibold">{project.categories?.name}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'More Like This' && (
            <div className="grid grid-cols-3 gap-2">
              {similarProjects.map((similarProject) => (
                <div
                  key={similarProject.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/project/${similarProject.id}`)}
                >
                  <div className="aspect-[2/3] overflow-hidden rounded bg-gray-800">
                    <img
                      src={similarProject.image}
                      alt={similarProject.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
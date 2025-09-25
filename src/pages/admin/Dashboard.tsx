import { useProjects, useCategories } from '@/hooks/useProjects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Layout as LayoutIcon, Eye, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { data: projects = [] } = useProjects();
  const { data: categories = [] } = useCategories();

  const stats = [
    {
      title: 'Total Projects',
      value: projects.length,
      description: 'Active projects in portfolio',
      icon: FolderOpen,
      color: 'text-blue-400',
    },
    {
      title: 'Live Projects',
      value: projects.filter(p => p.status === 'Live').length,
      description: 'Projects in production',
      icon: Eye,
      color: 'text-green-400',
    },
    {
      title: 'Featured Projects',
      value: projects.filter(p => p.featured).length,
      description: 'Highlighted projects',
      icon: TrendingUp,
      color: 'text-yellow-400',
    },
    {
      title: 'Categories',
      value: categories.length,
      description: 'Project categories',
      icon: LayoutIcon,
      color: 'text-purple-400',
    },
  ];

  const recentProjects = projects?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-netflix-text-secondary">
          Overview of your portfolio content management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-netflix-dark border-netflix-gray">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-netflix-text-secondary">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-netflix-text-muted">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Projects */}
      <Card className="bg-netflix-dark border-netflix-gray">
        <CardHeader>
          <CardTitle className="text-white">Recent Projects</CardTitle>
          <CardDescription className="text-netflix-text-secondary">
            Latest projects added to your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentProjects.length > 0 ? (
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 rounded-lg bg-netflix-gray">
                  <div className="flex items-center gap-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-white">{project.title}</h3>
                      <p className="text-sm text-netflix-text-secondary">
                        {project.categories?.name} • {project.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <span className="netflix-badge-featured">Featured</span>
                    )}
                    <span className={`netflix-badge ${
                      project.status === 'Live' ? 'netflix-badge-live' : 'netflix-badge-progress'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <FolderOpen className="mx-auto h-12 w-12 text-netflix-text-muted mb-4" />
              <p className="text-netflix-text-secondary">No projects yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
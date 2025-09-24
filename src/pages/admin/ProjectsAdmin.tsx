import { useState } from 'react';
import { useProjects, useCategories } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, ExternalLink, Github } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/hooks/useProjects';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Must be a valid URL'),
  category_id: z.string().min(1, 'Category is required'),
  status: z.string().min(1, 'Status is required'),
  github_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  vercel_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  featured: z.boolean(),
  tags: z.string(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const ProjectsAdmin = () => {
  const { data: projects = [], refetch } = useProjects();
  const { data: categories = [] } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      category_id: '',
      status: 'In Progress',
      github_url: '',
      vercel_url: '',
      featured: false,
      tags: '',
    },
  });

  const openDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      form.reset({
        title: project.title,
        description: project.description,
        image: project.image,
        category_id: project.category_id,
        status: project.status,
        github_url: project.github_url || '',
        vercel_url: project.vercel_url || '',
        featured: project.featured,
        tags: project.tags?.join(', ') || '',
      });
    } else {
      setEditingProject(null);
      form.reset();
    }
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setEditingProject(null);
    form.reset();
  };

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);

    const projectData = {
      ...data,
      github_url: data.github_url || null,
      vercel_url: data.vercel_url || null,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
    };

    try {
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Project updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert(projectData);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Project created successfully',
        });
      }

      refetch();
      closeDialog();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });

      refetch();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-netflix-text-secondary">
            Manage your portfolio projects
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="netflix-btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-netflix-dark border-netflix-gray max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </DialogTitle>
              <DialogDescription className="text-netflix-text-secondary">
                {editingProject ? 'Update project details' : 'Create a new project for your portfolio'}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          className="bg-netflix-gray border-netflix-light-gray text-white min-h-[100px]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-netflix-text-primary">Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-netflix-gray border-netflix-light-gray text-white">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-netflix-dark border-netflix-gray">
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id} className="text-white hover:bg-netflix-gray">
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-netflix-text-primary">Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-netflix-gray border-netflix-light-gray text-white">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-netflix-dark border-netflix-gray">
                            <SelectItem value="In Progress" className="text-white hover:bg-netflix-gray">In Progress</SelectItem>
                            <SelectItem value="Live" className="text-white hover:bg-netflix-gray">Live</SelectItem>
                            <SelectItem value="Completed" className="text-white hover:bg-netflix-gray">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="github_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-netflix-text-primary">GitHub URL</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" placeholder="https://github.com/..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vercel_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-netflix-text-primary">Live Demo URL</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" placeholder="https://..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Tags (comma separated)</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" placeholder="React, TypeScript, Tailwind" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-netflix-gray p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-netflix-text-primary">Featured Project</FormLabel>
                        <div className="text-sm text-netflix-text-secondary">
                          Show this project in featured sections
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeDialog}
                    className="border-netflix-gray text-netflix-text-secondary hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="netflix-btn-primary"
                  >
                    {isSubmitting 
                      ? (editingProject ? 'Updating...' : 'Creating...') 
                      : (editingProject ? 'Update Project' : 'Create Project')
                    }
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-netflix-dark border-netflix-gray overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                {project.featured && (
                  <Badge className="netflix-badge-featured">Featured</Badge>
                )}
                <Badge className={
                  project.status === 'Live' ? 'netflix-badge-live' : 'netflix-badge-progress'
                }>
                  {project.status}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-white">{project.title}</CardTitle>
              <CardDescription className="text-netflix-text-secondary line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="netflix-badge-category">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {project.github_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="border-netflix-gray text-netflix-text-secondary hover:text-white"
                    >
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {project.vercel_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="border-netflix-gray text-netflix-text-secondary hover:text-white"
                    >
                      <a href={project.vercel_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDialog(project)}
                    className="border-netflix-gray text-netflix-text-secondary hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteProject(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

          {projects.length === 0 && (
        <Card className="bg-netflix-dark border-netflix-gray">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 text-netflix-text-muted mb-4">📂</div>
            <h3 className="text-lg font-medium text-white mb-2">No projects yet</h3>
            <p className="text-netflix-text-secondary text-center mb-4">
              Start building your portfolio by adding your first project
            </p>
            <Button onClick={() => openDialog()} className="netflix-btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectsAdmin;
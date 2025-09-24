import { useState } from 'react';
import { useCategories } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Layout as LayoutIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/hooks/useProjects';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  display_order: z.number().min(0, 'Display order must be 0 or greater'),
});

type CategoryFormData = z.infer<typeof categorySchema>;

const CategoriesAdmin = () => {
  const { data: categories = [], refetch } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      icon: '',
      display_order: categories.length,
    },
  });

  const openDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      form.reset({
        name: category.name,
        description: category.description || '',
        icon: category.icon || '',
        display_order: category.display_order,
      });
    } else {
      setEditingCategory(null);
      form.reset({
        name: '',
        description: '',
        icon: '',
        display_order: categories.length,
      });
    }
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setEditingCategory(null);
    form.reset();
  };

  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true);

    const categoryData = {
      ...data,
      description: data.description || null,
      icon: data.icon || null,
    };

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', editingCategory.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Category updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('categories')
          .insert(categoryData);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Category created successfully',
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

  const deleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? This will affect projects using this category.')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Category deleted successfully',
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
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-netflix-text-secondary">
            Organize your projects with categories
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="netflix-btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-netflix-dark border-netflix-gray">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </DialogTitle>
              <DialogDescription className="text-netflix-text-secondary">
                {editingCategory ? 'Update category details' : 'Create a new category for organizing projects'}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Name</FormLabel>
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
                          className="bg-netflix-gray border-netflix-light-gray text-white" 
                          placeholder="Optional description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Icon (emoji)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-netflix-gray border-netflix-light-gray text-white" 
                          placeholder="📂"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="display_order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Display Order</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="number"
                          min="0"
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          className="bg-netflix-gray border-netflix-light-gray text-white" 
                        />
                      </FormControl>
                      <FormMessage />
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
                      ? (editingCategory ? 'Updating...' : 'Creating...') 
                      : (editingCategory ? 'Update Category' : 'Create Category')
                    }
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="bg-netflix-dark border-netflix-gray">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <span className="text-2xl">{category.icon || '📂'}</span>
                {category.name}
              </CardTitle>
              {category.description && (
                <CardDescription className="text-netflix-text-secondary">
                  {category.description}
                </CardDescription>
              )}
            </CardHeader>
            
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-netflix-text-muted">
                  Order: {category.display_order}
                </span>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDialog(category)}
                    className="border-netflix-gray text-netflix-text-secondary hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <Card className="bg-netflix-dark border-netflix-gray">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <LayoutIcon className="h-12 w-12 text-netflix-text-muted mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No categories yet</h3>
            <p className="text-netflix-text-secondary text-center mb-4">
              Create categories to organize your projects better
            </p>
            <Button onClick={() => openDialog()} className="netflix-btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Category
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CategoriesAdmin;
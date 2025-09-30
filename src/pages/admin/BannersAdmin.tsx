import { useState, useRef } from 'react';
import { useBanners, useUploadBannerImage, Banner } from '@/hooks/useBanners';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const bannerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  match_percentage: z.number().min(0).max(100).default(97),
  genre: z.string().default('Featured'),
  year: z.number().default(new Date().getFullYear()),
  rating: z.string().default('PG-13'),
  display_order: z.number().default(0),
  is_active: z.boolean().default(true),
});

type BannerFormData = z.infer<typeof bannerSchema>;

const BannersAdmin = () => {
  const { data: banners = [], refetch } = useBanners();
  const uploadImage = useUploadBannerImage();
  const [isOpen, setIsOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<BannerFormData>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      description: '',
      match_percentage: 97,
      genre: 'Featured',
      year: new Date().getFullYear(),
      rating: 'PG-13',
      display_order: 0,
      is_active: true,
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image size must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      const url = await uploadImage.mutateAsync(file);
      setUploadedImageUrl(url);
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const openDialog = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setUploadedImageUrl(banner.image_url);
      form.reset({
        title: banner.title,
        subtitle: banner.subtitle || '',
        description: banner.description,
        match_percentage: banner.match_percentage,
        genre: banner.genre,
        year: banner.year,
        rating: banner.rating,
        display_order: banner.display_order,
        is_active: banner.is_active,
      });
    } else {
      setEditingBanner(null);
      setUploadedImageUrl('');
      form.reset();
    }
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setEditingBanner(null);
    setUploadedImageUrl('');
    form.reset();
  };

  const onSubmit = async (data: BannerFormData) => {
    if (!uploadedImageUrl) {
      toast({
        title: 'Error',
        description: 'Please upload an image',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    const bannerData = {
      title: data.title,
      subtitle: data.subtitle || null,
      description: data.description,
      match_percentage: data.match_percentage,
      genre: data.genre,
      year: data.year,
      rating: data.rating,
      display_order: data.display_order,
      is_active: data.is_active,
      image_url: uploadedImageUrl,
    };

    try {
      if (editingBanner) {
        const { error } = await supabase
          .from('banners')
          .update(bannerData)
          .eq('id', editingBanner.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Banner updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('banners')
          .insert([bannerData]);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Banner created successfully',
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

  const deleteBanner = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    try {
      const { error } = await supabase
        .from('banners')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Banner deleted successfully',
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
          <h1 className="text-3xl font-bold text-white mb-2">Hero Banners</h1>
          <p className="text-netflix-text-secondary">
            Manage hero carousel banners with custom images
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="netflix-btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-netflix-dark border-netflix-gray max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingBanner ? 'Edit Banner' : 'Add New Banner'}
              </DialogTitle>
              <DialogDescription className="text-netflix-text-secondary">
                {editingBanner ? 'Update banner details' : 'Create a new banner for the hero carousel'}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label className="text-netflix-text-primary">Banner Image</Label>
                  <div className="border-2 border-dashed border-netflix-gray rounded-lg p-6 text-center hover:border-netflix-red transition-colors">
                    {uploadedImageUrl ? (
                      <div className="space-y-4">
                        <img 
                          src={uploadedImageUrl} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="border-netflix-gray text-netflix-text-secondary hover:text-white"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Change Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <ImageIcon className="w-12 h-12 mx-auto text-netflix-text-secondary" />
                        <div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="border-netflix-gray text-netflix-text-secondary hover:text-white"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {isUploading ? 'Uploading...' : 'Upload Image'}
                          </Button>
                        </div>
                        <p className="text-sm text-netflix-text-secondary">
                          JPG, PNG or WEBP (Max 5MB)
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

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
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Subtitle (Optional)</FormLabel>
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

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="match_percentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-netflix-text-primary">Match %</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value))}
                            className="bg-netflix-gray border-netflix-light-gray text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-netflix-text-primary">Genre</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-netflix-text-primary">Year</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value))}
                            className="bg-netflix-gray border-netflix-light-gray text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-netflix-text-primary">Rating</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="display_order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Display Order</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))}
                          className="bg-netflix-gray border-netflix-light-gray text-white" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-netflix-gray p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-netflix-text-primary">Active</FormLabel>
                        <div className="text-sm text-netflix-text-secondary">
                          Show this banner in the carousel
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
                    disabled={isSubmitting || !uploadedImageUrl}
                    className="netflix-btn-primary"
                  >
                    {isSubmitting 
                      ? (editingBanner ? 'Updating...' : 'Creating...') 
                      : (editingBanner ? 'Update Banner' : 'Create Banner')
                    }
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <Card key={banner.id} className="bg-netflix-dark border-netflix-gray overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                {banner.is_active && (
                  <Badge className="bg-green-600 text-white">Active</Badge>
                )}
                <Badge className="netflix-badge-category">
                  Order: {banner.display_order}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-white">{banner.title}</CardTitle>
              {banner.subtitle && (
                <CardDescription className="text-netflix-text-secondary">
                  {banner.subtitle}
                </CardDescription>
              )}
              <CardDescription className="text-netflix-text-secondary line-clamp-2">
                {banner.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="netflix-badge-category">
                  {banner.genre}
                </Badge>
                <Badge variant="secondary" className="netflix-badge-category">
                  {banner.year}
                </Badge>
                <Badge variant="secondary" className="netflix-badge-category">
                  {banner.rating}
                </Badge>
                <Badge variant="secondary" className="bg-emerald-600 text-white">
                  {banner.match_percentage}% Match
                </Badge>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openDialog(banner)}
                  className="border-netflix-gray text-netflix-text-secondary hover:text-white"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteBanner(banner.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {banners.length === 0 && (
        <Card className="bg-netflix-dark border-netflix-gray">
          <CardContent className="py-12 text-center">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 text-netflix-text-secondary" />
            <p className="text-netflix-text-secondary mb-4">
              No banners yet. Create your first banner to get started.
            </p>
            <Button onClick={() => openDialog()} className="netflix-btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Banner
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BannersAdmin;

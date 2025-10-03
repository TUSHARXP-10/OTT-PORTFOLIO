import { useEffect, useState, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAbout } from '@/hooks/useAbout';
import { useUpdateAbout, useUploadAvatar } from '@/hooks/useAboutMutations';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';

const aboutSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  email: z.string().email('Invalid email').nullable().optional(),
  phone: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  skills: z.record(z.array(z.string())).default({}),
  social_links: z.record(z.string()).default({}),
  timeline: z.array(z.object({
    period: z.string(),
    title: z.string(),
    description: z.string(),
  })).default([]),
});

type AboutFormData = z.infer<typeof aboutSchema>;

const AboutAdmin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aboutId, setAboutId] = useState<string | null>(null);
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: about } = useAbout();
  const updateAbout = useUpdateAbout();
  const uploadAvatar = useUploadAvatar();
  const { toast } = useToast();

  const form = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      name: '',
      bio: '',
      status: '',
      email: '',
      phone: '',
      location: '',
      avatar: '',
      skills: {},
      social_links: {},
      timeline: [],
    },
  });

  const { fields: timelineFields, append: appendTimeline, remove: removeTimeline } = useFieldArray({
    control: form.control,
    name: 'timeline',
  });

  useEffect(() => {
    if (about) {
      setAboutId(about.id);
      setUploadedAvatarUrl(about.avatar || '');
      form.reset({
        name: about.name,
        bio: about.bio,
        status: about.status,
        email: about.email,
        phone: about.phone,
        location: about.location,
        avatar: about.avatar,
        skills: about.skills || {},
        social_links: about.social_links || {},
        timeline: about.timeline || [],
      });
    }
  }, [about, form]);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

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
      const url = await uploadAvatar.mutateAsync(file);
      setUploadedAvatarUrl(url);
      form.setValue('avatar', url);
      toast({
        title: 'Success',
        description: 'Avatar uploaded successfully',
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

  const onSubmit = async (data: AboutFormData) => {
    try {
      setIsSubmitting(true);
      await updateAbout.mutateAsync({
        id: aboutId || undefined,
        name: data.name,
        bio: data.bio || null,
        status: data.status || null,
        email: data.email || null,
        phone: data.phone || null,
        location: data.location || null,
        avatar: uploadedAvatarUrl || null,
        timeline: data.timeline || [],
        skills: data.skills || {},
        social_links: data.social_links || {},
      });
      
      toast({
        title: 'Success',
        description: 'About information updated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update about information',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSkillCategory = () => {
    const category = prompt('Enter skill category name (e.g., "Frontend Development"):');
    if (category) {
      const currentSkills = form.getValues('skills');
      form.setValue('skills', { ...currentSkills, [category]: [] });
    }
  };

  const addSkillToCategory = (category: string) => {
    const skill = prompt(`Add skill to ${category}:`);
    if (skill) {
      const currentSkills = form.getValues('skills');
      const categorySkills = currentSkills[category] || [];
      form.setValue(`skills.${category}` as any, [...categorySkills, skill]);
    }
  };

  const removeSkillFromCategory = (category: string, index: number) => {
    const currentSkills = form.getValues('skills');
    const categorySkills = [...(currentSkills[category] || [])];
    categorySkills.splice(index, 1);
    form.setValue(`skills.${category}` as any, categorySkills);
  };

  const removeSkillCategory = (category: string) => {
    if (!confirm(`Remove ${category} category and all its skills?`)) return;
    const currentSkills = form.getValues('skills');
    const { [category]: _, ...rest } = currentSkills;
    form.setValue('skills', rest);
  };

  const addSocialLink = () => {
    const platform = prompt('Enter platform name (e.g., "GitHub", "LinkedIn"):');
    if (platform) {
      const url = prompt(`Enter ${platform} URL:`);
      if (url) {
        const currentLinks = form.getValues('social_links');
        form.setValue('social_links', { ...currentLinks, [platform]: url });
      }
    }
  };

  const removeSocialLink = (platform: string) => {
    const currentLinks = form.getValues('social_links');
    const { [platform]: _, ...rest} = currentLinks;
    form.setValue('social_links', rest);
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">About Information</h1>
        <p className="text-netflix-text-secondary">
          Manage your personal information and professional details
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-netflix-dark border-netflix-gray">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar Upload */}
              <div className="space-y-2">
                <FormLabel className="text-netflix-text-primary">Profile Avatar</FormLabel>
                <div className="flex items-center gap-6">
                  {uploadedAvatarUrl ? (
                    <img 
                      src={uploadedAvatarUrl} 
                      alt="Avatar" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-netflix-red"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-netflix-gray border-2 border-dashed border-netflix-text-secondary flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-netflix-text-secondary" />
                    </div>
                  )}
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="border-netflix-gray text-netflix-text-secondary hover:text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isUploading ? 'Uploading...' : 'Upload Avatar'}
                    </Button>
                    <p className="text-sm text-netflix-text-secondary mt-2">
                      JPG, PNG or WEBP (Max 5MB)
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-netflix-text-primary">Name *</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-netflix-text-primary">Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        value={field.value || ''}
                        className="bg-netflix-gray border-netflix-light-gray text-white min-h-[100px]" 
                      />
                    </FormControl>
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
                    <FormControl>
                      <Input {...field} value={field.value || ''} className="bg-netflix-gray border-netflix-light-gray text-white" placeholder="e.g., Available for freelance projects" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Email</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ''} type="email" className="bg-netflix-gray border-netflix-light-gray text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Phone</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ''} className="bg-netflix-gray border-netflix-light-gray text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-netflix-text-primary">Location</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} className="bg-netflix-gray border-netflix-light-gray text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-netflix-dark border-netflix-gray">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Technical Skills</CardTitle>
              <Button
                type="button"
                onClick={addSkillCategory}
                variant="outline"
                size="sm"
                className="border-netflix-gray text-netflix-text-secondary hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(form.watch('skills') || {}).map(([category, skills]) => (
                <div key={category} className="border border-netflix-gray rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">{category}</h3>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={() => addSkillToCategory(category)}
                        variant="outline"
                        size="sm"
                        className="border-netflix-gray text-netflix-text-secondary hover:text-white"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Skill
                      </Button>
                      <Button
                        type="button"
                        onClick={() => removeSkillCategory(category)}
                        variant="destructive"
                        size="sm"
                        className="bg-netflix-red hover:bg-netflix-red-hover"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(skills as string[]).map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-1 bg-netflix-gray px-3 py-1 rounded-full">
                        <span className="text-sm text-white">{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkillFromCategory(category, idx)}
                          className="text-netflix-text-secondary hover:text-white ml-1"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-netflix-dark border-netflix-gray">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Professional Timeline</CardTitle>
              <Button
                type="button"
                onClick={() => appendTimeline({ period: '', title: '', description: '' })}
                variant="outline"
                size="sm"
                className="border-netflix-gray text-netflix-text-secondary hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {timelineFields.map((field, index) => (
                <div key={field.id} className="border border-netflix-gray rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-semibold">Event {index + 1}</h3>
                    <Button
                      type="button"
                      onClick={() => removeTimeline(index)}
                      variant="destructive"
                      size="sm"
                      className="bg-netflix-red hover:bg-netflix-red-hover"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormField
                    control={form.control}
                    name={`timeline.${index}.period`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-netflix-text-primary">Period</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" placeholder="e.g., 2024 - Present" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`timeline.${index}.title`}
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
                    name={`timeline.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-netflix-text-primary">Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="bg-netflix-gray border-netflix-light-gray text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-netflix-dark border-netflix-gray">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Social Links</CardTitle>
              <Button
                type="button"
                onClick={addSocialLink}
                variant="outline"
                size="sm"
                className="border-netflix-gray text-netflix-text-secondary hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Link
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(form.watch('social_links') || {}).map(([platform, url]) => (
                <div key={platform} className="flex items-center gap-3 p-3 border border-netflix-gray rounded-lg">
                  <div className="flex-1">
                    <p className="text-white font-medium">{platform}</p>
                    <p className="text-netflix-text-secondary text-sm truncate">{url}</p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => removeSocialLink(platform)}
                    variant="destructive"
                    size="sm"
                    className="bg-netflix-red hover:bg-netflix-red-hover"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="netflix-btn-primary px-8">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AboutAdmin;

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Save } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const aboutSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  status: z.string().optional(),
  avatar: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  skills: z.array(z.object({
    name: z.string().min(1, 'Skill name is required'),
    level: z.string().min(1, 'Skill level is required'),
  })),
  social_links: z.array(z.object({
    platform: z.string().min(1, 'Platform is required'),
    url: z.string().url('Must be a valid URL'),
  })),
  timeline: z.array(z.object({
    year: z.string().min(1, 'Year is required'),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
  })),
});

type AboutFormData = z.infer<typeof aboutSchema>;

const AboutAdmin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aboutId, setAboutId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      status: '',
      avatar: '',
      skills: [],
      social_links: [],
      timeline: [],
    },
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: 'skills',
  });

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control: form.control,
    name: 'social_links',
  });

  const { fields: timelineFields, append: appendTimeline, remove: removeTimeline } = useFieldArray({
    control: form.control,
    name: 'timeline',
  });

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    try {
      const { data, error } = await supabase
        .from('about')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setAboutId(data.id);
        form.reset({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          bio: data.bio || '',
          status: data.status || '',
          avatar: data.avatar || '',
          skills: (data.skills as any) || [],
          social_links: (data.social_links as any) || [],
          timeline: (data.timeline as any) || [],
        });
      }
    } catch (error: any) {
      console.error('Error loading about data:', error);
    }
  };

  const onSubmit = async (data: AboutFormData) => {
    setIsSubmitting(true);

    const aboutData = {
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      location: data.location || null,
      bio: data.bio || null,
      status: data.status || null,
      avatar: data.avatar || null,
      skills: data.skills.length > 0 ? data.skills : null,
      social_links: data.social_links.length > 0 ? data.social_links : null,
      timeline: data.timeline.length > 0 ? data.timeline : null,
    };

    try {
      if (aboutId) {
        const { error } = await supabase
          .from('about')
          .update(aboutData)
          .eq('id', aboutId);

        if (error) throw error;
      } else {
        const { data: newData, error } = await supabase
          .from('about')
          .insert(aboutData)
          .select()
          .single();

        if (error) throw error;
        setAboutId(newData.id);
      }

      toast({
        title: 'Success',
        description: 'About information saved successfully',
      });
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">About Information</h1>
          <p className="text-netflix-text-secondary">
            Manage your personal and professional information
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-netflix-dark border-netflix-gray">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
              <CardDescription className="text-netflix-text-secondary">
                Your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" className="bg-netflix-gray border-netflix-light-gray text-white" />
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
                        <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-netflix-text-primary">Location</FormLabel>
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-netflix-text-primary">Current Status</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" placeholder="e.g., Available for hire, Open to opportunities" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-netflix-text-primary">Avatar URL</FormLabel>
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
                        className="bg-netflix-gray border-netflix-light-gray text-white min-h-[120px]" 
                        placeholder="Tell us about yourself..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-netflix-dark border-netflix-gray">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Skills
                <Button
                  type="button"
                  onClick={() => appendSkill({ name: '', level: '' })}
                  size="sm"
                  className="netflix-btn-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </CardTitle>
              <CardDescription className="text-netflix-text-secondary">
                Your technical skills and expertise levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <FormField
                    control={form.control}
                    name={`skills.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-netflix-text-primary">Skill Name</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" placeholder="e.g., React" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`skills.${index}.level`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-netflix-text-primary">Level</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" placeholder="e.g., Expert, Intermediate" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => removeSkill(index)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-netflix-dark border-netflix-gray">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Social Links
                <Button
                  type="button"
                  onClick={() => appendSocial({ platform: '', url: '' })}
                  size="sm"
                  className="netflix-btn-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </CardTitle>
              <CardDescription className="text-netflix-text-secondary">
                Your social media and professional profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <FormField
                    control={form.control}
                    name={`social_links.${index}.platform`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-netflix-text-primary">Platform</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" placeholder="e.g., LinkedIn, GitHub" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`social_links.${index}.url`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-netflix-text-primary">URL</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" placeholder="https://..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => removeSocial(index)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="bg-netflix-dark border-netflix-gray">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Timeline
                <Button
                  type="button"
                  onClick={() => appendTimeline({ year: '', title: '', description: '' })}
                  size="sm"
                  className="netflix-btn-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </CardTitle>
              <CardDescription className="text-netflix-text-secondary">
                Your career timeline and milestones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {timelineFields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border border-netflix-gray rounded-lg">
                  <div className="flex gap-4 items-end">
                    <FormField
                      control={form.control}
                      name={`timeline.${index}.year`}
                      render={({ field }) => (
                        <FormItem className="w-32">
                          <FormLabel className="text-netflix-text-primary">Year</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" placeholder="2024" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`timeline.${index}.title`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-netflix-text-primary">Title</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-netflix-gray border-netflix-light-gray text-white" placeholder="Position or Achievement" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      onClick={() => removeTimeline(index)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <FormField
                    control={form.control}
                    name={`timeline.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-netflix-text-primary">Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="bg-netflix-gray border-netflix-light-gray text-white" placeholder="Describe this milestone..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="netflix-btn-primary"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AboutAdmin;
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AboutData {
  id?: string;
  name: string;
  bio?: string | null;
  status?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  avatar?: string | null;
  timeline?: any[];
  skills?: Record<string, string[]>;
  social_links?: Record<string, string>;
}

export const useUpdateAbout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AboutData) => {
      const { id, ...updateData } = data;
      
      if (id) {
        // Update existing
        const { error } = await supabase
          .from('about')
          .update(updateData)
          .eq('id', id);

        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('about')
          .insert([updateData]);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] });
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('banners').getPublicUrl(filePath);

      return data.publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] });
    },
  });
};

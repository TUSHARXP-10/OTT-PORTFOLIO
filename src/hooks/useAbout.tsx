import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface About {
  id: string;
  name: string;
  avatar?: string;
  location?: string;
  phone?: string;
  email?: string;
  status?: string;
  bio?: string;
  timeline: Array<{
    period: string;
    title: string;
    description: string;
  }>;
  skills: Record<string, string[]>;
  social_links: Record<string, string>;
}

export const useAbout = () => {
  return useQuery({
    queryKey: ['about'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about')
        .select('*')
        .single();

      if (error) throw error;
      return {
        ...data,
        timeline: data.timeline as About['timeline'],
        skills: data.skills as About['skills'],
        social_links: data.social_links as About['social_links']
      };
    },
  });
};
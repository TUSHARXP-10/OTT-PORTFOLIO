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
        .select('*');

      if (error) throw error;
      
      // If no records exist, return null
      if (!data || data.length === 0) {
        return null;
      }
      
      // Return the first record
      const aboutData = data[0];
      return {
        ...aboutData,
        timeline: aboutData.timeline as About['timeline'],
        skills: aboutData.skills as About['skills'],
        social_links: aboutData.social_links as About['social_links']
      };
    },
  });
};
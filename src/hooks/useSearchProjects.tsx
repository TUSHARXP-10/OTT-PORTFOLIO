import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/hooks/useProjects";

export const useSearchProjects = (query: string) => {
  return useQuery({
    queryKey: ['search-projects', query],
    queryFn: async () => {
      if (!query.trim()) return [];
      
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          categories (
            name
          )
        `)
        .or(`title.ilike.%${query}%,tags.cs.{${query}}`)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as Project[];
    },
    enabled: query.trim().length > 0,
  });
};
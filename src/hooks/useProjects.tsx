import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github_url?: string;
  vercel_url?: string;
  status: string;
  featured: boolean;
  in_my_list: boolean;
  category_id: string;
  categories?: {
    name: string;
  };
}

export interface Category {
  id: string;
  name: string;
  display_order: number;
  description?: string;
  icon?: string;
}

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          categories (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Project;
    },
    enabled: !!id,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
  });
};

export const useProjectsByCategory = (categoryName: string) => {
  return useQuery({
    queryKey: ['projects-by-category', categoryName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          categories!inner (
            name
          )
        `)
        .eq('categories.name', categoryName)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
    enabled: !!categoryName,
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ['featured-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
  });
};

export const useMyListProjects = () => {
  return useQuery({
    queryKey: ['my-list-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('in_my_list', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
  });
};
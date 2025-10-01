-- Add my_list flag to projects table for admin to curate "My List" section
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS in_my_list boolean NOT NULL DEFAULT false;

-- Add comment for clarity
COMMENT ON COLUMN public.projects.in_my_list IS 'Flag to indicate if project should appear in My List section';
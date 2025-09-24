-- Fix the Cosmic Nebula project URL that's showing 404 error
UPDATE projects 
SET vercel_url = NULL,
    status = 'In Progress'
WHERE title LIKE 'Cosmic Nebula%' AND vercel_url = 'https://cosmic-nebula-3d.vercel.app';
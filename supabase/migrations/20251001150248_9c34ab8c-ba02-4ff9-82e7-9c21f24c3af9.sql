-- Insert initial About data
INSERT INTO public.about (
  name,
  avatar,
  location,
  phone,
  email,
  status,
  bio,
  timeline,
  skills,
  social_links
)
VALUES (
  'Tushar R. Chandane',
  'https://rdwqfzskgtpscyzopvnj.supabase.co/storage/v1/object/public/banners/profile-avatar.jpg',
  'Mumbai, India',
  '+91 9082301827',
  'contact@tushar.dev',
  'Available for freelance projects',
  'I''m a passionate self-taught Full-Stack Developer and Cybersecurity Expert based in Mumbai, India. Since 2021, I''ve been dedicated to building secure, innovative digital experiences that help businesses grow and succeed in the digital landscape.',
  '[
    {
      "period": "2024 – Present",
      "title": "Freelance Full-Stack Developer",
      "description": "Building custom web applications and providing technical consulting"
    },
    {
      "period": "2021 – 2023",
      "title": "Self-Taught Developer Journey",
      "description": "Mastered full-stack development through hands-on projects"
    },
    {
      "period": "Ongoing",
      "title": "Cybersecurity & Penetration Testing Expert",
      "description": "Specialized in security audits and vulnerability assessments"
    }
  ]'::jsonb,
  '{
    "Frontend Development": ["React", "TypeScript", "Next.js", "Tailwind CSS", "React Three Fiber", "Framer Motion"],
    "Backend Development": ["Node.js", "Express.js", "GraphQL", "REST API", "MongoDB", "PostgreSQL"],
    "DevOps & Cloud": ["Docker", "Vercel", "GitHub Actions", "AWS", "CI/CD"],
    "Cybersecurity": ["Penetration Testing", "Burp Suite", "Kali Linux", "Security Audits"]
  }'::jsonb,
  '{
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "twitter": "https://twitter.com/yourusername"
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  avatar = EXCLUDED.avatar,
  location = EXCLUDED.location,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  status = EXCLUDED.status,
  bio = EXCLUDED.bio,
  timeline = EXCLUDED.timeline,
  skills = EXCLUDED.skills,
  social_links = EXCLUDED.social_links,
  updated_at = now();
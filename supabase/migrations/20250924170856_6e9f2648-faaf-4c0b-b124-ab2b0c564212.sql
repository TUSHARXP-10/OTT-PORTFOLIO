-- Insert sample categories
INSERT INTO public.categories (name, display_order, description) VALUES
('AI', 1, 'Artificial Intelligence and Machine Learning Projects'),
('Automation', 2, 'Automation Tools and Scripts'),
('Trading', 3, 'Trading Systems and Financial Tools'),
('Web', 4, 'Web Applications and Platforms');

-- Insert sample projects
INSERT INTO public.projects (title, description, image, category_id, tags, github_url, vercel_url, status, featured) VALUES
(
  'Neural Style Transfer',
  'AI-powered application that transforms images using deep learning to apply artistic styles from famous paintings.',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
  (SELECT id FROM public.categories WHERE name = 'AI'),
  ARRAY['Python', 'TensorFlow', 'Computer Vision', 'Deep Learning'],
  'https://github.com',
  'https://vercel.app',
  'Live',
  true
),
(
  'XP UNIVERSE - Find Your Perfect Property',
  'Premium Real Estate property automation and discovery platform.',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=225&fit=crop',
  (SELECT id FROM public.categories WHERE name = 'Web'),
  ARRAY['Real Estate', 'Automation', 'Web App'],
  '',
  'https://adnexx-homefinder-automator.vercel.app/',
  'Live',
  true
),
(
  'Sentiment Analysis API',
  'Real-time sentiment analysis service processing social media feeds using transformer models.',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
  (SELECT id FROM public.categories WHERE name = 'AI'),
  ARRAY['Python', 'FastAPI', 'BERT', 'NLP'],
  'https://github.com',
  '',
  'Completed',
  false
),
(
  'Data Pipeline Orchestrator',
  'Automated ETL pipeline system for processing large datasets with monitoring and error handling.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
  (SELECT id FROM public.categories WHERE name = 'Automation'),
  ARRAY['Python', 'Apache Airflow', 'Docker', 'PostgreSQL'],
  'https://github.com',
  '',
  'In Progress',
  false
),
(
  'Algorithmic Trading Bot',
  'Automated cryptocurrency trading system using technical analysis and machine learning signals.',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop',
  (SELECT id FROM public.categories WHERE name = 'Trading'),
  ARRAY['Python', 'Pandas', 'Machine Learning', 'APIs'],
  'https://github.com',
  '',
  'Live',
  false
);

-- Insert about information
INSERT INTO public.about (name, status, bio, location, email, timeline, skills, social_links) VALUES
(
  'Tushar R. Chandane',
  'Available for freelance projects',
  'Passionate developer specializing in AI, automation, and web applications. Self-taught programmer with expertise in cybersecurity and modern web technologies.',
  'India',
  'contact@tushar.dev',
  '[
    {"period": "2020-2023", "title": "Self-Taught Programming", "description": "Learned programming through online resources and practical projects"},
    {"period": "2023-Present", "title": "Freelance Developer", "description": "Building AI-powered applications and automation tools"},
    {"period": "2024-Present", "title": "Cybersecurity Focus", "description": "Specialized in secure application development and ethical hacking"}
  ]',
  '{
    "Frontend": ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    "Backend": ["Node.js", "Python", "FastAPI", "Supabase"],
    "DevOps": ["Docker", "Vercel", "GitHub Actions", "AWS"],
    "AI/ML": ["TensorFlow", "PyTorch", "OpenAI", "Transformers"],
    "Cybersecurity": ["Penetration Testing", "Security Auditing", "Ethical Hacking"]
  }',
  '{
    "github": "https://github.com/tushar",
    "linkedin": "https://linkedin.com/in/tushar",
    "twitter": "https://twitter.com/tushar"
  }'
);
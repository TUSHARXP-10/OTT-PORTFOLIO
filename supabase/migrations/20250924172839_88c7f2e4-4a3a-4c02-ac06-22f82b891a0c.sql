-- First, let's clear existing data and populate with real data
DELETE FROM projects;
DELETE FROM categories;
DELETE FROM about;

-- Insert categories
INSERT INTO categories (name, description, display_order, icon) VALUES
('Client Projects', 'Professional client work and commercial applications', 1, '💼'),
('Personal Projects', 'Personal portfolio and experimental projects', 2, '🚀'),
('AI & Bots', 'Artificial Intelligence and automation projects', 3, '🤖'),
('Web Applications', 'Full-stack web development projects', 4, '🌐'),
('IoT & Systems', 'Internet of Things and system development', 5, '⚙️');

-- Get category IDs for foreign key references
WITH category_ids AS (
  SELECT id, name FROM categories
)

-- Insert real projects
INSERT INTO projects (title, description, image, tags, github_url, vercel_url, status, featured, category_id) VALUES

-- Client Projects
('XP UNIVERSE - Premium Real Estate Platform', 'Find Your Perfect Property with advanced search, property listings, and premium real estate services', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=225&fit=crop', 
ARRAY['React', 'Next.js', 'Real Estate', 'Property Management'], 
'https://github.com/TUSHARXP-10', 'https://xp-universe.vercel.app', 'Live', true, 
(SELECT id FROM category_ids WHERE name = 'Client Projects')),

('WEBZOO - Digital Marketing Agency', 'Digital Marketing Experts providing Professional SEO Services & Advanced Social Media Management', 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=225&fit=crop',
ARRAY['Digital Marketing', 'SEO', 'Social Media', 'Web Design'], 
'https://github.com/TUSHARXP-10', 'https://webzoo-agency.vercel.app', 'Live', true,
(SELECT id FROM category_ids WHERE name = 'Client Projects')),

('Unicorn Industries - Premium Work Wear', 'Premier Work Wear and industrial clothing solutions with e-commerce functionality', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=225&fit=crop',
ARRAY['E-commerce', 'Fashion', 'Industrial', 'Shopping Cart'], 
'https://github.com/TUSHARXP-10', 'https://unicorn-industries.vercel.app', 'Live', false,
(SELECT id FROM category_ids WHERE name = 'Client Projects')),

('The We Shop - Grocery Delivery', 'Order Online grocery with superfast delivery service and real-time tracking', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=225&fit=crop',
ARRAY['E-commerce', 'Grocery', 'Delivery', 'Real-time'], 
'https://github.com/TUSHARXP-10', 'https://the-we-shop.vercel.app', 'Live', false,
(SELECT id FROM category_ids WHERE name = 'Client Projects')),

('Architexture Scrollscape Gallery', 'Interactive architecture portfolio with smooth scrolling and immersive gallery experience', 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=225&fit=crop',
ARRAY['Architecture', 'Gallery', 'ScrollMagic', 'Portfolio'], 
'https://github.com/TUSHARXP-10', 'https://architexture-gallery.vercel.app', 'Live', false,
(SELECT id FROM category_ids WHERE name = 'Client Projects')),

('Music Store - Instruments & Pro Audio', 'Buy Musical Instruments, Music Books, Pro Audio & more Online with comprehensive catalog', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
ARRAY['E-commerce', 'Music', 'Audio', 'Instruments'], 
'https://github.com/TUSHARXP-10', 'https://music-store-online.vercel.app', 'Live', false,
(SELECT id FROM category_ids WHERE name = 'Client Projects')),

('Raza Perfume - Vibrant Shop Motion', 'Premium perfume e-commerce with vibrant animations and motion design', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=225&fit=crop',
ARRAY['E-commerce', 'Perfume', 'Animation', 'Motion Design'], 
'https://github.com/TUSHARXP-10', 'https://raza-perfume.vercel.app', 'Live', false,
(SELECT id FROM category_ids WHERE name = 'Client Projects')),

('Cologne Spa Pune', 'Premium Wellness & Massage Therapy spa services with booking system', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=225&fit=crop',
ARRAY['Spa', 'Wellness', 'Booking System', 'Healthcare'], 
'https://github.com/TUSHARXP-10', 'https://cologne-spa-pune.vercel.app', 'Live', false,
(SELECT id FROM category_ids WHERE name = 'Client Projects')),

-- Personal Projects
('Cosmic Nebula - Interactive 3D Universe', '3D Interactive UI experience with cosmic themes and immersive space exploration', 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=225&fit=crop',
ARRAY['Three.js', 'WebGL', '3D', 'Interactive', 'Space'], 
'https://github.com/TUSHARXP-10/cosmic-nebula', 'https://cosmic-nebula-3d.vercel.app', 'Live', true,
(SELECT id FROM category_ids WHERE name = 'Personal Projects')),

('Tushar R. Chandane - Portfolio', 'Full-Stack Developer & Cybersecurity Expert personal portfolio with modern design', 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=225&fit=crop',
ARRAY['Portfolio', 'React', 'Personal Branding', 'Responsive'], 
'https://github.com/TUSHARXP-10', 'https://tushar-chandane.vercel.app', 'Live', true,
(SELECT id FROM category_ids WHERE name = 'Personal Projects')),

-- AI & Bots
('Stock Market Sentiment AI Dashboard', 'AI-powered sentiment analysis for Indian stock market with real-time data processing', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop',
ARRAY['Python', 'AI', 'Sentiment Analysis', 'Stock Market', 'India'], 
'https://github.com/TUSHARXP-10/stock-sentiment-ai', 'https://stock-sentiment-india.vercel.app', 'Live', true,
(SELECT id FROM category_ids WHERE name = 'AI & Bots')),

('JARVIS-V01 - AI Assistant', 'Advanced AI assistant with natural language processing and automation capabilities', 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=225&fit=crop',
ARRAY['Python', 'AI', 'NLP', 'Voice Assistant', 'Automation'], 
'https://github.com/TUSHARXP-10/JARVIS-V01', NULL, 'In Progress', true,
(SELECT id FROM category_ids WHERE name = 'AI & Bots')),

('THE-RED-MACHINE - Advanced AI', 'Sophisticated AI system with machine learning capabilities and data processing', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
ARRAY['Python', 'Machine Learning', 'AI', 'Data Processing'], 
'https://github.com/TUSHARXP-10/THE-RED-MACHINE', NULL, 'In Progress', false,
(SELECT id FROM category_ids WHERE name = 'AI & Bots')),

-- Web Applications
('XP Project Management Dashboard', 'Comprehensive project management solution with task tracking and team collaboration', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop',
ARRAY['Python', 'C++', 'Project Management', 'Dashboard', 'Team Collaboration'], 
'https://github.com/TUSHARXP-10/project-management-dashboardxp', 'https://xp-project-dashboard.vercel.app', 'Live', false,
(SELECT id FROM category_ids WHERE name = 'Web Applications')),

-- IoT & Systems
('Smart City Platform', 'IoT-based smart city management system with sensor integration and data analytics', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=225&fit=crop',
ARRAY['IoT', 'Smart City', 'Sensors', 'Data Analytics', 'Urban Planning'], 
'https://github.com/TUSHARXP-10/smart-city-platform', NULL, 'In Progress', true,
(SELECT id FROM category_ids WHERE name = 'IoT & Systems'));

-- Insert personal information
INSERT INTO about (name, bio, email, phone, location, status, skills, social_links, timeline) VALUES
('Tushar R. Chandane', 
'I''m a passionate self-taught Full-Stack Developer and Cybersecurity Expert based in Mumbai, India. Since 2021, I''ve been dedicated to building secure, innovative digital experiences that help businesses grow and succeed in the digital landscape. I craft scalable digital experiences that transform your business vision into powerful, secure web applications.',
'tusharchandane8@gmail.com',
'+91 9082301827',
'Mumbai, India',
'Available for freelance projects',
'{
  "Frontend Development": ["React", "TypeScript", "Next.js", "Tailwind CSS", "React Three Fiber", "Framer Motion"],
  "Backend Development": ["Node.js", "Express.js", "GraphQL", "REST API", "MongoDB", "PostgreSQL"],
  "DevOps & Cloud": ["Docker", "Vercel", "GitHub Actions", "AWS", "CI/CD"],
  "Cybersecurity": ["Penetration Testing", "Nmap", "Burp Suite", "Wireshark", "Kali Linux"]
}',
'{
  "github": "https://github.com/TUSHARXP-10",
  "linkedin": "https://linkedin.com/in/tushar-chandane",
  "email": "tusharchandane8@gmail.com"
}',
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
]');
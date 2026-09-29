-- 1. Create the reels table
CREATE TABLE reels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  src text NOT NULL,
  poster text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE reels ENABLE ROW LEVEL SECURITY;

-- 3. Grant table permissions
GRANT SELECT ON public.reels TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reels TO authenticated;
GRANT ALL ON public.reels TO service_role;

-- 4. Create RLS Policies
CREATE POLICY "Public reels are viewable by everyone." ON reels FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can do everything on reels" ON reels FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- 5. Insert dummy initial data
INSERT INTO reels (title, src, poster, sort_order) VALUES
('Flower reel 1', 'https://mdn.github.io/shared-assets/videos/flower.mp4', 'https://images.unsplash.com/photo-1490682143684-14369e18dce8?q=80&w=600&auto=format&fit=crop', 1),
('Friday reel 1', 'https://mdn.github.io/shared-assets/videos/friday.mp4', 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=600&auto=format&fit=crop', 2),
('Flower reel 2', 'https://mdn.github.io/shared-assets/videos/flower.mp4', 'https://images.unsplash.com/photo-1416879598555-2591eeb00d81?q=80&w=600&auto=format&fit=crop', 3),
('Friday reel 2', 'https://mdn.github.io/shared-assets/videos/friday.mp4', 'https://images.unsplash.com/photo-1463320898484-cdefe81a04ad?q=80&w=600&auto=format&fit=crop', 4),
('Flower reel 3', 'https://mdn.github.io/shared-assets/videos/flower.mp4', 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=600&auto=format&fit=crop', 5),
('Friday reel 3', 'https://mdn.github.io/shared-assets/videos/friday.mp4', 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=600&auto=format&fit=crop', 6),
('Flower reel 4', 'https://mdn.github.io/shared-assets/videos/flower.mp4', 'https://images.unsplash.com/photo-1524397057410-1e775ed476f3?q=80&w=600&auto=format&fit=crop', 7),
('Friday reel 4', 'https://mdn.github.io/shared-assets/videos/friday.mp4', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=600&auto=format&fit=crop', 8);



CREATE TABLE public.blogs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  excerpt text not null,
  tag text,
  published_date text not null,
  image_url text not null,
  is_active boolean default true not null,
  sort_order integer default 0 not null
);

-- Enable RLS and setup policies
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.blogs FOR SELECT USING (is_active = true);
CREATE POLICY "Allow admin all access" ON public.blogs FOR ALL USING (
  public.has_role(auth.uid(), 'admin')
);



INSERT INTO public.blogs (title, excerpt, tag, published_date, image_url, sort_order) VALUES
('Best Plants to Gift This Raksha Bandhan', 'Chocolates get eaten. Cards get put in a drawer. A plant, on the other hand, keeps growing on someone''s desk or window...', 'BEST PLANTS FOR GIFTING', 'AUG 05, 2026', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format&fit=crop', 1),
('Home Composting 101: Turn Your Kitchen Scraps into Free Plant Food', 'Every day, Indian households throw out vegetable peels, tea leaves, eggshells, and fruit scraps that could be feeding...', '', 'JUL 25, 2026', 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=800&auto=format&fit=crop', 2),
('Your First Kitchen Garden: 7 Steps to Get Started This Week', 'Fresh coriander whenever a recipe needs it. Tomatoes you know weren''t sprayed with anything. A palak harvest that costs...', '', 'JUL 18, 2026', 'https://images.unsplash.com/photo-1524397057410-1e775ed476f3?q=80&w=800&auto=format&fit=crop', 3);


ALTER TABLE public.blogs ADD COLUMN content text DEFAULT '' NOT NULL;
ALTER TABLE public.blogs ADD COLUMN slug text UNIQUE;

-- We'll try to generate a slug for any existing rows, though you may need to update them manually later
UPDATE public.blogs SET slug = replace(lower(title), ' ', '-');

ALTER TABLE public.blogs ALTER COLUMN slug SET NOT NULL;


CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  product_bought text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS and allow public inserts
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON public.feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read" ON public.feedback FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.feedback (name, location, product_bought, rating, message)
VALUES 
  ('Rajesh Nair', 'Mysuru', 'Ceramic Planters', 5, 'The studio ceramic planters are absolutely phenomenal. They perfectly complement my living room decor. GreenRoots is my go-to for all things plants.'),
  ('Anil Kumar', 'Shivamogga', 'Organic Potting Mix', 5, 'Switched to their organic potting mix six months ago. My balcony garden has never looked better. The delivery is always on time and packaging is eco-friendly.'),
  ('Priya Shankar', 'Hassan', 'Herb Seed Pack', 5, 'The heirloom seeds germinated so quickly and the yield has been fantastic! So fulfilling to grow my own herbs. Ordering this for life.'),
  ('Sunita Reddy', 'Hubballi', 'Indoor Plants', 5, 'As an interior designer, I am very particular about indoor plants. GreenRoots ticks every box — healthy plants, beautiful pots, delivered fresh. My clients love the results!');


-- Drop the restrictive admin-only read policy
DROP POLICY IF EXISTS "Allow admin read" ON public.feedback;

-- Create a new policy that allows anyone (including the public storefront) to read the testimonials
CREATE POLICY "Allow public read" ON public.feedback FOR SELECT USING (true);

ALTER TABLE public.enquiries 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS interested_in text;

-- Allow anyone to submit an enquiry
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON public.enquiries FOR INSERT WITH CHECK (true);


CREATE TABLE public.latest_updates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  text text NOT NULL,
  sort_order integer DEFAULT 0 NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.latest_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to latest_updates"
  ON public.latest_updates FOR SELECT USING (true);

CREATE POLICY "Allow admin full access to latest_updates"
  ON public.latest_updates FOR ALL USING (auth.role() = 'authenticated');


CREATE TABLE public.workforce_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    gallery_urls TEXT, 
    icon TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    about TEXT,
    includes TEXT[],
    cta_heading TEXT,
    cta_note TEXT,
    footnote TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.workforce_pages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the workforce pages
CREATE POLICY "Public read access" ON public.workforce_pages FOR SELECT USING (true);

-- Allow authenticated admins to manage the workforce pages
CREATE POLICY "Admin full access" ON public.workforce_pages FOR ALL TO authenticated USING (true) WITH CHECK (true);



INSERT INTO public.workforce_pages (
    slug, 
    title, 
    description, 
    image_url, 
    gallery_urls, 
    icon, 
    about, 
    includes, 
    cta_heading, 
    cta_note, 
    footnote
) VALUES 
(
    'our-professional-training',
    'Our Professional Training',
    'Every Green Roots trainee undergoes a structured 2-month practical training programme covering the complete range of gardening and horticulture activities.',
    '/images/our-professional-training.png',
    '/images/train-gallery-1.png
/images/train-gallery-2.png
/images/train-gallery-3.png',
    'GraduationCap',
    'Our comprehensive 2-month training program is designed to equip our workforce with all the necessary skills for professional garden care and horticulture. The training is hands-on, practical, and supervised by industry experts.',
    ARRAY[
      'Garden setup and maintenance',
      'Terrace, rooftop and kitchen gardening',
      'Soil and growing-media management',
      'Plant selection and identification',
      'Nursery and seedling management',
      'Plant nutrition and fertilization',
      'Irrigation and water management',
      'Pruning and plant care',
      'Repotting and transplantation',
      'Organic pest and disease management',
      'Composting',
      'Lawn and landscape maintenance',
      'Gardening tools and equipment',
      'Workplace safety and professional conduct'
    ],
    'Hire Trained Professionals',
    'Looking for professionally trained gardening staff? Get in touch with us.',
    'All our trainees undergo rigorous practical assessments.'
),
(
    'training-certification',
    'Training & Certification',
    'After completing the 2-month training programme, every trainee undergoes rigorous assessment to receive their Green Roots Training Certificate.',
    '/images/training-certification.png',
    '/images/cert-showcase-1.png
/images/cert-showcase-2.png
/images/cert-showcase-3.png',
    'Award',
    'We believe in accountability and standards. Successful candidates receive a Green Roots Training Certificate and are eligible for professional deployment. Every deployed professional represents the Green Roots standard.',
    ARRAY[
      'Practical and knowledge-based assessment',
      'Green Roots Training Certificate',
      'Professional Uniform',
      'ID Card provided',
      'Safety Equipment training',
      'Professional Conduct guidelines',
      'Defined Work Standards'
    ],
    'Request Certified Staff',
    'Deploy certified horticulture professionals at your property.',
    'Our certification ensures consistent quality across all locations.'
),
(
    'professional-deployment',
    'Professional Deployment',
    'We provide trained horticulture professionals for a variety of premium locations.',
    '/images/professional-deployment.png',
    '/images/deploy-gallery-1.png
/images/deploy-gallery-2.png
/images/deploy-gallery-3.png',
    'Building2',
    'Green Roots offers an end-to-end workforce solution. We manage the training, deployment, and ongoing professional development of our gardening staff so you receive reliable and scalable solutions, from a single professional to complete horticulture teams.',
    ARRAY[
      'IT & Corporate Campuses',
      'Apartments & Gated Communities',
      'Schools & Educational Institutions',
      'Hotels & Resorts',
      'Hospitals & Institutions',
      'Commercial Properties'
    ],
    'Discuss Deployment',
    'Let''s plan the horticulture workforce deployment for your property.',
    'Scalable teams for any property size.'
),
(
    'quality-audits-supervision',
    'Quality Audits & Supervision',
    'Our service doesn''t end with deployment. Green Roots conducts regular quality audits and performance reviews.',
    '/images/quality-audits-supervision.png',
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2000&auto=format&fit=crop
https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=2000&auto=format&fit=crop
https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2000&auto=format&fit=crop',
    'CheckCircle2',
    'To ensure consistent standards at every client location, we perform regular audits. Where required, we provide corrective training and expert horticulture guidance to maintain our high standards.',
    ARRAY[
      'Garden and plant health checks',
      'Maintenance quality reviews',
      'Attendance and work discipline monitoring',
      'Safety practices evaluation',
      'Professional conduct assessment',
      'Service standards assurance',
      'Client satisfaction surveys'
    ],
    'Learn About Our Standards',
    'Find out how we guarantee quality at every site.',
    'Continuous supervision and expert guidance included.'
);


CREATE TABLE public.category_content (
  id text PRIMARY KEY, -- matches the category ID (e.g., 'gift-hampers')
  description text,
  gallery jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.category_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on category_content" 
  ON public.category_content FOR SELECT USING (true);

-- Allow authenticated users (admin) to modify
CREATE POLICY "Allow authenticated users to modify category_content" 
  ON public.category_content FOR ALL USING (auth.role() = 'authenticated');

INSERT INTO public.category_content (id, description, gallery) VALUES 
(
  'gift-hampers', 
  'Discover our beautifully curated gift hampers, perfect for any occasion. Each hamper is thoughtfully assembled with eco-friendly products, vibrant plants, and premium accessories to bring joy and nature to your loved ones.', 
  '["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80", "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&q=80", "https://images.unsplash.com/photo-1577998634865-c7e63b655f4d?w=800&q=80"]'::jsonb
),
(
  'corporate-gifting', 
  'Elevate your corporate gifting with our premium selection of green gifts. From elegant desktop plants to bespoke sustainable kits, our corporate gifts are designed to leave a lasting impression on clients and employees alike.', 
  '["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80"]'::jsonb
),
(
  'gift-cards', 
  'Give the gift of choice with GreenRoots gift cards. The perfect present for plant lovers and gardening enthusiasts, allowing them to select exactly what their green space needs.', 
  '["https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80"]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET 
  description = EXCLUDED.description,
  gallery = EXCLUDED.gallery,
  updated_at = now();


CREATE TABLE IF NOT EXISTS public.recent_projects (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    image_url text NOT NULL,
    status text NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Enable Row Level Security (RLS)
ALTER TABLE public.recent_projects ENABLE ROW LEVEL SECURITY;
-- Create policy to allow public read access
CREATE POLICY "Public can view active recent projects" 
ON public.recent_projects FOR SELECT 
USING (is_active = true);

INSERT INTO public.recent_projects (title, description, image_url, status, sort_order, is_active)
VALUES
('Corporate Campus Greening', 'Complete landscape overhaul and indoor plant setup for a 5-acre IT park.', '/vegetable-seeds-banner.png', 'Completed', 10, true),
('Eco-Friendly Residential Complex', 'Implementing organic terrace gardens and common area landscaping for 500+ apartments.', '/organic-pest-control-banner.png', 'In Progress', 20, true),
('Hospital Healing Garden', 'Designed and maintained a therapeutic green space for patient recovery and staff relaxation.', '/potting-mix-banner.png', 'Completed', 30, true);


-- Allow admins and super admins to insert, update, and delete projects
CREATE POLICY "Admins can manage recent projects" 
ON public.recent_projects 
FOR ALL 
USING (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin')
);


CREATE TABLE IF NOT EXISTS public.page_views (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    path text NOT NULL,
    visitor_id text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Secure the table (our server functions bypass this to write the logs safely)
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;


-- Create Guidelines table
CREATE TABLE IF NOT EXISTS public.guidelines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.guidelines ENABLE ROW LEVEL SECURITY;

-- Allow public read access to guidelines
CREATE POLICY "Anyone can read guidelines" ON public.guidelines
    FOR SELECT USING (true);

-- Allow admins to insert guidelines
CREATE POLICY "Admins can insert guidelines" ON public.guidelines
    FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update guidelines
CREATE POLICY "Admins can update guidelines" ON public.guidelines
    FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete guidelines
CREATE POLICY "Admins can delete guidelines" ON public.guidelines
    FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Grant access to standard roles
GRANT ALL ON public.guidelines TO service_role, anon, authenticated;

-- Insert initial pages
INSERT INTO public.guidelines (slug, title, content) VALUES
('privacy-policy', 'Privacy Policy', 'Your Privacy Policy content goes here...'),
('terms-of-service', 'Terms of Service', 'Your Terms of Service content goes here...'),
('refund-policy', 'Refund Policy', 'Your Refund Policy content goes here...')
ON CONFLICT (slug) DO NOTHING;

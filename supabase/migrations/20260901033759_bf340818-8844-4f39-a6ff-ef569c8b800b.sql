CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'Leaf',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "Admins can view all services" ON public.services
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert services" ON public.services
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update services" ON public.services
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete services" ON public.services
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.services (slug, title, description, image_url, icon, sort_order) VALUES
('garden-consultancy','Garden Consultancy','Expert guidance for planning and setting up gardens based on your space, needs, and lifestyle.','/services/garden_consultancy_1788056389914.png','MessageCircle',1),
('terrace-rooftop-gardening','Terrace & Rooftop Gardening','Transform your terrace or rooftop into a productive green space with customized garden planning, setup, and guidance.','/services/terrace_rooftop_gardening_1788056478087.png','Sun',2),
('backyard-garden-setup','Backyard Garden Setup','Design and establish beautiful, functional backyard gardens for growing vegetables, herbs, fruits, and other plants.','/services/backyard_garden_setup_1788056493296.png','Trees',3),
('organic-kitchen-garden','Organic Kitchen Garden','Create your own organic kitchen garden and enjoy fresh, chemical-free vegetables and herbs right at your doorstep.','/services/organic_kitchen_garden_1788056503330.png','Leaf',4),
('school-kitchen-garden','School Kitchen Garden','We help schools set up educational kitchen gardens where children can learn about plants, food, soil, sustainability, and healthy eating through hands-on activities.','/services/school_kitchen_garden_1788056516142.png','Building2',5),
('gardening-training-for-children','Gardening Training for Children','Interactive gardening sessions specially designed for playgroup, preschool, and school children, helping them discover the joy of growing plants.','/services/gardening_training_children_1788056542496.png','Sprout',6),
('group-gardening-training','Group Gardening Training','Practical organic gardening training for groups, communities, institutions, schools, and organizations.','/services/group_gardening_training_1788056558620.png','Users',7),
('garden-setup-repotting','Garden Setup & Repotting','From selecting the right plants and containers to soil preparation, planting, and repotting—we provide complete support for your garden.','/services/garden_setup_repotting_1788056571821.png','Flower2',8),
('garden-maintenance','Garden Maintenance','Regular care and maintenance to keep your garden healthy, productive, and beautiful, including plant care, pruning, soil management, and general garden upkeep.','/services/garden_maintenance_1788056584035.png','Scissors',9),
('doorstep-gardening-training','Doorstep Gardening Training','Practical gardening training conducted at your doorstep, making it easy for individuals and families to learn how to grow and maintain their own organic kitchen gardens.','/services/doorstep_gardening_training_1788056600320.png','Home',10),
('organic-gardening-training-setup','Organic Gardening Training & Setup','Complete solutions combining training, garden planning, setup, and ongoing guidance to help you successfully grow organically.','/services/organic_gardening_training_setup_1788056613252.png','FlaskConical',11);
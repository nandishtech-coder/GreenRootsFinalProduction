CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image text NOT NULL,
  price numeric NOT NULL,
  mrp numeric NOT NULL,
  rating numeric DEFAULT 0,
  reviews integer DEFAULT 0,
  variant_label text,
  variants text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  badge text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public categories are viewable by everyone." ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public products are viewable by everyone." ON products FOR SELECT USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins can do everything on categories" ON categories FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can do everything on products" ON products FOR ALL USING (public.has_role(auth.uid(), 'admin'));

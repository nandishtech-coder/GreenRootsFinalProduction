-- 1. Insert Categories
INSERT INTO categories (id, name, is_active, sort_order) VALUES
(gen_random_uuid(), 'Best Sellers', true, 1),
(gen_random_uuid(), 'Plant Care', true, 2),
(gen_random_uuid(), 'Ceramic Planters', true, 3),
(gen_random_uuid(), 'Organic Manures', true, 4);

-- 2. Insert Products
INSERT INTO products (title, image, price, mrp, rating, reviews, variant_label, variants, tags, badge, is_active) VALUES
(
  'Heirloom Vegetable Seed Vault — 12 Varieties', 
  'https://images.unsplash.com/photo-1595858602651-7f9191e45924?w=800&auto=format&fit=crop&q=80', 
  499, 799, 4.8, 1284, 
  'Pack', 
  ARRAY['4 Packs', '8 Packs', '12 Packs'], 
  ARRAY['Best Sellers'], 
  '4 for ₹499', true
),
(
  'Sage Dip Ceramic Planter with Saucer', 
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80', 
  649, 899, 4.7, 512, 
  'Colour', 
  ARRAY['Sage', 'Chalk', 'Terracotta'], 
  ARRAY['Best Sellers', 'Ceramic Planters'], 
  'Sale', true
),
(
  'Terrace-Ready Organic Potting Mix', 
  'https://images.unsplash.com/photo-1585695029111-e40700871d3a?w=800&auto=format&fit=crop&q=80', 
  349, 449, 4.9, 2310, 
  'Size', 
  ARRAY['2 kg', '5 kg', '10 kg'], 
  ARRAY['Best Sellers', 'Plant Care', 'Organic Manures'], 
  'Sale', true
),
(
  'Seaweed Biostimulant Growth Tonic', 
  'https://images.unsplash.com/photo-1629198725175-68a86c6b39d0?w=800&auto=format&fit=crop&q=80', 
  399, 549, 4.6, 874, 
  'Volume', 
  ARRAY['250 ml', '500 ml', '1 L'], 
  ARRAY['Plant Care'], 
  '15% OFF', true
),
(
  'Denim White Ridge Planter', 
  'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&auto=format&fit=crop&q=80', 
  360, 432, 4.8, 120, 
  'Size', 
  ARRAY['Small', 'Large'], 
  ARRAY['Ceramic Planters'], 
  'Sale', true
),
(
  'Bio Organic Floor Cleaner', 
  'https://images.unsplash.com/photo-1584824486509-112e4181f1b6?w=800&auto=format&fit=crop&q=80', 
  299, 399, 4.7, 620, 
  'Volume', 
  ARRAY['500 ml', '1 L'], 
  ARRAY['Plant Care'], 
  NULL, true
);

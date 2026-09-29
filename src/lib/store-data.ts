import seeds from "@/assets/p-seeds.jpg";
import ceramic from "@/assets/p-ceramic.jpg";
import mix from "@/assets/p-mix.jpg";
import nutrient from "@/assets/p-nutrient.jpg";
import tools from "@/assets/p-tools.jpg";
import plants from "@/assets/p-plants.jpg";
import gifting from "@/assets/gifting.jpg";

export type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  variantLabel?: string;
  variant_label?: string | null;
  variants: string[];
  tags: string[];
  badge?: string | null;
};

export const CATEGORY_TABS = [
  "All",
  "Best Sellers",
  "Plant Care",
  "Ceramic Planters",
  "Organic Manures",
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Heirloom Vegetable Seed Vault — 12 Varieties",
    image: seeds,
    price: 499,
    mrp: 799,
    rating: 4.8,
    reviews: 1284,
    variantLabel: "Pack",
    variants: ["4 Packs", "8 Packs", "12 Packs"],
    tags: ["Best Sellers"],
    badge: "4 for ₹499",
  },
  {
    id: "p2",
    title: "Sage Dip Ceramic Planter with Saucer",
    image: ceramic,
    price: 649,
    mrp: 899,
    rating: 4.7,
    reviews: 512,
    variantLabel: "Colour",
    variants: ["Sage", "Chalk", "Terracotta"],
    tags: ["Best Sellers", "Ceramic Planters"],
    badge: "Sale",
  },
  {
    id: "p3",
    title: "Terrace-Ready Organic Potting Mix",
    image: mix,
    price: 349,
    mrp: 449,
    rating: 4.9,
    reviews: 2310,
    variantLabel: "Size",
    variants: ["2 kg", "5 kg", "10 kg"],
    tags: ["Best Sellers", "Plant Care", "Organic Manures"],
    badge: "Sale",
  },
  {
    id: "p4",
    title: "Seaweed Biostimulant Growth Tonic",
    image: nutrient,
    price: 399,
    mrp: 549,
    rating: 4.6,
    reviews: 874,
    variantLabel: "Volume",
    variants: ["250 ml", "500 ml", "1 L"],
    tags: ["Plant Care"],
    badge: "15% OFF",
  },
  {
    id: "p5",
    title: "Balcony Gardener 5-Piece Tool Kit",
    image: tools,
    price: 1099,
    mrp: 1599,
    rating: 4.7,
    reviews: 431,
    variantLabel: "Kit",
    variants: ["Essential", "Pro"],
    tags: ["Best Sellers"],
    badge: "Sale",
  },
  {
    id: "p6",
    title: "Air-Purifying Indoor Plant Trio",
    image: plants,
    price: 899,
    mrp: 1199,
    rating: 4.8,
    reviews: 965,
    variantLabel: "Set",
    variants: ["Trio", "Quintet"],
    tags: ["Best Sellers"],
  },
  {
    id: "p7",
    title: "Vermicompost Enriched Organic Manure",
    image: mix,
    price: 279,
    mrp: 379,
    rating: 4.8,
    reviews: 1544,
    variantLabel: "Size",
    variants: ["1 kg", "3 kg", "5 kg"],
    tags: ["Organic Manures", "Plant Care"],
  },
  {
    id: "p8",
    title: "Neem Shield Organic Pest Control Spray",
    image: nutrient,
    price: 329,
    mrp: 429,
    rating: 4.5,
    reviews: 612,
    variantLabel: "Volume",
    variants: ["250 ml", "500 ml"],
    tags: ["Plant Care"],
    badge: "15% OFF",
  },
  {
    id: "p9",
    title: "Fluted Studio Ceramic Pot — Matte White",
    image: ceramic,
    price: 799,
    mrp: 1099,
    rating: 4.6,
    reviews: 288,
    variantLabel: "Size",
    variants: ['4"', '6"', '8"'],
    tags: ["Ceramic Planters"],
    badge: "Sale",
  },
  {
    id: "p10",
    title: "Grow-Your-Own Herb Gift Hamper",
    image: gifting,
    price: 1249,
    mrp: 1699,
    rating: 4.9,
    reviews: 356,
    variantLabel: "Hamper",
    variants: ["Petite", "Signature"],
    tags: ["Best Sellers"],
    badge: "Gifting",
  },
  {
    id: "p11",
    title: "Kitchen Windowsill Herb Seed Set",
    image: seeds,
    price: 399,
    mrp: 599,
    rating: 4.7,
    reviews: 742,
    variantLabel: "Pack",
    variants: ["4 Packs", "6 Packs"],
    tags: ["Best Sellers"],
  },
  {
    id: "p12",
    title: "Cocopeat + Perlite Root Booster Blend",
    image: mix,
    price: 249,
    mrp: 329,
    rating: 4.6,
    reviews: 419,
    variantLabel: "Size",
    variants: ["2 kg", "5 kg"],
    tags: ["Plant Care", "Organic Manures"],
  },
  {
    id: "p13",
    title: "Denim White Ridge Planter",
    image: ceramic,
    price: 360,
    mrp: 432,
    rating: 4.8,
    reviews: 120,
    variantLabel: "Size",
    variants: ["Small", "Large"],
    tags: ["Ceramic Planters"],
    badge: "Sale",
  },
  {
    id: "p14",
    title: "Golden Baby Ceramic Planter",
    image: ceramic,
    price: 1460,
    mrp: 1752,
    rating: 4.9,
    reviews: 85,
    variantLabel: "Size",
    variants: ["Standard"],
    tags: ["Ceramic Planters"],
    badge: "Sale",
  },
  {
    id: "p15",
    title: "Fluted Facet Ceramic Planter",
    image: ceramic,
    price: 560,
    mrp: 672,
    rating: 4.6,
    reviews: 230,
    variantLabel: "Size",
    variants: ["Standard"],
    tags: ["Ceramic Planters"],
    badge: "Sale",
  },
  {
    id: "p16",
    title: "Vase Ceramic Planter",
    image: ceramic,
    price: 250,
    mrp: 300,
    rating: 4.5,
    reviews: 410,
    variantLabel: "Color",
    variants: ["White", "Green"],
    tags: ["Ceramic Planters"],
    badge: "Sale",
  },
  {
    id: "p17",
    title: "Bio Organic Floor Cleaner",
    image: nutrient,
    price: 299,
    mrp: 399,
    rating: 4.7,
    reviews: 620,
    variantLabel: "Volume",
    variants: ["500 ml", "1 L"],
    tags: ["Plant Care"],
  },
  {
    id: "p18",
    title: "Neem Leaf Wash",
    image: nutrient,
    price: 349,
    mrp: 449,
    rating: 4.8,
    reviews: 312,
    variantLabel: "Volume",
    variants: ["250 ml", "500 ml"],
    tags: ["Plant Care"],
    badge: "10% OFF",
  },
  {
    id: "p19",
    title: "Citronella Oil Surface Cleaner",
    image: nutrient,
    price: 249,
    mrp: 299,
    rating: 4.6,
    reviews: 180,
    variantLabel: "Volume",
    variants: ["500 ml", "1 L"],
    tags: ["Plant Care"],
  },
  {
    id: "p20",
    title: "Natural Dish Wash for Garden Tools",
    image: mix,
    price: 199,
    mrp: 249,
    rating: 4.9,
    reviews: 94,
    variantLabel: "Volume",
    variants: ["250 ml"],
    tags: ["Plant Care"],
  },
];

export const NAV = [
  {
    label: "Our Services",
    items: [
      "Garden Consultancy",
      "Terrace & Rooftop Gardening",
      "Backyard Garden Setup",
      "Organic Kitchen Garden",
      "School Kitchen Garden",
      "Gardening Training for Children",
      "Group Gardening Training",
      "Garden Setup & Repotting",
      "Garden Maintenance",
      "Doorstep Gardening Training",
      "Organic Gardening Training & Setup"
    ],
    hrefs: [
      "/service/garden-consultancy",
      "/service/terrace-rooftop-gardening",
      "/service/backyard-garden-setup",
      "/service/organic-kitchen-garden",
      "/service/school-kitchen-garden",
      "/service/gardening-training-for-children",
      "/service/group-gardening-training",
      "/service/garden-setup-repotting",
      "/service/garden-maintenance",
      "/service/doorstep-gardening-training",
      "/service/organic-gardening-training-setup"
    ]
  },
  {
    label: "Professional Horticulture Workforce",
    items: [
      "Our Professional Training",
      "Training & Certification",
      "Professional Deployment",
      "Quality Audits & Supervision"
    ],
    hrefs: [
      "/service/our-professional-training",
      "/service/training-certification",
      "/service/professional-deployment",
      "/service/quality-audits-supervision"
    ]
  },
  {
    label: "Recent Projects & Highlights",
    items: ["View All Projects"],
    hrefs: ["#recent-projects"],
  },
  {
    label: "Seeds",
    items: ["Vegetable Seeds", "Herb Seeds", "Flower Seeds"],
    hrefs: ["/category/vegetable-seeds", "/category/herb-seeds", "/category/flower-seeds"],
  },
  {
    label: "Plant Care",
    items: ["Potting Mix", "Organic Pest Control"],
    hrefs: ["/category/potting-mix", "/category/organic-pest-control"],
  },
  {
    label: "Garden Tools",
    items: ["Hand Tools"],
    hrefs: ["/category/hand-tools"],
  },
];

export const QUICK_CATEGORIES = [
  { label: "Seeds", emoji: "🌰", image: seeds },
  { label: "Ceramic Pots", emoji: "🪴", image: ceramic },
  { label: "Organic Pot Mix", emoji: "🌱", image: mix },
  { label: "Bio-Nutrients", emoji: "🧪", image: nutrient },
  { label: "Garden Tools", emoji: "✂️", image: tools },
  { label: "Gift Hampers", emoji: "🎁", image: gifting },
];

export const BLOGS = [
  {
    title: "Home Composting 101: Turn Scraps into Liquid Gold",
    date: "12 Aug 2026",
    read: "6 min read",
    image: mix,
  },
  {
    title: "7 Easy Herbs to Grow on Your Kitchen Windowsill",
    date: "04 Aug 2026",
    read: "4 min read",
    image: seeds,
  },
  {
    title: "Monsoon Plant Care: Preventing Root Rot",
    date: "28 Jul 2026",
    read: "5 min read",
    image: plants,
  },
];

export const UGC = [
  { handle: "@balcony.banyan", likes: "2.4k", image: plants },
  { handle: "@terrace.tulsi", likes: "1.8k", image: ceramic },
  { handle: "@mumbai_microfarm", likes: "3.1k", image: seeds },
  { handle: "@thegreenbylane", likes: "962", image: gifting },
  { handle: "@potsandplots", likes: "1.2k", image: mix },
];

export const FREE_SHIPPING_THRESHOLD = 1999;

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

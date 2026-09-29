# Verdant Storefront

Create a modern, high-converting E-Commerce Landing Page and Storefront clone inspired by "Multiplex Urban Green" (an urban gardening, seeds, bio-fertilizers, and designer planter brand).

### 🌿 Visual Identity & Theme

- Color Palette: Deep Forest Green (#1E3A2F), Botanical Accent (#2E7D32), Warm Cream/Off-white (#F9FAF7), Neutral Slate (#1F2937).

- Style: Clean, organic, modern direct-to-consumer (D2C) feel with smooth hover effects, rounded-xl borders, subtle shadows, and Lucide React icons.

- Stack: React + Tailwind CSS + Lucide Icons + Shadcn UI components.

---

### 🧱 Page Structure & Components to Build:

1. **Top Announcement Bar:**

   - Dark green background (#1B4332), white text with rotating or scrolling perks: "🌿 Free shipping on orders over ₹1,999", "⚡ Next Day Delivery Available in Metro Areas".

2. **Main Header & Navigation:**

   - Left: Brand logo ("UrbanGreen Co." with a leaf badge).

   - Center: Desktop Navigation Bar with dropdown triggers:

     - Seeds (Vegetables, Herbs, Flower Seeds)

     - Plants (Indoor, Succulents, Bonsai)

     - Pots & Planters (Ceramic, Clay, FRP, Metal, Hanging)

     - Plant Care (Potting Mix, Biostimulants, Organic Pest Control)

     - Garden Tools & Accessories

     - Green Gifts

   - Right: Interactive Search bar (with modal popup), Wishlist counter, User Profile icon, and a slide-over Cart Drawer button with item counter badge.

3. **Hero Banner Section:**

   - Hero Slider / Carousel with modern lifestyle imagery, headline "Urban Gardening Made Effortless", subtext, "Shop Best Sellers" (primary green button) and "Explore Kits" (secondary outline button).

4. **Category Quick-Nav (Circle/Pill Icon Grid):**

   - Horizontal scrolling or 6-column flex container with circular image cards:

     - 🌰 Seeds

     - 🪴 Ceramic Pots

     - 🌱 Organic Pot Mix

     - 🧪 Bio-Nutrients

     - ✂️ Garden Tools

     - 🎁 Gift Hampers

5. **Discount Highlight Promo Cards (2x2 or 4-col Grid):**

   - Interactive promo cards with badges: "Seed Packs: 4 for ₹499", "Plant Care: Flat 15% OFF", "Designer Planters: Starting at ₹199".

6. **Featured Products Section with Filter Tabs:**

   - Tabs: [All, Best Sellers, Plant Care, Ceramic Planters, Organic Manures].

   - Product Card UI: Image hover zoom, Discount badge ("Sale"), Title, Quantity/Variant selector (e.g. 250ml / 500ml / 1L or Colors), Price with strike-through MRP, and an active "Add to Cart" button that increments the cart state.

7. **Mid-Page Split Feature Banner:**

   - Highlighting "Gifts That Keep Growing" with an image on one side, title, supporting copy, and CTA: "Explore Gifting Sets".

8. **Trust Badges & Value Proposition Ribbon:**

   - 4-grid feature bar with soft green background:

     - 🛡️ 100% Organic & Non-Toxic (Safe for pets & kids)

     - 🏡 Specially curated for Balcony & Terrace spaces

     - 🚚 Express Pan-India Delivery

     - 🌿 Backed by 50+ Years of Agri Science

9. **Gardening Guides & Blog Section:**

   - 3 modern blog cards:

     - "Home Composting 101: Turn Scraps into Liquid Gold"

     - "7 Easy Herbs to Grow on Your Kitchen Windowsill"

     - "Monsoon Plant Care: Preventing Root Rot"

   - Include date, read time, and "Read Article ->" link.

10. **Instagram Community UGC Gallery:**

    - 5-column grid showing mock customer garden setups with hover overlay showing Instagram handles and like counts.

11. **Comprehensive Footer:**

    - Left: Brand mission, WhatsApp support button ("Chat with Agri-Expert"), physical store location.

    - Middle: Quick Links (Collections, Plant Care Guide, Track Order, Shipping FAQs).

    - Right: Newsletter signup ("Get 10% off your first order + free gardening guide").

    - Bottom: Copyright notice, social icons, and accepted payment badge icons (UPI, Visa, Mastercard, NetBanking).

---

### ⚙️ Interactive State & Functionality:

- Implement a fully functional **Slide-over Cart Drawer** using React State (Add to cart, increase/decrease quantity, remove item, subtotal calculation, free shipping progress bar).

- Include mock data for 8-12 products with ratings, prices in INR (₹), and variant selectors.

- Fully responsive across mobile, tablet, and desktop views.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/70e5c3ce-033b-4c83-ab1e-bc637bd685c0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

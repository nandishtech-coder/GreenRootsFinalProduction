import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Sections";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider } from "@/components/store/cart";
import { Reveal } from "@/components/store/Reveal";
import { Gift, Briefcase, CreditCard, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/green-gifts")({
  component: GreenGiftsPage,
});

const GREEN_GIFTS_CATEGORIES = [
  {
    id: "gift-hampers",
    name: "Gift Hampers",
    description: "Beautifully curated gift hampers for any occasion.",
    icon: Gift,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    link: "/category/gift-hampers",
  },
  {
    id: "corporate-gifting",
    name: "Corporate Gifting",
    description: "Premium green gifts for clients and employees.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    link: "/category/corporate-gifting",
  },
  {
    id: "gift-cards",
    name: "Gift Cards",
    description: "Give the gift of choice with GreenRoots gift cards.",
    icon: CreditCard,
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&q=80",
    link: "/category/gift-cards",
  },
];

function GreenGiftsPage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-[#fdfaf6]">
        <Header />
        
        <main className="flex-1 pb-24 pt-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal variant="down">
              <div className="text-center mb-16">
                <h1 className="font-display text-4xl font-bold tracking-tight text-forest sm:text-6xl">
                  Green Gifts
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-forest/80">
                  Gifts that keep on growing. Explore our curated collections for your loved ones, clients, and friends.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {GREEN_GIFTS_CATEGORIES.map((category, index) => (
                <Reveal key={category.id} variant="up" delay={index * 100} className="h-full">
                  <Link 
                    to={category.link}
                    className="group flex flex-col h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border transition-all hover:shadow-md hover:ring-leaf/50"
                  >
                    <div className="relative mb-6 overflow-hidden rounded-xl h-48">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-leaf/10 text-leaf">
                        <category.icon className="size-5" />
                      </div>
                      <h2 className="font-display text-2xl font-semibold text-forest">
                        {category.name}
                      </h2>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      {category.description}
                    </p>
                    
                    <div className="mt-auto pt-4 flex items-center text-leaf font-medium group-hover:translate-x-1 transition-transform">
                      Explore category <ArrowRight className="ml-2 size-4" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </main>

        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

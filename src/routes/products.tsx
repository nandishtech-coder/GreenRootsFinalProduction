import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/store/Header";
import { Footer, FeaturedProducts } from "@/components/store/Sections";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider } from "@/components/store/cart";
import { Reveal } from "@/components/store/Reveal";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-[#fdfaf6]">
        <Header />
        
        <main className="flex-1 pb-24 pt-8">
          <Reveal variant="down">
            <FeaturedProducts />
          </Reveal>
        </main>

        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

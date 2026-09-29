import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Sections";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider, useCart } from "@/components/store/cart";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listProducts } from "@/lib/products.functions";
import { inr } from "@/lib/store-data";
import { ProductCard } from "@/components/store/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/store/Reveal";
import { PageLoader } from "@/components/store/PageLoader";

export const Route = createFileRoute("/product/$id")({
  component: ProductPageWrapper,
});

function ProductPageWrapper() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans">
        <Header />
        <main>
          <ProductPage />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

function ProductPage() {
  const { id } = Route.useParams();
  const fetchProducts = useServerFn(listProducts);
  const { data: products = [], isPending } = useQuery({
    queryKey: ["products", "public"],
    queryFn: () => fetchProducts(),
  });

  const product = products.find((p) => p.id === id);
  const { add, setQty, setOpen, lines } = useCart();

  const [variant, setVariant] = useState(product?.variants[0] ?? "Default");
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState<
    "idle" | "checking" | "available" | "unavailable"
  >("idle");

  if (isPending) {
    return <PageLoader />;
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold text-forest">Product not found</h2>
      </div>
    );
  }

  const cartLine = lines.find((l) => l.key === `${product.id}::${variant}`);
  const qty = cartLine ? cartLine.qty : 0;
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const similarProducts = products.filter(
    (p) => p.id !== product.id && p.tags.some((t) => product.tags.includes(t)),
  ).slice(0, 4);
  if (similarProducts.length < 4) {
    similarProducts.push(
      ...products.filter((p) => p.id !== product.id && !similarProducts.includes(p)).slice(
        0,
        4 - similarProducts.length,
      ),
    );
  }

  const handleCheckDelivery = () => {
    if (pincode.length !== 6) return;
    setDeliveryStatus("checking");
    setTimeout(() => {
      setDeliveryStatus("available");
    }, 1000);
  };

  return (
    <div className="mx-auto w-full px-4 py-8 lg:px-8 lg:py-12">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left Column: Image */}
        <Reveal variant="zoom">
          <div className="hover-zoom-media relative aspect-square overflow-hidden rounded-2xl bg-secondary md:aspect-[4/3] lg:aspect-square">
            <img src={product.image} alt={product.title} className="size-full object-cover" />
            {product.badge && (
              <Badge className="absolute top-4 left-4 rounded-full text-sm px-3 py-1">
                {product.badge}
              </Badge>
            )}
          </div>
        </Reveal>

        {/* Right Column: Details */}
        <Reveal variant="right" className="flex flex-col">
          <div className="flex flex-col">

          {product.badge === "Sale" && (
            <div className="mb-4 inline-block bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-semibold tracking-wider uppercase w-fit">
              Sale
            </div>
          )}

          <h1 className="font-display text-3xl font-semibold text-forest md:text-4xl lg:text-5xl">
            {product.title}
          </h1>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-xl text-muted-foreground line-through">{inr(product.mrp)}</span>
            <span className="text-3xl font-bold text-forest">{inr(product.price)}</span>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              {product.variant_label || "Brand"}
            </h3>
            {product.variants && product.variants.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={cn(
                      "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                      variant === v
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50",
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm font-medium text-forest">Multiplex GreenRoots</p>
            )}
          </div>

          <div className="mt-6 flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-primary" />
            <span className="text-sm font-medium text-forest">In stock</span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {qty > 0 ? (
              <div className="flex h-12 w-32 items-center justify-between rounded-xl border border-border bg-card px-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground hover:text-forest"
                  onClick={() => setQty(`${product.id}::${variant}`, qty - 1)}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="text-base font-semibold text-forest">{qty}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground hover:text-forest"
                  onClick={() => add(product, variant, false)}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            ) : (
              <div className="flex h-12 w-32 items-center justify-between rounded-xl border border-border bg-card px-2 opacity-50">
                <Button variant="ghost" size="icon" className="size-8" disabled>
                  <Minus className="size-4" />
                </Button>
                <span className="text-base font-semibold text-forest">0</span>
                <Button variant="ghost" size="icon" className="size-8" disabled>
                  <Plus className="size-4" />
                </Button>
              </div>
            )}

            {qty > 0 ? (
              <Button className="h-12 flex-1 rounded-xl text-base" onClick={() => setOpen(true)}>
                Go to Cart
              </Button>
            ) : (
              <Button
                className="h-12 flex-1 rounded-xl text-base"
                onClick={() => add(product, variant, false)}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
        </Reveal>
      </div>

      {/* About Section */}
      <Reveal variant="up">
        <div className="mt-20 border-t border-border pt-12">
          <h2 className="font-display text-2xl font-semibold text-forest">About the Product</h2>
          <div className="mt-6 max-w-4xl text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {product.description || `Elevate your indoor and outdoor spaces with this premium ${product.title.toLowerCase()}.
This elegant piece combines timeless design with practical functionality. Crafted from
premium materials, it showcases a smooth, refined finish available in versatile tones
that complement any décor style. Perfect for displaying flowering plants, ornamental
foliage, or succulents, this transforms living spaces into lush, curated environments.
Whether placed on a patio, balcony, or living room, it brings sophistication and natural
beauty to your home.`}
          </div>

          <div className="mt-10 grid max-w-2xl gap-y-4">
            <div className="grid grid-cols-3 py-3 border-b border-border/50 transition-colors hover:bg-secondary/60">
              <span className="font-medium text-forest">Material Type:</span>
              <span className="col-span-2 text-muted-foreground">{product.material_type || "Premium Quality"}</span>
            </div>
            <div className="grid grid-cols-3 py-3 border-b border-border/50 transition-colors hover:bg-secondary/60">
              <span className="font-medium text-forest">Weight:</span>
              <span className="col-span-2 text-muted-foreground">{product.weight || "Standard"}</span>
            </div>
            <div className="grid grid-cols-3 py-3 transition-colors hover:bg-secondary/60">
              <span className="font-medium text-forest">Customer Support:</span>
              <span className="col-span-2 text-muted-foreground">{product.customer_support || "8453084530"}</span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Similar Products */}
      <Reveal variant="up">
        <div className="mt-24">
          <h2 className="text-center font-display text-3xl font-semibold text-forest">
            You may also like
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </Reveal>

    </div>
  );
}

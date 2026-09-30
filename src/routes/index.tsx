import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/components/store/cart";
import { Reveal } from "@/components/store/Reveal";
import { CartDrawer } from "@/components/store/CartDrawer";
import { Header } from "@/components/store/Header";
import {
  FanFavorites,
  LatestBlogs,
} from "@/components/store/FeatureSections";
import {
  InstagramReels,
  OurServices,
  ProductRow,
  Footer,
  Hero,
  MainServices,
  TrustRibbon,
  FeaturedProducts,
} from "@/components/store/Sections";
import { HorticultureWorkforce } from "@/components/store/HorticultureWorkforce";
import {
  ReviewsSection,
  ContactSection,
  MapSection,
  StatsSection,
} from "@/components/store/ExtraSections";

const title = "GreenRoots — Seeds, Planters & Organic Plant Care";
const description =
  "Shop heirloom seeds, studio ceramic planters, organic potting mix and bio-nutrients for balcony and terrace gardens. Free shipping over ₹1,999.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

let hasInitiallyLoaded = false;

function Index() {
  const [isLoading, setIsLoading] = useState(!hasInitiallyLoaded);

  useEffect(() => {
    if (hasInitiallyLoaded) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      hasInitiallyLoaded = true;
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // After the intro loader finishes, honor any hash in the URL (e.g. /#services).
  useEffect(() => {
    if (isLoading) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(t);
  }, [isLoading]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans">
        <Header />
        <main>
          {isLoading ? (
            <div className="flex h-[80vh] flex-col items-center justify-center gap-10">
              <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute size-32 rounded-full border-[4px] border-forest/20 border-t-forest animate-[spin_2s_linear_infinite]" />

                {/* Inner Ring */}
                <div className="absolute size-24 rounded-full border-[4px] border-clay/20 border-b-clay border-l-clay animate-[spin_1.5s_linear_infinite_reverse]" />

                {/* Center Logo */}
                <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-forest text-cream shadow-xl">
                  <Leaf className="size-7 animate-pulse" />
                </div>
              </div>
              <p className="font-display text-2xl font-semibold text-forest tracking-wide animate-pulse mt-8">
                Growing your experience...
              </p>
            </div>
          ) : (
            <>
              <Reveal variant="left">
                <Hero />
              </Reveal>
              <Reveal variant="left">
                <MainServices />
              </Reveal>
              <Reveal variant="left">
                <HorticultureWorkforce />
              </Reveal>
              <Reveal variant="left">
                <InstagramReels />
              </Reveal>
              <Reveal variant="left">
                <OurServices />
              </Reveal>
              <Reveal variant="left">
                <FanFavorites />
              </Reveal>
              <Reveal variant="left">
                <FeaturedProducts />
              </Reveal>
              <Reveal variant="left">
                <LatestBlogs />
              </Reveal>
              <Reveal variant="left">
                <ReviewsSection />
              </Reveal>
              <Reveal variant="left">
                <ContactSection />
              </Reveal>
              <Reveal variant="left">
                <MapSection />
              </Reveal>
              <Reveal variant="left">
                <StatsSection />
              </Reveal>
            </>
          )}
        </main>

        <Reveal variant="left">
          <Footer />
        </Reveal>
        <CartDrawer />
      </div>
    </CartProvider>
  );
}


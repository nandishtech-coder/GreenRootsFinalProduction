import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Sections";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider } from "@/components/store/cart";
import { Leaf, Heart, Sprout, Target } from "lucide-react";
import { Reveal } from "@/components/store/Reveal";

export const Route = createFileRoute("/about-us")({
  component: AboutUsPage,
});

function AboutUsPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="relative px-4 py-12 lg:px-8 lg:py-20 bg-forest-deep text-cream overflow-hidden">
            <div className="relative mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: Logo */}
              <Reveal variant="right" className="flex justify-center lg:justify-start">
                <div className="flex items-center justify-center drop-shadow-2xl w-full lg:-ml-16 xl:-ml-24">
                  <span className="grid size-[280px] md:size-[400px] lg:size-[480px] shrink-0 place-items-center overflow-hidden rounded-[3rem] md:rounded-[4rem] bg-cream shadow-2xl">
                    <img
                      src="/logo.png"
                      alt="GreenRoots"
                      className="size-full scale-[1.02] object-cover"
                    />
                  </span>
                </div>
              </Reveal>

              {/* Right Column: Text */}
              <div className="text-center lg:text-left">
                <Reveal variant="left">
                  <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-sm font-medium text-cream backdrop-blur-md mb-6">
                    <Leaf className="size-4" />
                    Our Story
                  </span>
                </Reveal>
                <Reveal variant="left" delay={0.1}>
                  <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6">
                    Rooted in Nature, <br /> Growing with You
                  </h1>
                </Reveal>
                <Reveal variant="left" delay={0.2}>
                  <p className="text-lg md:text-xl text-cream/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    At GreenRoots, we believe that everyone deserves a touch of nature, no matter how small their space. We're on a mission to bring sustainable, organic gardening to every balcony and windowsill.
                  </p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Cards Section */}
          <section className="px-4 py-20 lg:px-8 bg-cream/30">
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1: Mission */}
                <Reveal variant="up" delay={0.1}>
                  <div className="group relative h-full flex flex-col bg-white rounded-3xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-forest/10 border border-border/50">
                    <div className="size-14 rounded-2xl bg-forest/5 flex items-center justify-center mb-6 text-forest group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                      <Target className="size-7" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-forest mb-4">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      To empower urban dwellers to cultivate their own green sanctuaries through high-quality, organic gardening supplies and accessible education. We want to make growing food and flowers effortless for everyone.
                    </p>
                  </div>
                </Reveal>

                {/* Card 2: Vision */}
                <Reveal variant="up" delay={0.2}>
                  <div className="group relative h-full flex flex-col bg-white rounded-3xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-forest/10 border border-border/50">
                    <div className="size-14 rounded-2xl bg-forest/5 flex items-center justify-center mb-6 text-forest group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                      <Sprout className="size-7" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-forest mb-4">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      A greener, healthier future where every home connects with nature. We envision cities transformed by balcony gardens, rooftop farms, and communities deeply rooted in sustainable practices.
                    </p>
                  </div>
                </Reveal>

                {/* Card 3: Values */}
                <Reveal variant="up" delay={0.3}>
                  <div className="group relative h-full flex flex-col bg-white rounded-3xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-forest/10 border border-border/50">
                    <div className="size-14 rounded-2xl bg-forest/5 flex items-center justify-center mb-6 text-forest group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                      <Heart className="size-7" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-forest mb-4">Our Values</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      Integrity, sustainability, and community. We curate only 100% organic, non-toxic products, support local artisans for our planters, and foster a welcoming space for both novice and expert gardeners.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Story/Text Section */}
          <section className="px-4 py-20 lg:px-8">
            <div className="mx-auto max-w-5xl text-center mb-12">
              <Reveal variant="up">
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-forest">
                  From a small balcony to a nationwide community
                </h2>
              </Reveal>
            </div>
            
            <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Reveal variant="up" delay={0.1}>
                <div className="h-full flex flex-col bg-white rounded-3xl p-8 shadow-sm border border-border/50 text-left hover:shadow-md transition-shadow">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    It started with a single peace lily and a dream. Today, GreenRoots is a trusted partner for thousands of plant parents across India. We source the finest heirloom seeds, formulate research-backed organic nutrients, and hand-pick the best studio ceramics.
                  </p>
                </div>
              </Reveal>
              <Reveal variant="up" delay={0.2}>
                <div className="h-full flex flex-col bg-white rounded-3xl p-8 shadow-sm border border-border/50 text-left hover:shadow-md transition-shadow">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Every product you see in our store has been tested and loved in our own gardens. When you shop with us, you're not just buying a plant or a pot—you're joining a movement towards a more vibrant, resilient, and green world.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Photo Gallery */}
            <div className="mx-auto max-w-6xl space-y-6">
              <Reveal variant="up" delay={0.3}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-sm group">
                    <img 
                      src="/vegetable-seeds-banner.png" 
                      alt="Vegetable Seeds"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-sm group">
                    <img 
                      src="/potting-mix-banner.png" 
                      alt="Potting Mix"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-sm group">
                    <img 
                      src="/organic-pest-control-banner.png" 
                      alt="Organic Pest Control"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
              </Reveal>
              
              <Reveal variant="up" delay={0.4}>
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-sm group">
                  <img 
                    src="/flower-seeds-banner.png" 
                    alt="GreenRoots Community"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                  />
                </div>
              </Reveal>
            </div>
          </section>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

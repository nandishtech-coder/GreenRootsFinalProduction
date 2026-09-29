import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Gift,
  Instagram,
  Heart,
  Leaf,
  MapPin,
  MessageCircle,
  Facebook,
  Youtube,
  ShieldCheck,
  Loader2,
  Home,
  Truck,
  FlaskConical,
  Clock,
  CalendarDays,
  Search,
  Phone,
  Mail,
  ArrowUp,
  Video,
  X,
  ArrowLeft,
  Building2,
  Flower2,
  Sprout,
  Trees,
  Star,
  Scissors,
  Sun,
  Users,
  GraduationCap,
  BookOpen,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listServices } from "@/lib/services.functions";
import { listProducts, listCategories } from "@/lib/products.functions";
import { listReels } from "@/lib/reels.functions";
import { serviceIcon } from "@/lib/service-icons";
import { BLOGS, PRODUCTS } from "@/lib/store-data";

import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";
import hero from "@/assets/hero-balcony.jpg";
import gifting from "@/assets/gifting.jpg";
import plants from "@/assets/p-plants.jpg";
import ceramic from "@/assets/p-ceramic.jpg";
import servicesPeaceLily from "@/assets/services-peace-lily.jpg";
import villageFarm from "@/assets/village-farm.png";
import imgGardenConsultancy from "@/assets/services/garden_consultancy_1788056389914.png";
import imgTerraceRooftopGardening from "@/assets/services/terrace_rooftop_gardening_1788056478087.png";
import imgBackyardGardenSetup from "@/assets/services/backyard_garden_setup_1788056493296.png";
import imgOrganicKitchenGarden from "@/assets/services/organic_kitchen_garden_1788056503330.png";
import imgSchoolKitchenGarden from "@/assets/services/school_kitchen_garden_1788056516142.png";
import imgGardeningTrainingChildren from "@/assets/services/gardening_training_children_1788056542496.png";
import imgGroupGardeningTraining from "@/assets/services/group_gardening_training_1788056558620.png";
import imgGardenSetupRepotting from "@/assets/services/garden_setup_repotting_1788056571821.png";
import imgGardenMaintenance from "@/assets/services/garden_maintenance_1788056584035.png";
import imgDoorstepGardeningTraining from "@/assets/services/doorstep_gardening_training_1788056600320.png";
import imgOrganicGardeningTrainingSetup from "@/assets/services/organic_gardening_training_setup_1788056613252.png";

const SLIDES = [
  {
    image: villageFarm,
    eyebrow: "New season · Monsoon ready",
    title: "GreenRoots Gardening Made Effortless",
    copy: "Seeds, bio-fertilisers and designer planters curated for balconies, terraces and tiny windowsills.",
  },
  {
    image: plants,
    eyebrow: "Bestselling collection",
    title: "Greener Corners, Cleaner Air",
    copy: "Hand-picked indoor plants that thrive in low light and forgive a missed watering or two.",
  },
  {
    image: ceramic,
    eyebrow: "Studio-made in India",
    title: "Planters Worth Showing Off",
    copy: "Small-batch ceramic, clay and metal planters finished by hand, from ₹199.",
  },
];

function ScrollableRow({ children, className }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const rafRef = useRef<number>(0);
  const [scrollDir, setScrollDir] = useState<number>(0);

  useEffect(() => {
    if (scrollDir === 0) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const scrollStep = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += scrollDir * 4; // Adjust speed here
      }
      rafRef.current = requestAnimationFrame(scrollStep);
    };

    rafRef.current = requestAnimationFrame(scrollStep);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollDir]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeftState(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setScrollDir(0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scrollRef.current) {
      e.preventDefault();
      const x = e.pageX - (scrollRef.current.offsetLeft || 0);
      const walk = (x - startX) * 1.5;
      scrollRef.current.scrollLeft = scrollLeftState - walk;
      setScrollDir(0);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const edgeSize = 100;

    if (x < edgeSize) {
      setScrollDir(-1);
    } else if (rect.width - x < edgeSize) {
      setScrollDir(1);
    } else {
      setScrollDir(0);
    }
  };

  return (
    <>
      <style>{`.hide-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div
        ref={scrollRef}
        className={cn(
          "flex overflow-x-auto hide-scroll gap-4 sm:gap-6 cursor-grab active:cursor-grabbing select-none",
          className
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>
    </>
  );
}

export function Hero() {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;
    const id = setInterval(() => api.scrollNext(), 3000);
    return () => clearInterval(id);
  }, [api]);

  return (
    <section id="top" className="px-4 pt-6 pb-2 lg:px-8">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out 3s infinite;
        }
      `}</style>
      <div className="mx-auto w-full relative">
        <div className="absolute top-10 right-10 md:top-16 md:right-32 z-20 hidden md:flex items-center gap-4 rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] animate-float">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
            <Star className="size-6 fill-current" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Customer Rating</p>
            <p className="text-lg font-bold text-forest">4.9 / 5.0</p>
          </div>
        </div>

        <div className="absolute bottom-10 right-16 md:bottom-24 md:right-56 z-20 hidden md:flex items-center gap-4 rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] animate-float-delayed pointer-events-none">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
            <Sprout className="size-6" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Today's Harvest</p>
            <p className="text-lg font-bold text-forest">Fresh Picked Today</p>
          </div>
        </div>

        <Carousel setApi={setApi} opts={{ loop: true }} className="overflow-hidden rounded-3xl">
          <CarouselContent className="ml-0">
            {SLIDES.map((s, i) => (
              <CarouselItem key={s.title} className="pl-0">
                <div className="relative min-h-[440px] overflow-hidden rounded-3xl lg:min-h-[560px]">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    width={1600}
                    height={1008}
                    className="absolute inset-0 size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/70 to-forest/10" />

                  <div className="relative flex min-h-[440px] max-w-2xl flex-col justify-center gap-5 p-8 lg:min-h-[560px] lg:p-16">
                    <Badge
                      variant="secondary"
                      className="w-fit rounded-full bg-cream/15 text-cream backdrop-blur"
                    >
                      <Leaf className="size-3.5" />
                      {s.eyebrow}
                    </Badge>
                    <h1 className="font-display text-4xl leading-[1.05] font-semibold text-cream lg:text-6xl">
                      {s.title}
                    </h1>
                    <p className="max-w-lg text-base text-cream/80 lg:text-lg">{s.copy}</p>
                    <div className="flex flex-wrap gap-3">
                      <Button size="lg" className="rounded-xl" asChild>
                        <a href="#products">
                          Shop Best Sellers
                          <ArrowRight className="size-4" />
                        </a>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        asChild
                        className="rounded-xl border-cream/60 bg-transparent text-cream hover:bg-cream hover:text-forest"
                      >
                        <a href="#gifting">Explore Kits</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 hidden size-10 border-none bg-cream/90 text-forest lg:flex" />
          <CarouselNext className="right-4 hidden size-10 border-none bg-cream/90 text-forest lg:flex" />
        </Carousel>
      </div>
    </section>
  );
}

/** Services now come from the backend (see src/lib/services.functions.ts). */


export function MainServices() {
  const fetchServices = useServerFn(listServices);
  const { data: services = [], isPending } = useQuery({
    queryKey: ["services", "public"],
    queryFn: () => fetchServices(),
  });

  return (
    <section id="services" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <Leaf className="size-3.5 mr-1.5" />
            Our Services
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-forest mb-6">
            Grow Green. Grow Healthy. Grow at Home.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Green Roots, we help individuals, schools, communities, and organizations create and maintain healthy, sustainable, and organic gardens.
          </p>
        </div>

        {isPending ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-3xl bg-muted" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <p className="text-center text-muted-foreground">No services published yet.</p>
        ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {services.map((service) => {
            const Icon = serviceIcon(service.icon);
            return (
            <Link 
              key={service.id} 
              to="/service/$id"
              params={{ id: service.slug }}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={service.image_url} 
                  alt={service.title} 
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-4 left-4 grid size-10 place-items-center rounded-xl bg-white/90 text-primary backdrop-blur-sm shadow-sm transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="size-5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 pt-5 text-left">
                <h3 className="font-display text-xl font-semibold text-forest mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>
            </Link>
            );
          })}
        </div>
        )}


        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center gap-3 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream shadow-lg text-center max-w-full">
            <Sprout className="size-4 shrink-0" />
            <span className="truncate whitespace-normal">Green Roots — Growing Gardens, Growing Knowledge, Growing a Greener Future.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  const fetchProducts = useServerFn(listProducts);
  const fetchCategories = useServerFn(listCategories);
  
  const { data: products = [], isPending: isProductsPending } = useQuery({
    queryKey: ["products", "public"],
    queryFn: () => fetchProducts(),
  });

  const { data: categories = [], isPending: isCategoriesPending } = useQuery({
    queryKey: ["categories", "public"],
    queryFn: () => fetchCategories(),
  });

  const [tab, setTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");

  const fullText = "Search for products...";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setPlaceholderText(fullText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length + 10) {
        currentIndex = 0;
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const list = products.filter((p) => {
    const matchesTab = tab === "All" || p.tags.includes(tab);
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="products" className="px-4 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto w-full">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-medium tracking-wide text-primary uppercase">
              Featured this week
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-forest lg:text-4xl">
              Everything your balcony needs
            </h2>
          </div>

          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-xl bg-background/50 pl-12 text-forest focus:bg-background transition-colors"
              placeholder={placeholderText}
            />
          </div>

          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="flex-wrap justify-start h-auto rounded-xl bg-secondary p-1">
              <TabsTrigger value="All" className="rounded-lg text-xs sm:text-sm">
                All
              </TabsTrigger>
              {categories.map((c) => (
                <TabsTrigger key={c.id} value={c.name} className="rounded-lg text-xs sm:text-sm">
                  {c.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <ScrollableRow className="mt-10 w-full py-2">
          {isProductsPending ? (
            <div className="w-full py-12 text-center text-muted-foreground flex justify-center">
              <Loader2 className="animate-spin text-forest size-6" />
            </div>
          ) : list.length > 0 ? (
            list.map((p) => (
              <div key={p.id} className="min-w-[160px] max-w-[160px] sm:min-w-[280px] sm:max-w-[280px] shrink-0">
                <ProductCard product={p} />
              </div>
            ))
          ) : (
            <div className="w-full py-12 text-center text-muted-foreground flex flex-col items-center gap-2">
              <span className="font-medium">No products found matching "{searchQuery}"</span>
              <span className="text-sm">Our team will update the products shortly if they become available.</span>
            </div>
          )}
        </ScrollableRow>

      </div>
    </section>
  );
}

export function DynamicCategoryRows() {
  const fetchCategories = useServerFn(listCategories);
  const { data: categories = [], isPending } = useQuery({
    queryKey: ["categories", "public"],
    queryFn: () => fetchCategories(),
  });

  if (isPending) return null;

  return (
    <div className="flex flex-col gap-12 lg:gap-20">
      {categories.map((c) => (
        <Reveal key={c.id} variant="left">
          <ProductRow title={c.name} filterTag={c.name} />
        </Reveal>
      ))}
    </div>
  );
}

export function ProductRow({ title, filterTag }: { title: string, filterTag?: string }) {
  const fetchProducts = useServerFn(listProducts);
  const { data: products = [], isPending } = useQuery({
    queryKey: ["products", "public"],
    queryFn: () => fetchProducts(),
  });

  const list = filterTag ? products.filter(p => p.tags.includes(filterTag)) : products;
  return (
    <section className="px-4 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto w-full">
        <h2 className="text-center font-display text-3xl font-semibold text-forest lg:text-4xl mb-8">
          {title}
        </h2>
        <ScrollableRow className="w-full py-2">
          {isPending ? (
            <div className="w-full py-12 text-center text-muted-foreground flex justify-center">
              <Loader2 className="animate-spin text-forest size-6" />
            </div>
          ) : list.length > 0 ? (
            list.map((p) => (
              <div key={p.id} className="min-w-[160px] max-w-[160px] sm:min-w-[280px] sm:max-w-[280px] shrink-0">
                <ProductCard product={p} />
              </div>
            ))
          ) : (
            <div className="w-full py-12 text-center text-muted-foreground flex flex-col items-center gap-2">
              <span className="font-medium">No products found</span>
              <span className="text-sm">Our team will update the products shortly if they become available.</span>
            </div>
          )}
        </ScrollableRow>

      </div>
    </section>
  );
}

export function GiftingBanner() {
  return (
    <section id="gifting" className="px-4 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto grid w-full overflow-hidden rounded-3xl bg-forest lg:grid-cols-2">
        <div className="relative min-h-72 lg:min-h-[460px]">
          <img
            src={gifting}
            alt="Plant gift hamper with ceramic planter and seed packets"
            loading="lazy"
            width={1200}
            height={912}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-5 p-8 lg:p-14">
          <Badge variant="secondary" className="w-fit rounded-full bg-cream/15 text-cream">
            <Gift className="size-3.5" />
            Corporate & festive gifting
          </Badge>
          <h2 className="font-display text-3xl font-semibold text-cream lg:text-4xl">
            Gifts That Keep Growing
          </h2>
          <p className="max-w-md text-cream/75">
            Curated hampers pairing studio planters with heirloom seeds, organic feed and a simple
            grow guide — packed plastic-free and delivered pan-India with your custom note.
          </p>
          <ul className="grid gap-2 text-sm text-cream/80 sm:grid-cols-2">
            {[
              "Bulk pricing from 25 units",
              "Custom branding & notes",
              "Plastic-free packing",
              "Live plant guarantee",
            ].map((i) => (
              <li key={i} className="flex items-center gap-2">
                <Leaf className="size-4 text-cream/60" />
                {i}
              </li>
            ))}
          </ul>
          <Button size="lg" className="w-fit rounded-xl" asChild>
            <Link to="/green-gifts">
              Explore Gifting Sets
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  {
    icon: ShieldCheck,
    title: "100% Organic & Non-Toxic",
    copy: "Safe around pets, kids and kitchen herbs.",
  },
  {
    icon: Home,
    title: "Built for Balconies",
    copy: "Curated for terrace and small-space growers.",
  },
  { icon: Truck, title: "Express Pan-India Delivery", copy: "Next-day dispatch in metros." },
  {
    icon: FlaskConical,
    title: "50+ Years of Agri Science",
    copy: "Formulations backed by field research.",
  },
];

export function TrustRibbon() {
  return (
    <section className="px-4 py-12 lg:px-8">
      <div className="mx-auto grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST.map((t) => (
          <div key={t.title} className="flex gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-card text-primary shadow-[var(--shadow-soft)]">
              <t.icon className="size-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-forest">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Blogs() {
  return (
    <section className="px-4 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto w-full">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-wide text-primary uppercase">
              Gardening guides
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-forest lg:text-4xl">
              Grow smarter, season by season
            </h2>
          </div>
          <Button variant="outline" className="rounded-xl">
            View all guides
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {BLOGS.map((b) => (
            <article
              key={b.title}
              className="group hover-lift flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  width={900}
                  height={560}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    {b.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {b.read}
                  </span>
                </div>
                <h3 className="font-display text-lg leading-snug font-semibold text-forest">
                  {b.title}
                </h3>
                <a
                  href="#top"
                  className="mt-auto flex items-center gap-1 text-sm font-medium text-primary"
                >
                  Read Article
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReelVideo({
  src,
  poster,
  onClick,
  isPlaying,
}: {
  src: string;
  poster: string;
  onClick: () => void;
  isPlaying: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})/);
    return match ? match[1] : null;
  };

  const ytId = getYouTubeVideoId(src);

  useEffect(() => {
    if (videoRef.current && !ytId) {
      videoRef.current.load();
    }
  }, [src, ytId]);

  useEffect(() => {
    if (videoRef.current && !ytId) {
      if (isPlaying) {
        videoRef.current.play().catch(() => { });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, ytId]);

  return (
    <div className="relative w-full h-full cursor-pointer group bg-black" onClick={onClick}>
      {ytId ? (
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?autoplay=${isPlaying ? 1 : 0}&mute=1&loop=1&playlist=${ytId}&controls=0&modestbranding=1&rel=0`}
          className={`w-full h-full object-cover transition-opacity duration-300 pointer-events-none scale-150 sm:scale-125 ${isPlaying ? 'opacity-100' : 'opacity-70'}`}
          allow="autoplay; encrypted-media"
          frameBorder="0"
          title="YouTube video player"
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      )}
      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full p-2 pointer-events-none">
        <Video className="size-4 text-white" />
      </div>

      {/* Overlay UI - Only fully visible when playing (center) */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}
      />

      <div
        className={`absolute inset-0 flex flex-col justify-between p-4 md:p-6 transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center gap-3">
          <div className="size-8 md:size-10 rounded-full bg-primary/40 backdrop-blur border border-white/40 grid place-items-center">
            <Leaf className="size-4 md:size-5 text-white" />
          </div>
          <span className="text-white font-medium text-xs md:text-sm shadow-black drop-shadow-md">
            greenroots_india
          </span>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-2 md:mb-3 text-white">
            <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80">
              <Heart className="size-5 md:size-6" />
              <span className="text-xs md:text-sm font-medium">104</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80">
              <MessageCircle className="size-5 md:size-6" />
              <span className="text-xs md:text-sm font-medium">0</span>
            </div>
          </div>
          <p className="text-white text-xs md:text-sm drop-shadow-md line-clamp-2">
            Bring nature home! 🌿 Elevate your space with these beauties. #UrbanGardening
          </p>
        </div>
      </div>
    </div>
  );
}

export function InstagramReels() {
  const fetchReels = useServerFn(listReels);
  const { data: reels = [], isPending } = useQuery({
    queryKey: ["reels", "public"],
    queryFn: () => fetchReels(),
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % (reels.length || 1));
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + reels.length) % (reels.length || 1));

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  const positions = [
    { left: "15%", scale: 0.75, zIndex: 10, opacity: 0.5, brightness: "brightness-50" },
    { left: "30%", scale: 0.85, zIndex: 20, opacity: 0.8, brightness: "brightness-75" },
    {
      left: "50%",
      scale: 1,
      zIndex: 30,
      opacity: 1,
      brightness: "brightness-100 shadow-[0_8px_30px_rgb(0,0,0,0.15)]",
    },
    { left: "70%", scale: 0.85, zIndex: 20, opacity: 0.8, brightness: "brightness-75" },
    { left: "85%", scale: 0.75, zIndex: 10, opacity: 0.5, brightness: "brightness-50" },
  ];

  return (
    <section className="py-20 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-display font-semibold text-forest">Follow us on Instagram</h2>
        <p className="text-muted-foreground mt-4">
          Join our community for daily inspiration and a closer look at our creations
        </p>
      </div>

      <div className="relative w-full mx-auto px-4 h-[450px] md:h-[600px] flex items-center justify-center my-10">
        {/* Navigation Arrows */}
        <button
          className="absolute left-4 md:left-8 z-50 grid size-12 place-items-center rounded-full bg-white text-black shadow-lg hover:bg-white/90 transition-colors border-0"
          onClick={handlePrev}
        >
          <ArrowLeft className="size-6" />
        </button>
        <button
          className="absolute right-4 md:right-12 z-50 grid size-12 place-items-center rounded-full bg-white text-black shadow-lg hover:bg-white/90 transition-colors border-0"
          onClick={handleNext}
        >
          <ArrowRight className="size-6" />
        </button>

        {/* Fixed Cards */}
        {isPending ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="animate-spin text-forest size-8" />
          </div>
        ) : reels.length === 0 ? (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No reels available.
          </div>
        ) : (
          [-2, -1, 0, 1, 2].map((offset, i) => {
            const pos = positions[i]!;
            const isCenter = offset === 0;

            let videoIndex = (currentIndex + offset + reels.length) % reels.length;
            const item = reels[videoIndex]!;

            return (
              <div
                key={offset}
                className={`absolute top-1/2 transition-all duration-300 ease-in-out ${pos.brightness} rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[9/16] w-[200px] sm:w-[240px] md:w-[320px] bg-black group`}
                style={{
                  left: pos.left,
                  transform: `translate(-50%, -50%) scale(${pos.scale})`,
                  zIndex: pos.zIndex,
                  opacity: pos.opacity,
                }}
              >
                <ReelVideo
                  src={item.src}
                  poster={item.poster}
                  isPlaying={isCenter && openIndex === null}
                  onClick={() => {
                    if (isCenter) setOpenIndex(videoIndex);
                    else setCurrentIndex(videoIndex);
                  }}
                />
              </div>
            );
          })
        )}

        {/* Tapped reel plays here, with this same section still visible behind */}
        {openIndex !== null && reels[openIndex] && (
          <div
            className="absolute inset-0 z-[60] flex items-center justify-center bg-forest/60 backdrop-blur-sm"
            onClick={() => setOpenIndex(null)}
          >
            <div
              className="relative aspect-[9/16] h-[85%] max-w-[92vw] overflow-hidden rounded-3xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ReelVideo
                src={reels[openIndex].src}
                poster={reels[openIndex].poster}
                isPlaying
                onClick={() => { }}
              />
              <button
                aria-label="Close reel"
                className="absolute top-3 left-3 z-10 grid size-9 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80"
                onClick={() => setOpenIndex(null)}
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <Button className="rounded-full px-8 py-6 text-lg bg-black text-white hover:bg-black/90 font-medium">
          Visit Instagram
        </Button>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: Search,
    title: "Garden Consultancy",
    copy: "Expert advice for your green spaces",
  },
  {
    icon: Sun,
    title: "Terrace & Rooftop Gardening",
    copy: "Transform your elevated spaces",
  },
  {
    icon: Home,
    title: "Backyard Garden Setup",
    copy: "Beautiful and lush backyards",
  },
  {
    icon: Sprout,
    title: "Organic Kitchen Garden",
    copy: "Grow your own fresh produce",
  },
  {
    icon: Building2,
    title: "School Kitchen Garden",
    copy: "Educational green spaces for kids",
  },
  {
    icon: GraduationCap,
    title: "Gardening Training for Children",
    copy: "Interactive learning for young minds",
  },
  {
    icon: Users,
    title: "Group Gardening Training",
    copy: "Collaborative learning sessions",
  },
  {
    icon: Flower2,
    title: "Garden Setup & Repotting",
    copy: "Fresh soil and healthier roots",
  },
  {
    icon: Scissors,
    title: "Garden Maintenance",
    copy: "Expert care for your green assets",
  },
  {
    icon: Truck,
    title: "Doorstep Gardening Training",
    copy: "Learn gardening at your home",
  },
  {
    icon: Trees,
    title: "Organic Gardening Training & Setup",
    copy: "Complete organic solutions",
  },
];

export function OurServices() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = (n: number) => {
    const idx = (n + SERVICES.length) % SERVICES.length;
    setActive(idx);
    const el = trackRef.current?.children[idx] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  };

  return (
    <section id="services" aria-labelledby="services-heading" className="bg-forest text-forest-foreground">
      <div className="overflow-hidden leading-[0] text-background">
        <svg
          viewBox="0 0 1200 90"
          preserveAspectRatio="none"
          className="block h-10 w-full md:h-16"
          aria-hidden="true"
        >
          <path
            d="M0 12C90-18 144 86 220 36S338-4 408 45s145 37 224-8 155-53 239-4 136 39 202 2 92-13 127 3V0H0Z"
            className="fill-current"
          />
        </svg>
      </div>

      <div className="pt-2 pb-12 lg:pb-16">
        <div className="px-4 lg:px-8 mx-auto max-w-3xl">
          <h2
            id="services-heading"
            className="text-center font-display text-3xl font-semibold lg:text-4xl"
          >
            Our Services
          </h2>
        </div>

        <div className="relative mt-10 overflow-hidden w-full">
          <div className="flex w-max marquee-track">
            {[...SERVICES, ...SERVICES].map((service, i) => (
              <div
                key={`${service.title}-${i}`}
                className="flex w-48 sm:w-64 shrink-0 flex-col items-center px-4 text-center"
              >
                <span className="grid size-20 sm:size-24 place-items-center border-b border-forest-foreground/40">
                  <service.icon strokeWidth={1.3} className="size-12 sm:size-16" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold md:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-forest-foreground/70">
                  {service.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export function Footer({ isAdmin }: { isAdmin?: boolean } = {}) {
  return (
    <footer className="mt-12 md:mt-20">
      <div className="-mb-1 w-full overflow-hidden leading-[0] text-forest">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="block w-full h-[40px] md:h-[80px]"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
            className="fill-current"
          />
        </svg>
      </div>
      <div className="bg-forest px-4 pb-8 text-cream lg:px-8">
        <div className="mx-auto grid w-full gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand & Info */}
          <div className="flex flex-col lg:col-span-2 lg:pr-8">
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-card">
                <img src="/logo.png" alt="GreenRoots" className="size-full scale-[1.02] object-cover" />
              </span>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-semibold leading-none">GreenRoots</span>
                <span className="mt-1 text-[10px] tracking-[0.2em] text-cream/70 uppercase">
                  Farm Fresh • Since 2023
                </span>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-cream/80">
              Bringing the freshest, 100% certified organic plants directly from our nurseries in
              Karnataka to your family's home — with love, integrity, and zero compromise on
              quality.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, color: "text-pink-500 border-pink-500/40 hover:bg-pink-500 hover:text-white" },
                { Icon: Facebook, color: "text-blue-500 border-blue-500/40 hover:bg-blue-600 hover:text-white" },
                { Icon: WhatsappIcon, color: "text-green-500 border-green-500/40 hover:bg-green-500 hover:text-white" },
                { Icon: Youtube, color: "text-red-500 border-red-500/40 hover:bg-red-600 hover:text-white" }
              ].map(({ Icon, color }, i) => (
                <a
                  key={i}
                  href="#top"
                  aria-label="Social link"
                  className={`grid size-9 place-items-center rounded-full border bg-transparent transition-colors ${color}`}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>

          </div>

          {!isAdmin && (
            <>
              {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold">Quick Links</h3>
            <ul className="mt-6 space-y-3.5 text-sm text-cream/80">
              <li>
                <Link to="/about-us" className="transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" hash="contact" className="transition-colors hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" hash="services" className="transition-colors hover:text-primary">
                  Our Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h3 className="font-display text-lg font-semibold">Products</h3>
            <ul className="mt-6 space-y-3.5 text-sm text-cream/80">
              {[
                { name: "Seeds", id: "seeds" },
                { name: "Plant Care", id: "plant-care" },
                { name: "Garden Tools", id: "garden-tools" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to="/category/$id"
                    params={{ id: link.id }}
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <ArrowRight className="size-3.5" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="font-display text-lg font-semibold">Contact Us</h3>
            <ul className="mt-6 space-y-4 text-sm text-cream/80">
              <li>
                <a
                  href="tel:+916360988785"
                  className="flex items-center gap-3 transition-colors hover:text-primary"
                >
                  <Phone className="size-4 shrink-0" />
                  +91 63609 88785
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@greenroots.com"
                  className="flex items-center gap-3 transition-colors hover:text-primary"
                >
                  <Mail className="size-4 shrink-0" />
                  contact@greenroots.com
                </a>
              </li>
              <li>
                <a
                  href="#top"
                  className="flex items-center gap-3 transition-colors hover:text-[#FF0000]"
                >
                  <Youtube className="size-4 shrink-0" />
                  Watch Our Nursery Stories
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="size-4 shrink-0 mt-0.5" />
                <span>Jalahalli, Karnataka 563125</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="size-4 shrink-0 mt-0.5" />
                <span>Mon–Sat: 6AM – 6PM</span>
              </li>

            </ul>
          </div>
            </>
          )}
        </div>

        <div className="mx-auto mt-6 w-full flex flex-col gap-4 text-xs text-cream/60 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <p>
              © 2026 <span className="text-primary font-medium">GreenRoots</span>. All rights
              reserved. Made with <span className="text-[#FF0000]">❤️</span> in Karnataka, India.
            </p>
            <p>
              Developed By{" "}
              <a
                href="https://nandish-tech.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium transition-colors hover:text-white hover:underline"
              >
                Nandish-Tech
              </a>
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <div className="flex gap-4">
              <Link to="/privacy-policy" className="transition-colors hover:text-cream">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="transition-colors hover:text-cream">
                Terms of Service
              </Link>
              <Link to="/refund-policy" className="transition-colors hover:text-cream">
                Refund Policy
              </Link>
            </div>

            <a
              href="#top"
              className="grid size-10 place-items-center rounded-full bg-cream/5 transition-colors hover:bg-primary text-cream"
              aria-label="Scroll to top"
            >
              <ArrowUp className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
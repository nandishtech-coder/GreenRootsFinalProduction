import { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listPublicUpdates } from "@/lib/updates.functions";
import { listProducts } from "@/lib/products.functions";
import {
  ChevronDown,
  ChevronRight,
  Flower2,
  GraduationCap,
  Heart,
  Leaf,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  Users,
  Zap,
  Truck,
  Sprout,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const MENU_ICONS: Record<string, LucideIcon> = {
  "Our Services": Flower2,
  "Professional Horticulture Workforce": Users,
  "Recent Projects & Highlights": Sparkles,
  Training: GraduationCap,
  Shop: ShoppingBag,
  Products: Sparkles,
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NAV, PRODUCTS } from "@/lib/store-data";
import { useCart } from "./cart";

function AnnouncementBar() {
  const fetchUpdates = useServerFn(listPublicUpdates);
  const { data: updates = [] } = useQuery({
    queryKey: ["public-updates"],
    queryFn: () => fetchUpdates(),
  });

  if (updates.length === 0) return null;

  const row = [...updates, ...updates, ...updates, ...updates];
  
  return (
    <div className="overflow-hidden bg-forest-deep py-2.5 text-forest-foreground">
      <div className="flex w-max marquee-track">
        {row.map((u, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-3 px-8 text-xs tracking-wide sm:text-sm"
          >
            <span className="text-forest-foreground/50 text-[10px]">●</span>
            {u.text}
          </span>
        ))}
      </div>
    </div>
  );
}

function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const fetchProducts = useServerFn(listProducts);
  const { data: dbProducts = [] } = useQuery({
    queryKey: ["public-products"],
    queryFn: () => fetchProducts(),
  });
  
  const productsList = dbProducts.length > 0 ? dbProducts : PRODUCTS;

  const results = q.trim()
    ? productsList.filter((p) => p.title.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
    : [];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-cream">
        <DialogHeader>
          <DialogTitle className="font-display text-forest">Search the nursery</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try 'tulsi seeds', 'ceramic pot', 'vermicompost'"
            className="h-12 rounded-xl pl-9"
          />
        </div>
        {q.trim() === "" ? (
          <div className="flex flex-wrap gap-2">
            {["Seed packs", "Potting mix", "Ceramic planters", "Neem spray", "Gifting"].map((t) => (
              <button
                key={t}
                onClick={() => setQ(t)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-forest transition-colors hover:bg-secondary"
              >
                {t}
              </button>
            ))}
          </div>
        ) : (
          <ul className="max-h-72 space-y-1 overflow-y-auto">
            {results.length === 0 && (
              <li className="px-2 py-6 text-center text-sm text-muted-foreground">
                No matches — try a broader term.
              </li>
            )}
            {results.map((p) => (
              <li key={p.id}>
                <RouterLink
                  to="/product/$id"
                  params={{ id: p.id }}
                  onClick={() => onOpenChange(false)}
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-secondary"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={44}
                    height={44}
                    className="size-11 rounded-lg object-cover"
                  />
                  <span className="line-clamp-1 text-sm text-forest">{p.title}</span>
                </RouterLink>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Header() {
  const { count, setOpen, wishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const fullText = "Search for seeds, plants, planters & more...";

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      window.history.pushState({ mobileMenuOpen: true }, "");

      const handlePopState = (e: PopStateEvent) => {
        setMobileMenuOpen(false);
      };

      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
    return undefined;
  }, [mobileMenuOpen]);

  const navigatingRef = useRef(false);

  const handleMobileMenuClose = (v: boolean) => {
    if (!v && mobileMenuOpen && !navigatingRef.current && window.history.state?.mobileMenuOpen) {
      window.history.back();
    }
    if (!v) navigatingRef.current = false;
    setMobileMenuOpen(v);
  };

  const handleMobileMenuNavigate = () => {
    // A submenu link was tapped: let the router navigate, don't pop history.
    navigatingRef.current = true;
    setMobileMenuOpen(false);
  };

  const fetchProducts = useServerFn(listProducts);
  const { data: dbProducts = [] } = useQuery({
    queryKey: ["public-products"],
    queryFn: () => fetchProducts(),
  });
  
  const productsList = dbProducts.length > 0 ? dbProducts : PRODUCTS;

  const results = searchQuery.trim()
    ? productsList.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div className="bg-cream/95 backdrop-blur-md pb-3 lg:pb-0">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between gap-y-3 gap-x-2 sm:gap-x-4 px-3 sm:px-4 py-3 lg:px-8">
          {/* Mobile nav & Logo */}
          <div className="flex items-center gap-2">
            <Sheet open={mobileMenuOpen} onOpenChange={handleMobileMenuClose}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[85vw] max-w-sm overflow-y-auto border-r border-border bg-cream p-0"
              >
                <SheetHeader className="bg-forest-deep px-5 py-5 text-left text-forest-foreground">
                  <SheetTitle className="flex items-center gap-3 text-forest-foreground">
                    <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-card">
                      <img src="/logo.png" alt="GreenRoots" className="size-full object-cover" />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-display text-lg font-bold tracking-[0.08em] uppercase">
                        GreenRoots
                      </span>
                      <span className="text-[0.6rem] tracking-widest uppercase opacity-80">
                        Learn. Grow. Harvest.
                      </span>
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <Accordion type="single" collapsible className="space-y-2 px-3 py-4">
                  {NAV.map((n) => {
                    const Icon = MENU_ICONS[n.label] ?? Leaf;
                    return (
                      <AccordionItem
                        key={n.label}
                        value={n.label}
                        className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] data-[state=open]:border-primary/40"
                      >
                        <AccordionTrigger className="px-4 py-3 text-left text-sm font-semibold text-forest hover:no-underline">
                          <span className="flex items-center gap-3">
                            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                              <Icon className="size-4" />
                            </span>
                            {n.label}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-2 pb-2">
                          <ul className="space-y-1 border-l border-dashed border-border/70 pl-3">
                            {n.items.map((i, idx) => {
                              const href = (n as any).hrefs ? (n as any).hrefs[idx] : "#products";
                              const isService = href.startsWith("/service/");
                              const isProduct = href.startsWith("/product/");
                              const isCategory = href.startsWith("/category/");

                              const cls =
                                "group flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-forest [&.active]:bg-forest/10 [&.active]:text-forest [&.active]:font-medium";
                              const activeProps = { className: "active" };
                              const inner = (
                                <>
                                  <span className="line-clamp-2">{i}</span>
                                  <ChevronRight className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-70" />
                                </>
                              );
                              return (
                                <li key={i}>
                                  {isService ? (
                                    <RouterLink
                                      to="/service/$id"
                                      params={{ id: href.replace("/service/", "") }}
                                      onClick={handleMobileMenuNavigate}
                                      className={cls}
                                      activeProps={activeProps}
                                    >
                                      {inner}
                                    </RouterLink>
                                  ) : isProduct ? (
                                    <RouterLink
                                      to="/product/$id"
                                      params={{ id: href.replace("/product/", "") }}
                                      onClick={handleMobileMenuNavigate}
                                      className={cls}
                                      activeProps={activeProps}
                                    >
                                      {inner}
                                    </RouterLink>
                                  ) : isCategory ? (
                                    <RouterLink
                                      to="/category/$id"
                                      params={{ id: href.replace("/category/", "") }}
                                      onClick={handleMobileMenuNavigate}
                                      className={cls}
                                      activeProps={activeProps}
                                    >
                                      {inner}
                                    </RouterLink>
                                  ) : (
                                    <RouterLink
                                      to="/"
                                      hash={href.slice(1)}
                                      onClick={handleMobileMenuNavigate}
                                      className={cls}
                                    >
                                      {inner}
                                    </RouterLink>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>

                <div className="px-4 pb-6">
                  <a
                    href="tel:+916360988785"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-forest px-4 py-3 text-sm font-semibold text-forest-foreground transition-colors hover:bg-forest-deep"
                  >
                    <Phone className="size-4" />
                    Call us · +91 63609 88785
                  </a>
                </div>
              </SheetContent>
            </Sheet>

            <RouterLink to="/" className="flex items-center gap-2">
              <span className="logo-glow grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-card lg:size-16">
                <img
                  src="/logo.png"
                  alt="GreenRoots"
                  className="size-full scale-[1.02] object-cover"
                />
              </span>
              <div className="hidden sm:flex flex-col">
                <span className="font-display text-xl font-bold tracking-[0.1em] text-forest uppercase lg:text-2xl drop-shadow-sm" style={{ color: '#2C5A2E' }}>
                  GREENROOTS
                </span>
                <span className="text-[0.6rem] font-bold tracking-widest text-forest uppercase mt-[-2px]" style={{ color: '#2C5A2E' }}>
                  Learn. Grow. Harvest.
                </span>
              </div>
            </RouterLink>
          </div>

          {/* Spacer for mobile so icons push right */}
          <div className="flex-1 lg:hidden" />

          {/* Big search bar (Top middle on Desktop, below on mobile) */}
          <div ref={searchRef} className="relative order-last w-full lg:order-none lg:w-auto lg:flex-1 lg:max-w-2xl lg:px-6 z-50">
            <Search className="absolute left-4 top-1/2 lg:left-10 size-5 -translate-y-1/2 text-primary pointer-events-none" />
            <Input
              type="search"
              placeholder={placeholderText}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              className="h-12 w-full rounded-2xl border-border bg-card pl-12 lg:pl-12 pr-4 shadow-[var(--shadow-soft)] transition-all hover:border-primary focus-visible:ring-1 focus-visible:ring-primary lg:h-12 lg:text-base"
            />
            {showResults && searchQuery.trim() !== "" && (
              <div className="absolute top-full left-0 lg:left-6 mt-2 w-full lg:w-[calc(100%-3rem)] rounded-2xl border border-border bg-cream p-2 shadow-lg max-h-80 overflow-hidden">
                <ul className="max-h-72 overflow-y-auto space-y-1 pr-1">
                  {results.length === 0 ? (
                    <li className="px-3 py-4 text-center text-sm text-muted-foreground">
                      No matches — try a broader term.
                    </li>
                  ) : (
                    results.map((p) => (
                      <li key={p.id}>
                        <RouterLink
                          to="/product/$id"
                          params={{ id: p.id }}
                          onClick={() => setShowResults(false)}
                          className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-secondary"
                        >
                          <img
                            src={p.image}
                            alt={p.title}
                            loading="lazy"
                            width={44}
                            height={44}
                            className="size-11 rounded-lg object-cover"
                          />
                          <span className="line-clamp-1 text-sm text-forest font-medium">{p.title}</span>
                        </RouterLink>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Icons (Desktop: Right, Mobile: Top Right) */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative size-9 sm:size-10">
              <Heart className="size-4 sm:size-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-clay text-[10px] font-semibold text-forest-foreground">
                  {wishlist.length}
                </span>
              )}
            </Button>

            <Button
              onClick={() => setOpen(true)}
              className="relative ml-0.5 sm:ml-1 rounded-xl h-9 sm:h-10 px-2.5 sm:px-4"
              aria-label="Open cart"
            >
              <ShoppingBag className="size-4 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Cart</span>
              <span className="absolute -top-1.5 -right-1.5 sm:static sm:-top-auto sm:-right-auto grid min-w-4 sm:min-w-5 place-items-center rounded-full bg-forest px-1 text-[10px] sm:text-xs font-semibold text-forest-foreground border-2 border-cream sm:border-none">
                {count}
              </span>
            </Button>
          </div>
        </div>

        {/* Desktop Navigation (Bottom Row) */}
        <div className="hidden xl:block w-full border-t border-border/40 bg-white/40">
          <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-center gap-x-4 xl:gap-x-6 py-2 px-4">
            {NAV.map((n) => (
              <div key={n.label} className="group relative">
                <button className="flex items-center gap-1 rounded-lg px-2 xl:px-3 py-2 text-sm font-medium text-forest transition-colors hover:bg-secondary whitespace-nowrap">
                  {n.label}
                  <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180 shrink-0" />
                </button>
                <div className="invisible absolute top-full left-0 w-56 translate-y-1 rounded-xl border border-border bg-card p-2 opacity-0 shadow-[var(--shadow-lift)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 z-50">
                  {n.items.map((i, idx) => {
                    const href = (n as any).hrefs ? (n as any).hrefs[idx] : "#products";
                    const isService = href.startsWith("/service/");
                    const isProduct = href.startsWith("/product/");
                    const isCategory = href.startsWith("/category/");
                    const className = "block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-forest [&.active]:bg-forest/10 [&.active]:text-forest [&.active]:font-medium";
                    const activeProps = { className: "active" };

                    if (isService) {
                      return (
                        <RouterLink
                          key={i}
                          to="/service/$id"
                          params={{ id: href.replace("/service/", "") }}
                          className={className}
                          activeProps={activeProps}
                        >
                          {i}
                        </RouterLink>
                      );
                    } else if (isProduct) {
                      return (
                        <RouterLink
                          key={i}
                          to="/product/$id"
                          params={{ id: href.replace("/product/", "") }}
                          className={className}
                          activeProps={activeProps}
                        >
                          {i}
                        </RouterLink>
                      );
                    } else if (isCategory) {
                      return (
                        <RouterLink
                          key={i}
                          to="/category/$id"
                          params={{ id: href.replace("/category/", "") }}
                          className={className}
                          activeProps={activeProps}
                        >
                          {i}
                        </RouterLink>
                      );
                    } else {
                      return (
                        <RouterLink key={i} to="/" hash={href.slice(1)} className={className}>
                          {i}
                        </RouterLink>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

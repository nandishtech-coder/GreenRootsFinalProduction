import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/store-data";

export type CartLine = {
  key: string;
  id: string;
  title: string;
  image: string;
  price: number;
  mrp: number;
  variant: string;
  qty: number;
};

type CartApi = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  savings: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product, variant: string, openCart?: boolean) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
};

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const add = useCallback((p: Product, variant: string, openCart = true) => {
    const key = `${p.id}::${variant}`;
    setLines((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
      }
      return [
        ...prev,
        {
          key,
          id: p.id,
          title: p.title,
          image: p.image,
          price: p.price,
          mrp: p.mrp,
          variant,
          qty: 1,
        },
      ];
    });
    if (openCart) setOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const clear = useCallback(() => {
    setLines([]);
  }, []);

  const value = useMemo<CartApi>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);
    const savings = lines.reduce((s, l) => s + l.qty * (l.mrp - l.price), 0);
    return {
      lines,
      count,
      subtotal,
      savings,
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
      wishlist,
      toggleWishlist,
    };
  }, [lines, open, add, setQty, remove, clear, wishlist, toggleWishlist]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

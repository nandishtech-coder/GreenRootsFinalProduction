import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Check, ChevronRight, Info, Minus, Plus, ShoppingBag, Trash2, Truck, X, Gift, CheckCircle2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "./cart";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listPublicUpdates } from "@/lib/updates.functions";
import { FREE_SHIPPING_THRESHOLD, inr } from "@/lib/store-data";

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, savings, setQty, remove, clear, count } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedData, setSavedData] = useState<any>(null);
  const [useSaved, setUseSaved] = useState<boolean>(false);

  useEffect(() => {
    const savedStr = localStorage.getItem("verdant_saved_address");
    if (savedStr) {
      try {
        const data = JSON.parse(savedStr);
        setSavedData(data);
        setUseSaved(true);
      } catch (e) {}
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      window.history.pushState({ cartOpen: true }, "");
      
      const handlePopState = (e: PopStateEvent) => {
        // If the user presses the back button, close the cart
        setOpen(false);
      };

      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
    return undefined;
  }, [open, setOpen]);

  const fetchUpdates = useServerFn(listPublicUpdates);
  const { data: updates = [] } = useQuery({
    queryKey: ["public-updates"],
    queryFn: () => fetchUpdates(),
  });

  let threshold = FREE_SHIPPING_THRESHOLD;
  const shippingUpdate = updates.find(u => {
    const txt = u.text.toLowerCase();
    return txt.includes("free") && (txt.includes("shipping") || txt.includes("delivery"));
  });
  if (shippingUpdate) {
    const nums = shippingUpdate.text.match(/\d+/g);
    const last = nums?.[nums.length - 1];
    if (last) {
      threshold = parseInt(last, 10);
    }
  }

  const remaining = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, (subtotal / threshold) * 100);

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data: any = (useSaved && savedData) ? savedData : Object.fromEntries(formData.entries());

    if (!useSaved && data['saveInfo'] === 'on') {
      localStorage.setItem("verdant_saved_address", JSON.stringify(data));
      setSavedData(data);
    }

    let message = `*New Order from GreenRoots!*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${data['firstName']} ${data['lastName']}\n`;
    message += `Email/Phone: ${data['email']}\n`;
    message += `Phone: ${data['phone']}\n`;
    message += `Address: ${data['address']}, ${data['apartment'] ? data['apartment'] + ', ' : ''}${data['city']}, ${data['state']} - ${data['pin']}\n\n`;


    message += `*Order Items:*\n`;
    lines.forEach(l => {
      message += `- ${l.qty}x ${l.title} (${l.variant}) - ${inr(l.price * l.qty)}\n`;
    });

    message += `\n*Totals:*\n`;
    message += `Subtotal: ${inr(subtotal)}\n`;
    const shipping = subtotal >= threshold ? 0 : 100;
    message += `Shipping: ${shipping === 0 ? 'Free' : inr(shipping)}\n`;
    message += `*Total: ${inr(subtotal + shipping)}*\n`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/916360988785?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    clear();
    setIsSuccess(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2F5C43', '#E3F1E3', '#407B5A']
    });
  };

  const handleClose = (v: boolean) => {
    if (!v && open && window.history.state?.cartOpen) {
      window.history.back();
    }
    setOpen(v);
    if (!v) {
      setTimeout(() => setIsSuccess(false), 300); // reset after transition
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="flex w-[85vw] sm:max-w-md flex-col gap-0 border-l border-border bg-cream p-0 shadow-2xl overflow-hidden">
        <SheetHeader className="border-b border-border px-4 py-5 sm:px-6">
          <SheetTitle className="font-display text-xl text-forest">
            Your Basket ({count})
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Freshly potted and ready to ship across India.
          </SheetDescription>
        </SheetHeader>

        {isSuccess ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 sm:px-6 text-center overflow-y-auto">
            <div className="flex size-20 items-center justify-center rounded-full bg-green-100 mb-2 mt-8">
              <CheckCircle2 className="size-10 text-forest" />
            </div>
            <h2 className="font-display text-2xl font-bold text-forest">Order Successful!</h2>
            <p className="text-muted-foreground">
              Your details have been sent to our WhatsApp successfully! We will contact you soon with updates on your beautiful plants.
            </p>
            <Button size="lg" className="mt-6" onClick={() => handleClose(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="flex flex-1 flex-col overflow-hidden">
            <div className="border-b border-border bg-secondary/60 px-4 py-4 sm:px-6">
              <div className="flex items-center justify-center gap-2 text-sm text-forest font-medium">
                <span>
                  ✨ Hand-picked with love. 100% Organic & Pet-Safe! 🌿
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
                    <ShoppingBag className="size-6 text-primary" />
                  </div>
                  <p className="font-display text-lg text-forest">Your basket is empty</p>
                  <p className="max-w-xs text-sm text-muted-foreground">
                    Add a few seed packs or a designer planter to get growing.
                  </p>
                  <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                    Continue shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {lines.map((l) => (
                    <li
                      key={l.key}
                      className="flex gap-4 rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-soft)]"
                    >
                      <img
                        src={l.image}
                        alt={l.title}
                        loading="lazy"
                        width={80}
                        height={80}
                        className="size-20 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium text-forest">{l.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{l.variant}</p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center rounded-full border border-border">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(l.key, l.qty - 1)}
                              className="grid size-7 place-items-center rounded-full text-forest transition-colors hover:bg-secondary"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-7 text-center text-sm font-medium">{l.qty}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQty(l.key, l.qty + 1)}
                              className="grid size-7 place-items-center rounded-full text-forest transition-colors hover:bg-secondary"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-forest">
                              {inr(l.price * l.qty)}
                            </span>
                            <button
                              type="button"
                              aria-label={`Remove ${l.title}`}
                              onClick={() => remove(l.key)}
                              className="text-muted-foreground transition-colors hover:text-destructive"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {lines.length > 0 && (
                <div className="mt-8 pb-6">
                  {savedData && (
                    <div className="mb-8 space-y-4">
                      <h3 className="font-display text-lg font-semibold text-forest">
                        Delivery Information
                      </h3>
                      <RadioGroup value={useSaved ? "saved" : "new"} onValueChange={(val) => setUseSaved(val === "saved")}>
                        <div className="flex items-start space-x-3 rounded-xl border border-border bg-white p-4 transition-colors hover:bg-secondary/50">
                          <RadioGroupItem value="saved" id="saved" className="mt-1" />
                          <Label htmlFor="saved" className="flex-1 cursor-pointer font-normal">
                            <span className="block font-medium text-forest">Use saved address</span>
                            <span className="mt-1 block text-sm text-muted-foreground">
                              {savedData.firstName} {savedData.lastName}<br />
                              {savedData.address}, {savedData.city}<br />
                              {savedData.phone}
                            </span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 rounded-xl border border-border bg-white p-4 transition-colors hover:bg-secondary/50">
                          <RadioGroupItem value="new" id="new" />
                          <Label htmlFor="new" className="cursor-pointer font-medium text-forest">
                            Use a different address
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {(!savedData || !useSaved) && (
                    <>
                      <h3 className="mb-4 font-display text-lg font-semibold text-forest">
                        Contact
                      </h3>
                      <div className="space-y-4 mb-8">
                        <Input
                          type="text"
                          name="email"
                          required
                          placeholder="Email or mobile phone number"
                          className="h-11 w-full bg-white"
                        />
                      </div>

                      <h3 className="mb-4 font-display text-lg font-semibold text-forest">
                        Delivery
                      </h3>
                      <div className="space-y-4">
                        <div className="relative">
                          <select
                            name="country"
                            className="h-11 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                            defaultValue="India"
                          >
                            <option value="India">India</option>
                            <option value="US">United States</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                            ▼
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <Input name="firstName" required type="text" placeholder="First name" className="h-11 flex-1 bg-white" />
                          <Input name="lastName" required type="text" placeholder="Last name" className="h-11 flex-1 bg-white" />
                        </div>
                        <Input name="company" type="text" placeholder="Company (optional)" className="h-11 w-full bg-white" />
                        <Input name="address" required type="text" placeholder="Address" className="h-11 w-full bg-white" />
                        <Input name="apartment" type="text" placeholder="Apartment, suite, etc." className="h-11 w-full bg-white" />

                        <div className="flex gap-4">
                          <Input name="city" required type="text" placeholder="City" className="h-11 flex-1 bg-white" />
                          <div className="relative flex-1">
                            <select
                              name="state"
                              className="h-11 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                              defaultValue="Karnataka"
                            >
                              <option value="Karnataka">Karnataka</option>
                              <option value="Maharashtra">Maharashtra</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                              ▼
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Input name="pin" required type="text" placeholder="PIN code" className="h-11 flex-1 bg-white" />
                          <Input name="phone" required type="tel" placeholder="Phone" className="h-11 flex-1 bg-white" />
                        </div>

                        <div className="mt-2 flex items-center space-x-2">
                          <Checkbox id="save-info" name="saveInfo" />
                          <Label htmlFor="save-info" className="text-sm font-normal text-muted-foreground">
                            Save this information for next time
                          </Label>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-border bg-card px-4 py-5 sm:px-6 shrink-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-base font-semibold text-forest">{inr(subtotal)}</span>
                </div>
                {savings > 0 && (
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">You save</span>
                    <span className="font-medium text-primary">{inr(savings)}</span>
                  </div>
                )}
                <Separator className="my-4" />
                <Button type="submit" size="lg" className="w-full rounded-xl">
                  Checkout securely
                </Button>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Taxes calculated at checkout · UPI, Cards & NetBanking
                </p>
              </div>
            )}
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}

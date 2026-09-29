import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Trigger2, i as Root2, n as Header$1, r as Item, t as Content2, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { A as Leaf, C as Menu, F as Flower2, G as ArrowLeft, H as Check, I as Facebook, L as Clock, N as Heart, P as Gift, R as Circle, S as MessageCircle, T as Mail, U as ArrowUp, V as ChevronDown, W as ArrowRight, a as User, c as Trash2, d as Sprout, f as ShoppingBag, g as Scissors, h as Search, i as Video, j as Instagram, l as Sun, n as Youtube, o as Truck, r as X, s as Trees, t as Zap, u as Star, v as Plus, w as MapPin, x as Minus, y as Phone, z as CircleCheck } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/@radix-ui/react-radio-group+[...].mjs";
import { a as TabsList, n as Label, o as TabsTrigger, r as Tabs, t as Input } from "./tabs-BD4OaWsN.mjs";
import { t as confetti_module_default } from "../_libs/canvas-confetti.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { t as Root$1 } from "../_libs/radix-ui__react-separator.mjs";
import { t as useEmblaCarousel } from "../_libs/embla-carousel-react+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Sections-rwGCfVHf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CartContext = (0, import_react.createContext)(null);
function CartProvider({ children }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [wishlist, setWishlist] = (0, import_react.useState)([]);
	const add = (0, import_react.useCallback)((p, variant, openCart = true) => {
		const key = `${p.id}::${variant}`;
		setLines((prev) => {
			if (prev.find((l) => l.key === key)) return prev.map((l) => l.key === key ? {
				...l,
				qty: l.qty + 1
			} : l);
			return [...prev, {
				key,
				id: p.id,
				title: p.title,
				image: p.image,
				price: p.price,
				mrp: p.mrp,
				variant,
				qty: 1
			}];
		});
		if (openCart) setOpen(true);
	}, []);
	const setQty = (0, import_react.useCallback)((key, qty) => {
		setLines((prev) => qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => l.key === key ? {
			...l,
			qty
		} : l));
	}, []);
	const remove = (0, import_react.useCallback)((key) => {
		setLines((prev) => prev.filter((l) => l.key !== key));
	}, []);
	const toggleWishlist = (0, import_react.useCallback)((id) => {
		setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
	}, []);
	const clear = (0, import_react.useCallback)(() => {
		setLines([]);
	}, []);
	const value = (0, import_react.useMemo)(() => {
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
			toggleWishlist
		};
	}, [
		lines,
		open,
		add,
		setQty,
		remove,
		clear,
		wishlist,
		toggleWishlist
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
var variantClass = {
	up: "reveal-up",
	down: "reveal-down",
	left: "reveal-left",
	right: "reveal-right",
	zoom: "reveal-zoom",
	blur: "reveal-blur"
};
function Reveal({ children, variant = "up", delay = 0, className, once = true }) {
	const ref = (0, import_react.useRef)(null);
	const [shown, setShown] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setShown(true);
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				setShown(true);
				if (once) observer.unobserve(entry.target);
			} else if (!once) setShown(false);
		}, {
			threshold: .12,
			rootMargin: "0px 0px -8% 0px"
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, [once]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		style: delay ? { transitionDelay: `${delay}ms` } : void 0,
		className: cn(variantClass[variant], shown && "is-revealed", className),
		children
	});
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root$1.displayName;
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
var p_seeds_default = "/assets/p-seeds-CabUa-MY.jpg";
var p_ceramic_default = "/assets/p-ceramic-WpocaP30.jpg";
var p_mix_default = "/assets/p-mix-C3sZoAwS.jpg";
var p_nutrient_default = "/assets/p-nutrient-b7bpuMlk.jpg";
var p_tools_default = "/assets/p-tools-Cvj3TWRK.jpg";
var p_plants_default = "/assets/p-plants-Y3nq0l8J.jpg";
var gifting_default = "/assets/gifting-laPVs9sX.jpg";
var CATEGORY_TABS = [
	"All",
	"Best Sellers",
	"Plant Care",
	"Ceramic Planters",
	"Organic Manures"
];
var PRODUCTS = [
	{
		id: "p1",
		title: "Heirloom Vegetable Seed Vault — 12 Varieties",
		image: p_seeds_default,
		price: 499,
		mrp: 799,
		rating: 4.8,
		reviews: 1284,
		variantLabel: "Pack",
		variants: [
			"4 Packs",
			"8 Packs",
			"12 Packs"
		],
		tags: ["Best Sellers"],
		badge: "4 for ₹499"
	},
	{
		id: "p2",
		title: "Sage Dip Ceramic Planter with Saucer",
		image: p_ceramic_default,
		price: 649,
		mrp: 899,
		rating: 4.7,
		reviews: 512,
		variantLabel: "Colour",
		variants: [
			"Sage",
			"Chalk",
			"Terracotta"
		],
		tags: ["Best Sellers", "Ceramic Planters"],
		badge: "Sale"
	},
	{
		id: "p3",
		title: "Terrace-Ready Organic Potting Mix",
		image: p_mix_default,
		price: 349,
		mrp: 449,
		rating: 4.9,
		reviews: 2310,
		variantLabel: "Size",
		variants: [
			"2 kg",
			"5 kg",
			"10 kg"
		],
		tags: [
			"Best Sellers",
			"Plant Care",
			"Organic Manures"
		],
		badge: "Sale"
	},
	{
		id: "p4",
		title: "Seaweed Biostimulant Growth Tonic",
		image: p_nutrient_default,
		price: 399,
		mrp: 549,
		rating: 4.6,
		reviews: 874,
		variantLabel: "Volume",
		variants: [
			"250 ml",
			"500 ml",
			"1 L"
		],
		tags: ["Plant Care"],
		badge: "15% OFF"
	},
	{
		id: "p5",
		title: "Balcony Gardener 5-Piece Tool Kit",
		image: p_tools_default,
		price: 1099,
		mrp: 1599,
		rating: 4.7,
		reviews: 431,
		variantLabel: "Kit",
		variants: ["Essential", "Pro"],
		tags: ["Best Sellers"],
		badge: "Sale"
	},
	{
		id: "p6",
		title: "Air-Purifying Indoor Plant Trio",
		image: p_plants_default,
		price: 899,
		mrp: 1199,
		rating: 4.8,
		reviews: 965,
		variantLabel: "Set",
		variants: ["Trio", "Quintet"],
		tags: ["Best Sellers"]
	},
	{
		id: "p7",
		title: "Vermicompost Enriched Organic Manure",
		image: p_mix_default,
		price: 279,
		mrp: 379,
		rating: 4.8,
		reviews: 1544,
		variantLabel: "Size",
		variants: [
			"1 kg",
			"3 kg",
			"5 kg"
		],
		tags: ["Organic Manures", "Plant Care"]
	},
	{
		id: "p8",
		title: "Neem Shield Organic Pest Control Spray",
		image: p_nutrient_default,
		price: 329,
		mrp: 429,
		rating: 4.5,
		reviews: 612,
		variantLabel: "Volume",
		variants: ["250 ml", "500 ml"],
		tags: ["Plant Care"],
		badge: "15% OFF"
	},
	{
		id: "p9",
		title: "Fluted Studio Ceramic Pot — Matte White",
		image: p_ceramic_default,
		price: 799,
		mrp: 1099,
		rating: 4.6,
		reviews: 288,
		variantLabel: "Size",
		variants: [
			"4\"",
			"6\"",
			"8\""
		],
		tags: ["Ceramic Planters"],
		badge: "Sale"
	},
	{
		id: "p10",
		title: "Grow-Your-Own Herb Gift Hamper",
		image: gifting_default,
		price: 1249,
		mrp: 1699,
		rating: 4.9,
		reviews: 356,
		variantLabel: "Hamper",
		variants: ["Petite", "Signature"],
		tags: ["Best Sellers"],
		badge: "Gifting"
	},
	{
		id: "p11",
		title: "Kitchen Windowsill Herb Seed Set",
		image: p_seeds_default,
		price: 399,
		mrp: 599,
		rating: 4.7,
		reviews: 742,
		variantLabel: "Pack",
		variants: ["4 Packs", "6 Packs"],
		tags: ["Best Sellers"]
	},
	{
		id: "p12",
		title: "Cocopeat + Perlite Root Booster Blend",
		image: p_mix_default,
		price: 249,
		mrp: 329,
		rating: 4.6,
		reviews: 419,
		variantLabel: "Size",
		variants: ["2 kg", "5 kg"],
		tags: ["Plant Care", "Organic Manures"]
	},
	{
		id: "p13",
		title: "Denim White Ridge Planter",
		image: p_ceramic_default,
		price: 360,
		mrp: 432,
		rating: 4.8,
		reviews: 120,
		variantLabel: "Size",
		variants: ["Small", "Large"],
		tags: ["Ceramic Planters"],
		badge: "Sale"
	},
	{
		id: "p14",
		title: "Golden Baby Ceramic Planter",
		image: p_ceramic_default,
		price: 1460,
		mrp: 1752,
		rating: 4.9,
		reviews: 85,
		variantLabel: "Size",
		variants: ["Standard"],
		tags: ["Ceramic Planters"],
		badge: "Sale"
	},
	{
		id: "p15",
		title: "Fluted Facet Ceramic Planter",
		image: p_ceramic_default,
		price: 560,
		mrp: 672,
		rating: 4.6,
		reviews: 230,
		variantLabel: "Size",
		variants: ["Standard"],
		tags: ["Ceramic Planters"],
		badge: "Sale"
	},
	{
		id: "p16",
		title: "Vase Ceramic Planter",
		image: p_ceramic_default,
		price: 250,
		mrp: 300,
		rating: 4.5,
		reviews: 410,
		variantLabel: "Color",
		variants: ["White", "Green"],
		tags: ["Ceramic Planters"],
		badge: "Sale"
	},
	{
		id: "p17",
		title: "Bio Organic Floor Cleaner",
		image: p_nutrient_default,
		price: 299,
		mrp: 399,
		rating: 4.7,
		reviews: 620,
		variantLabel: "Volume",
		variants: ["500 ml", "1 L"],
		tags: ["Plant Care"]
	},
	{
		id: "p18",
		title: "Neem Leaf Wash",
		image: p_nutrient_default,
		price: 349,
		mrp: 449,
		rating: 4.8,
		reviews: 312,
		variantLabel: "Volume",
		variants: ["250 ml", "500 ml"],
		tags: ["Plant Care"],
		badge: "10% OFF"
	},
	{
		id: "p19",
		title: "Citronella Oil Surface Cleaner",
		image: p_nutrient_default,
		price: 249,
		mrp: 299,
		rating: 4.6,
		reviews: 180,
		variantLabel: "Volume",
		variants: ["500 ml", "1 L"],
		tags: ["Plant Care"]
	},
	{
		id: "p20",
		title: "Natural Dish Wash for Garden Tools",
		image: p_mix_default,
		price: 199,
		mrp: 249,
		rating: 4.9,
		reviews: 94,
		variantLabel: "Volume",
		variants: ["250 ml"],
		tags: ["Plant Care"]
	}
];
var NAV = [
	{
		label: "Seeds",
		items: [
			"Vegetable Seeds",
			"Herb Seeds",
			"Flower Seeds"
		]
	},
	{
		label: "Plants",
		items: [
			"Indoor Plants",
			"Succulents",
			"Bonsai"
		]
	},
	{
		label: "Pots & Planters",
		items: [
			"Ceramic",
			"Clay",
			"FRP",
			"Metal",
			"Hanging"
		]
	},
	{
		label: "Plant Care",
		items: [
			"Potting Mix",
			"Biostimulants",
			"Organic Pest Control"
		]
	},
	{
		label: "Garden Tools",
		items: [
			"Hand Tools",
			"Watering",
			"Accessories"
		]
	},
	{
		label: "Green Gifts",
		items: [
			"Gift Hampers",
			"Corporate Gifting",
			"Gift Cards"
		]
	}
];
var QUICK_CATEGORIES = [
	{
		label: "Seeds",
		emoji: "🌰",
		image: p_seeds_default
	},
	{
		label: "Ceramic Pots",
		emoji: "🪴",
		image: p_ceramic_default
	},
	{
		label: "Organic Pot Mix",
		emoji: "🌱",
		image: p_mix_default
	},
	{
		label: "Bio-Nutrients",
		emoji: "🧪",
		image: p_nutrient_default
	},
	{
		label: "Garden Tools",
		emoji: "✂️",
		image: p_tools_default
	},
	{
		label: "Gift Hampers",
		emoji: "🎁",
		image: gifting_default
	}
];
var FREE_SHIPPING_THRESHOLD = 1999;
var inr = (n) => "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
function CartDrawer() {
	const { open, setOpen, lines, subtotal, savings, setQty, remove, clear, count } = useCart();
	const [isSuccess, setIsSuccess] = (0, import_react.useState)(false);
	const [savedData, setSavedData] = (0, import_react.useState)(null);
	const [useSaved, setUseSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const savedStr = localStorage.getItem("verdant_saved_address");
		if (savedStr) try {
			const data = JSON.parse(savedStr);
			setSavedData(data);
			setUseSaved(true);
		} catch (e) {}
	}, [open]);
	const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
	const pct = Math.min(100, subtotal / FREE_SHIPPING_THRESHOLD * 100);
	const handleCheckout = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = useSaved && savedData ? savedData : Object.fromEntries(formData.entries());
		if (!useSaved && data["saveInfo"] === "on") {
			localStorage.setItem("verdant_saved_address", JSON.stringify(data));
			setSavedData(data);
		}
		let message = `*New Order from GreenRoots!*\n\n`;
		message += `*Customer Details:*\n`;
		message += `Name: ${data["firstName"]} ${data["lastName"]}\n`;
		message += `Email/Phone: ${data["email"]}\n`;
		message += `Phone: ${data["phone"]}\n`;
		message += `Address: ${data["address"]}, ${data["apartment"] ? data["apartment"] + ", " : ""}${data["city"]}, ${data["state"]} - ${data["pin"]}\n\n`;
		message += `*Order Items:*\n`;
		lines.forEach((l) => {
			message += `- ${l.qty}x ${l.title} (${l.variant}) - ${inr(l.price * l.qty)}\n`;
		});
		message += `\n*Totals:*\n`;
		message += `Subtotal: ${inr(subtotal)}\n`;
		const shipping = subtotal >= 1999 ? 0 : 100;
		message += `Shipping: ${shipping === 0 ? "Free" : inr(shipping)}\n`;
		message += `*Total: ${inr(subtotal + shipping)}*\n`;
		const whatsappUrl = `https://wa.me/916360988785?text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, "_blank");
		clear();
		setIsSuccess(true);
		confetti_module_default({
			particleCount: 150,
			spread: 70,
			origin: { y: .6 },
			colors: [
				"#2F5C43",
				"#E3F1E3",
				"#407B5A"
			]
		});
	};
	const handleClose = (v) => {
		setOpen(v);
		if (!v) setTimeout(() => setIsSuccess(false), 300);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: handleClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "flex w-full flex-col gap-0 bg-cream p-0 sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "border-b border-border px-6 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
					className: "font-display text-xl text-forest",
					children: [
						"Your Basket (",
						count,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
					className: "text-muted-foreground",
					children: "Freshly potted and ready to ship across India."
				})]
			}), isSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-20 items-center justify-center rounded-full bg-green-100 mb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-10 text-forest" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold text-forest",
						children: "Order Successful!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Your details have been sent to our WhatsApp successfully! We will contact you soon with updates on your beautiful plants."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "mt-6",
						onClick: () => handleClose(false),
						children: "Continue Shopping"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleCheckout,
				className: "flex flex-1 flex-col overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border bg-secondary/60 px-6 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm text-forest",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 text-primary" }), remaining > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"You're ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: inr(remaining) }),
								" away from free shipping"
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Free shipping unlocked" }), " — nice one!"] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: pct,
							className: "mt-3 h-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 overflow-y-auto px-6 py-5",
						children: [lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center gap-3 py-20 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-14 items-center justify-center rounded-full bg-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-6 text-primary" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg text-forest",
									children: "Your basket is empty"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-xs text-sm text-muted-foreground",
									children: "Add a few seed packs or a designer planter to get growing."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => handleClose(false),
									children: "Continue shopping"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-4",
							children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-4 rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-soft)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: l.image,
									alt: l.title,
									loading: "lazy",
									width: 80,
									height: 80,
									className: "size-20 shrink-0 rounded-lg object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "line-clamp-2 text-sm font-medium text-forest",
											children: l.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-xs text-muted-foreground",
											children: l.variant
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center rounded-full border border-border",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														"aria-label": "Decrease quantity",
														onClick: () => setQty(l.key, l.qty - 1),
														className: "grid size-7 place-items-center rounded-full text-forest transition-colors hover:bg-secondary",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "w-7 text-center text-sm font-medium",
														children: l.qty
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														"aria-label": "Increase quantity",
														onClick: () => setQty(l.key, l.qty + 1),
														className: "grid size-7 place-items-center rounded-full text-forest transition-colors hover:bg-secondary",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-semibold text-forest",
													children: inr(l.price * l.qty)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-label": `Remove ${l.title}`,
													onClick: () => remove(l.key),
													className: "text-muted-foreground transition-colors hover:text-destructive",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
												})]
											})]
										})
									]
								})]
							}, l.key))
						}), lines.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 pb-6",
							children: [savedData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-8 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold text-forest",
									children: "Delivery Information"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
									value: useSaved ? "saved" : "new",
									onValueChange: (val) => setUseSaved(val === "saved"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start space-x-3 rounded-xl border border-border bg-white p-4 transition-colors hover:bg-secondary/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
											value: "saved",
											id: "saved",
											className: "mt-1"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "saved",
											className: "flex-1 cursor-pointer font-normal",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium text-forest",
												children: "Use saved address"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mt-1 block text-sm text-muted-foreground",
												children: [
													savedData.firstName,
													" ",
													savedData.lastName,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													savedData.address,
													", ",
													savedData.city,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													savedData.phone
												]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center space-x-3 rounded-xl border border-border bg-white p-4 transition-colors hover:bg-secondary/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
											value: "new",
											id: "new"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "new",
											className: "cursor-pointer font-medium text-forest",
											children: "Use a different address"
										})]
									})]
								})]
							}), (!savedData || !useSaved) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-4 font-display text-lg font-semibold text-forest",
									children: "Contact"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-4 mb-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "text",
										name: "email",
										required: true,
										placeholder: "Email or mobile phone number",
										className: "h-11 w-full bg-white"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-4 font-display text-lg font-semibold text-forest",
									children: "Delivery"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												name: "country",
												className: "h-11 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none",
												defaultValue: "India",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "India",
													children: "India"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "US",
													children: "United States"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground",
												children: "▼"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												name: "firstName",
												required: true,
												type: "text",
												placeholder: "First name",
												className: "h-11 flex-1 bg-white"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												name: "lastName",
												required: true,
												type: "text",
												placeholder: "Last name",
												className: "h-11 flex-1 bg-white"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "company",
											type: "text",
											placeholder: "Company (optional)",
											className: "h-11 w-full bg-white"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "address",
											required: true,
											type: "text",
											placeholder: "Address",
											className: "h-11 w-full bg-white"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "apartment",
											type: "text",
											placeholder: "Apartment, suite, etc.",
											className: "h-11 w-full bg-white"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												name: "city",
												required: true,
												type: "text",
												placeholder: "City",
												className: "h-11 flex-1 bg-white"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													name: "state",
													className: "h-11 w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none",
													defaultValue: "Karnataka",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Karnataka",
														children: "Karnataka"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Maharashtra",
														children: "Maharashtra"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground",
													children: "▼"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												name: "pin",
												required: true,
												type: "text",
												placeholder: "PIN code",
												className: "h-11 flex-1 bg-white"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												name: "phone",
												required: true,
												type: "tel",
												placeholder: "Phone",
												className: "h-11 flex-1 bg-white"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex items-center space-x-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												id: "save-info",
												name: "saveInfo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "save-info",
												className: "text-sm font-normal text-muted-foreground",
												children: "Save this information for next time"
											})]
										})
									]
								})
							] })]
						})]
					}),
					lines.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border bg-card px-6 py-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base font-semibold text-forest",
									children: inr(subtotal)
								})]
							}),
							savings > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "You save"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-primary",
									children: inr(savings)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "lg",
								className: "w-full rounded-xl",
								children: "Checkout securely"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-center text-xs text-muted-foreground",
								children: "Taxes calculated at checkout · UPI, Cards & NetBanking"
							})
						]
					})
				]
			})]
		})
	});
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header$1, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var PERKS = [
	{
		icon: Truck,
		text: "Free shipping on orders over ₹1,999"
	},
	{
		icon: Zap,
		text: "Next Day Delivery available in metro areas"
	},
	{
		icon: Sprout,
		text: "Live plants shipped in root-safe packaging"
	},
	{
		icon: Leaf,
		text: "100% organic, non-toxic & pet safe"
	}
];
function AnnouncementBar() {
	const row = [...PERKS, ...PERKS];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden bg-forest-deep py-2.5 text-forest-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex w-max marquee-track",
			children: row.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex shrink-0 items-center gap-2 px-8 text-xs tracking-wide sm:text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "size-4 opacity-90" }), p.text]
			}, i))
		})
	});
}
function Header() {
	const { count, setOpen, wishlist } = useCart();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [showResults, setShowResults] = (0, import_react.useState)(false);
	const [placeholderText, setPlaceholderText] = (0, import_react.useState)("");
	const searchRef = (0, import_react.useRef)(null);
	const fullText = "Search for seeds, plants, planters & more...";
	(0, import_react.useEffect)(() => {
		let currentIndex = 0;
		const interval = setInterval(() => {
			setPlaceholderText(fullText.slice(0, currentIndex));
			currentIndex++;
			if (currentIndex > 54) currentIndex = 0;
		}, 100);
		return () => clearInterval(interval);
	}, []);
	(0, import_react.useEffect)(() => {
		function handleClickOutside(event) {
			if (searchRef.current && !searchRef.current.contains(event.target)) setShowResults(false);
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const results = searchQuery.trim() ? PRODUCTS.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnnouncementBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-cream/95 backdrop-blur-md pb-3 lg:pb-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full flex-wrap items-center gap-y-3 gap-x-2 sm:gap-x-4 px-3 sm:px-4 py-3 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "lg:hidden",
							"aria-label": "Menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						side: "left",
						className: "bg-cream",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							className: "font-display text-forest",
							children: "Shop by category"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
							type: "single",
							collapsible: true,
							className: "px-4",
							children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
								value: n.label,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
									className: "text-forest",
									children: n.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2",
									children: n.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#products",
										className: "text-sm text-muted-foreground",
										children: i
									}) }, i))
								}) })]
							}, n.label))
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#top",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "logo-glow grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-card lg:size-16",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/logo.png",
								alt: "GreenRoots",
								className: "size-full scale-[1.02] object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden font-display text-lg font-semibold tracking-tight text-forest sm:block lg:text-xl",
							children: "GreenRoots"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 lg:hidden" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: searchRef,
						className: "relative order-last w-full lg:order-none lg:w-auto lg:flex-1 z-50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 size-5 -translate-y-1/2 text-primary pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "search",
								placeholder: placeholderText,
								value: searchQuery,
								onChange: (e) => {
									setSearchQuery(e.target.value);
									setShowResults(true);
								},
								onFocus: () => setShowResults(true),
								className: "h-12 w-full rounded-2xl border-border bg-card pl-12 pr-4 shadow-[var(--shadow-soft)] transition-all hover:border-primary focus-visible:ring-1 focus-visible:ring-primary lg:h-14 lg:text-base"
							}),
							showResults && searchQuery.trim() !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-full left-0 mt-2 w-full rounded-2xl border border-border bg-cream p-2 shadow-lg max-h-80 overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "max-h-72 overflow-y-auto space-y-1 pr-1",
									children: results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "px-3 py-4 text-center text-sm text-muted-foreground",
										children: "No matches — try a broader term."
									}) : results.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/product/$id",
										params: { id: p.id },
										onClick: () => setShowResults(false),
										className: "flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-secondary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: p.image,
											alt: p.title,
											loading: "lazy",
											width: 44,
											height: 44,
											className: "size-11 rounded-lg object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "line-clamp-1 text-sm text-forest font-medium",
											children: p.title
										})]
									}) }, p.id))
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center xl:flex",
						children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-forest transition-colors hover:bg-secondary",
								children: [n.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5 transition-transform group-hover:rotate-180" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "invisible absolute top-full left-0 w-56 translate-y-1 rounded-xl border border-border bg-card p-2 opacity-0 shadow-[var(--shadow-lift)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
								children: n.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#products",
									className: "block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-forest",
									children: i
								}, i))
							})]
						}, n.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-0.5 sm:gap-1 lg:ml-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Wishlist",
								className: "relative size-9 sm:size-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4 sm:size-5" }), wishlist.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-clay text-[10px] font-semibold text-forest-foreground",
									children: wishlist.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Account",
								className: "relative size-9 sm:size-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4 sm:size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setOpen(true),
								className: "relative ml-0.5 sm:ml-1 rounded-xl h-9 sm:h-10 px-2.5 sm:px-4",
								"aria-label": "Open cart",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4 mr-0 sm:mr-2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Cart"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-1.5 -right-1.5 sm:static sm:-top-auto sm:-right-auto grid min-w-4 sm:min-w-5 place-items-center rounded-full bg-forest px-1 text-[10px] sm:text-xs font-semibold text-forest-foreground border-2 border-cream sm:border-none",
										children: count
									})
								]
							})
						]
					})
				]
			})
		})]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var CarouselContext = import_react.createContext(null);
function useCarousel() {
	const context = import_react.useContext(CarouselContext);
	if (!context) throw new Error("useCarousel must be used within a <Carousel />");
	return context;
}
var Carousel = import_react.forwardRef(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
	const [carouselRef, api] = useEmblaCarousel({
		...opts,
		axis: orientation === "horizontal" ? "x" : "y"
	}, plugins);
	const [canScrollPrev, setCanScrollPrev] = import_react.useState(false);
	const [canScrollNext, setCanScrollNext] = import_react.useState(false);
	const onSelect = import_react.useCallback((api) => {
		if (!api) return;
		setCanScrollPrev(api.canScrollPrev());
		setCanScrollNext(api.canScrollNext());
	}, []);
	const scrollPrev = import_react.useCallback(() => {
		api?.scrollPrev();
	}, [api]);
	const scrollNext = import_react.useCallback(() => {
		api?.scrollNext();
	}, [api]);
	const handleKeyDown = import_react.useCallback((event) => {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			scrollPrev();
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			scrollNext();
		}
	}, [scrollPrev, scrollNext]);
	import_react.useEffect(() => {
		if (!api || !setApi) return;
		setApi(api);
	}, [api, setApi]);
	import_react.useEffect(() => {
		if (!api) return;
		onSelect(api);
		api.on("reInit", onSelect);
		api.on("select", onSelect);
		return () => {
			api?.off("select", onSelect);
		};
	}, [api, onSelect]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselContext.Provider, {
		value: {
			carouselRef,
			api,
			opts,
			orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
			scrollPrev,
			scrollNext,
			canScrollPrev,
			canScrollNext
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			onKeyDownCapture: handleKeyDown,
			className: cn("relative", className),
			role: "region",
			"aria-roledescription": "carousel",
			...props,
			children
		})
	});
});
Carousel.displayName = "Carousel";
var CarouselContent = import_react.forwardRef(({ className, ...props }, ref) => {
	const { carouselRef, orientation } = useCarousel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: carouselRef,
		className: "overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className: cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className),
			...props
		})
	});
});
CarouselContent.displayName = "CarouselContent";
var CarouselItem = import_react.forwardRef(({ className, ...props }, ref) => {
	const { orientation } = useCarousel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		role: "group",
		"aria-roledescription": "slide",
		className: cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className),
		...props
	});
});
CarouselItem.displayName = "CarouselItem";
var CarouselPrevious = import_react.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		ref,
		variant,
		size,
		className: cn("absolute  h-8 w-8 rounded-full", orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className),
		disabled: !canScrollPrev,
		onClick: scrollPrev,
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Previous slide"
		})]
	});
});
CarouselPrevious.displayName = "CarouselPrevious";
var CarouselNext = import_react.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		ref,
		variant,
		size,
		className: cn("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className),
		disabled: !canScrollNext,
		onClick: scrollNext,
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Next slide"
		})]
	});
});
CarouselNext.displayName = "CarouselNext";
function ProductCard({ product }) {
	const { add, setQty, setOpen, lines, wishlist, toggleWishlist } = useCart();
	const [variant, setVariant] = (0, import_react.useState)(product.variants[0] ?? "Default");
	const off = Math.round((product.mrp - product.price) / product.mrp * 100);
	const wished = wishlist.includes(product.id);
	const cartLine = lines.find((l) => l.key === `${product.id}::${variant}`);
	const qty = cartLine ? cartLine.qty : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-square overflow-hidden bg-secondary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$id",
					params: { id: product.id },
					className: "block size-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: product.title,
						loading: "lazy",
						width: 900,
						height: 900,
						className: "size-full object-cover transition-transform duration-500 group-hover:scale-110"
					})
				}),
				product.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					className: "absolute top-3 left-3 rounded-full",
					children: product.badge
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Add to wishlist",
					onClick: () => toggleWishlist(product.id),
					className: "absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-card/90 text-forest backdrop-blur transition-colors hover:bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", wished && "fill-clay text-clay") })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2.5 p-3 sm:gap-3 sm:p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-4 items-center gap-1.5 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-clay text-clay" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-forest",
							children: product.rating
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"(",
							product.reviews.toLocaleString("en-IN"),
							")"
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "line-clamp-2 h-10 text-sm leading-snug font-medium text-forest hover:underline sm:h-11 sm:text-[15px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$id",
						params: { id: product.id },
						children: product.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1.5 text-[10px] tracking-wide text-muted-foreground uppercase sm:text-[11px]",
						children: product.variantLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap content-start gap-1.5",
						children: product.variants.slice(0, 4).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setVariant(v),
							className: cn("rounded-full border px-2 py-0.5 text-[10px] transition-colors sm:px-2.5 sm:py-1 sm:text-xs", variant === v ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary hover:text-forest"),
							children: v
						}, v))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex flex-wrap items-end justify-between gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline gap-x-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-base font-semibold text-forest sm:text-lg",
								children: inr(product.price)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground line-through",
								children: inr(product.mrp)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-medium text-primary",
							children: [off, "% off"]
						})]
					}), qty > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 flex-col gap-2 items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-8 items-center rounded-xl border border-border bg-card sm:h-9",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "size-8 rounded-none rounded-l-xl text-muted-foreground hover:text-forest sm:size-9",
									onClick: () => setQty(`${product.id}::${variant}`, qty - 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex min-w-[1.5rem] items-center justify-center text-sm font-semibold text-forest sm:min-w-[2rem]",
									children: qty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "size-8 rounded-none rounded-r-xl text-muted-foreground hover:text-forest sm:size-9",
									onClick: () => add(product, variant, false),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							className: "h-7 w-full rounded-lg text-[10px] tracking-wide uppercase",
							onClick: () => setOpen(true),
							children: "Go to Cart"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						className: "h-8 shrink-0 rounded-xl sm:h-9",
						onClick: () => add(product, variant, false),
						"aria-label": `Add ${product.title} to cart`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add"]
					})]
				})
			]
		})]
	});
}
var SLIDES = [
	{
		image: "/assets/village-farm-CKPPeZ7n.png",
		eyebrow: "New season · Monsoon ready",
		title: "GreenRoots Gardening Made Effortless",
		copy: "Seeds, bio-fertilisers and designer planters curated for balconies, terraces and tiny windowsills."
	},
	{
		image: p_plants_default,
		eyebrow: "Bestselling collection",
		title: "Greener Corners, Cleaner Air",
		copy: "Hand-picked indoor plants that thrive in low light and forgive a missed watering or two."
	},
	{
		image: p_ceramic_default,
		eyebrow: "Studio-made in India",
		title: "Planters Worth Showing Off",
		copy: "Small-batch ceramic, clay and metal planters finished by hand, from ₹199."
	}
];
function ScrollableRow({ children, className }) {
	const scrollRef = (0, import_react.useRef)(null);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [startX, setStartX] = (0, import_react.useState)(0);
	const [scrollLeftState, setScrollLeftState] = (0, import_react.useState)(0);
	const rafRef = (0, import_react.useRef)(0);
	const [scrollDir, setScrollDir] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (scrollDir === 0) {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			return;
		}
		const scrollStep = () => {
			if (scrollRef.current) scrollRef.current.scrollLeft += scrollDir * 4;
			rafRef.current = requestAnimationFrame(scrollStep);
		};
		rafRef.current = requestAnimationFrame(scrollStep);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [scrollDir]);
	const handleMouseDown = (e) => {
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
	const handleMouseMove = (e) => {
		if (isDragging && scrollRef.current) {
			e.preventDefault();
			const walk = (e.pageX - (scrollRef.current.offsetLeft || 0) - startX) * 1.5;
			scrollRef.current.scrollLeft = scrollLeftState - walk;
			setScrollDir(0);
			return;
		}
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const edgeSize = 100;
		if (x < edgeSize) setScrollDir(-1);
		else if (rect.width - x < edgeSize) setScrollDir(1);
		else setScrollDir(0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `.hide-scroll::-webkit-scrollbar { display: none; }` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: scrollRef,
		className: cn("flex overflow-x-auto hide-scroll gap-4 sm:gap-6 cursor-grab active:cursor-grabbing select-none", className),
		style: {
			scrollbarWidth: "none",
			msOverflowStyle: "none"
		},
		onMouseDown: handleMouseDown,
		onMouseLeave: handleMouseLeave,
		onMouseUp: handleMouseUp,
		onMouseMove: handleMouseMove,
		children
	})] });
}
function Hero() {
	const [api, setApi] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!api) return;
		const id = setInterval(() => api.scrollNext(), 3e3);
		return () => clearInterval(id);
	}, [api]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "bg-cream px-4 pt-6 pb-2 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
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
      ` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-10 right-10 md:top-16 md:right-32 z-20 hidden md:flex items-center gap-4 rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] animate-float",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-500",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-6 fill-current" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground font-medium uppercase tracking-wider",
						children: "Customer Rating"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-bold text-forest",
						children: "4.9 / 5.0"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-10 right-16 md:bottom-24 md:right-56 z-20 hidden md:flex items-center gap-4 rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] animate-float-delayed pointer-events-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "size-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground font-medium uppercase tracking-wider",
						children: "Today's Harvest"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-bold text-forest",
						children: "Fresh Picked Today"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Carousel, {
					setApi,
					opts: { loop: true },
					className: "overflow-hidden rounded-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselContent, {
							className: "ml-0",
							children: SLIDES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselItem, {
								className: "pl-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative min-h-[440px] overflow-hidden rounded-3xl lg:min-h-[560px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: s.image,
											alt: s.title,
											loading: i === 0 ? "eager" : "lazy",
											width: 1600,
											height: 1008,
											className: "absolute inset-0 size-full object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/70 to-forest/10" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative flex min-h-[440px] max-w-2xl flex-col justify-center gap-5 p-8 lg:min-h-[560px] lg:p-16",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
													variant: "secondary",
													className: "w-fit rounded-full bg-cream/15 text-cream backdrop-blur",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-3.5" }), s.eyebrow]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
													className: "font-display text-4xl leading-[1.05] font-semibold text-cream lg:text-6xl",
													children: s.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "max-w-lg text-base text-cream/80 lg:text-lg",
													children: s.copy
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														size: "lg",
														className: "rounded-xl",
														asChild: true,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
															href: "#products",
															children: ["Shop Best Sellers", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														size: "lg",
														variant: "outline",
														asChild: true,
														className: "rounded-xl border-cream/60 bg-transparent text-cream hover:bg-cream hover:text-forest",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
															href: "#gifting",
															children: "Explore Kits"
														})
													})]
												})
											]
										})
									]
								})
							}, s.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselPrevious, { className: "left-4 hidden size-10 border-none bg-cream/90 text-forest lg:flex" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselNext, { className: "right-4 hidden size-10 border-none bg-cream/90 text-forest lg:flex" })
					]
				})
			]
		})]
	});
}
function QuickNav() {
	const row = [...QUICK_CATEGORIES, ...QUICK_CATEGORIES];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "overflow-hidden px-0 py-10 lg:py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "group flex w-max marquee-track gap-6 pb-2 hover:[animation-play-state:paused]",
			children: row.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "#products",
				className: "group/item flex w-28 shrink-0 flex-col items-center gap-3 text-center lg:w-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "relative size-24 overflow-hidden rounded-full border-2 border-border p-1 transition-colors group-hover/item:border-primary lg:size-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: c.image,
						alt: c.label,
						loading: "lazy",
						width: 200,
						height: 200,
						className: "size-full rounded-full object-cover transition-transform duration-500 group-hover/item:scale-110"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm font-medium text-forest",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "mr-1",
						children: c.emoji
					}), c.label]
				})]
			}, `${c.label}-${i}`))
		})
	});
}
var PROMOS = [
	{
		badge: "Value pack",
		title: "Seed Packs",
		highlight: "4 for ₹499",
		copy: "Mix & match vegetables, herbs and blooms.",
		tone: "bg-forest text-cream"
	},
	{
		badge: "Limited time",
		title: "Plant Care",
		highlight: "Flat 15% OFF",
		copy: "Biostimulants, neem sprays & potting mixes.",
		tone: "bg-secondary text-forest"
	},
	{
		badge: "Studio made",
		title: "Designer Planters",
		highlight: "From ₹199",
		copy: "Ceramic, clay, FRP and hanging planters.",
		tone: "bg-sand text-forest"
	},
	{
		badge: "Gifting",
		title: "Green Hampers",
		highlight: "Under ₹999",
		copy: "Ready-to-gift kits with a handwritten note.",
		tone: "bg-primary text-primary-foreground"
	}
];
function Promos() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 pb-10 lg:px-8 lg:pb-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: PROMOS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "#products",
				className: cn("group hover-lift hover-sheen flex flex-col gap-2 rounded-2xl p-6", p.tone),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-fit rounded-full border border-current/25 px-2.5 py-1 text-[11px] tracking-wide uppercase opacity-80",
						children: p.badge
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 text-sm font-medium opacity-80",
						children: p.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-semibold",
						children: p.highlight
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm opacity-75",
						children: p.copy
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-2 flex items-center gap-1 text-sm font-medium",
						children: ["Shop now", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform group-hover:translate-x-1" })]
					})
				]
			}, p.title))
		})
	});
}
function FeaturedProducts() {
	const [tab, setTab] = (0, import_react.useState)("All");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [placeholderText, setPlaceholderText] = (0, import_react.useState)("");
	const fullText = "Search for products...";
	(0, import_react.useEffect)(() => {
		let currentIndex = 0;
		const interval = setInterval(() => {
			setPlaceholderText(fullText.slice(0, currentIndex));
			currentIndex++;
			if (currentIndex > 32) currentIndex = 0;
		}, 100);
		return () => clearInterval(interval);
	}, []);
	const list = PRODUCTS.filter((p) => {
		const matchesTab = tab === "All" || p.tags.includes(tab);
		const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesTab && matchesSearch;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "products",
		className: "bg-card px-4 py-14 lg:px-8 lg:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tracking-wide text-primary uppercase",
						children: "Featured this week"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl font-semibold text-forest lg:text-4xl",
						children: "Everything your balcony needs"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative max-w-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "h-12 w-full rounded-xl bg-background/50 pl-12 text-forest focus:bg-background transition-colors",
							placeholder: placeholderText
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
						value: tab,
						onValueChange: setTab,
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
							className: "flex-wrap justify-start h-auto rounded-xl bg-secondary p-1",
							children: CATEGORY_TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: t,
								className: "rounded-lg text-xs sm:text-sm",
								children: t
							}, t))
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollableRow, {
				className: "mt-10 w-full py-2",
				children: list.length > 0 ? list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-[280px] sm:min-w-[320px] max-w-[280px] sm:max-w-[320px] shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p })
				}, p.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full py-12 text-center text-muted-foreground",
					children: [
						"No products found matching \"",
						searchQuery,
						"\""
					]
				})
			})]
		})
	});
}
function ProductRow({ title, filterTag }) {
	const list = filterTag ? PRODUCTS.filter((p) => p.tags.includes(filterTag)) : PRODUCTS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-card px-4 py-10 lg:px-8 lg:py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-center font-display text-3xl font-semibold text-forest lg:text-4xl mb-8",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollableRow, {
				className: "w-full py-2",
				children: list.length > 0 ? list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-[280px] sm:min-w-[320px] max-w-[280px] sm:max-w-[320px] shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p })
				}, p.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full py-12 text-center text-muted-foreground",
					children: "No products found"
				})
			})]
		})
	});
}
function GiftingBanner() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "gifting",
		className: "px-4 py-14 lg:px-8 lg:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full overflow-hidden rounded-3xl bg-forest lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative min-h-72 lg:min-h-[460px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: gifting_default,
					alt: "Plant gift hamper with ceramic planter and seed packets",
					loading: "lazy",
					width: 1200,
					height: 912,
					className: "absolute inset-0 size-full object-cover"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-center gap-5 p-8 lg:p-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "secondary",
						className: "w-fit rounded-full bg-cream/15 text-cream",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-3.5" }), "Corporate & festive gifting"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold text-cream lg:text-4xl",
						children: "Gifts That Keep Growing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-md text-cream/75",
						children: "Curated hampers pairing studio planters with heirloom seeds, organic feed and a simple grow guide — packed plastic-free and delivered pan-India with your custom note."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2 text-sm text-cream/80 sm:grid-cols-2",
						children: [
							"Bulk pricing from 25 units",
							"Custom branding & notes",
							"Plastic-free packing",
							"Live plant guarantee"
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-4 text-cream/60" }), i]
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "w-fit rounded-xl",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#products",
							children: ["Explore Gifting Sets", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					})
				]
			})]
		})
	});
}
function ReelVideo({ src, poster, onClick, isPlaying }) {
	const videoRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (videoRef.current) videoRef.current.load();
	}, [src]);
	(0, import_react.useEffect)(() => {
		if (videoRef.current) if (isPlaying) videoRef.current.play().catch(() => {});
		else videoRef.current.pause();
	}, [isPlaying]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full h-full cursor-pointer group",
		onClick,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src,
				poster,
				loop: true,
				muted: true,
				playsInline: true,
				className: "w-full h-full object-cover transition-opacity duration-300"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full p-2 pointer-events-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-4 text-white" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `absolute inset-0 flex flex-col justify-between p-4 md:p-6 transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-8 md:size-10 rounded-full bg-primary/40 backdrop-blur border border-white/40 grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-4 md:size-5 text-white" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white font-medium text-xs md:text-sm shadow-black drop-shadow-md",
						children: "greenroots_india"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 mb-2 md:mb-3 text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 cursor-pointer hover:opacity-80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5 md:size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs md:text-sm font-medium",
							children: "104"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 cursor-pointer hover:opacity-80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-5 md:size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs md:text-sm font-medium",
							children: "0"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-white text-xs md:text-sm drop-shadow-md line-clamp-2",
					children: "Bring nature home! 🌿 Elevate your space with these beauties. #UrbanGardening"
				})] })]
			})
		]
	});
}
function InstagramReels() {
	const REELS = [
		{
			src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
			poster: "https://images.unsplash.com/photo-1490682143684-14369e18dce8?q=80&w=600&auto=format&fit=crop"
		},
		{
			src: "https://mdn.github.io/shared-assets/videos/friday.mp4",
			poster: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=600&auto=format&fit=crop"
		},
		{
			src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
			poster: "https://images.unsplash.com/photo-1416879598555-2591eeb00d81?q=80&w=600&auto=format&fit=crop"
		},
		{
			src: "https://mdn.github.io/shared-assets/videos/friday.mp4",
			poster: "https://images.unsplash.com/photo-1463320898484-cdefe81a04ad?q=80&w=600&auto=format&fit=crop"
		},
		{
			src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
			poster: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=600&auto=format&fit=crop"
		},
		{
			src: "https://mdn.github.io/shared-assets/videos/friday.mp4",
			poster: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=600&auto=format&fit=crop"
		},
		{
			src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
			poster: "https://images.unsplash.com/photo-1524397057410-1e775ed476f3?q=80&w=600&auto=format&fit=crop"
		},
		{
			src: "https://mdn.github.io/shared-assets/videos/friday.mp4",
			poster: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=600&auto=format&fit=crop"
		}
	];
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(0);
	const [openIndex, setOpenIndex] = (0, import_react.useState)(null);
	const handleNext = () => setCurrentIndex((prev) => (prev + 1) % REELS.length);
	const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + REELS.length) % REELS.length);
	(0, import_react.useEffect)(() => {
		if (openIndex === null) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpenIndex(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [openIndex]);
	const positions = [
		{
			left: "15%",
			scale: .75,
			zIndex: 10,
			opacity: .5,
			brightness: "brightness-50"
		},
		{
			left: "30%",
			scale: .85,
			zIndex: 20,
			opacity: .8,
			brightness: "brightness-75"
		},
		{
			left: "50%",
			scale: 1,
			zIndex: 30,
			opacity: 1,
			brightness: "brightness-100 shadow-[0_8px_30px_rgb(0,0,0,0.15)]"
		},
		{
			left: "70%",
			scale: .85,
			zIndex: 20,
			opacity: .8,
			brightness: "brightness-75"
		},
		{
			left: "85%",
			scale: .75,
			zIndex: 10,
			opacity: .5,
			brightness: "brightness-50"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bg-[#FAF7F2] py-20 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-display font-semibold text-forest",
					children: "Follow us on Instagram"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mt-4",
					children: "Join our community for daily inspiration and a closer look at our creations"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full mx-auto px-4 h-[450px] md:h-[600px] flex items-center justify-center my-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "absolute left-4 md:left-8 z-50 grid size-12 place-items-center rounded-full bg-white text-black shadow-lg hover:bg-white/90 transition-colors border-0",
						onClick: handlePrev,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "absolute right-4 md:right-12 z-50 grid size-12 place-items-center rounded-full bg-white text-black shadow-lg hover:bg-white/90 transition-colors border-0",
						onClick: handleNext,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-6" })
					}),
					[
						-2,
						-1,
						0,
						1,
						2
					].map((offset, i) => {
						const pos = positions[i];
						const isCenter = offset === 0;
						let videoIndex = (currentIndex + offset) % REELS.length;
						if (videoIndex < 0) videoIndex += REELS.length;
						const item = REELS[videoIndex];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `absolute top-1/2 transition-all duration-300 ease-in-out ${pos.brightness} rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[9/16] w-[200px] sm:w-[240px] md:w-[320px] bg-black group`,
							style: {
								left: pos.left,
								transform: `translate(-50%, -50%) scale(${pos.scale})`,
								zIndex: pos.zIndex,
								opacity: pos.opacity
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelVideo, {
								src: item.src,
								poster: item.poster,
								isPlaying: isCenter && openIndex === null,
								onClick: () => {
									if (isCenter) setOpenIndex(videoIndex);
									else setCurrentIndex(videoIndex);
								}
							})
						}, offset);
					}),
					openIndex !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 z-[60] flex items-center justify-center bg-forest/60 backdrop-blur-sm",
						onClick: () => setOpenIndex(null),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[9/16] h-[85%] max-w-[92vw] overflow-hidden rounded-3xl bg-black shadow-2xl",
							onClick: (e) => e.stopPropagation(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelVideo, {
								src: REELS[openIndex].src,
								poster: REELS[openIndex].poster,
								isPlaying: true,
								onClick: () => {}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": "Close reel",
								className: "absolute top-3 left-3 z-10 grid size-9 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80",
								onClick: () => setOpenIndex(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center mt-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "rounded-full px-8 py-6 text-lg bg-black text-white hover:bg-black/90 font-medium",
					children: "Visit Instagram"
				})
			})
		]
	});
}
var SERVICES = [
	{
		icon: Flower2,
		title: "Verticle Gardening",
		copy: "Living walls for compact spaces"
	},
	{
		icon: Sun,
		title: "Terrace Gardening",
		copy: "Green spaces made for city living"
	},
	{
		icon: Sprout,
		title: "Repotting",
		copy: "Fresh soil and healthier roots"
	},
	{
		icon: Trees,
		title: "Landscaping",
		copy: "Beautiful outdoor transformations"
	},
	{
		icon: Scissors,
		title: "Maintenance",
		copy: "Expert care for your green assets"
	},
	{
		icon: Trees,
		title: "Lawn Care",
		copy: "Seasonal upkeep & restoration"
	}
];
function OurServices() {
	const [active, setActive] = (0, import_react.useState)(0);
	(0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "services-heading",
		className: "bg-forest text-forest-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden leading-[0] text-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 1200 90",
				preserveAspectRatio: "none",
				className: "block h-10 w-full md:h-16",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0 12C90-18 144 86 220 36S338-4 408 45s145 37 224-8 155-53 239-4 136 39 202 2 92-13 127 3V0H0Z",
					className: "fill-current"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-2 pb-12 lg:pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 lg:px-8 mx-auto max-w-3xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "services-heading",
					className: "text-center font-display text-3xl font-semibold lg:text-4xl",
					children: "Our Services"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mt-10 overflow-hidden w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max marquee-track",
					children: [...SERVICES, ...SERVICES].map((service, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-48 sm:w-64 shrink-0 flex-col items-center px-4 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-20 sm:size-24 place-items-center border-b border-forest-foreground/40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(service.icon, {
									strokeWidth: 1.3,
									className: "size-12 sm:size-16"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 font-display text-xl font-semibold md:text-2xl",
								children: service.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xs text-sm leading-relaxed text-forest-foreground/70",
								children: service.copy
							})
						]
					}, `${service.title}-${i}`))
				})
			})]
		})]
	});
}
var WhatsappIcon = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className,
	fill: "currentColor",
	viewBox: "0 0 24 24",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" })
});
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-12 md:mt-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full overflow-hidden leading-[0] text-forest",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 1200 120",
				preserveAspectRatio: "none",
				className: "block w-full h-[40px] md:h-[80px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z",
					className: "fill-current"
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-forest px-4 pb-8 text-cream lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid w-full gap-10 md:grid-cols-2 lg:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col lg:col-span-2 lg:pr-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-12 place-items-center rounded-xl bg-cream/10 text-cream",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-2xl font-semibold leading-none",
										children: "GreenRoots"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 text-[10px] tracking-[0.2em] text-cream/70 uppercase",
										children: "Farm Fresh • Since 2023"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-sm leading-relaxed text-cream/80",
								children: "Bringing the freshest, 100% certified organic plants directly from our nurseries in Karnataka to your family's home — with love, integrity, and zero compromise on quality."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex gap-3",
								children: [
									{
										Icon: Instagram,
										color: "text-pink-500 border-pink-500/40 hover:bg-pink-500 hover:text-white"
									},
									{
										Icon: Facebook,
										color: "text-blue-500 border-blue-500/40 hover:bg-blue-600 hover:text-white"
									},
									{
										Icon: WhatsappIcon,
										color: "text-green-500 border-green-500/40 hover:bg-green-500 hover:text-white"
									},
									{
										Icon: Youtube,
										color: "text-red-500 border-red-500/40 hover:bg-red-600 hover:text-white"
									}
								].map(({ Icon, color }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#top",
									"aria-label": "Social link",
									className: `grid size-9 place-items-center rounded-full border bg-transparent transition-colors ${color}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [
									"NPOP Certified",
									"FSSAI Licensed",
									"ISO 22000"
								].map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border border-yellow-500/40 text-yellow-500 px-4 py-1.5 text-xs font-medium",
									children: badge
								}, badge))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold",
						children: "Quick Links"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-3.5 text-sm text-cream/80",
						children: [
							"About Us",
							"Contact Us",
							"Our Services"
						].map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#top",
							className: "transition-colors hover:text-primary",
							children: link
						}) }, link))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold",
						children: "Products"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-3.5 text-sm text-cream/80",
						children: [
							"Fresh Seeds",
							"Indoor Plants",
							"Ceramic Planters",
							"Organic Manures",
							"Garden Tools",
							"Green Gifts"
						].map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#top",
							className: "flex items-center gap-2 transition-colors hover:text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" }), link]
						}) }, link))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold",
						children: "Contact Us"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-6 space-y-4 text-sm text-cream/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "tel:+916360988785",
								className: "flex items-center gap-3 transition-colors hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4 shrink-0" }), "+91 63609 88785"]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "mailto:contact@greenroots.com",
								className: "flex items-center gap-3 transition-colors hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4 shrink-0" }), "contact@greenroots.com"]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#top",
								className: "flex items-center gap-3 transition-colors hover:text-[#FF0000]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "size-4 shrink-0" }), "Watch Our Nursery Stories"]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Jalahalli, Karnataka 563125" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mon–Sat: 6AM – 6PM" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Free delivery above ₹500" })]
							})
						]
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-16 w-full border-t border-cream/10 pt-8 flex flex-col gap-4 text-xs text-cream/60 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© 2026 ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary font-medium",
							children: "GreenRoots"
						}),
						". All rights reserved. Made with ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[#FF0000]",
							children: "❤️"
						}),
						" in Karnataka, India."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Developed By",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://nandish-tech.online",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-primary font-medium transition-colors hover:text-white hover:underline",
							children: "Nandish-Tech"
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 md:flex-row md:items-center md:gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#top",
								className: "transition-colors hover:text-cream",
								children: "Privacy Policy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#top",
								className: "transition-colors hover:text-cream",
								children: "Terms of Service"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#top",
								className: "transition-colors hover:text-cream",
								children: "Refund Policy"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#top",
						className: "grid size-10 place-items-center rounded-full bg-cream/5 transition-colors hover:bg-primary text-cream",
						"aria-label": "Scroll to top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-5" })
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { gifting_default as _, Footer as a, Hero as c, PRODUCTS as d, ProductCard as f, Reveal as g, QuickNav as h, FeaturedProducts as i, InstagramReels as l, Promos as m, CartDrawer as n, GiftingBanner as o, ProductRow as p, CartProvider as r, Header as s, Badge as t, OurServices as u, inr as v, useCart as y };

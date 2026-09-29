import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { v as Plus, x as Minus } from "../_libs/lucide-react.mjs";
import { t as Route } from "./product._id-0rkletbE.mjs";
import { a as Footer, d as PRODUCTS, f as ProductCard, g as Reveal, n as CartDrawer, r as CartProvider, s as Header, t as Badge, v as inr, y as useCart } from "./Sections-rwGCfVHf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id--ZLq_cSg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPageWrapper() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductPage, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {})
		]
	}) });
}
function ProductPage() {
	const { id } = Route.useParams();
	const product = PRODUCTS.find((p) => p.id === id);
	const { add, setQty, setOpen, lines } = useCart();
	const [variant, setVariant] = (0, import_react.useState)(product?.variants[0] ?? "Default");
	const [pincode, setPincode] = (0, import_react.useState)("");
	const [deliveryStatus, setDeliveryStatus] = (0, import_react.useState)("idle");
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-20 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl font-semibold text-forest",
			children: "Product not found"
		})
	});
	const cartLine = lines.find((l) => l.key === `${product.id}::${variant}`);
	const qty = cartLine ? cartLine.qty : 0;
	Math.round((product.mrp - product.price) / product.mrp * 100);
	const similarProducts = PRODUCTS.filter((p) => p.id !== product.id && p.tags.some((t) => product.tags.includes(t))).slice(0, 4);
	if (similarProducts.length < 4) similarProducts.push(...PRODUCTS.filter((p) => p.id !== product.id && !similarProducts.includes(p)).slice(0, 4 - similarProducts.length));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full px-4 py-8 lg:px-8 lg:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					variant: "zoom",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hover-zoom-media relative aspect-square overflow-hidden rounded-2xl bg-secondary md:aspect-[4/3] lg:aspect-square",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: product.image,
							alt: product.title,
							className: "size-full object-cover"
						}), product.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "absolute top-4 left-4 rounded-full text-sm px-3 py-1",
							children: product.badge
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					variant: "right",
					className: "flex flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [
							product.badge === "Sale" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 inline-block bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-semibold tracking-wider uppercase w-fit",
								children: "Sale"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl font-semibold text-forest md:text-4xl lg:text-5xl",
								children: product.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-end gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl text-muted-foreground line-through",
									children: inr(product.mrp)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl font-bold text-forest",
									children: inr(product.price)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3",
									children: product.variantLabel || "Brand"
								}), product.variants && product.variants.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: product.variants.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setVariant(v),
										className: cn("rounded-lg border px-4 py-2 text-sm font-medium transition-colors", variant === v ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/50"),
										children: v
									}, v))
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-forest",
									children: "Multiplex GreenRoots"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-2.5 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-medium text-forest",
									children: "In stock"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-col sm:flex-row gap-4",
								children: [qty > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-12 w-32 items-center justify-between rounded-xl border border-border bg-card px-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "size-8 text-muted-foreground hover:text-forest",
											onClick: () => setQty(`${product.id}::${variant}`, qty - 1),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-base font-semibold text-forest",
											children: qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "size-8 text-muted-foreground hover:text-forest",
											onClick: () => add(product, variant, false),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-12 w-32 items-center justify-between rounded-xl border border-border bg-card px-2 opacity-50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "size-8",
											disabled: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-base font-semibold text-forest",
											children: "0"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "size-8",
											disabled: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
										})
									]
								}), qty > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "h-12 flex-1 rounded-xl text-base",
									onClick: () => setOpen(true),
									children: "Go to Cart"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "h-12 flex-1 rounded-xl text-base",
									onClick: () => add(product, variant, false),
									children: "Add to Cart"
								})]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				variant: "up",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-20 border-t border-border pt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold text-forest",
							children: "About the Product"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 max-w-4xl text-base leading-relaxed text-muted-foreground",
							children: [
								"Elevate your indoor and outdoor spaces with this premium ",
								product.title.toLowerCase(),
								". This elegant piece combines timeless design with practical functionality. Crafted from premium materials, it showcases a smooth, refined finish available in versatile tones that complement any décor style. Perfect for displaying flowering plants, ornamental foliage, or succulents, this transforms living spaces into lush, curated environments. Whether placed on a patio, balcony, or living room, it brings sophistication and natural beauty to your home."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 grid max-w-2xl gap-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 py-3 border-b border-border/50 transition-colors hover:bg-secondary/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-forest",
										children: "Material Type:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "col-span-2 text-muted-foreground",
										children: "Premium Quality"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 py-3 border-b border-border/50 transition-colors hover:bg-secondary/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-forest",
										children: "Weight:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "col-span-2 text-muted-foreground",
										children: "Standard"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 py-3 transition-colors hover:bg-secondary/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-forest",
										children: "Customer Support:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "col-span-2 text-muted-foreground",
										children: "8453084530"
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				variant: "up",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-center font-display text-3xl font-semibold text-forest",
						children: "You may also like"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6",
						children: similarProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
					})]
				})
			})
		]
	});
}
//#endregion
export { ProductPageWrapper as component };

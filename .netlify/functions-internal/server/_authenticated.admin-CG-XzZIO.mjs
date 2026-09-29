import { r as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { D as isRedirect, _ as useRouter, g as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./_ssr/createServerFn-BFFE07zL.mjs";
import { t as getServerFnById } from "./__23tanstack-start-server-fn-resolver-CVzhv7g_.mjs";
import { t as requireSupabaseAuth } from "./_ssr/auth-middleware-UH_Jp6hR.mjs";
import { t as supabase } from "./_ssr/client-q62oeYjd.mjs";
import { t as Route } from "./_authenticated.admin-u5gGdqcE.mjs";
import { t as Button } from "./_ssr/button-DRsC1qZi.mjs";
import { A as Leaf, E as LogOut, M as Inbox, k as LoaderCircle, p as ShieldCheck } from "./_libs/lucide-react.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-DUy71i1r.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { t as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.admin-CG-XzZIO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getAdminOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("98193c088815d6bbdd4155ffbad4b125116e51df7ef81d3d6aef43156e028e01"));
/** Bootstrap: the first signed-in account may claim the admin role while no admin exists. */
var claimAdminRole = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("c9094d6faf8245d20141c4c32c6c4ce4e2ef0f9397c9e0fc76cb68ec3d58070a"));
var setEnquiryStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => data).handler(createSsrRpc("1c425e3d55481dab9f73d0579f2f2099b3bfd62368d0a58b68d9036f158f3052"));
function AdminDashboard() {
	const navigate = useNavigate({ from: Route.fullPath });
	const queryClient = useQueryClient();
	const fetchOverview = useServerFn(getAdminOverview);
	const claimRole = useServerFn(claimAdminRole);
	const updateStatus = useServerFn(setEnquiryStatus);
	const overview = useQuery({
		queryKey: ["admin-overview"],
		queryFn: () => fetchOverview()
	});
	const claim = useMutation({
		mutationFn: () => claimRole(),
		onSuccess: async (result) => {
			if (!result.granted) {
				toast.error("An administrator already exists.");
				return;
			}
			await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
			toast.success("Administrator access activated.");
		},
		onError: () => toast.error("Could not activate administrator access.")
	});
	const status = useMutation({
		mutationFn: (data) => updateStatus({ data }),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
			toast.success("Enquiry updated.");
		},
		onError: () => toast.error("Could not update the enquiry.")
	});
	const signOut = async () => {
		await supabase.auth.signOut();
		navigate({
			to: "/admin/login",
			replace: true
		});
	};
	if (overview.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-secondary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "size-7 animate-spin text-forest",
			"aria-label": "Loading dashboard"
		})
	});
	if (overview.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-secondary px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold text-forest",
					children: "Dashboard unavailable"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Please refresh the page or sign in again."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6",
					onClick: () => overview.refetch(),
					children: "Try again"
				})
			]
		})
	});
	if (!overview.data.isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-secondary px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mx-auto size-10 text-forest" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 font-display text-3xl font-semibold text-forest",
					children: "Administrator access"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-6 text-muted-foreground",
					children: "This account does not have administrator permissions. If this is the first account, you can activate it now."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-7 w-full",
					disabled: claim.isPending,
					onClick: () => claim.mutate(),
					children: [claim.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Activate admin access"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "mt-2 w-full",
					onClick: signOut,
					children: "Sign out"
				})
			]
		})
	});
	const enquiries = overview.data.enquiries;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border bg-forest text-forest-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-10 place-items-center rounded-lg bg-forest-foreground/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl font-semibold",
						children: "GreenRoots"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-forest-foreground/70",
						children: "Admin dashboard"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					className: "text-forest-foreground hover:bg-forest-foreground/10 hover:text-forest-foreground",
					onClick: signOut,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "Sign out"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-leaf",
					children: "Customer care"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl font-semibold text-forest",
					children: "Enquiries"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card px-4 py-3 text-right shadow-[var(--shadow-soft)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-semibold text-forest",
						children: enquiries.length
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Total received"
					})]
				})]
			}), enquiries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl border border-border bg-card px-6 py-16 text-center shadow-[var(--shadow-soft)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "mx-auto size-10 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-2xl font-semibold text-forest",
						children: "No enquiries yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "New customer messages will appear here."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4",
				children: enquiries.map((enquiry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline gap-x-3 gap-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-xl font-semibold text-forest",
										children: enquiry.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "break-all text-sm text-leaf hover:underline",
										href: `mailto:${enquiry.email}`,
										children: enquiry.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: new Date(enquiry.created_at).toLocaleString("en-IN", {
										dateStyle: "medium",
										timeStyle: "short"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 whitespace-pre-wrap text-sm leading-6 text-foreground",
									children: enquiry.message
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: enquiry.status,
							disabled: status.isPending,
							onValueChange: (value) => status.mutate({
								id: enquiry.id,
								status: value
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-full sm:w-40",
								"aria-label": `Status for ${enquiry.name}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "new",
									children: "New"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "in_progress",
									children: "In progress"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "resolved",
									children: "Resolved"
								})
							] })]
						})]
					})
				}, enquiry.id))
			})]
		})]
	});
}
//#endregion
export { AdminDashboard as component };

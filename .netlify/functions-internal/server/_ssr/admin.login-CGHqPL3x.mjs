import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as supabase } from "./client-q62oeYjd.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { A as Leaf, D as LogIn, k as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as TabsList, i as TabsContent, n as Label, o as TabsTrigger, r as Tabs, t as Input } from "./tabs-BD4OaWsN.mjs";
import { t as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-CGHqPL3x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		...opts,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
function AdminLogin() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => {
			if (data.user) navigate({
				to: "/admin",
				replace: true
			});
		});
	}, [navigate]);
	const signIn = async (e) => {
		e.preventDefault();
		setBusy(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		navigate({
			to: "/admin",
			replace: true
		});
	};
	const signUp = async (e) => {
		e.preventDefault();
		setBusy(true);
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: `${window.location.origin}/admin` }
		});
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		if (data.session) {
			navigate({
				to: "/admin",
				replace: true
			});
			return;
		}
		toast.success("Check your email to confirm the account, then sign in.");
	};
	const google = async () => {
		setBusy(true);
		const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
		if (result.error) {
			setBusy(false);
			toast.error("Google sign-in failed. Please try again.");
			return;
		}
		if (result.redirected) return;
		navigate({
			to: "/admin",
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-secondary px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-lift)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-11 place-items-center rounded-xl bg-forest text-forest-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-semibold text-forest",
						children: "Admin console"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "GreenRoots storefront"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "signin",
					className: "mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "signin",
								className: "flex-1",
								children: "Sign in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "signup",
								className: "flex-1",
								children: "Create account"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "signin",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: signIn,
								className: "mt-6 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fields, {
									email,
									password,
									setEmail,
									setPassword
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									disabled: busy,
									className: "h-11 w-full rounded-xl",
									children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), "Sign in"]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "signup",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: signUp,
								className: "mt-6 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fields, {
									email,
									password,
									setEmail,
									setPassword
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									disabled: busy,
									className: "h-11 w-full rounded-xl",
									children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Create admin account"]
								})]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-6 flex items-center gap-3 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
						"or",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: google,
					disabled: busy,
					className: "h-11 w-full rounded-xl",
					children: "Continue with Google"
				})
			]
		})
	});
}
function Fields({ email, password, setEmail, setPassword }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: "email",
			children: "Email"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: "email",
			type: "email",
			required: true,
			autoComplete: "email",
			value: email,
			onChange: (e) => setEmail(e.target.value),
			className: "h-11 rounded-xl"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: "password",
			children: "Password"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: "password",
			type: "password",
			required: true,
			minLength: 6,
			autoComplete: "current-password",
			value: password,
			onChange: (e) => setPassword(e.target.value),
			className: "h-11 rounded-xl"
		})]
	})] });
}
//#endregion
export { AdminLogin as component };

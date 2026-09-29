import { f as lazyRouteComponent, p as createFileRoute } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.admin-u5gGdqcE.js
var $$splitComponentImporter = () => import("./_authenticated.admin-CG-XzZIO.mjs");
var title = "Admin Dashboard — GreenRoots";
var description = "Review and manage GreenRoots customer enquiries.";
var Route = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [
		{ title },
		{
			name: "description",
			content: description
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };

import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-BFFE07zL.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-UH_Jp6hR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-CRYQa6Az.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getAdminOverview_createServerFn_handler = createServerRpc({
	id: "98193c088815d6bbdd4155ffbad4b125116e51df7ef81d3d6aef43156e028e01",
	name: "getAdminOverview",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminOverview.__executeServer(opts));
var getAdminOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAdminOverview_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const { data: isAdmin } = await supabase.rpc("has_role", {
		_user_id: userId,
		_role: "admin"
	});
	if (!isAdmin) return {
		isAdmin: false,
		enquiries: []
	};
	const { data, error } = await supabase.from("enquiries").select("id, name, email, message, status, created_at").order("created_at", { ascending: false }).limit(50);
	if (error) throw error;
	return {
		isAdmin: true,
		enquiries: data ?? []
	};
});
var claimAdminRole_createServerFn_handler = createServerRpc({
	id: "c9094d6faf8245d20141c4c32c6c4ce4e2ef0f9397c9e0fc76cb68ec3d58070a",
	name: "claimAdminRole",
	filename: "src/lib/admin.functions.ts"
}, (opts) => claimAdminRole.__executeServer(opts));
var claimAdminRole = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(claimAdminRole_createServerFn_handler, async ({ context }) => {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { count, error: countError } = await supabaseAdmin.from("user_roles").select("id", {
		count: "exact",
		head: true
	}).eq("role", "admin");
	if (countError) throw countError;
	if ((count ?? 0) > 0) return { granted: false };
	const { error } = await supabaseAdmin.from("user_roles").insert({
		user_id: context.userId,
		role: "admin"
	});
	if (error) throw error;
	return { granted: true };
});
var setEnquiryStatus_createServerFn_handler = createServerRpc({
	id: "1c425e3d55481dab9f73d0579f2f2099b3bfd62368d0a58b68d9036f158f3052",
	name: "setEnquiryStatus",
	filename: "src/lib/admin.functions.ts"
}, (opts) => setEnquiryStatus.__executeServer(opts));
var setEnquiryStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((data) => data).handler(setEnquiryStatus_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("enquiries").update({ status: data.status }).eq("id", data.id);
	if (error) throw error;
	return { ok: true };
});
//#endregion
export { claimAdminRole_createServerFn_handler, getAdminOverview_createServerFn_handler, setEnquiryStatus_createServerFn_handler };

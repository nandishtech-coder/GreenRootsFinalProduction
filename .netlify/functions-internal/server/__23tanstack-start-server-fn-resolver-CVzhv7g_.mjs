//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CVzhv7g_.js
var manifest = {
	"1c425e3d55481dab9f73d0579f2f2099b3bfd62368d0a58b68d9036f158f3052": {
		functionName: "setEnquiryStatus_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-CRYQa6Az.mjs")
	},
	"98193c088815d6bbdd4155ffbad4b125116e51df7ef81d3d6aef43156e028e01": {
		functionName: "getAdminOverview_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-CRYQa6Az.mjs")
	},
	"c9094d6faf8245d20141c4c32c6c4ce4e2ef0f9397c9e0fc76cb68ec3d58070a": {
		functionName: "claimAdminRole_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-CRYQa6Az.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };

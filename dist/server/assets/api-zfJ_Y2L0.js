import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "../server.js";
import { t as productInputSchema } from "./schema-DYDO5Lmu.js";
//#region node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
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
//#endregion
//#region src/lib/products/api.ts
var fetchProducts = createServerFn({ method: "GET" }).handler(createSsrRpc("ef00a98a9dd8aa91b5795ad63e1ee874db9f4e466fc67f2def5e5f412d6a0d5d"));
var fetchPublishedProducts = createServerFn({ method: "GET" }).handler(createSsrRpc("9ee3bf08b9daef564b91f12f5f4997ea041fd43fa95978b64ccfd031e7002684"));
var fetchProductBySlug = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("af8724dfaf6bfe85d2b91615bf950dbd8dc8295cf0a461e19ba15a7a1a0f9b4e"));
var fetchProductById = createServerFn({ method: "GET" }).validator((id) => id).handler(createSsrRpc("e18f7044968f4f717e38f9601899da2773430d80ffd8f878d340a50604beb219"));
var fetchFeaturedProducts = createServerFn({ method: "GET" }).handler(createSsrRpc("28d82ff52ad0a393004366c4c1641057bdf5348ffaf66da8aec0edc03fe31ee3"));
var fetchFacets = createServerFn({ method: "GET" }).handler(createSsrRpc("45697c59d3bc3b5eaca98e8e62a8532bbb5bd1abd09f79640c227c8831ab18f2"));
createServerFn({ method: "GET" }).validator((d) => d).handler(createSsrRpc("8fad8f211ebd02786e5f09000b0e3950ae2cb1bc93b1386cdcef78bcfc04ed22"));
var createProductFn = createServerFn({ method: "POST" }).validator((d) => productInputSchema.parse(d)).handler(createSsrRpc("af062b45f8497d90b8df6add0e3124d9da60d76decdd0cd8ee81e886f5d6ba2a"));
var updateProductFn = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("4e1355d7316abc3419337aa17af3c8d99b2aba7cbdd54bdff3f9f558f0f504c1"));
var deleteProductFn = createServerFn({ method: "POST" }).validator((id) => id).handler(createSsrRpc("027a0a05d5aca72271dbc711b3193bcd444f7510a931e3f1f366eb4dee1496e8"));
var duplicateProductFn = createServerFn({ method: "POST" }).validator((id) => id).handler(createSsrRpc("3affc2f2a378f506f6105caa716c91a7c26c980e52ed4fc527c7e3ee21ddf0f8"));
var toggleFeaturedFn = createServerFn({ method: "POST" }).validator((id) => id).handler(createSsrRpc("3c42d0215e242bcbf0f791d04a2ce89f2c9b1e18af8eda76bff8a41529a21034"));
var fetchAdminStats = createServerFn({ method: "GET" }).handler(createSsrRpc("089dd33669198ae82b39c4828425f4fa2d4e3aaa3bdf0c91ed935229062cde67"));
//#endregion
export { fetchFacets as a, fetchProductBySlug as c, toggleFeaturedFn as d, updateProductFn as f, fetchAdminStats as i, fetchProducts as l, deleteProductFn as n, fetchFeaturedProducts as o, duplicateProductFn as r, fetchProductById as s, createProductFn as t, fetchPublishedProducts as u };

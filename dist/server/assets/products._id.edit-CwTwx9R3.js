import { n as Route } from "./router-CHFSv2ZK.js";
import { t as AdminLayout } from "./AdminLayout-39_RDIQ4.js";
import { t as ProductForm } from "./ProductForm-r3WCKGGM.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/admin/products.$id.edit.tsx?tsr-split=component
function EditProduct() {
	const { product } = Route.useLoaderData();
	return /* @__PURE__ */ jsx(AdminLayout, {
		title: `Edit — ${product.name}`,
		children: /* @__PURE__ */ jsx(ProductForm, { product })
	});
}
//#endregion
export { EditProduct as component };

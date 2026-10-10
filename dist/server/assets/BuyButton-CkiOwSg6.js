import { t as Button } from "./button-ChKKm0vb.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowUpRight } from "lucide-react";
//#region src/components/products/BuyButton.tsx
/**
* External purchase link — there is no internal checkout.
* Opens the seller's store in a new tab with hardened rel attrs.
*/
function BuyButton({ href, sellerName, size = "lg", className }) {
	if (!href) return /* @__PURE__ */ jsx(Button, {
		variant: "outline",
		size,
		disabled: true,
		className,
		children: "Not yet available"
	});
	return /* @__PURE__ */ jsx(Button, {
		asChild: true,
		size,
		"data-cursor": "buy",
		className,
		children: /* @__PURE__ */ jsxs("a", {
			href,
			target: "_blank",
			rel: "noopener noreferrer",
			children: [
				"Buy Now",
				sellerName ? ` — ${sellerName}` : "",
				" ",
				/* @__PURE__ */ jsx(ArrowUpRight, { "aria-hidden": "true" })
			]
		})
	});
}
//#endregion
export { BuyButton as t };

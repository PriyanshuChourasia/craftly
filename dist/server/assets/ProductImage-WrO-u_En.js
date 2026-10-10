import { n as cn } from "./schema-DYDO5Lmu.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/products/ProductImage.tsx
function ProductImage({ image, priority = false, aspect = "4/5", objectFit = "cover", sizes = "100vw", className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("relative overflow-hidden", aspect),
		style: objectFit === "contain" && image.url ? { background: "transparent" } : void 0,
		children: [/* @__PURE__ */ jsx("img", {
			src: image.url,
			alt: image.alt,
			width: image.width,
			height: image.height,
			loading: priority ? "eager" : "lazy",
			decoding: priority ? "sync" : "async",
			sizes,
			className: cn("h-full w-full transition-transform duration-700 ease-out", objectFit === "cover" ? "object-cover" : "object-contain", className),
			onError: (e) => {
				console.warn("Product image failed to load:", image.url);
				const target = e.currentTarget;
				target.src = "";
				target.alt = image.alt;
				target.style.display = "none";
			}
		}), !image.url && /* @__PURE__ */ jsx("div", {
			className: cn("absolute inset-0 flex items-center justify-center text-muted", aspect),
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsxs("svg", {
				"aria-hidden": "true",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "1.25",
				children: [
					/* @__PURE__ */ jsx("rect", {
						x: "3",
						y: "3",
						width: "18",
						height: "18",
						rx: "2"
					}),
					/* @__PURE__ */ jsx("circle", {
						cx: "8.5",
						cy: "8.5",
						r: "1.5"
					}),
					/* @__PURE__ */ jsx("path", { d: "M21 15l-5-5L5 21" })
				]
			})
		})]
	});
}
//#endregion
export { ProductImage as t };

import { i as padNumber, n as cn } from "./schema-DYDO5Lmu.js";
import { n as formatPrice, t as availabilityLabel } from "./format-D2wRfgCJ.js";
import { t as ProductImage } from "./ProductImage-WrO-u_En.js";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { motion, useReducedMotion } from "motion/react";
//#region src/components/products/ProductCard.tsx
/**
* A framed gallery object, not an ecommerce card.
* Thin border, warm paper background, editorial caption, subtle 3D hover.
*/
function ProductCard({ product, index = 0, size = "medium", frame = "thin", showPrice = true, className }) {
	const reduced = useReducedMotion();
	const ref = useRef(null);
	const frameClass = {
		none: "",
		thin: "border border-border-soft",
		thick: "border-[6px] border-border-soft",
		dark: "border-[6px] border-dark/80"
	}[frame];
	const height = {
		small: "aspect-[4/5]",
		medium: "aspect-[4/5]",
		large: "aspect-[3/4]"
	}[size];
	const onMove = (e) => {
		if (reduced || !ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width - .5;
		const py = (e.clientY - rect.top) / rect.height - .5;
		ref.current.style.transform = `perspective(900px) rotateX(${-py * 4}deg) rotateY(${px * 4}deg) translateZ(14px)`;
	};
	const onLeave = () => {
		if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
	};
	return /* @__PURE__ */ jsx(motion.div, {
		whileHover: reduced ? void 0 : { y: -6 },
		transition: { duration: .4 },
		children: /* @__PURE__ */ jsxs(Link, {
			ref,
			to: "/products/$slug",
			params: { slug: product.slug },
			"data-cursor": "view",
			"aria-label": `${product.name} — ${product.category}`,
			onMouseMove: onMove,
			onMouseLeave: onLeave,
			className: cn("group block bg-paper/60 transition-[border-color,box-shadow] duration-300 [transition:transform_.4s_cubic-bezier(.22,1,.36,1)] hover:shadow-[0_24px_70px_rgba(8,8,8,0.1)]", frameClass, className),
			children: [/* @__PURE__ */ jsx("div", {
				className: cn("overflow-hidden", height),
				children: /* @__PURE__ */ jsx(ProductImage, {
					image: product.images[0] ?? {
						id: "",
						url: product.primaryImage ?? "",
						alt: product.name,
						order: 0
					},
					priority: index < 3,
					objectFit: product.images[0]?.isPrimary ? "contain" : "cover",
					sizes: "(max-width: 768px) 100vw, 33vw",
					className: "transition-transform duration-700 ease-out group-hover:scale-[1.04]"
				})
			}), /* @__PURE__ */ jsx(ProductCaption, {
				product,
				index,
				showPrice
			})]
		})
	});
}
function ProductCaption({ product, index, showPrice }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-start justify-between gap-3 px-3.5 py-3",
		children: [/* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsxs("p", {
				className: "text-meta text-muted",
				children: ["Object ", padNumber(index + 1)]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 font-display text-base leading-tight tracking-wide",
				children: product.name
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-meta mt-1 text-foreground-secondary",
				children: product.category
			})
		] }), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col items-end gap-1.5",
			children: [showPrice && product.availability !== "coming_soon" && /* @__PURE__ */ jsx("p", {
				className: "text-meta text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100",
				children: formatPrice(product.price, product.currency)
			}), product.availability !== "available" && /* @__PURE__ */ jsx("p", {
				className: cn("text-meta", product.availability === "sold_out" ? "text-muted" : "text-accent"),
				children: availabilityLabel(product.availability)
			})]
		})]
	});
}
//#endregion
export { ProductCard as t };

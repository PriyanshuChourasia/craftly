import { t as Button } from "./button-ChKKm0vb.js";
import { a as Route } from "./router-CHFSv2ZK.js";
import { t as AdminLayout } from "./AdminLayout-39_RDIQ4.js";
import { n as formatPrice } from "./format-D2wRfgCJ.js";
import { t as ProductImage } from "./ProductImage-WrO-u_En.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Plus } from "lucide-react";
//#region src/components/admin/bits.tsx
function Card({ children, className }) {
	return /* @__PURE__ */ jsx("div", {
		className: `border border-border bg-paper/50 p-4 ${className ?? ""}`,
		children
	});
}
function StatValue({ value }) {
	return /* @__PURE__ */ jsx("p", {
		className: "font-display mt-2 text-3xl leading-none",
		children: value
	});
}
function RecentProducts({ products }) {
	return /* @__PURE__ */ jsxs("ul", {
		className: "divide-y divide-border/40",
		children: [products.map((p) => /* @__PURE__ */ jsxs("li", {
			className: "flex items-center gap-3 py-2.5",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "size-10 border border-border/50 overflow-hidden",
					children: /* @__PURE__ */ jsx(ProductImage, {
						image: p.images[0] ?? {
							id: "",
							url: p.primaryImage ?? "",
							alt: p.name,
							order: 0
						},
						sizes: "80px",
						aspect: "1/1"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/admin/products/$id/edit",
						params: { id: p.id },
						className: "block truncate text-sm font-medium hover:underline",
						children: p.name
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-meta text-muted",
						children: [
							p.category,
							" / ",
							p.year
						]
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-meta",
					children: formatPrice(p.price, p.currency)
				})
			]
		}, p.id)), products.length === 0 && /* @__PURE__ */ jsx("li", {
			className: "text-meta py-6 text-center text-muted",
			children: "No products yet"
		})]
	});
}
//#endregion
//#region src/components/admin/ProductStats.tsx
function ProductStats({ stats }) {
	const items = [
		{
			label: "Total objects",
			value: stats.total
		},
		{
			label: "Featured",
			value: stats.featured
		},
		{
			label: "Available",
			value: stats.available
		},
		{
			label: "Sold out",
			value: stats.soldOut
		},
		{
			label: "Drafts",
			value: stats.drafts
		}
	];
	return /* @__PURE__ */ jsx("div", {
		className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5",
		children: items.map((item) => /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx("p", {
			className: "text-meta text-muted",
			children: item.label
		}), /* @__PURE__ */ jsx(StatValue, { value: item.value })] }, item.label))
	});
}
//#endregion
//#region src/routes/admin/index.tsx?tsr-split=component
function AdminDashboard() {
	const stats = Route.useLoaderData();
	return /* @__PURE__ */ jsxs(AdminLayout, {
		title: "Dashboard",
		actions: /* @__PURE__ */ jsx(Button, {
			asChild: true,
			size: "sm",
			children: /* @__PURE__ */ jsxs(Link, {
				to: "/admin/products/new",
				children: [/* @__PURE__ */ jsx(Plus, { "aria-hidden": "true" }), " New product"]
			})
		}),
		children: [/* @__PURE__ */ jsx(ProductStats, { stats }), /* @__PURE__ */ jsxs("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-meta text-muted",
					children: "Recent products"
				}), /* @__PURE__ */ jsx(Link, {
					to: "/admin/products",
					className: "text-meta hover:underline",
					children: "View all →"
				})]
			}), /* @__PURE__ */ jsx(RecentProducts, { products: stats.recent })] }), /* @__PURE__ */ jsxs(Card, { children: [/* @__PURE__ */ jsx("h2", {
				className: "text-meta text-muted",
				children: "Recent activity"
			}), /* @__PURE__ */ jsxs("ul", {
				className: "mt-3 space-y-3",
				children: [stats.recent.slice(0, 4).map((p) => /* @__PURE__ */ jsxs("li", {
					className: "flex items-baseline justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ jsxs("span", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-foreground",
							children: p.name
						}),
						" ",
						/* @__PURE__ */ jsxs("span", {
							className: "text-foreground-secondary",
							children: ["updated ", new Date(p.updatedAt).toLocaleDateString("en-GB", {
								day: "2-digit",
								month: "short"
							})]
						})
					] }), /* @__PURE__ */ jsx("span", {
						className: "text-meta shrink-0 text-muted",
						children: p.featured ? "Featured" : "Catalogued"
					})]
				}, p.id)), stats.recent.length === 0 && /* @__PURE__ */ jsx("li", {
					className: "text-meta text-muted",
					children: "No activity yet"
				})]
			})] })]
		})]
	});
}
//#endregion
export { AdminDashboard as component };

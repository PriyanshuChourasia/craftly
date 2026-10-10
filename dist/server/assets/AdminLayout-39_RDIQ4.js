import { n as cn } from "./schema-DYDO5Lmu.js";
import { Link, useLocation } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/admin/AdminLayout.tsx
var NAV = [
	{
		label: "Dashboard",
		to: "/admin"
	},
	{
		label: "Products",
		to: "/admin/products"
	},
	{
		label: "New product",
		to: "/admin/products/new"
	}
];
function AdminLayout({ title, actions, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ jsxs("header", {
			className: "border-b border-border/60",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-8",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/",
						className: "font-display text-lg leading-none",
						children: ["OBJECTS", /* @__PURE__ */ jsx("sup", {
							className: "text-meta ml-1 align-super",
							children: "admin"
						})]
					}), /* @__PURE__ */ jsx("nav", {
						"aria-label": "Admin",
						className: "hidden items-center gap-5 md:flex",
						children: NAV.map((item) => /* @__PURE__ */ jsx(AdminNavLink, { ...item }, item.to))
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex items-center gap-3",
					children: actions
				})]
			}), /* @__PURE__ */ jsx("nav", {
				"aria-label": "Admin mobile",
				className: "flex gap-5 border-t border-border/40 px-5 py-2 md:hidden",
				children: NAV.map((item) => /* @__PURE__ */ jsx(AdminNavLink, { ...item }, item.to))
			})]
		}), /* @__PURE__ */ jsxs("main", {
			className: "mx-auto max-w-6xl px-5 py-8",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "font-display text-2xl tracking-wide",
				children: title
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-6",
				children
			})]
		})]
	});
}
function AdminNavLink({ label, to }) {
	const location = useLocation();
	const active = to === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(to);
	return /* @__PURE__ */ jsx(Link, {
		to,
		"aria-current": active ? "page" : void 0,
		className: cn("text-meta transition-colors", active ? "text-foreground" : "text-muted hover:text-foreground"),
		children: label
	});
}
//#endregion
export { AdminLayout as t };

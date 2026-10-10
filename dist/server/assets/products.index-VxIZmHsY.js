import { n as cn } from "./schema-DYDO5Lmu.js";
import { t as Button } from "./button-ChKKm0vb.js";
import { d as toggleFeaturedFn, n as deleteProductFn, r as duplicateProductFn } from "./api-zfJ_Y2L0.js";
import { r as Route } from "./router-CHFSv2ZK.js";
import { t as AdminLayout } from "./AdminLayout-39_RDIQ4.js";
import { n as formatPrice, t as availabilityLabel } from "./format-D2wRfgCJ.js";
import { t as ProductImage } from "./ProductImage-WrO-u_En.js";
import { n as Checkbox, t as Badge } from "./misc-DJCfyT4z.js";
import * as React from "react";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Copy, ExternalLink, Eye, Plus, Star, Trash2 } from "lucide-react";
//#region src/components/ui/table.tsx
var Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	className: "w-full overflow-x-auto",
	children: /* @__PURE__ */ jsx("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", {
	ref,
	className: cn("[&_tr]:border-b [&_tr]:border-border/60", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tr", {
	ref,
	className: cn("border-b border-border/40 transition-colors hover:bg-foreground/[0.03]", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("th", {
	ref,
	className: cn("text-meta h-11 px-3 text-left align-middle font-normal text-muted", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("td", {
	ref,
	className: cn("px-3 py-3 align-middle", className),
	...props
}));
TableCell.displayName = "TableCell";
//#endregion
//#region src/components/admin/ProductTable.tsx
var PAGE_SIZE = 8;
function ProductTable({ products }) {
	const [query, setQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [sortKey, setSortKey] = useState("updatedAt");
	const [sortAsc, setSortAsc] = useState(false);
	const [page, setPage] = useState(0);
	const [selected, setSelected] = useState(/* @__PURE__ */ new Set());
	const filtered = useMemo(() => {
		let list = [...products];
		if (query) {
			const q = query.toLowerCase();
			list = list.filter((p) => [
				p.name,
				p.category,
				p.brand,
				String(p.year),
				...p.tags
			].join(" ").toLowerCase().includes(q));
		}
		if (statusFilter === "draft") list = list.filter((p) => !p.published);
		else if (statusFilter !== "all") list = list.filter((p) => p.availability === statusFilter);
		list.sort((a, b) => {
			const dir = sortAsc ? 1 : -1;
			const av = a[sortKey];
			const bv = b[sortKey];
			if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
			return String(av ?? "").localeCompare(String(bv ?? "")) * dir;
		});
		return list;
	}, [
		products,
		query,
		statusFilter,
		sortKey,
		sortAsc
	]);
	const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
	const toggleSort = (key) => {
		if (sortKey === key) setSortAsc((v) => !v);
		else {
			setSortKey(key);
			setSortAsc(true);
		}
	};
	const toggleSelect = (id) => {
		setSelected((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};
	const bulkDelete = async () => {
		if (selected.size === 0) return;
		if (!window.confirm(`Delete ${selected.size} object(s)? This cannot be undone.`)) return;
		for (const id of selected) await deleteProductFn({ data: id });
		toast.success(`${selected.size} object(s) deleted`);
		setSelected(/* @__PURE__ */ new Set());
	};
	const onToggleFeatured = async (p) => {
		await toggleFeaturedFn({ data: p.id });
		toast.success(p.featured ? `${p.name} removed from featured` : `${p.name} featured`);
	};
	const onDuplicate = async (p) => {
		const copy = await duplicateProductFn({ data: p.id });
		toast.success(copy ? `Duplicated as “${copy.name}”` : "Duplicate failed");
	};
	const onDelete = async (p) => {
		if (!window.confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
		await deleteProductFn({ data: p.id });
		toast.success(`${p.name} deleted`);
	};
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ jsx("input", {
					value: query,
					onChange: (e) => {
						setQuery(e.target.value);
						setPage(0);
					},
					placeholder: "Search products…",
					"aria-label": "Search products",
					className: "h-9 w-56 border border-border bg-transparent px-3 text-sm placeholder:text-muted focus:border-foreground focus:outline-none"
				}),
				/* @__PURE__ */ jsxs("select", {
					value: statusFilter,
					onChange: (e) => {
						setStatusFilter(e.target.value);
						setPage(0);
					},
					"aria-label": "Filter by status",
					className: "h-9 border border-border bg-transparent px-2 text-sm focus:border-foreground focus:outline-none",
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "all",
							children: "All statuses"
						}),
						/* @__PURE__ */ jsx("option", {
							value: "available",
							children: "Available"
						}),
						/* @__PURE__ */ jsx("option", {
							value: "sold_out",
							children: "Sold out"
						}),
						/* @__PURE__ */ jsx("option", {
							value: "coming_soon",
							children: "Coming soon"
						}),
						/* @__PURE__ */ jsx("option", {
							value: "draft",
							children: "Drafts"
						})
					]
				}),
				selected.size > 0 && /* @__PURE__ */ jsxs(Button, {
					variant: "destructive",
					size: "sm",
					onClick: bulkDelete,
					children: ["Delete ", selected.size]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-meta ml-auto text-muted",
					"aria-live": "polite",
					children: [filtered.length, " products"]
				})
			]
		}),
		/* @__PURE__ */ jsxs(Table, { children: [/* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
			/* @__PURE__ */ jsx(TableHead, {
				className: "w-10",
				children: /* @__PURE__ */ jsx(Checkbox, {
					"aria-label": "Select all on page",
					checked: pageItems.length > 0 && pageItems.every((p) => selected.has(p.id)),
					onCheckedChange: (v) => setSelected((prev) => {
						const next = new Set(prev);
						for (const p of pageItems) if (v) next.add(p.id);
						else next.delete(p.id);
						return next;
					})
				})
			}),
			/* @__PURE__ */ jsx(TableHead, {
				className: "w-14",
				children: "Image"
			}),
			/* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsx(SortHead, {
				label: "Product",
				active: sortKey === "name",
				asc: sortAsc,
				onClick: () => toggleSort("name")
			}) }),
			/* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsx(SortHead, {
				label: "Category",
				active: sortKey === "category",
				asc: sortAsc,
				onClick: () => toggleSort("category")
			}) }),
			/* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsx(SortHead, {
				label: "Year",
				active: sortKey === "year",
				asc: sortAsc,
				onClick: () => toggleSort("year")
			}) }),
			/* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsx(SortHead, {
				label: "Price",
				active: sortKey === "price",
				asc: sortAsc,
				onClick: () => toggleSort("price")
			}) }),
			/* @__PURE__ */ jsx(TableHead, { children: "Status" }),
			/* @__PURE__ */ jsx(TableHead, {
				className: "text-center",
				children: "Featured"
			}),
			/* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsx(SortHead, {
				label: "Updated",
				active: sortKey === "updatedAt",
				asc: sortAsc,
				onClick: () => toggleSort("updatedAt")
			}) }),
			/* @__PURE__ */ jsx(TableHead, {
				className: "text-right",
				children: "Actions"
			})
		] }) }), /* @__PURE__ */ jsxs(TableBody, { children: [pageItems.map((p) => /* @__PURE__ */ jsxs(TableRow, { children: [
			/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Checkbox, {
				"aria-label": `Select ${p.name}`,
				checked: selected.has(p.id),
				onCheckedChange: () => toggleSelect(p.id)
			}) }),
			/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", {
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
			}) }),
			/* @__PURE__ */ jsxs(TableCell, { children: [/* @__PURE__ */ jsx("p", {
				className: "text-sm font-medium",
				children: p.name
			}), /* @__PURE__ */ jsx("p", {
				className: "text-meta text-muted",
				children: p.slug
			})] }),
			/* @__PURE__ */ jsx(TableCell, {
				className: "text-sm",
				children: p.category
			}),
			/* @__PURE__ */ jsx(TableCell, {
				className: "text-sm",
				children: p.year
			}),
			/* @__PURE__ */ jsx(TableCell, {
				className: "text-sm",
				children: formatPrice(p.price, p.currency)
			}),
			/* @__PURE__ */ jsxs(TableCell, { children: [/* @__PURE__ */ jsx(Badge, {
				variant: p.availability === "available" ? "default" : p.availability === "coming_soon" ? "accent" : "muted",
				children: availabilityLabel(p.availability)
			}), !p.published && /* @__PURE__ */ jsx(Badge, {
				variant: "outline",
				className: "ml-1.5",
				children: "Draft"
			})] }),
			/* @__PURE__ */ jsx(TableCell, {
				className: "text-center",
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => onToggleFeatured(p),
					"aria-label": p.featured ? `Unfeature ${p.name}` : `Feature ${p.name}`,
					className: cn("inline-flex size-7 items-center justify-center transition-colors", p.featured ? "text-accent" : "text-muted hover:text-foreground"),
					children: /* @__PURE__ */ jsx(Star, { className: cn("size-4", p.featured && "fill-current") })
				})
			}),
			/* @__PURE__ */ jsx(TableCell, {
				className: "text-meta text-muted",
				children: new Date(p.updatedAt).toLocaleDateString("en-GB", {
					day: "2-digit",
					month: "short"
				})
			}),
			/* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-end gap-1",
				children: [
					/* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "ghost",
						size: "icon",
						"aria-label": `View ${p.name} on site`,
						children: /* @__PURE__ */ jsx(Link, {
							to: "/products/$slug",
							params: { slug: p.slug },
							children: /* @__PURE__ */ jsx(Eye, { className: "size-3.5" })
						})
					}),
					p.buyUrl && /* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "ghost",
						size: "icon",
						"aria-label": "Open store page",
						children: /* @__PURE__ */ jsx("a", {
							href: p.buyUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							children: /* @__PURE__ */ jsx(ExternalLink, { className: "size-3.5" })
						})
					}),
					/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": `Duplicate ${p.name}`,
						onClick: () => onDuplicate(p),
						children: /* @__PURE__ */ jsx(Copy, { className: "size-3.5" })
					}),
					/* @__PURE__ */ jsx(Button, {
						asChild: true,
						variant: "ghost",
						size: "icon",
						"aria-label": `Edit ${p.name}`,
						children: /* @__PURE__ */ jsx(Link, {
							to: "/admin/products/$id/edit",
							params: { id: p.id },
							children: /* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								className: "text-meta px-0.5",
								children: "Edit"
							})
						})
					}),
					/* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": `Delete ${p.name}`,
						onClick: () => onDelete(p),
						children: /* @__PURE__ */ jsx(Trash2, { className: "size-3.5 text-accent" })
					})
				]
			}) })
		] }, p.id)), pageItems.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, {
			colSpan: 10,
			className: "py-16 text-center",
			children: /* @__PURE__ */ jsx("p", {
				className: "font-display text-xl text-foreground/30",
				children: "No products found"
			})
		}) })] })] }),
		pageCount > 1 && /* @__PURE__ */ jsxs("div", {
			className: "mt-4 flex items-center justify-between",
			children: [/* @__PURE__ */ jsxs("p", {
				className: "text-meta text-muted",
				children: [
					"Page ",
					page + 1,
					" / ",
					pageCount
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ jsx(Button, {
					variant: "outline",
					size: "sm",
					disabled: page === 0,
					onClick: () => setPage((p) => p - 1),
					children: "Previous"
				}), /* @__PURE__ */ jsx(Button, {
					variant: "outline",
					size: "sm",
					disabled: page >= pageCount - 1,
					onClick: () => setPage((p) => p + 1),
					children: "Next"
				})]
			})]
		})
	] });
}
function SortHead({ label, active, asc, onClick }) {
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick,
		className: cn("text-meta inline-flex items-center gap-1 uppercase transition-colors hover:text-foreground", active && "text-foreground"),
		"aria-label": `Sort by ${label}`,
		children: [label, /* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			className: "text-[9px]",
			children: active ? asc ? "↑" : "↓" : "↕"
		})]
	});
}
//#endregion
//#region src/routes/admin/products.index.tsx?tsr-split=component
function AdminProducts() {
	const products = Route.useLoaderData();
	return /* @__PURE__ */ jsx(AdminLayout, {
		title: "Products",
		actions: /* @__PURE__ */ jsx(Button, {
			asChild: true,
			size: "sm",
			children: /* @__PURE__ */ jsxs(Link, {
				to: "/admin/products/new",
				children: [/* @__PURE__ */ jsx(Plus, { "aria-hidden": "true" }), " New product"]
			})
		}),
		children: /* @__PURE__ */ jsx(ProductTable, { products })
	});
}
//#endregion
export { AdminProducts as component };

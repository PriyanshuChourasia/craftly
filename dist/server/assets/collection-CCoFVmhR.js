import { n as cn } from "./schema-DYDO5Lmu.js";
import { t as Button } from "./button-ChKKm0vb.js";
import { t as EmptyState } from "./States-DOwWWYxv.js";
import { c as ScrollParallax, o as Route } from "./router-CHFSv2ZK.js";
import { n as formatPrice } from "./format-D2wRfgCJ.js";
import { a as SelectValue, c as Label, i as SelectTrigger, n as SelectContent, r as SelectItem, s as Input, t as Select } from "./select-DMTw72Er.js";
import { t as ProductCard } from "./ProductCard-BQsdjjxG.js";
import { t as Reveal } from "./Reveal-C-mtMtZj.js";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogContent = React.forwardRef(({ className, children, hideClose, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { children: [/* @__PURE__ */ jsx(DialogPrimitive.Overlay, { className: "fixed inset-0 z-[100] bg-dark/70 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out" }), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-[100] w-[min(92vw,680px)] max-h-[88vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-border bg-background p-6 shadow-[0_30px_80px_rgba(8,8,8,0.25)] focus:outline-none", className),
	...props,
	children: [children, !hideClose && /* @__PURE__ */ jsx(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent",
		"aria-label": "Close",
		children: /* @__PURE__ */ jsx(X, { className: "size-4" })
	})]
})] }));
DialogContent.displayName = "DialogContent";
var DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("font-display text-display-md", className),
	...props
}));
DialogTitle.displayName = "DialogTitle";
var DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("mt-2 text-sm text-foreground-secondary", className),
	...props
}));
DialogDescription.displayName = "DialogDescription";
//#endregion
//#region src/components/products/ProductFilters.tsx
var AVAILABILITY_OPTIONS = [
	{
		value: "available",
		label: "Available"
	},
	{
		value: "sold_out",
		label: "Sold"
	},
	{
		value: "coming_soon",
		label: "Coming soon"
	}
];
function FilterFields({ value, onChange, facets, priceOnly = false }) {
	const [minText, setMinText] = useState(value.min?.toString() ?? "");
	const [maxText, setMaxText] = useState(value.max?.toString() ?? "");
	useEffect(() => {
		setMinText(value.min?.toString() ?? "");
		setMaxText(value.max?.toString() ?? "");
	}, [value.min, value.max]);
	const commitPrice = () => {
		onChange({
			...value,
			min: minText === "" ? void 0 : Math.max(0, Number(minText) || 0),
			max: maxText === "" ? void 0 : Math.max(0, Number(maxText) || 0)
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
				htmlFor: "filter-min",
				children: "Price min"
			}), /* @__PURE__ */ jsx(Input, {
				id: "filter-min",
				inputMode: "numeric",
				placeholder: formatPrice(0),
				value: minText,
				onChange: (e) => setMinText(e.target.value.replace(/[^\d]/g, "")),
				onBlur: commitPrice,
				onKeyDown: (e) => e.key === "Enter" && commitPrice()
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, {
				htmlFor: "filter-max",
				children: "Price max"
			}), /* @__PURE__ */ jsx(Input, {
				id: "filter-max",
				inputMode: "numeric",
				placeholder: formatPrice(1e5),
				value: maxText,
				onChange: (e) => setMaxText(e.target.value.replace(/[^\d]/g, "")),
				onBlur: commitPrice,
				onKeyDown: (e) => e.key === "Enter" && commitPrice()
			})] }),
			priceOnly ? null : /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, { children: "Category" }), /* @__PURE__ */ jsxs(Select, {
					value: value.category ?? "all",
					onValueChange: (v) => onChange({
						...value,
						category: v === "all" ? void 0 : v
					}),
					children: [/* @__PURE__ */ jsx(SelectTrigger, {
						"aria-label": "Category",
						children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All categories" })
					}), /* @__PURE__ */ jsxs(SelectContent, { children: [/* @__PURE__ */ jsx(SelectItem, {
						value: "all",
						children: "All categories"
					}), facets.categories.map((c) => /* @__PURE__ */ jsx(SelectItem, {
						value: c,
						children: c
					}, c))] })]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, { children: "Brand" }), /* @__PURE__ */ jsxs(Select, {
					value: value.brand ?? "all",
					onValueChange: (v) => onChange({
						...value,
						brand: v === "all" ? void 0 : v
					}),
					children: [/* @__PURE__ */ jsx(SelectTrigger, {
						"aria-label": "Brand",
						children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All brands" })
					}), /* @__PURE__ */ jsxs(SelectContent, { children: [/* @__PURE__ */ jsx(SelectItem, {
						value: "all",
						children: "All brands"
					}), facets.brands.map((b) => /* @__PURE__ */ jsx(SelectItem, {
						value: b,
						children: b
					}, b))] })]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label, { children: "Availability" }), /* @__PURE__ */ jsxs(Select, {
					value: value.availability ?? "all",
					onValueChange: (v) => onChange({
						...value,
						availability: v === "all" ? void 0 : v
					}),
					children: [/* @__PURE__ */ jsx(SelectTrigger, {
						"aria-label": "Availability",
						children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All" })
					}), /* @__PURE__ */ jsxs(SelectContent, { children: [/* @__PURE__ */ jsx(SelectItem, {
						value: "all",
						children: "All"
					}), AVAILABILITY_OPTIONS.map((o) => /* @__PURE__ */ jsx(SelectItem, {
						value: o.value,
						children: o.label
					}, o.value))] })]
				})] })
			] })
		]
	});
}
/** Desktop: floating horizontal controls. Mobile: dialog. */
function ProductFilters({ value, onChange, facets, resultCount }) {
	return /* @__PURE__ */ jsx(FilterShell, {
		value,
		onChange,
		facets,
		resultCount
	});
}
function FilterShell({ value, onChange, facets, resultCount }) {
	const hasFilters = Boolean(value.category || value.brand || value.availability || value.min !== void 0 || value.max !== void 0);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
		className: "sticky top-16 z-40 -mx-5 hidden items-end gap-3 border-b border-border/40 bg-background/90 px-5 pb-4 pt-3 backdrop-blur-sm md:flex md:-mx-10 md:px-10",
		children: [
			/* @__PURE__ */ jsx(FilterSearch, {
				value: value.q,
				onChange: (q) => onChange({
					...value,
					q
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "w-44",
				children: /* @__PURE__ */ jsxs(Select, {
					value: value.category ?? "All",
					onValueChange: (v) => onChange({
						...value,
						category: v === "All" ? void 0 : v
					}),
					children: [/* @__PURE__ */ jsxs(SelectTrigger, {
						"aria-label": "Category",
						className: "h-10",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-meta text-muted",
							children: "Category"
						}), /* @__PURE__ */ jsx(SelectValue, { placeholder: "All" })]
					}), /* @__PURE__ */ jsxs(SelectContent, { children: [/* @__PURE__ */ jsx(SelectItem, {
						value: "All",
						children: "All categories"
					}), facets.categories.map((c) => /* @__PURE__ */ jsx(SelectItem, {
						value: c,
						children: c
					}, c))] })]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "w-40",
				children: /* @__PURE__ */ jsxs(Select, {
					value: value.brand ?? "all",
					onValueChange: (v) => onChange({
						...value,
						brand: v === "all" ? void 0 : v
					}),
					children: [/* @__PURE__ */ jsxs(SelectTrigger, {
						"aria-label": "Brand",
						className: "h-10",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-meta text-muted",
							children: "Brand"
						}), /* @__PURE__ */ jsx(SelectValue, { placeholder: "All" })]
					}), /* @__PURE__ */ jsxs(SelectContent, { children: [/* @__PURE__ */ jsx(SelectItem, {
						value: "all",
						children: "All brands"
					}), facets.brands.map((b) => /* @__PURE__ */ jsx(SelectItem, {
						value: b,
						children: b
					}, b))] })]
				})
			}),
			/* @__PURE__ */ jsx(PriceSummary, {
				value,
				onChange
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "ml-auto flex items-center gap-4",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "text-meta text-muted",
					"aria-live": "polite",
					children: [resultCount, " products"]
				}), hasFilters && /* @__PURE__ */ jsx(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => onChange({
						q: value.q,
						min: void 0,
						max: void 0
					}),
					children: "Reset"
				})]
			})
		]
	}), /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3 md:hidden",
		children: [/* @__PURE__ */ jsx(FilterSearch, {
			value: value.q,
			onChange: (q) => onChange({
				...value,
				q
			})
		}), /* @__PURE__ */ jsxs(Dialog, { children: [/* @__PURE__ */ jsx(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsxs(Button, {
				variant: "outline",
				"aria-label": "Open filters",
				children: [/* @__PURE__ */ jsx(SlidersHorizontal, { "aria-hidden": "true" }), /* @__PURE__ */ jsx("span", {
					className: "sr-only",
					children: "Filters"
				})]
			})
		}), /* @__PURE__ */ jsxs(DialogContent, {
			className: "w-[min(92vw,420px)]",
			children: [
				/* @__PURE__ */ jsx(DialogTitle, {
					className: "text-2xl",
					children: "Filter"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(FilterFields, {
						value,
						onChange,
						facets
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-meta text-muted",
						children: [resultCount, " products found"]
					}), /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => onChange({ q: value.q }),
						children: "Reset"
					})]
				})
			]
		})] })]
	})] });
}
function FilterSearch({ value, onChange }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative w-full max-w-xs",
		children: [
			/* @__PURE__ */ jsx(Search, {
				"aria-hidden": "true",
				className: "pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted"
			}),
			/* @__PURE__ */ jsx(Input, {
				type: "search",
				value,
				onChange: (e) => onChange(e.target.value),
				placeholder: "Search objects…",
				"aria-label": "Search objects",
				className: "pl-9 pr-8"
			}),
			value && /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => onChange(""),
				"aria-label": "Clear search",
				className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground",
				children: /* @__PURE__ */ jsx(X, { className: "size-3.5" })
			})
		]
	});
}
function PriceSummary({ value, onChange }) {
	return /* @__PURE__ */ jsxs(Dialog, { children: [/* @__PURE__ */ jsx(DialogTrigger, {
		asChild: true,
		children: /* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "text-meta h-10 whitespace-nowrap border border-border px-4 transition-colors hover:border-foreground",
			children: [
				"Price",
				" ",
				/* @__PURE__ */ jsx("span", {
					className: "text-muted",
					children: value.min !== void 0 || value.max !== void 0 ? `${value.min ?? 0} — ${value.max ?? "∞"}` : "Any"
				})
			]
		})
	}), /* @__PURE__ */ jsxs(DialogContent, {
		className: "w-[min(92vw,420px)]",
		children: [
			/* @__PURE__ */ jsx(DialogTitle, {
				className: "text-2xl",
				children: "Price"
			}),
			"            ",
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-sm text-foreground-secondary",
				children: value.min !== void 0 || value.max !== void 0 ? `${formatPrice(value.min ?? 0)} — ${value.max !== void 0 ? formatPrice(value.max) : "no limit"}` : "Set a range to narrow the collection."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-6",
				children: /* @__PURE__ */ jsx(FilterFields, {
					value,
					onChange,
					facets: {
						categories: [],
						brands: []
					},
					priceOnly: true
				})
			})
		]
	})] });
}
//#endregion
//#region src/components/navigation/CategoryExplore.tsx
function CategoryExplore({ categories, onSelect }) {
	const navigate = useNavigate();
	const select = (category) => {
		onSelect({ category });
		navigate({
			to: "/collection",
			search: { category },
			replace: true
		});
	};
	return /* @__PURE__ */ jsx("nav", {
		"aria-label": "Explore categories",
		className: "flex flex-col gap-3",
		children: categories.map((category) => /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => select(category),
			className: cn("text-meta border border-border/60 px-3 py-2 transition-colors hover:border-border hover:text-foreground"),
			children: category
		}, category))
	});
}
//#endregion
//#region src/routes/collection.tsx?tsr-split=component
var EASE = [
	.22,
	1,
	.36,
	1
];
function CollectionPage() {
	const { products, facets } = Route.useLoaderData();
	const search = Route.useSearch();
	const navigate = useNavigate();
	useReducedMotion();
	search.view;
	const [filters, setFilters] = useState({
		q: search.q ?? "",
		category: search.category,
		brand: search.brand,
		min: search.min,
		max: search.max,
		availability: search.availability
	});
	const applyFilters = (next) => {
		setFilters(next);
		navigate({
			to: "/collection",
			search: (prev) => ({
				...prev,
				q: next.q || void 0,
				category: next.category,
				brand: next.brand,
				min: next.min,
				max: next.max,
				availability: next.availability
			}),
			replace: true
		});
	};
	const filtered = useMemo(() => {
		let list = [...products].sort((a, b) => a.name.localeCompare(b.name));
		list = list.filter((p) => p.published);
		list.length;
		if (filters.q) {
			const q = filters.q.toLowerCase();
			list = list.filter((p) => [
				p.name,
				p.description,
				p.category,
				p.brand,
				...p.tags,
				p.material
			].join(" ").toLowerCase().includes(q));
		}
		if (filters.category) list = list.filter((p) => p.category === filters.category);
		if (filters.brand) list = list.filter((p) => p.brand === filters.brand);
		if (filters.min !== void 0) list = list.filter((p) => p.price >= filters.min);
		if (filters.max !== void 0) list = list.filter((p) => p.price <= filters.max);
		if (filters.availability) list = list.filter((p) => p.availability === filters.availability);
		list.length;
		return list;
	}, [products, filters]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative overflow-hidden px-5 pb-10 pt-36 md:px-10 md:pt-48",
			children: [/* @__PURE__ */ jsx(ScrollParallax, {
				speed: .06,
				children: /* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					className: "bg-type absolute -right-6 top-16 text-[24vw] opacity-[0.04]",
					children: "Collection"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative mx-auto max-w-[1600px]",
				children: [
					/* @__PURE__ */ jsxs(Reveal, { children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-meta text-muted",
							children: "Shobhanjana collection"
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "font-display text-display-xl mt-4",
							children: "Collection"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 max-w-xl text-sm leading-relaxed text-foreground-secondary",
							children: "Objects chosen for everyday spaces, workspaces and personal collections. Filter by category, brand, material, color, availability and price."
						})
					] }),
					"              ",
					/* @__PURE__ */ jsxs("div", {
						className: "mt-16 grid gap-10 md:grid-cols-12",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "md:col-span-2",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-meta mb-5 text-muted",
								children: "Explore"
							}), /* @__PURE__ */ jsx(CategoryExplore, {
								categories: facets.categories,
								onSelect: (next) => applyFilters({
									q: filters.q,
									category: next.category,
									brand: next.brand,
									availability: next.availability,
									min: filters.min,
									max: filters.max
								})
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "md:col-span-10",
							children: /* @__PURE__ */ jsx(ProductFilters, {
								value: filters,
								onChange: applyFilters,
								facets,
								resultCount: filtered.length
							})
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			id: "categories",
			className: "relative overflow-hidden px-5 pb-32 pt-24 md:px-10 md:pt-40",
			"aria-label": "Category",
			children: [/* @__PURE__ */ jsx(ScrollParallax, {
				speed: .05,
				children: /* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					className: "bg-type absolute -right-6 top-16 text-[24vw] opacity-[0.04]",
					children: "Categories"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative mx-auto max-w-[1600px]",
				children: [/* @__PURE__ */ jsxs(Reveal, { children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-meta text-muted",
						children: "Explore by category"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "font-display text-display-md mt-4",
						children: "Entities"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 max-w-xl text-sm leading-relaxed text-foreground-secondary",
						children: "Choose a category to see the related products."
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "mt-12 grid gap-10 md:grid-cols-12",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-meta mb-5 text-muted",
							children: "Explore"
						}), /* @__PURE__ */ jsx(CategoryExplore, {
							categories: facets.categories,
							onSelect: (next) => applyFilters({
								q: filters.q,
								category: next.category,
								brand: next.brand,
								availability: next.availability,
								min: filters.min,
								max: filters.max
							})
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "md:col-span-10",
						children: filters.category && /* @__PURE__ */ jsxs("section", {
							"aria-live": "polite",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "font-display text-2xl tracking-wide",
									children: filters.category
								}), /* @__PURE__ */ jsxs("p", {
									className: "text-meta text-accent",
									children: [filtered.length, " products"]
								})]
							}), /* @__PURE__ */ jsx(motion.ul, {
								className: "grid grid-cols-1 gap-x-8 gap-y-14 pt-8 sm:grid-cols-2 lg:grid-cols-3",
								initial: {
									opacity: 0,
									scale: .96,
									y: 20
								},
								animate: {
									opacity: 1,
									scale: 1,
									y: 0
								},
								transition: {
									duration: .55,
									ease: EASE
								},
								children: /* @__PURE__ */ jsx(AnimatePresence, {
									mode: "popLayout",
									initial: false,
									children: filtered.map((p, i) => /* @__PURE__ */ jsx(motion.li, {
										layout: true,
										initial: {
											opacity: 0,
											scale: .96,
											y: 20
										},
										animate: {
											opacity: 1,
											scale: 1,
											y: 0
										},
										exit: {
											opacity: 0,
											scale: .96,
											y: -20
										},
										transition: {
											duration: .5,
											ease: EASE
										},
										children: /* @__PURE__ */ jsx(ProductCard, {
											product: p,
											index: i
										})
									}, p.id))
								})
							})]
						})
					})]
				})]
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "px-5 pb-32 md:px-10",
			"aria-live": "polite",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-[1600px]",
				children: filtered.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { label: "No products match this selection. Adjust the filters." }) : /* @__PURE__ */ jsx(motion.ul, {
					className: "grid grid-cols-1 gap-x-8 gap-y-14 pt-16 sm:grid-cols-2 lg:grid-cols-3",
					initial: {
						opacity: 0,
						scale: .96,
						y: 20
					},
					animate: {
						opacity: 1,
						scale: 1,
						y: 0
					},
					transition: {
						duration: .55,
						ease: EASE
					},
					children: /* @__PURE__ */ jsx(AnimatePresence, {
						mode: "popLayout",
						initial: false,
						children: filtered.map((p, i) => /* @__PURE__ */ jsx(motion.li, {
							layout: true,
							initial: {
								opacity: 0,
								scale: .96,
								y: 20
							},
							animate: {
								opacity: 1,
								scale: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								scale: .96,
								y: -20
							},
							transition: {
								duration: .5,
								ease: EASE
							},
							children: /* @__PURE__ */ jsx(ProductCard, {
								product: p,
								index: i
							})
						}, p.id))
					})
				})
			})
		})
	] });
}
//#endregion
export { CollectionPage as component };

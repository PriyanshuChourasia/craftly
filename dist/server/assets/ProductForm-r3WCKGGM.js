import { a as slugify, n as cn, t as productInputSchema } from "./schema-DYDO5Lmu.js";
import { t as Button } from "./button-ChKKm0vb.js";
import { f as updateProductFn, n as deleteProductFn, t as createProductFn } from "./api-zfJ_Y2L0.js";
import { n as formatPrice } from "./format-D2wRfgCJ.js";
import { a as SelectValue, c as Label, i as SelectTrigger, l as Textarea, n as SelectContent, o as FieldError, r as SelectItem, s as Input, t as Select } from "./select-DMTw72Er.js";
import { n as Checkbox } from "./misc-DJCfyT4z.js";
import * as React from "react";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Loader2, Star, Trash2, UploadCloud } from "lucide-react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
//#region src/components/ui/tabs.tsx
var Tabs = TabsPrimitive.Root;
var TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.List, {
	ref,
	className: cn("flex flex-wrap items-center gap-1 border-b border-border/60", className),
	...props
}));
TabsList.displayName = "TabsList";
var TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Trigger, {
	ref,
	className: cn("-mb-px border-b-2 border-transparent px-4 py-2.5 text-meta text-muted transition-colors hover:text-foreground data-[state=active]:border-foreground data-[state=active]:text-foreground focus-visible:outline-2 focus-visible:outline-accent", className),
	...props
}));
TabsTrigger.displayName = "TabsTrigger";
var TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(TabsPrimitive.Content, {
	ref,
	className: cn("pt-6 focus-visible:outline-none", className),
	...props
}));
TabsContent.displayName = "TabsContent";
//#endregion
//#region src/lib/image/image-storage.ts
var ACCEPTED_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/avif"
];
var LocalImageStorage = class {
	store = /* @__PURE__ */ new Map();
	validate(file) {
		if (!ACCEPTED_TYPES.includes(file.type)) return `Unsupported format: ${file.type || "unknown"}. Use JPEG, PNG, WebP or AVIF.`;
		if (file.size > 8388608) return `File exceeds the 8MB limit.`;
		return null;
	}
	async upload(file) {
		const dataUrl = await new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(String(reader.result));
			reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read file"));
			reader.readAsDataURL(file);
		});
		const key = `local-${crypto.randomUUID()}`;
		this.store.set(key, dataUrl);
		return {
			url: dataUrl,
			...await new Promise((resolve) => {
				const image = new Image();
				image.onload = () => resolve({
					width: image.naturalWidth,
					height: image.naturalHeight
				});
				image.onerror = () => resolve({});
				image.src = dataUrl;
			})
		};
	}
	async delete(url) {
		for (const [key, value] of this.store) if (value === url) this.store.delete(key);
	}
	async getUrl(key) {
		return this.store.get(key) ?? "";
	}
};
var imageStorage = new LocalImageStorage();
//#endregion
//#region src/components/admin/ImageUploader.tsx
/**
* Reusable image uploader: drag & drop or browse, multi-select,
* preview, remove, reorder, set primary. Validates type + size and
* persists through the ImageStorage abstraction (local mock for now).
*/
function ImageUploader({ images, onChange }) {
	const inputRef = useRef(null);
	const [dragging, setDragging] = useState(false);
	const [errors, setErrors] = useState([]);
	const [busy, setBusy] = useState(false);
	const handleFiles = async (files) => {
		if (!files?.length) return;
		setBusy(true);
		setErrors([]);
		const nextErrors = [];
		const uploaded = [];
		for (const file of Array.from(files)) {
			const error = imageStorage.validate?.(file);
			if (error) {
				nextErrors.push(`${file.name}: ${error}`);
				continue;
			}
			try {
				const result = await imageStorage.upload(file);
				uploaded.push({
					url: result.url,
					alt: file.name.replace(/\.[^.]+$/, ""),
					width: result.width,
					height: result.height
				});
			} catch {
				nextErrors.push(`${file.name}: upload failed`);
			}
		}
		if (nextErrors.length) setErrors(nextErrors);
		if (uploaded.length) onChange([...images, ...uploaded]);
		setBusy(false);
	};
	const remove = (i) => {
		const next = [...images];
		next.splice(i, 1);
		onChange(next);
	};
	const move = (i, dir) => {
		const j = i + dir;
		if (j < 0 || j >= images.length) return;
		const next = [...images];
		[next[i], next[j]] = [next[j], next[i]];
		onChange(next);
	};
	const setPrimary = (i) => {
		const next = [...images];
		const [picked] = next.splice(i, 1);
		if (picked) onChange([picked, ...next]);
	};
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			role: "button",
			tabIndex: 0,
			"aria-label": "Upload images",
			onClick: () => inputRef.current?.click(),
			onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click(),
			onDragOver: (e) => {
				e.preventDefault();
				setDragging(true);
			},
			onDragLeave: () => setDragging(false),
			onDrop: (e) => {
				e.preventDefault();
				setDragging(false);
				handleFiles(e.dataTransfer.files);
			},
			className: cn("flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed px-6 py-10 text-center transition-colors", dragging ? "border-accent bg-accent/5" : "border-border hover:border-foreground"),
			children: [
				busy ? /* @__PURE__ */ jsx(Loader2, {
					className: "size-5 animate-spin text-muted",
					"aria-hidden": "true"
				}) : /* @__PURE__ */ jsx(UploadCloud, {
					className: "size-5 text-muted",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm",
					children: "Drag & drop images here, or click to browse"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-meta text-muted",
					children: [
						"JPEG · PNG · WebP · AVIF — max ",
						8,
						"MB"
					]
				}),
				/* @__PURE__ */ jsx("input", {
					ref: inputRef,
					type: "file",
					accept: "image/jpeg,image/png,image/webp,image/avif",
					multiple: true,
					className: "sr-only",
					onChange: (e) => {
						handleFiles(e.target.files);
						e.target.value = "";
					}
				})
			]
		}),
		errors.length > 0 && /* @__PURE__ */ jsx("ul", {
			role: "alert",
			className: "mt-3 space-y-1",
			children: errors.map((e) => /* @__PURE__ */ jsx("li", {
				className: "text-xs text-accent",
				children: e
			}, e))
		}),
		images.length > 0 && /* @__PURE__ */ jsx("ul", {
			className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3",
			"aria-label": "Uploaded images",
			children: images.map((img, i) => /* @__PURE__ */ jsxs("li", {
				className: "group relative border border-border/60",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: img.url,
						alt: img.alt,
						className: "aspect-square w-full object-cover"
					}),
					i === 0 && /* @__PURE__ */ jsx("span", {
						className: "text-meta absolute left-1.5 top-1.5 bg-dark px-1.5 py-0.5 text-[9px] text-[#f3ecea]",
						children: "Primary"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/90 px-1 py-1 opacity-0 transition-opacity group-hover:opacity-100",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex gap-0.5",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => move(i, -1),
								disabled: i === 0,
								"aria-label": "Move earlier",
								className: "p-1 text-muted hover:text-foreground disabled:opacity-30",
								children: /* @__PURE__ */ jsx(ArrowLeft, { className: "size-3" })
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => move(i, 1),
								disabled: i === images.length - 1,
								"aria-label": "Move later",
								className: "p-1 text-muted hover:text-foreground disabled:opacity-30",
								children: /* @__PURE__ */ jsx(ArrowRight, { className: "size-3" })
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-0.5",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setPrimary(i),
								disabled: i === 0,
								"aria-label": "Set as primary",
								className: "p-1 text-muted hover:text-accent disabled:opacity-30",
								children: /* @__PURE__ */ jsx(Star, { className: "size-3" })
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => remove(i),
								"aria-label": "Remove image",
								className: "p-1 text-muted hover:text-accent",
								children: /* @__PURE__ */ jsx(Trash2, { className: "size-3" })
							})]
						})]
					})
				]
			}, `${img.url}-${i}`))
		})
	] });
}
//#endregion
//#region src/components/admin/ProductForm.tsx
var CATEGORIES = [
	"Furniture",
	"Ceramic",
	"Lighting",
	"Accessories",
	"Technology",
	"Art",
	"Objects"
];
function toFormState(p) {
	return {
		name: p?.name ?? "",
		slug: p?.slug ?? "",
		category: p?.category ?? "Objects",
		brand: p?.brand ?? "",
		year: p?.year ?? (/* @__PURE__ */ new Date()).getFullYear(),
		shortDescription: p?.shortDescription ?? "",
		description: p?.description ?? "",
		price: p?.price ?? 0,
		currency: p?.currency ?? "INR",
		material: p?.material ?? "",
		dimensions: p?.dimensions ?? "",
		color: p?.color ?? "",
		availability: p?.availability ?? "available",
		sellerName: p?.sellerName ?? "",
		sellerUrl: p?.sellerUrl ?? "",
		buyUrl: p?.buyUrl ?? "",
		featured: p?.featured ?? false,
		published: p?.published ?? true,
		metaTitle: p?.seo?.metaTitle ?? "",
		metaDescription: p?.seo?.metaDescription ?? "",
		images: (p?.images ?? []).map(({ url, alt, width, height }) => ({
			url,
			alt,
			width,
			height
		}))
	};
}
/** Tabbed admin product form with a live public preview. Create + edit. */
function ProductForm({ product }) {
	const navigate = useNavigate();
	const [form, setForm] = useState(() => toFormState(product));
	const [errors, setErrors] = useState({});
	const [saving, setSaving] = useState(false);
	const set = (key, value) => setForm((f) => ({
		...f,
		[key]: value
	}));
	const slugTouched = form.slug !== "" && product?.slug !== form.slug;
	const previewSlug = useMemo(() => form.slug && slugTouched ? form.slug : slugify(form.name || "object"), [
		form.slug,
		form.name,
		slugTouched
	]);
	const buildPayload = () => ({
		...form,
		slug: form.slug || previewSlug,
		shortDescription: form.shortDescription || void 0,
		brand: form.brand || void 0,
		material: form.material || void 0,
		dimensions: form.dimensions || void 0,
		color: form.color || void 0,
		sellerName: form.sellerName || void 0,
		sellerUrl: form.sellerUrl || void 0,
		buyUrl: form.buyUrl || void 0,
		seo: {
			metaTitle: form.metaTitle || void 0,
			metaDescription: form.metaDescription || void 0
		}
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		const parsed = productInputSchema.safeParse(buildPayload());
		if (!parsed.success) {
			const fieldErrors = {};
			for (const issue of parsed.error.issues) {
				const key = String(issue.path[0] ?? "form");
				if (!fieldErrors[key]) fieldErrors[key] = issue.message;
			}
			setErrors(fieldErrors);
			toast.error("Please fix the highlighted fields");
			return;
		}
		setErrors({});
		setSaving(true);
		try {
			if (product) {
				await updateProductFn({ data: {
					id: product.id,
					data: parsed.data
				} });
				toast.success("Object updated");
				navigate({ to: "/admin/products" });
			} else {
				await createProductFn({ data: parsed.data });
				toast.success("Object added to the archive");
				navigate({ to: "/admin/products" });
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setSaving(false);
		}
	};
	const handleDelete = async () => {
		if (!product) return;
		if (!window.confirm(`Delete "${product.name}" from the archive? This cannot be undone.`)) return;
		await deleteProductFn({ data: product.id });
		toast.success("Object deleted");
		navigate({ to: "/admin/products" });
	};
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: handleSubmit,
		className: "grid gap-8 lg:grid-cols-12",
		children: [/* @__PURE__ */ jsx("div", {
			className: "lg:col-span-8",
			children: /* @__PURE__ */ jsxs(Tabs, {
				defaultValue: "general",
				children: [
					/* @__PURE__ */ jsxs(TabsList, {
						"aria-label": "Form sections",
						children: [
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "general",
								children: "General"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "media",
								children: "Media"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "details",
								children: "Details"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "pricing",
								children: "Pricing"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "seller",
								children: "Seller"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "seo",
								children: "SEO"
							}),
							/* @__PURE__ */ jsx(TabsTrigger, {
								value: "settings",
								children: "Settings"
							})
						]
					}),
					/* @__PURE__ */ jsxs(TabsContent, {
						value: "general",
						children: [/* @__PURE__ */ jsxs(Section, {
							title: "General",
							children: [
								/* @__PURE__ */ jsx(Field, {
									label: "Product name",
									error: errors.name,
									children: /* @__PURE__ */ jsx(Input, {
										value: form.name,
										onChange: (e) => set("name", e.target.value),
										onBlur: () => !form.slug && form.name && set("slug", slugify(form.name)),
										required: true
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Slug",
									error: errors.slug,
									hint: "/products/{slug}",
									children: /* @__PURE__ */ jsx(Input, {
										value: form.slug,
										onChange: (e) => set("slug", slugify(e.target.value))
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-4 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ jsx(Field, {
											label: "Category",
											error: errors.category,
											children: /* @__PURE__ */ jsxs(Select, {
												value: form.category,
												onValueChange: (v) => set("category", v),
												children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }), /* @__PURE__ */ jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsx(SelectItem, {
													value: c,
													children: c
												}, c)) })]
											})
										}),
										/* @__PURE__ */ jsx(Field, {
											label: "Brand",
											children: /* @__PURE__ */ jsx(Input, {
												value: form.brand,
												onChange: (e) => set("brand", e.target.value)
											})
										}),
										/* @__PURE__ */ jsx(Field, {
											label: "Year",
											error: errors.year,
											children: /* @__PURE__ */ jsx(Input, {
												type: "number",
												value: form.year,
												onChange: (e) => set("year", Number(e.target.value) || 0)
											})
										})
									]
								})
							]
						}), /* @__PURE__ */ jsxs(Section, {
							title: "Description",
							children: [/* @__PURE__ */ jsx(Field, {
								label: "Short description",
								hint: "Shown on cards and previews",
								children: /* @__PURE__ */ jsx(Textarea, {
									className: "min-h-[70px]",
									value: form.shortDescription,
									onChange: (e) => set("shortDescription", e.target.value)
								})
							}), /* @__PURE__ */ jsx(Field, {
								label: "Long description",
								error: errors.description,
								children: /* @__PURE__ */ jsx(Textarea, {
									className: "min-h-[140px]",
									value: form.description,
									onChange: (e) => set("description", e.target.value),
									required: true
								})
							})]
						})]
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "media",
						children: /* @__PURE__ */ jsxs(Section, {
							title: "Media",
							error: errors.images,
							children: [/* @__PURE__ */ jsx(ImageUploader, {
								images: form.images,
								onChange: (images) => set("images", images)
							}), /* @__PURE__ */ jsx("p", {
								className: "text-meta mt-3 text-muted",
								children: "The first image is the primary image. Use the arrows to reorder."
							})]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "details",
						children: /* @__PURE__ */ jsxs(Section, {
							title: "Product details",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "grid gap-4 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ jsx(Field, {
										label: "Material",
										children: /* @__PURE__ */ jsx(Input, {
											value: form.material,
											onChange: (e) => set("material", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: "Dimensions",
										children: /* @__PURE__ */ jsx(Input, {
											value: form.dimensions,
											onChange: (e) => set("dimensions", e.target.value),
											placeholder: "25 × 12 × 10 CM"
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: "Color",
										children: /* @__PURE__ */ jsx(Input, {
											value: form.color,
											onChange: (e) => set("color", e.target.value)
										})
									})
								]
							}), /* @__PURE__ */ jsx(Field, {
								label: "Availability",
								error: errors.availability,
								children: /* @__PURE__ */ jsxs(Select, {
									value: form.availability,
									onValueChange: (v) => set("availability", v),
									children: [/* @__PURE__ */ jsx(SelectTrigger, {
										className: "max-w-xs",
										children: /* @__PURE__ */ jsx(SelectValue, {})
									}), /* @__PURE__ */ jsxs(SelectContent, { children: [
										/* @__PURE__ */ jsx(SelectItem, {
											value: "available",
											children: "Available"
										}),
										/* @__PURE__ */ jsx(SelectItem, {
											value: "sold_out",
											children: "Sold out"
										}),
										/* @__PURE__ */ jsx(SelectItem, {
											value: "coming_soon",
											children: "Coming soon"
										})
									] })]
								})
							})]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "pricing",
						children: /* @__PURE__ */ jsx(Section, {
							title: "Pricing",
							children: /* @__PURE__ */ jsxs("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ jsx(Field, {
									label: "Price",
									error: errors.price,
									children: /* @__PURE__ */ jsx(Input, {
										type: "number",
										min: 0,
										value: form.price,
										onChange: (e) => set("price", Number(e.target.value) || 0)
									})
								}), /* @__PURE__ */ jsx(Field, {
									label: "Currency",
									error: errors.currency,
									children: /* @__PURE__ */ jsxs(Select, {
										value: form.currency,
										onValueChange: (v) => set("currency", v),
										children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }), /* @__PURE__ */ jsx(SelectContent, { children: [
											"INR",
											"USD",
											"EUR",
											"GBP"
										].map((c) => /* @__PURE__ */ jsx(SelectItem, {
											value: c,
											children: c
										}, c)) })]
									})
								})]
							})
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "seller",
						children: /* @__PURE__ */ jsx(Section, {
							title: "Seller",
							children: /* @__PURE__ */ jsxs("div", {
								className: "grid gap-4 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ jsx(Field, {
										label: "Seller name",
										children: /* @__PURE__ */ jsx(Input, {
											value: form.sellerName,
											onChange: (e) => set("sellerName", e.target.value)
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: "Seller URL",
										error: errors.sellerUrl,
										children: /* @__PURE__ */ jsx(Input, {
											type: "url",
											value: form.sellerUrl,
											onChange: (e) => set("sellerUrl", e.target.value),
											placeholder: "https://…"
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: "Buy URL",
										error: errors.buyUrl,
										hint: "External store link",
										children: /* @__PURE__ */ jsx(Input, {
											type: "url",
											value: form.buyUrl,
											onChange: (e) => set("buyUrl", e.target.value),
											placeholder: "https://…"
										})
									})
								]
							})
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "seo",
						children: /* @__PURE__ */ jsxs(Section, {
							title: "SEO",
							children: [
								/* @__PURE__ */ jsx(Field, {
									label: "Meta title",
									children: /* @__PURE__ */ jsx(Input, {
										value: form.metaTitle,
										onChange: (e) => set("metaTitle", e.target.value)
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Meta description",
									children: /* @__PURE__ */ jsx(Textarea, {
										className: "min-h-[70px]",
										value: form.metaDescription,
										onChange: (e) => set("metaDescription", e.target.value)
									})
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-meta text-muted",
									children: ["Canonical URL: /products/", previewSlug]
								})
							]
						})
					}),
					/* @__PURE__ */ jsx(TabsContent, {
						value: "settings",
						children: /* @__PURE__ */ jsxs(Section, {
							title: "Settings",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-3 text-sm",
								children: [/* @__PURE__ */ jsx(Checkbox, {
									checked: form.featured,
									onCheckedChange: (v) => set("featured", v === true)
								}), "Featured — show in the hero and featured sections"]
							}), /* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-3 text-sm",
								children: [/* @__PURE__ */ jsx(Checkbox, {
									checked: form.published,
									onCheckedChange: (v) => set("published", v === true)
								}), "Published — visible on the public site"]
							})]
						})
					})
				]
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "space-y-6 lg:col-span-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "sticky top-6 space-y-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ jsx(Button, {
							type: "submit",
							disabled: saving,
							size: "lg",
							children: saving ? "Saving…" : product ? "Save changes" : "Create product"
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "outline",
							onClick: () => navigate({ to: "/admin/products" }),
							children: "Cancel"
						}),
						product && /* @__PURE__ */ jsx(Button, {
							type: "button",
							variant: "destructive",
							onClick: handleDelete,
							children: "Delete product"
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "border border-border bg-paper/50 p-4",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-meta mb-3 text-muted",
							children: "Public preview"
						}),
						"              ",
						/* @__PURE__ */ jsxs("div", {
							className: "border border-border-soft bg-background",
							children: [form.images[0] ? /* @__PURE__ */ jsx("div", {
								className: "aspect-[4/5] w-full overflow-hidden",
								children: /* @__PURE__ */ jsx("img", {
									src: form.images[0].url,
									alt: form.images[0].alt,
									className: "h-full w-full object-cover",
									onError: (e) => {
										const t = e.currentTarget;
										t.style.display = "none";
									}
								})
							}) : /* @__PURE__ */ jsx("div", {
								className: "flex aspect-[4/5] items-center justify-center text-meta text-muted",
								children: "No image"
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-3",
								children: [
									/* @__PURE__ */ jsxs("p", {
										className: "text-meta text-muted",
										children: ["Object — ", form.year]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-1 font-display text-base leading-tight",
										children: form.name || "Untitled object"
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "text-meta mt-1 text-foreground-secondary",
										children: [
											form.category,
											" / ",
											form.year
										]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-meta mt-1.5",
										children: form.availability === "coming_soon" ? "—" : formatPrice(form.price, form.currency)
									})
								]
							})]
						})
					]
				})]
			})
		})]
	});
}
function Section({ title, children, error }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ jsx("h2", {
				className: "text-meta border-b border-border/40 pb-2 text-muted",
				children: title
			}),
			children,
			/* @__PURE__ */ jsx(FieldError, { message: error })
		]
	});
}
function Field({ label, error, hint, children }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx(Label, { children: label }),
		children,
		hint && /* @__PURE__ */ jsx("p", {
			className: "text-meta mt-1 text-muted",
			children: hint
		}),
		/* @__PURE__ */ jsx(FieldError, { message: error })
	] });
}
//#endregion
export { ProductForm as t };

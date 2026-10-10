import { i as padNumber, n as cn } from "./schema-DYDO5Lmu.js";
import { c as ScrollParallax, i as Route } from "./router-CHFSv2ZK.js";
import { n as formatPrice, t as availabilityLabel } from "./format-D2wRfgCJ.js";
import { t as ProductImage } from "./ProductImage-WrO-u_En.js";
import { t as Reveal } from "./Reveal-C-mtMtZj.js";
import { t as BuyButton } from "./BuyButton-CkiOwSg6.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, ExternalLink, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
//#region src/components/products/ProductLightbox.tsx
/**
* Fullscreen, near-black lightbox. Escape closes; arrows navigate.
* Built directly on Radix Dialog primitives for a11y.
*/
function ProductLightbox({ images, index, open, onOpenChange, onIndexChange }) {
	const reduced = useReducedMotion();
	const next = useCallback(() => onIndexChange((index + 1) % images.length), [
		index,
		images.length,
		onIndexChange
	]);
	const prev = useCallback(() => onIndexChange((index - 1 + images.length) % images.length), [
		index,
		images.length,
		onIndexChange
	]);
	useEffect(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "ArrowRight") next();
			if (e.key === "ArrowLeft") prev();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		open,
		next,
		prev
	]);
	const image = images[index];
	return /* @__PURE__ */ jsx(DialogPrimitive.Root, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { children: [/* @__PURE__ */ jsx(DialogPrimitive.Overlay, { className: "fixed inset-0 z-[120] bg-[#080808]/95 backdrop-blur-sm" }), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
			"aria-label": `Image viewer, image ${index + 1} of ${images.length}`,
			className: "fixed inset-0 z-[120] flex flex-col focus:outline-none",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between px-5 py-4 text-[#f3ecea]",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-meta",
						children: [
							String(index + 1).padStart(2, "0"),
							" / ",
							String(images.length).padStart(2, "0")
						]
					}), /* @__PURE__ */ jsx(DialogPrimitive.Close, {
						"aria-label": "Close lightbox",
						className: "flex size-10 items-center justify-center border border-[#f3ecea]/20 transition-colors hover:border-[#f3ecea]/60 focus-visible:outline-2 focus-visible:outline-accent",
						children: /* @__PURE__ */ jsx(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6",
					children: [
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: prev,
							"aria-label": "Previous image",
							className: "absolute left-4 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center border border-[#f3ecea]/20 text-[#f3ecea] transition-colors hover:border-[#f3ecea]/60 focus-visible:outline-2 focus-visible:outline-accent",
							children: /* @__PURE__ */ jsx(ChevronLeft, { className: "size-4" })
						}),
						/* @__PURE__ */ jsx(AnimatePresence, {
							mode: "wait",
							children: /* @__PURE__ */ jsx(motion.img, {
								src: image?.url,
								alt: image?.alt,
								initial: reduced ? { opacity: 0 } : {
									opacity: 0,
									scale: .96
								},
								animate: {
									opacity: 1,
									scale: 1
								},
								exit: reduced ? { opacity: 0 } : {
									opacity: 0,
									scale: .98
								},
								transition: {
									duration: .35,
									ease: [
										.22,
										1,
										.36,
										1
									]
								},
								className: "max-h-full max-w-full object-contain"
							}, image?.url)
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: next,
							"aria-label": "Next image",
							className: "absolute right-4 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center border border-[#f3ecea]/20 text-[#f3ecea] transition-colors hover:border-[#f3ecea]/60 focus-visible:outline-2 focus-visible:outline-accent",
							children: /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" })
						})
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "pb-8 text-center text-meta text-[#f3ecea]/60",
					children: image?.alt
				})
			]
		})] })
	});
}
//#endregion
//#region src/components/products/ProductGallery.tsx
/**
* Exhibition-room image gallery.
* Desktop: large image + thumbnail column, subtle cursor-driven tilt.
* Mobile: swipeable horizontal carousel.
*/
function ProductGallery({ images }) {
	const [index, setIndex] = useState(0);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const reduced = useReducedMotion();
	const stageRef = useRef(null);
	const active = images[index] ?? images[0];
	if (!active) return null;
	const onMove = (e) => {
		if (reduced || !stageRef.current) return;
		const rect = stageRef.current.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width - .5;
		const py = (e.clientY - rect.top) / rect.height - .5;
		stageRef.current.style.transform = `perspective(1400px) rotateY(${px * -5}deg) rotateX(${py * 4}deg)`;
	};
	const onLeave = () => {
		if (stageRef.current) stageRef.current.style.transform = "perspective(1400px) rotateY(0deg) rotateX(0deg)";
	};
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("div", {
			className: "preserve-3d relative [transition:transform_.5s_cubic-bezier(.22,1,.36,1)]",
			ref: stageRef,
			onMouseMove: onMove,
			onMouseLeave: onLeave,
			children: /* @__PURE__ */ jsxs("button", {
				type: "button",
				"data-cursor": "open",
				onClick: () => setLightboxOpen(true),
				"aria-label": "Open fullscreen image viewer",
				className: "group relative block w-full cursor-pointer border border-border bg-paper text-left shadow-[var(--shadow-frame-lg)] focus-visible:outline-2 focus-visible:outline-accent",
				children: [/* @__PURE__ */ jsx("div", {
					className: "aspect-[4/5] overflow-hidden",
					children: /* @__PURE__ */ jsx(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ jsx(motion.div, {
							className: "aspect-[4/5] w-full overflow-hidden",
							initial: reduced ? { opacity: 0 } : {
								opacity: 0,
								scale: 1.04,
								x: 24
							},
							animate: {
								opacity: 1,
								scale: 1,
								x: 0
							},
							exit: reduced ? { opacity: 0 } : {
								opacity: 0,
								x: -24
							},
							transition: {
								duration: .5,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							children: /* @__PURE__ */ jsx("img", {
								src: active.url,
								alt: active.alt,
								width: active.width,
								height: active.height,
								loading: "lazy",
								decoding: "async",
								className: "h-full w-full object-cover",
								onError: (e) => {
									console.warn("Product gallery image failed to load:", active.url);
									const target = e.currentTarget;
									target.style.display = "none";
								}
							})
						}, active.url)
					})
				}), /* @__PURE__ */ jsxs("span", {
					className: "text-meta absolute bottom-3 right-3 flex items-center gap-1.5 border border-border bg-background/80 px-2 py-1 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100",
					children: [/* @__PURE__ */ jsx(Expand, {
						"aria-hidden": "true",
						className: "size-3"
					}), " Open"]
				})]
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-4 hidden gap-3 md:flex",
			role: "tablist",
			"aria-label": "Product views",
			children: images.map((img, i) => /* @__PURE__ */ jsx("button", {
				type: "button",
				role: "tab",
				"aria-selected": i === index,
				"aria-label": `View image ${i + 1}: ${img.alt}`,
				onClick: () => setIndex(i),
				className: cn("aspect-[4/5] w-20 overflow-hidden border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent", i === index ? "border-foreground opacity-100" : "border-border-soft opacity-60 hover:opacity-100"),
				children: /* @__PURE__ */ jsx("img", {
					src: img.url,
					alt: "",
					loading: "lazy",
					className: "h-full w-full object-cover",
					onError: (e) => {
						const t = e.currentTarget;
						t.style.display = "none";
					}
				})
			}, img.id))
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-4 flex gap-3 overflow-x-auto pb-2 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
			children: images.map((img, i) => /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setIndex(i),
				"aria-label": `View image ${i + 1}: ${img.alt}`,
				"aria-current": i === index,
				className: cn("aspect-[4/5] w-16 shrink-0 overflow-hidden border", i === index ? "border-foreground" : "border-border-soft opacity-60"),
				children: /* @__PURE__ */ jsx("img", {
					src: img.url,
					alt: "",
					loading: "lazy",
					className: "h-full w-full object-cover",
					onError: (e) => {
						const t = e.currentTarget;
						t.style.display = "none";
					}
				})
			}, img.id))
		}),
		/* @__PURE__ */ jsx(ProductLightbox, {
			images,
			index,
			open: lightboxOpen,
			onOpenChange: setLightboxOpen,
			onIndexChange: setIndex
		})
	] });
}
//#endregion
//#region src/routes/products.$slug.tsx?tsr-split=component
function ProductCaption({ product }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "px-3.5 py-3",
		children: [/* @__PURE__ */ jsx("p", {
			className: "font-display text-base",
			children: product.name
		}), /* @__PURE__ */ jsxs("p", {
			className: "text-meta mt-1 text-muted",
			children: [
				product.category,
				" / ",
				product.year
			]
		})]
	});
}
function ProductDetail() {
	const { product, related } = Route.useLoaderData();
	const specs = [
		["Material", product.material],
		["Dimensions", product.dimensions],
		["Color", product.color],
		["Brand", product.brand]
	];
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("article", {
		className: "px-5 pb-24 pt-28 md:px-10 md:pt-40",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1600px]",
			children: [
				/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("nav", {
					"aria-label": "Breadcrumb",
					className: "text-meta flex items-center gap-2 text-muted",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/collection",
							className: "hover:text-foreground",
							children: "Collection"
						}),
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							children: "/"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-foreground-secondary",
							children: product.category
						}),
						/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							children: "/"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-foreground",
							children: product.name
						})
					]
				}) }),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-16",
					children: [/* @__PURE__ */ jsx("div", {
						className: "md:col-span-7",
						children: /* @__PURE__ */ jsx(Reveal, {
							direction: "none",
							children: /* @__PURE__ */ jsx(ProductGallery, { images: product.images })
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "md:col-span-5",
						children: /* @__PURE__ */ jsxs(Reveal, {
							delay: .1,
							children: [
								/* @__PURE__ */ jsxs("p", {
									className: "text-meta text-muted",
									children: [
										"Object ",
										product.slug.split("-").pop()?.replace(/\D/g, "").padStart(2, "0") ?? padNumber(1),
										" — ",
										product.year
									]
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "font-display text-display-lg mt-4 leading-[0.92]",
									children: product.name
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-meta mt-5 text-foreground-secondary",
									children: [
										product.category,
										" / ",
										product.year,
										" /",
										" ",
										/* @__PURE__ */ jsx("span", {
											className: product.availability === "available" ? "text-foreground" : product.availability === "sold_out" ? "text-muted" : "text-accent",
											children: availabilityLabel(product.availability)
										})
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "font-display mt-8 text-4xl",
									children: product.availability === "coming_soon" ? "—" : formatPrice(product.price, product.currency)
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-8 max-w-lg text-sm leading-relaxed text-foreground-secondary",
									children: product.description
								}),
								product.tags.length > 0 && /* @__PURE__ */ jsx("ul", {
									className: "mt-6 flex flex-wrap gap-2",
									"aria-label": "Tags",
									children: product.tags.map((t) => /* @__PURE__ */ jsx("li", {
										className: "text-meta border border-border/60 px-2 py-1 text-muted",
										children: t
									}, t))
								}),
								/* @__PURE__ */ jsxs("dl", {
									className: "mt-10 border-t border-border/50",
									children: [specs.filter(([, v]) => v).map(([label, value]) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-baseline justify-between border-b border-border/40 py-3.5",
										children: [/* @__PURE__ */ jsx("dt", {
											className: "text-meta text-muted",
											children: label
										}), /* @__PURE__ */ jsx("dd", {
											className: "text-sm",
											children: value
										})]
									}, label)), /* @__PURE__ */ jsxs("div", {
										className: "flex items-baseline justify-between border-b border-border/40 py-3.5",
										children: [/* @__PURE__ */ jsx("dt", {
											className: "text-meta text-muted",
											children: "Availability"
										}), /* @__PURE__ */ jsx("dd", {
											className: "text-meta",
											children: availabilityLabel(product.availability)
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-10 border border-border p-5",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "text-meta text-muted",
											children: "Buy from"
										}),
										/* @__PURE__ */ jsxs("p", {
											className: "mt-2 flex items-center gap-2 font-display text-xl tracking-wide",
											children: [product.sellerName ?? "Archive", product.sellerUrl && /* @__PURE__ */ jsx("a", {
												href: product.sellerUrl,
												target: "_blank",
												rel: "noopener noreferrer",
												"aria-label": `Visit ${product.sellerName}'s website`,
												className: "text-muted transition-colors hover:text-foreground",
												children: /* @__PURE__ */ jsx(ExternalLink, { className: "size-3.5" })
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-5",
											children: /* @__PURE__ */ jsx(BuyButton, {
												href: product.buyUrl,
												size: "lg",
												className: "w-full"
											})
										}),
										product.availability === "sold_out" && /* @__PURE__ */ jsx("p", {
											className: "text-meta mt-4 text-muted",
											children: "This object has been sold — the listing remains as part of the archive."
										})
									]
								})
							]
						})
					})]
				}),
				related.length > 0 && /* @__PURE__ */ jsxs("section", {
					"aria-label": "Related objects",
					className: "mt-32",
					children: [/* @__PURE__ */ jsx(ScrollParallax, {
						speed: .05,
						children: /* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							className: "bg-type absolute left-0 text-[16vw] opacity-[0.03]",
							children: "More"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("h2", {
							className: "font-display text-display-md",
							children: "Related objects"
						}) }), /* @__PURE__ */ jsx("div", {
							className: "mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
							children: related.map((p, i) => /* @__PURE__ */ jsx(Reveal, {
								delay: i * .1,
								children: /* @__PURE__ */ jsxs(Link, {
									to: "/products/$slug",
									params: { slug: p.slug },
									"data-cursor": "view",
									className: "group block border border-border-soft bg-paper/60 transition-shadow hover:shadow-[var(--shadow-frame)]",
									children: [/* @__PURE__ */ jsx("div", {
										className: "aspect-[4/5] overflow-hidden",
										children: /* @__PURE__ */ jsx(ProductImage, {
											image: p.images[0] ?? {
												id: "",
												url: p.primaryImage ?? "",
												alt: p.name,
												order: 0
											},
											objectFit: "cover",
											sizes: "(max-width: 768px) 100vw, 33vw",
											className: "transition-transform duration-700 group-hover:scale-[1.04]"
										})
									}), /* @__PURE__ */ jsx(ProductCaption, { product: p })]
								})
							}, p.id))
						})]
					})]
				})
			]
		})
	}) });
}
//#endregion
export { ProductDetail as component };

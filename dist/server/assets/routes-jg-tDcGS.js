import { i as padNumber, n as cn } from "./schema-DYDO5Lmu.js";
import { t as Button } from "./button-ChKKm0vb.js";
import { c as ScrollParallax, l as ParallaxItem, s as Route } from "./router-CHFSv2ZK.js";
import { n as formatPrice, t as availabilityLabel } from "./format-D2wRfgCJ.js";
import { t as ProductImage } from "./ProductImage-WrO-u_En.js";
import { t as ProductCard } from "./ProductCard-BQsdjjxG.js";
import { n as Stagger, r as staggerItem, t as Reveal } from "./Reveal-C-mtMtZj.js";
import { t as BuyButton } from "./BuyButton-CkiOwSg6.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
//#region src/components/home/Hero.tsx
var EASE = [
	.22,
	1,
	.36,
	1
];
/** Mosaic layout: 4 columns × 3 rows on desktop, 2 columns on mobile. */
var TILES = [
	"col-span-2 row-span-2 md:col-span-2 md:row-span-2",
	"col-span-1 row-span-1 md:col-span-1 md:row-span-2",
	"col-span-1 row-span-1 md:col-span-1 md:row-span-1",
	"col-span-1 row-span-1 md:col-span-1 md:row-span-1",
	"col-span-1 row-span-1 md:col-span-2 md:row-span-1",
	"col-span-2 row-span-1 md:col-span-2 md:row-span-1"
];
/** Pick 6 distinct images: first image of each product, then extra images to fill. */
function pickImages(products) {
	const firsts = products.map((p) => p.images[0]).filter(Boolean);
	const rest = products.flatMap((p) => p.images.slice(1));
	const seen = /* @__PURE__ */ new Set();
	return [...firsts, ...rest].filter((img) => img.url && !seen.has(img.url) && seen.add(img.url)).slice(0, TILES.length);
}
function Hero({ products }) {
	const images = pickImages(products);
	return /* @__PURE__ */ jsxs("section", {
		"aria-label": "SB Creation",
		className: "relative h-[100svh] min-h-[560px] overflow-hidden bg-dark",
		children: [
			/* @__PURE__ */ jsx("div", {
				"aria-hidden": "true",
				className: "absolute inset-0 grid grid-cols-2 grid-rows-4 gap-1.5 p-1.5 md:grid-cols-4 md:grid-rows-3 md:gap-2 md:p-2",
				children: images.map((img, i) => /* @__PURE__ */ jsxs(motion.div, {
					className: `relative overflow-hidden ${TILES[i]}`,
					initial: {
						opacity: 0,
						scale: 1.08
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: {
						duration: 1.2,
						delay: .1 + i * .1,
						ease: EASE
					},
					children: [/* @__PURE__ */ jsx("img", {
						src: img.url,
						alt: "",
						loading: i < 2 ? "eager" : "lazy",
						decoding: "async",
						className: "h-full w-full object-cover"
					}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.55)]" })]
				}, img.url))
			}),
			/* @__PURE__ */ jsx("div", {
				"aria-hidden": "true",
				className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.7)_100%)]"
			}),
			/* @__PURE__ */ jsx(motion.h1, {
				className: "text-display-md absolute left-5 top-6 z-20 text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.6)] md:left-10 md:top-8",
				initial: {
					opacity: 0,
					y: -20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .9,
					delay: .3,
					ease: EASE
				},
				children: "SB Creation"
			}),
			/* @__PURE__ */ jsx(motion.div, {
				className: "relative z-10 flex h-full items-center justify-center px-5 pt-16 text-center",
				initial: {
					opacity: 0,
					y: 40
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: 1.1,
					delay: .5,
					ease: EASE
				},
				children: products.length > 0 && /* @__PURE__ */ jsx(PriceSlider, { products })
			})
		]
	});
}
var SLIDE_MS = 4e3;
/** Centered auto-advancing product slide with name and price. */
function PriceSlider({ products }) {
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const reduced = useReducedMotion();
	const count = products.length;
	const product = products[index % count];
	const image = product.images[0];
	const go = (step) => setIndex((i) => (i + step + count) % count);
	useEffect(() => {
		if (paused || reduced || count < 2) return;
		const id = setInterval(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
		return () => clearInterval(id);
	}, [
		paused,
		reduced,
		count
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "w-full max-w-sm",
		onMouseEnter: () => setPaused(true),
		onMouseLeave: () => setPaused(false),
		onFocus: () => setPaused(true),
		onBlur: () => setPaused(false),
		"aria-roledescription": "carousel",
		"aria-label": "Featured products",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative grid",
			children: [/* @__PURE__ */ jsx(AnimatePresence, {
				initial: false,
				children: /* @__PURE__ */ jsx(motion.div, {
					className: "[grid-area:1/1]",
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					transition: {
						duration: .9,
						ease: "easeInOut"
					},
					children: /* @__PURE__ */ jsx(Link, {
						to: "/products/$slug",
						params: { slug: product.slug },
						"data-cursor": "view",
						className: "group block outline-none",
						"aria-label": `${product.name} — ${formatPrice(product.price, product.currency)}`,
						children: /* @__PURE__ */ jsx("div", {
							className: "rounded-[2px] bg-[linear-gradient(135deg,#f3dc9a_0%,#b8862f_22%,#f7e3a6_45%,#8a5f1c_70%,#d9b462_100%)] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,240,200,0.6),inset_0_2px_3px_rgba(255,255,255,0.5),inset_0_-3px_6px_rgba(60,35,5,0.6)] md:p-4",
							children: /* @__PURE__ */ jsx("div", {
								className: "bg-[#2a1c0c] p-[3px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)]",
								children: /* @__PURE__ */ jsx("div", {
									className: "bg-[#f6f0e4] p-4 shadow-[inset_0_0_0_1px_rgba(180,150,100,0.35),inset_0_6px_14px_rgba(0,0,0,0.18)] md:p-6",
									children: /* @__PURE__ */ jsxs("div", {
										className: "relative aspect-[4/3] overflow-hidden shadow-[0_0_0_1px_rgba(120,90,40,0.35),0_2px_6px_rgba(0,0,0,0.25)]",
										children: [image && /* @__PURE__ */ jsx("img", {
											src: image.url,
											alt: image.alt,
											className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
										}), /* @__PURE__ */ jsxs("div", {
											className: "absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between gap-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-3 pt-10 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100",
											children: [/* @__PURE__ */ jsx("p", {
												className: "font-display min-w-0 truncate text-2xl text-white",
												children: product.name
											}), /* @__PURE__ */ jsx("p", {
												className: "shrink-0 text-base font-semibold text-[#f3dc9a]",
												children: formatPrice(product.price, product.currency)
											})]
										})]
									})
								})
							})
						})
					})
				}, product.id)
			}), count > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => go(-1),
				"aria-label": "Previous product",
				className: "absolute left-0 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-colors hover:bg-white md:-translate-x-[130%]",
				children: "←"
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => go(1),
				"aria-label": "Next product",
				className: "absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-colors hover:bg-white md:translate-x-[130%]",
				children: "→"
			})] })]
		}), count > 1 && /* @__PURE__ */ jsx("div", {
			className: "mt-5 flex justify-center gap-2",
			children: products.map((p, i) => /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setIndex(i),
				"aria-label": `Show ${p.name}`,
				"aria-current": i === index ? "true" : void 0,
				className: `h-1.5 cursor-pointer rounded-full transition-all duration-300 ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`
			}, p.id))
		})]
	});
}
//#endregion
//#region src/hooks/index.ts
/** SSR-safe media query hook. */
function useMediaQuery(query) {
	const [matches, setMatches] = useState(false);
	useEffect(() => {
		const mql = window.matchMedia(query);
		setMatches(mql.matches);
		const onChange = (e) => setMatches(e.matches);
		mql.addEventListener("change", onChange);
		return () => mql.removeEventListener("change", onChange);
	}, [query]);
	return matches;
}
/** True when the user prefers reduced motion. */
function useReducedMotion$1() {
	return useMediaQuery("(prefers-reduced-motion: reduce)");
}
//#endregion
//#region src/components/home/FeaturedProduct.tsx
/**
* The centerpiece: ~60% image / 40% content on desktop,
* image-first stacked layout on mobile.
*/
function FeaturedProduct({ product, index = 0 }) {
	const reduced = useReducedMotion$1();
	const imageAnim = reduced ? {
		initial: { opacity: 0 },
		whileInView: { opacity: 1 }
	} : {
		initial: {
			opacity: 0,
			scale: .85,
			y: 60
		},
		whileInView: {
			opacity: 1,
			scale: 1,
			y: 0
		}
	};
	const textAnim = reduced ? {
		initial: { opacity: 0 },
		whileInView: { opacity: 1 }
	} : {
		initial: {
			opacity: 0,
			y: 40
		},
		whileInView: {
			opacity: 1,
			y: 0
		}
	};
	return /* @__PURE__ */ jsxs("section", {
		"aria-label": "Featured object",
		className: "relative overflow-hidden py-24 md:py-40",
		children: [/* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			className: "bg-type absolute -right-10 top-8 text-[24vw] opacity-[0.03]",
			children: padNumber(index + 1)
		}), /* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-[1600px] items-center gap-12 px-5 md:grid-cols-12 md:gap-6 md:px-10",
			children: [/* @__PURE__ */ jsxs(motion.div, {
				...imageAnim,
				viewport: {
					once: true,
					amount: .3
				},
				transition: {
					duration: 1.1,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "relative md:col-span-7",
				children: [/* @__PURE__ */ jsxs(Link, {
					to: "/products/$slug",
					params: { slug: product.slug },
					"data-cursor": "view",
					"aria-label": `View ${product.name}`,
					className: "group relative block",
					children: [/* @__PURE__ */ jsx("div", {
						className: "border border-border bg-paper shadow-[var(--shadow-frame-lg)]",
						children: /* @__PURE__ */ jsx("div", {
							className: "aspect-[4/5] overflow-hidden md:aspect-[5/6]",
							children: /* @__PURE__ */ jsx(ProductImage, {
								image: product.images[0] ?? {
									id: "",
									url: product.primaryImage ?? "",
									alt: product.name,
									order: 0
								},
								priority: true,
								objectFit: "cover",
								sizes: "(max-width: 768px) 100vw, 60vw",
								className: "transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
							})
						})
					}), /* @__PURE__ */ jsx("div", {
						"aria-hidden": "true",
						className: "pointer-events-none absolute -bottom-6 -left-6 -z-10 h-full w-full border border-border/60"
					})]
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-meta mt-4 text-muted",
					children: [
						"Fig. ",
						padNumber(index + 1),
						" — featured object"
					]
				})]
			}), /* @__PURE__ */ jsxs(motion.div, {
				...textAnim,
				viewport: {
					once: true,
					amount: .3
				},
				transition: {
					duration: .9,
					delay: .15,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "md:col-span-4 md:col-start-9",
				children: [
					/* @__PURE__ */ jsx(Reveal, {
						direction: "none",
						delay: .1,
						children: /* @__PURE__ */ jsx("p", {
							className: "text-meta text-accent",
							children: "Featured object"
						})
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "font-display text-display-md mt-4 leading-[0.95]",
						children: product.name
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4 flex items-center gap-4 text-meta text-muted",
						children: [/* @__PURE__ */ jsx("span", {
							title: "Category",
							children: product.category
						}), /* @__PURE__ */ jsx("span", {
							className: "text-accent",
							children: availabilityLabel(product.availability)
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 max-w-md text-sm leading-relaxed text-foreground-secondary",
						children: product.shortDescription
					}),
					/* @__PURE__ */ jsx("p", {
						className: "font-display mt-8 text-3xl",
						children: formatPrice(product.price, product.currency)
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex flex-wrap items-center gap-4",
						children: [/* @__PURE__ */ jsx(BuyButton, {
							href: product.buyUrl,
							sellerName: product.sellerName
						}), /* @__PURE__ */ jsx(Link, {
							to: "/products/$slug",
							params: { slug: product.slug },
							className: "text-meta link-underline-hover text-foreground-secondary transition-colors hover:text-foreground",
							children: "View object →"
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
//#region src/components/home/EditorialStatement.tsx
function EditorialStatement() {
	const reduced = useReducedMotion$1();
	const words = "Objects are not just things.".split(" ");
	return /* @__PURE__ */ jsxs("section", {
		id: "about",
		"aria-label": "Editorial statement",
		className: "relative overflow-hidden py-32 md:py-56",
		children: [/* @__PURE__ */ jsx(ScrollParallax, {
			speed: .08,
			children: /* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				className: "bg-type absolute left-0 top-1/2 -translate-y-1/2 text-[30vw] opacity-[0.035]",
				children: "Matter"
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative mx-auto max-w-5xl px-5 md:px-10",
			children: [
				/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("p", {
					className: "text-meta text-muted",
					children: "Section 03 — Statement"
				}) }),
				/* @__PURE__ */ jsx("h2", {
					className: "font-display mt-10 text-display-lg leading-[0.92]",
					children: words.map((word, i) => /* @__PURE__ */ jsx(motion.span, {
						className: "mr-[0.35em] inline-block",
						initial: reduced ? { opacity: 0 } : {
							opacity: 0,
							y: 50,
							rotate: 2
						},
						whileInView: {
							opacity: 1,
							y: 0,
							rotate: 0
						},
						viewport: {
							once: true,
							amount: .6
						},
						transition: {
							duration: .7,
							delay: i * .08,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						children: word === "not" || word === "things." ? /* @__PURE__ */ jsx("span", {
							className: "text-accent",
							children: word
						}) : word
					}, `${word}-${i}`))
				}),
				/* @__PURE__ */ jsx(Reveal, {
					delay: .3,
					children: /* @__PURE__ */ jsx("p", {
						className: "mt-12 max-w-xl text-base leading-relaxed text-foreground-secondary",
						children: "Objects carry the traces of the hands, places and moments that shaped them. The collection gathers those traces — carved, cast, thrown and worn — and puts each one exactly where it deserves to stand: alone, in the light, at full scale."
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-16 flex items-center gap-6",
					children: [/* @__PURE__ */ jsx("span", {
						className: "h-px w-24 bg-foreground/40",
						"aria-hidden": "true"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-meta text-muted",
						children: "Editorial — Vol. I / Matter"
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/home/ArchivePreview.tsx
/**
* A ruled index of the archive — rows, not cards. Hovering a row reveals
* a floating thumbnail, like flipping through a paper catalogue.
*/
function ArchivePreview({ products }) {
	return /* @__PURE__ */ jsx("section", {
		"aria-label": "Collection preview",
		className: "relative py-24 md:py-40",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1600px] px-5 md:px-10",
			children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
				className: "mb-14 flex items-end justify-between",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "font-display text-display-lg",
					children: "Collection"
				}), /* @__PURE__ */ jsxs("p", {
					className: "text-meta text-muted",
					children: [products.length, " products"]
				})]
			}) }), /* @__PURE__ */ jsx(Stagger, { children: /* @__PURE__ */ jsx("ul", { children: products.map((p, i) => /* @__PURE__ */ jsx(motion.li, {
				variants: staggerItem,
				className: "group border-t border-border/50 last:border-b",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/products/$slug",
					params: { slug: p.slug },
					"data-cursor": "view",
					className: "relative grid grid-cols-12 items-center gap-4 py-6 transition-colors md:py-8",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "text-meta col-span-2 text-muted md:col-span-1",
							children: padNumber(i + 1)
						}),
						/* @__PURE__ */ jsx("span", {
							className: "font-display col-span-8 text-xl tracking-wide transition-transform duration-300 group-hover:translate-x-3 md:col-span-5 md:text-3xl",
							children: p.name
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-meta col-span-4 hidden text-foreground-secondary md:col-span-3 md:block",
							children: p.category
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-meta col-span-2 hidden text-right md:col-span-2 md:block",
							children: formatPrice(p.price, p.currency)
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-meta col-span-2 text-right text-muted transition-transform duration-300 group-hover:-translate-x-2 md:col-span-1",
							children: "↗"
						}),
						/* @__PURE__ */ jsx("div", {
							"aria-hidden": "true",
							className: "pointer-events-none absolute right-[18%] top-1/2 z-30 hidden w-44 -translate-y-1/2 rotate-2 border border-border bg-paper opacity-0 shadow-[var(--shadow-frame)] transition-all duration-300 group-hover:rotate-0 group-hover:opacity-100 lg:block",
							children: /* @__PURE__ */ jsx(ProductImage, {
								image: p.images[0] ?? {
									id: "",
									url: p.primaryImage ?? "",
									alt: p.name,
									order: 0
								},
								objectFit: "cover",
								sizes: "220px"
							})
						})
					]
				})
			}, p.id)) }) })]
		})
	});
}
//#endregion
//#region src/components/home/FinalCTA.tsx
function FinalCTA() {
	return /* @__PURE__ */ jsx("section", {
		"aria-label": "Enter the collection",
		className: "relative overflow-hidden py-32 md:py-48",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1600px] px-5 text-center md:px-10",
			children: [
				/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("p", {
					className: "text-meta text-muted",
					children: "The exhibition is open"
				}) }),
				/* @__PURE__ */ jsx(Reveal, {
					delay: .1,
					children: /* @__PURE__ */ jsxs("h2", {
						className: "font-display mx-auto mt-6 max-w-5xl text-display-xl leading-[0.88]",
						children: [
							"Enter the",
							/* @__PURE__ */ jsx("br", {}),
							/* @__PURE__ */ jsx("span", {
								className: "text-accent",
								children: "collection"
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(Reveal, {
					delay: .25,
					children: /* @__PURE__ */ jsxs("div", {
						className: "mt-14 flex items-center justify-center gap-4",
						children: [/* @__PURE__ */ jsx(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/collection",
								"data-cursor": "view",
								children: ["Browse all objects ", /* @__PURE__ */ jsx(ArrowRight, { "aria-hidden": "true" })]
							})
						}), /* @__PURE__ */ jsx(Button, {
							asChild: true,
							variant: "outline",
							size: "lg",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/admin",
								children: "Curator login"
							})
						})]
					})
				})
			]
		})
	});
}
//#endregion
//#region src/components/products/EditorialProductGrid.tsx
/**
* Six alternating hanging patterns produce an asymmetric, gallery-hung
* layout — configuration is generated from the product index, never
* hardcoded per product in JSX.
*/
var PATTERNS = [
	{
		size: "large",
		rotation: -1.2,
		depth: .7,
		speed: .35,
		place: "md:col-start-1 md:col-span-7",
		mobileShift: "-ml-2"
	},
	{
		size: "small",
		rotation: 2,
		depth: .4,
		speed: .6,
		place: "md:col-start-9 md:col-span-4",
		mobileShift: "ml-6"
	},
	{
		size: "medium",
		rotation: .8,
		depth: .55,
		speed: .45,
		place: "md:col-start-3 md:col-span-5",
		mobileShift: "-ml-4"
	},
	{
		size: "large",
		rotation: 1.6,
		depth: .65,
		speed: .3,
		place: "md:col-start-6 md:col-span-7",
		mobileShift: "ml-3"
	},
	{
		size: "medium",
		rotation: -2.2,
		depth: .5,
		speed: .5,
		place: "md:col-start-1 md:col-span-5",
		mobileShift: "ml-8"
	},
	{
		size: "small",
		rotation: 1,
		depth: .35,
		speed: .65,
		place: "md:col-start-8 md:col-span-4",
		mobileShift: "-ml-3"
	}
];
var MAX_W = {
	large: 560,
	medium: 420,
	small: 310
};
function EditorialProductGrid({ products, className }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("grid grid-cols-2 gap-x-6 gap-y-20 md:grid-cols-12 md:gap-x-10 md:gap-y-8", className),
		children: products.map((product, i) => {
			const cfg = PATTERNS[i % PATTERNS.length];
			return /* @__PURE__ */ jsx(ParallaxItem, {
				as: "article",
				depth: cfg.depth,
				speed: cfg.speed,
				scrollRotation: cfg.rotation / 2,
				className: cn("col-span-2", cfg.place),
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto w-full",
					style: { maxWidth: MAX_W[cfg.size] },
					children: [/* @__PURE__ */ jsx("div", {
						style: { transform: `rotate(${cfg.rotation}deg)` },
						children: /* @__PURE__ */ jsx(ProductCard, {
							product,
							index: i,
							size: cfg.size
						})
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-meta mt-3 text-muted",
						children: ["No. ", padNumber(i + 1)]
					})]
				})
			}, product.id);
		})
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
function Home() {
	const { featured, all } = Route.useLoaderData();
	const hero = [...featured, ...all.filter((p) => !featured.includes(p))].slice(0, 6);
	const main = featured[0] ?? all[0];
	const second = featured[1] ?? all[1];
	const preview = all.slice(0, 8);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Hero, { products: hero }),
		main && /* @__PURE__ */ jsx(FeaturedProduct, {
			product: main,
			index: 0
		}),
		/* @__PURE__ */ jsx(EditorialStatement, {}),
		/* @__PURE__ */ jsx("section", {
			"aria-label": "Collection preview",
			className: "py-24 md:py-32",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[1600px] px-5 md:px-10",
				children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", {
					className: "mb-20 flex items-end justify-between",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-display text-display-lg",
						children: "Collection"
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-meta text-muted",
						children: [second ? "Selected works" : "Selected works", " / 04"]
					})]
				}) }), /* @__PURE__ */ jsx(EditorialProductGrid, { products: all.slice(2, 6) })]
			})
		}),
		second && /* @__PURE__ */ jsx(FeaturedProduct, {
			product: second,
			index: 1
		}),
		/* @__PURE__ */ jsx(ArchivePreview, { products: preview }),
		/* @__PURE__ */ jsx(FinalCTA, {})
	] });
}
//#endregion
export { Home as component };

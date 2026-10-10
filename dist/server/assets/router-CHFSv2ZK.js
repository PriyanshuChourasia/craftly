import { n as cn } from "./schema-DYDO5Lmu.js";
import { i as NotFoundState, n as ErrorState, r as LoadingState } from "./States-DOwWWYxv.js";
import { a as fetchFacets, c as fetchProductBySlug, i as fetchAdminStats, l as fetchProducts, o as fetchFeaturedProducts, s as fetchProductById, u as fetchPublishedProducts } from "./api-zfJ_Y2L0.js";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent, notFound, useLocation } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Toaster } from "sonner";
import { gsap, gsap as gsap$1 } from "gsap";
import { ScrollTrigger, ScrollTrigger as ScrollTrigger$1 } from "gsap/ScrollTrigger";
import { createPortal } from "react-dom";
import Lenis from "lenis";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/components/parallax/ParallaxProvider.tsx
var ParallaxContext = createContext({
	subscribe: () => () => {},
	enabled: false
});
function useParallaxContext() {
	return useContext(ParallaxContext);
}
/**
* Owns the single rAF loop that drives all mouse parallax.
* Mouse target → smoothed current (lerp), then each registered element
* receives a transform. No React re-renders during pointer movement.
*/
function ParallaxProvider({ children }) {
	const subscribers = useRef(/* @__PURE__ */ new Set());
	const enabled = useRef(false);
	const [, force] = useState(0);
	useEffect(() => {
		const fine = window.matchMedia("(pointer: fine)").matches;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const mobile = window.matchMedia("(max-width: 767px)").matches;
		enabled.current = fine && !reduced && !mobile;
		force((n) => n + 1);
		if (!enabled.current) return;
		let targetX = 0;
		let targetY = 0;
		let curX = 0;
		let curY = 0;
		let raf = 0;
		const onMove = (e) => {
			targetX = e.clientX / window.innerWidth * 2 - 1;
			targetY = e.clientY / window.innerHeight * 2 - 1;
		};
		const tick = () => {
			curX += (targetX - curX) * .06;
			curY += (targetY - curY) * .06;
			for (const s of subscribers.current) {
				const x = curX * s.strength;
				const y = curY * s.strength;
				const rot = s.rotate ? ` rotateY(${curX * s.rotate}deg) rotateX(${curY * -s.rotate}deg)` : "";
				s.el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)${rot}`;
			}
			raf = requestAnimationFrame(tick);
		};
		window.addEventListener("mousemove", onMove, { passive: true });
		raf = requestAnimationFrame(tick);
		return () => {
			window.removeEventListener("mousemove", onMove);
			cancelAnimationFrame(raf);
			for (const s of subscribers.current) s.el.style.transform = "";
		};
	}, []);
	const value = useMemo(() => ({
		subscribe: (s) => {
			subscribers.current.add(s);
			return () => subscribers.current.delete(s);
		},
		enabled: enabled.current
	}), []);
	return /* @__PURE__ */ jsx(ParallaxContext.Provider, {
		value,
		children
	});
}
//#endregion
//#region src/components/parallax/ParallaxItem.tsx
gsap.registerPlugin(ScrollTrigger);
/**
* Composite parallax element.
* Outer wrapper: GSAP ScrollTrigger scrub (translateY/rotation from scroll).
* Inner wrapper: registered with ParallaxProvider (mouse-driven transform).
*/
function ParallaxItem({ children, depth = .5, speed = .3, rotation = 0, rotate3d = 0, offsetX = 0, offsetY = 0, scale = 1, scrollRotation = 0, className, style, as = "div" }) {
	const scrollRef = useRef(null);
	const mouseRef = useRef(null);
	const { subscribe, enabled } = useParallaxContext();
	useEffect(() => {
		if (!enabled || !mouseRef.current || depth === 0) return;
		return subscribe({
			el: mouseRef.current,
			depth,
			strength: depth * 34,
			rotate: rotate3d * depth
		});
	}, [
		enabled,
		subscribe,
		depth,
		rotate3d
	]);
	useEffect(() => {
		const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const el = scrollRef.current;
		if (!el || reduced || speed === 0) return;
		const yDistance = speed * -140;
		const rotationFrom = rotation + scrollRotation;
		const rotationTo = rotation - scrollRotation;
		const ctx = gsap.context(() => {
			gsap.fromTo(el, {
				y: yDistance,
				rotate: rotationFrom
			}, {
				y: -yDistance,
				rotate: rotationTo,
				ease: "none",
				scrollTrigger: {
					trigger: el,
					start: "top bottom",
					end: "bottom top",
					scrub: 1.2
				}
			});
		}, el);
		return () => ctx.revert();
	}, [
		speed,
		rotation,
		scrollRotation
	]);
	return /* @__PURE__ */ jsx(as, {
		ref: scrollRef,
		className: cn("will-change-transform", className),
		style: {
			transform: `rotate(${rotation}deg)`,
			...style
		},
		children: /* @__PURE__ */ jsx("div", {
			ref: mouseRef,
			className: "preserve-3d h-full w-full",
			style: {
				transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale})`,
				willChange: enabled && depth > 0 ? "transform" : void 0
			},
			children
		})
	});
}
//#endregion
//#region src/components/parallax/FloatingObject.tsx
/** Scroll-only parallax (no mouse transform). */
function ScrollParallax({ children, speed = .3, scrollRotation = 0, className }) {
	return /* @__PURE__ */ jsx(ParallaxItem, {
		depth: 0,
		speed,
		scrollRotation,
		className,
		children
	});
}
//#endregion
//#region src/components/cursor/CustomCursor.tsx
var LABELS = {
	default: null,
	view: "VIEW",
	buy: "BUY",
	open: "OPEN",
	link: null
};
function attrMode(el) {
	if (!el) return "default";
	const target = el.closest("[data-cursor]");
	if (target) return target.dataset.cursor || "default";
	if (el.closest("a, button, [role=\"button\"]")) return "link";
	return "default";
}
/**
* Two-layer cursor: an instant dot and a lerped follower ring that grows
* and shows a label over interactive targets.
* Desktop (fine pointer) only, disabled with prefers-reduced-motion.
*/
function CustomCursor() {
	const dotRef = useRef(null);
	const followerRef = useRef(null);
	const [label, setLabel] = useState("default");
	const [active, setActive] = useState(false);
	useEffect(() => {
		if (!(window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !window.matchMedia("(max-width: 1023px)").matches)) return;
		document.documentElement.classList.add("has-custom-cursor");
		setActive(true);
		let tx = window.innerWidth / 2;
		let ty = window.innerHeight / 2;
		let fx = tx;
		let fy = ty;
		let raf = 0;
		const onMove = (e) => {
			tx = e.clientX;
			ty = e.clientY;
			if (dotRef.current) dotRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
			const mode = attrMode(e.target);
			setLabel(mode);
		};
		const tick = () => {
			fx += (tx - fx) * .16;
			fy += (ty - fy) * .16;
			if (followerRef.current) followerRef.current.style.transform = `translate3d(${fx}px, ${fy}px, 0)`;
			raf = requestAnimationFrame(tick);
		};
		const onLeave = () => document.documentElement.classList.remove("has-custom-cursor");
		const onEnter = () => document.documentElement.classList.add("has-custom-cursor");
		window.addEventListener("mousemove", onMove, { passive: true });
		document.addEventListener("mouseleave", onLeave);
		document.addEventListener("mouseenter", onEnter);
		raf = requestAnimationFrame(tick);
		return () => {
			document.documentElement.classList.remove("has-custom-cursor");
			window.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseleave", onLeave);
			document.removeEventListener("mouseenter", onEnter);
			cancelAnimationFrame(raf);
		};
	}, []);
	if (!active) return null;
	const big = label !== "default" && label !== "link";
	return createPortal(/* @__PURE__ */ jsxs("div", {
		"aria-hidden": "true",
		className: "pointer-events-none fixed inset-0 z-[90] hidden lg:block",
		children: [/* @__PURE__ */ jsx("div", {
			ref: followerRef,
			className: "absolute left-0 top-0 will-change-transform",
			children: /* @__PURE__ */ jsx("div", {
				className: "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-out",
				style: {
					width: big ? 64 : 32,
					height: big ? 64 : 32,
					borderColor: big ? "transparent" : "rgba(17,17,17,0.35)",
					backgroundColor: big ? "rgba(17,17,17,0.92)" : "transparent"
				},
				children: /* @__PURE__ */ jsx("span", {
					className: "font-mono text-[9px] tracking-[0.18em] text-[#f3ecea] opacity-0 transition-opacity duration-200",
					style: { opacity: big ? 1 : 0 },
					children: LABELS[label]
				})
			})
		}), /* @__PURE__ */ jsx("div", {
			ref: dotRef,
			className: "absolute left-0 top-0 will-change-transform",
			children: /* @__PURE__ */ jsx("div", {
				className: "-translate-x-1/2 -translate-y-1/2 rounded-full bg-[#111] transition-opacity duration-200",
				style: {
					width: 6,
					height: 6,
					opacity: big ? 0 : 1
				}
			})
		})]
	}), document.body);
}
//#endregion
//#region src/lib/animations/gsap.ts
gsap$1.registerPlugin(ScrollTrigger$1);
var lenis = null;
/** Start Lenis smooth scrolling wired into GSAP's ticker. Idempotent. */
function initSmoothScroll() {
	if (typeof window === "undefined") return null;
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
	if (lenis) return lenis;
	lenis = new Lenis({
		duration: 1.1,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true
	});
	lenis.on("scroll", ScrollTrigger$1.update);
	const raf = (time) => lenis?.raf(time * 1e3);
	gsap$1.ticker.add(raf);
	gsap$1.ticker.lagSmoothing(0);
	return lenis;
}
function getLenis() {
	return lenis;
}
//#endregion
//#region src/components/layout/Header.tsx
var NAV = [
	{
		label: "About",
		href: "/#about",
		center: false
	},
	{
		label: "Shop",
		href: "/collection",
		center: false
	},
	{
		label: "Collection",
		href: "/collection",
		center: false
	},
	{
		label: "Categories",
		href: "/collection#categories",
		center: false
	},
	{
		label: "Contact",
		href: "/#contact",
		right: true
	}
];
function scrollToAnchor(hash) {
	const lenis = getLenis();
	const el = document.querySelector(hash);
	if (!el) return;
	if (lenis) lenis.scrollTo(el, {
		offset: 0,
		duration: 1.4
	});
	else el.scrollIntoView({ behavior: "smooth" });
}
/**
* Compact fixed navigation. Handles `/#anchor` links by smooth-scrolling
* when already on the home route, otherwise navigating first.
*/
function Header({ compact = false }) {
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();
	useEffect(() => {
		if (compact) return;
		const onScroll = () => setScrolled(window.scrollY > 80);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [compact]);
	const showBar = compact || scrolled;
	const handleNav = (e, href) => {
		if (href.startsWith("/#")) {
			const hash = href.slice(1);
			if (location.pathname === "/") {
				e.preventDefault();
				scrollToAnchor(hash);
			} else {
				e.preventDefault();
				window.location.hash = "";
				window.history.pushState(null, "", href);
				requestAnimationFrame(() => scrollToAnchor(hash));
			}
		}
	};
	return /* @__PURE__ */ jsx(AnimatePresence, { children: showBar && /* @__PURE__ */ jsx(motion.header, {
		initial: {
			y: -60,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		exit: {
			y: -60,
			opacity: 0
		},
		transition: {
			duration: .45,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-sm",
		children: /* @__PURE__ */ jsxs("nav", {
			"aria-label": "Main",
			className: "mx-auto grid max-w-[1600px] grid-cols-3 items-center px-5 py-4 md:px-10",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex items-center gap-6",
					children: NAV.filter((n) => !n.center && !n.right).map((n) => /* @__PURE__ */ jsx(NavLink, {
						...n,
						onClick: handleNav
					}, n.label))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/",
						className: "font-display text-lg leading-none tracking-tight",
						"aria-label": "SB Creation",
						children: ["SB ", /* @__PURE__ */ jsx("span", {
							title: "SB creation",
							children: "Creation"
						})]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-end gap-6",
					children: NAV.filter((n) => n.right).map((n) => /* @__PURE__ */ jsx(NavLink, {
						...n,
						onClick: handleNav
					}, n.label))
				})
			]
		})
	}) });
}
function NavLink({ label, href, onClick, className }) {
	return /* @__PURE__ */ jsx(Link, {
		to: href,
		onClick: (e) => onClick?.(e, href),
		className: cn("text-meta link-underline-hover text-foreground-secondary transition-colors hover:text-foreground", className),
		children: label
	});
}
//#endregion
//#region src/components/layout/Footer.tsx
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		id: "contact",
		className: "relative overflow-hidden border-t border-border/60",
		children: [/* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			className: "bg-type pointer-events-none absolute -bottom-[18vw] left-1/2 -translate-x-1/2 text-[46vw] opacity-[0.05]",
			children: "O"
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative mx-auto max-w-[1600px] px-5 pb-10 pt-20 md:px-10 md:pt-28",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid gap-12 md:grid-cols-12",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "md:col-span-5",
						children: [/* @__PURE__ */ jsx("p", {
							className: "font-display text-display-md",
							children: "Shobhanjana"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-meta mt-3 text-muted",
							children: "A digital creation studio — shop and collection."
						})]
					}),
					/* @__PURE__ */ jsxs("nav", {
						className: "md:col-span-3",
						"aria-label": "Footer",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-meta mb-5 text-muted",
							children: "Index"
						}), /* @__PURE__ */ jsxs("ul", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
									to: "/",
									className: "link-underline-hover text-sm",
									children: "About"
								}) }),
								/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
									to: "/collection",
									className: "link-underline-hover text-sm",
									children: "Collection"
								}) }),
								/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
									to: "/collection",
									className: "link-underline-hover text-sm",
									children: "Archive"
								}) })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-meta mb-5 text-muted",
							children: "Elsewhere"
						}), /* @__PURE__ */ jsxs("ul", {
							className: "space-y-3",
							children: [/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
								href: "https://instagram.com",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "link-underline-hover inline-flex items-center gap-1 text-sm",
								children: ["Instagram ", /* @__PURE__ */ jsx("span", {
									"aria-hidden": "true",
									children: "↗"
								})]
							}) }), /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
								href: "https://example.com/store",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "link-underline-hover inline-flex items-center gap-1 text-sm",
								children: ["Store ", /* @__PURE__ */ jsx("span", {
									"aria-hidden": "true",
									children: "↗"
								})]
							}) })]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-meta mb-5 text-muted",
							children: "Coordinates"
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-meta leading-loose text-foreground-secondary",
							children: [
								"43°12'08\" N",
								/* @__PURE__ */ jsx("br", {}),
								"5°32'37\" E",
								/* @__PURE__ */ jsx("br", {}),
								"Archive / 2026"
							]
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-20 flex flex-wrap items-end justify-between gap-4 border-t border-border/40 pt-6",
				children: [
					"            ",
					/* @__PURE__ */ jsx("p", {
						className: "text-meta text-muted",
						children: "© SB Creation"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-meta text-muted",
						children: "No. 07 — Edition of one"
					})
				]
			})]
		})]
	});
}
//#endregion
//#region src/components/layout/LoadingScreen.tsx
/**
* Short exhibition loading experience. Tracks real readiness
* (window load + document fonts), with a 600ms floor and a hard 1500ms cap.
*/
function LoadingScreen() {
	const [progress, setProgress] = useState(0);
	const [done, setDone] = useState(false);
	const reduced = useReducedMotion();
	useEffect(() => {
		const start = performance.now();
		const MIN = 600;
		const MAX = 1500;
		let cancelled = false;
		const fontsReady = document.fonts?.ready ?? Promise.resolve();
		const windowReady = new Promise((resolve) => {
			if (document.readyState === "complete") resolve();
			else window.addEventListener("load", () => resolve(), { once: true });
		});
		const crawl = setInterval(() => {
			setProgress((p) => Math.min(92, p + Math.random() * 18));
		}, 120);
		Promise.all([fontsReady, windowReady]).then(() => {
			const elapsed = performance.now() - start;
			const wait = Math.max(0, MIN - elapsed);
			setTimeout(() => {
				if (cancelled) return;
				clearInterval(crawl);
				setProgress(100);
				setTimeout(() => !cancelled && setDone(true), 250);
			}, wait);
		});
		setTimeout(() => {
			if (cancelled) return;
			clearInterval(crawl);
			setProgress(100);
			setDone(true);
		}, MAX);
		return () => {
			cancelled = true;
			clearInterval(crawl);
		};
	}, []);
	return /* @__PURE__ */ jsx(AnimatePresence, { children: !done && /* @__PURE__ */ jsxs(motion.div, {
		className: "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background",
		initial: { opacity: 1 },
		exit: reduced ? { opacity: 0 } : {
			opacity: 0,
			scale: 1.04
		},
		transition: {
			duration: .6,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		"aria-hidden": done,
		role: "status",
		"aria-label": "Loading the collection",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-meta text-muted",
				children: "Shobhanjana Creation"
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-display-lg mt-2",
				children: "Objects"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-8 w-72",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between text-meta text-muted",
					children: [/* @__PURE__ */ jsx("span", { children: "Loading collection" }), /* @__PURE__ */ jsxs("span", { children: [Math.round(progress), "%"] })]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-2 h-[3px] w-full bg-foreground/10",
					children: /* @__PURE__ */ jsx("div", {
						className: "h-full bg-foreground transition-[width] duration-200 ease-out",
						style: { width: `${progress}%` }
					})
				})]
			})
		]
	}) });
}
//#endregion
//#region src/routes/__root.tsx
var Route$8 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "OBJECTS — A Digital Exhibition" },
			{
				name: "description",
				content: "A digital exhibition of carefully curated objects. Browse, filter and explore a 3D product showroom."
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap"
			}
		]
	}),
	component: RootComponent,
	notFoundComponent: () => /* @__PURE__ */ jsx(NotFoundState, {
		code: "404",
		title: "Page not found",
		description: "This room of the archive does not exist."
	}),
	errorComponent: ({ error }) => /* @__PURE__ */ jsx(ErrorState, { description: error instanceof Error ? error.message : void 0 })
});
function RootComponent() {
	const location = useLocation();
	const isAdmin = location.pathname.startsWith("/admin");
	const reduced = useReducedMotion();
	useEffect(() => {
		initSmoothScroll();
	}, []);
	return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsxs(ParallaxProvider, { children: [
		/* @__PURE__ */ jsx(LoadingScreen, {}),
		/* @__PURE__ */ jsx(CustomCursor, {}),
		!isAdmin && /* @__PURE__ */ jsx(Header, {}),
		/* @__PURE__ */ jsx(AnimatePresence, {
			mode: "wait",
			initial: false,
			children: /* @__PURE__ */ jsx(motion.main, {
				initial: reduced ? { opacity: 0 } : {
					opacity: 0,
					y: 24
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: reduced ? { opacity: 0 } : {
					opacity: 0,
					y: -16
				},
				transition: {
					duration: .45,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				children: /* @__PURE__ */ jsx(Outlet, {})
			}, location.pathname)
		}),
		!isAdmin && /* @__PURE__ */ jsx(Footer, {}),
		/* @__PURE__ */ jsx(Toaster, {
			position: "bottom-right",
			theme: "light"
		})
	] }) });
}
function RootDocument({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", {
			className: "bg-background text-foreground antialiased",
			children: [children, /* @__PURE__ */ jsx(Scripts, {})]
		})]
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$7 = () => import("./routes-jg-tDcGS.js");
var Route$7 = createFileRoute("/")({
	loader: async () => {
		const [featured, all] = await Promise.all([fetchFeaturedProducts(), fetchPublishedProducts()]);
		return {
			featured,
			all
		};
	},
	head: () => ({
		meta: [{ title: "SB Creation — A Digital Creation Studio" }, {
			name: "description",
			content: "A digital creation studio. Explore the collection — furniture, ceramic, lighting, art and objects."
		}],
		links: [{
			rel: "canonical",
			href: "https://shobhanjana.example.com/"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
//#endregion
//#region src/routes/admin/route.tsx
var $$splitComponentImporter$6 = () => import("./route-CBgsSwKr.js");
var Route$6 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
//#endregion
//#region src/routes/collection.tsx
var $$splitComponentImporter$5 = () => import("./collection-CCoFVmhR.js");
var Route$5 = createFileRoute("/collection")({
	validateSearch: (search) => {
		const num = (v) => {
			const n = Number(v);
			return v !== void 0 && v !== "" && Number.isFinite(n) ? n : void 0;
		};
		return {
			q: typeof search.q === "string" ? search.q : void 0,
			category: typeof search.category === "string" ? search.category : void 0,
			brand: typeof search.brand === "string" ? search.brand : void 0,
			min: num(search.min),
			max: num(search.max),
			availability: typeof search.availability === "string" ? search.availability : void 0,
			view: typeof search.view === "string" ? search.view : void 0
		};
	},
	loader: async () => {
		const [products, facets] = await Promise.all([fetchPublishedProducts(), fetchFacets()]);
		return {
			products,
			facets
		};
	},
	head: () => ({
		meta: [{ title: "Collection — SB Creation" }, {
			name: "description",
			content: "Browse the collection. Filter by category, brand, material, color, availability and price."
		}],
		links: [{
			rel: "canonical",
			href: "https://shobhanjana.example.com/collection"
		}]
	}),
	pendingComponent: () => /* @__PURE__ */ jsx(LoadingState, { label: "Loading collection" }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/admin/index.tsx
var $$splitComponentImporter$4 = () => import("./admin-BLLXJjj-.js");
var Route$4 = createFileRoute("/admin/")({
	loader: () => fetchAdminStats(),
	head: () => ({ meta: [{ title: "Dashboard — OBJECTS Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/products.$slug.tsx
var $$splitComponentImporter$3 = () => import("./products._slug-Dqc_rrrn.js");
var $$splitNotFoundComponentImporter = () => import("./products._slug-BxqMB4Ip.js");
var Route$3 = createFileRoute("/products/$slug")({
	loader: async ({ params }) => {
		const product = await fetchProductBySlug({ data: params.slug });
		if (!product) throw notFound();
		return {
			product,
			related: (await fetchPublishedProducts()).filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3)
		};
	},
	head: ({ match }) => {
		const product = match.loaderData?.product;
		if (!product) return { meta: [{ title: "Object not found — OBJECTS" }] };
		const title = product.seo?.metaTitle || `${product.name} — OBJECTS`;
		const description = product.seo?.metaDescription || product.shortDescription || product.description.slice(0, 150);
		const image = product.seo?.ogImage || product.primaryImage;
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: description
				},
				{
					property: "og:title",
					content: title
				},
				{
					property: "og:description",
					content: description
				},
				{
					property: "og:image",
					content: image
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				}
			],
			links: [{
				rel: "canonical",
				href: `https://objects.example.com/products/${product.slug}`
			}]
		};
	},
	pendingComponent: () => /* @__PURE__ */ jsx(LoadingState, { label: "Loading object" }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/admin/products.index.tsx
var $$splitComponentImporter$2 = () => import("./products.index-VxIZmHsY.js");
var Route$2 = createFileRoute("/admin/products/")({
	loader: () => fetchProducts(),
	head: () => ({ meta: [{ title: "Products — OBJECTS Admin" }] }),
	pendingComponent: () => /* @__PURE__ */ jsx(LoadingState, { label: "Loading archive" }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/admin/products.new.tsx
var $$splitComponentImporter$1 = () => import("./products.new-Dd0vsaxx.js");
var Route$1 = createFileRoute("/admin/products/new")({
	head: () => ({ meta: [{ title: "New product — OBJECTS Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/admin/products.$id.edit.tsx
var $$splitComponentImporter = () => import("./products._id.edit-CwTwx9R3.js");
var Route = createFileRoute("/admin/products/$id/edit")({
	loader: async ({ params }) => {
		const product = await fetchProductById({ data: params.id });
		if (!product) throw notFound();
		return { product };
	},
	head: ({ match }) => {
		const product = match.loaderData;
		return { meta: [{ title: product ? `${product.product.name} — OBJECTS Admin` : "Edit — OBJECTS Admin" }] };
	},
	pendingComponent: () => /* @__PURE__ */ jsx(LoadingState, { label: "Loading object" }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var AdminRouteRoute = Route$6.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$8
});
var CollectionRoute = Route$5.update({
	id: "/collection",
	path: "/collection",
	getParentRoute: () => Route$8
});
var AdminIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRouteRoute
});
var ProductsSlugRoute = Route$3.update({
	id: "/products/$slug",
	path: "/products/$slug",
	getParentRoute: () => Route$8
});
var AdminProductsIndexRoute = Route$2.update({
	id: "/products/",
	path: "/products/",
	getParentRoute: () => AdminRouteRoute
});
var AdminRouteRouteChildren = {
	AdminIndexRoute,
	AdminProductsNewRoute: Route$1.update({
		id: "/products/new",
		path: "/products/new",
		getParentRoute: () => AdminRouteRoute
	}),
	AdminProductsIndexRoute,
	AdminProductsIdEditRoute: Route.update({
		id: "/products/$id/edit",
		path: "/products/$id/edit",
		getParentRoute: () => AdminRouteRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AdminRouteRoute: AdminRouteRoute._addFileChildren(AdminRouteRouteChildren),
	CollectionRoute,
	ProductsSlugRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent"
	});
}
//#endregion
export { Route$4 as a, ScrollParallax as c, getRouter, Route$3 as i, ParallaxItem as l, Route as n, Route$5 as o, Route$2 as r, Route$7 as s, router_exports as t };

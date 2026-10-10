import { t as Button } from "./button-ChKKm0vb.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/states/States.tsx
function LoadingState({ label = "Loading object" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-[60vh] flex-col items-center justify-center gap-6",
		role: "status",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "font-display text-display-md animate-pulse",
				children: label
			}),
			/* @__PURE__ */ jsx("div", {
				className: "h-px w-40 overflow-hidden bg-border/50",
				children: /* @__PURE__ */ jsx("div", { className: "h-full w-1/3 animate-[loading-slide_1.2s_ease-in-out_infinite] bg-foreground" })
			}),
			/* @__PURE__ */ jsx("style", { children: `@keyframes loading-slide { 0% { transform: translateX(-100%);} 100% { transform: translateX(400%);} }` })
		]
	});
}
function EmptyState({ label = "Nothing on display" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-[40vh] flex-col items-center justify-center gap-4 py-24 text-center",
		children: [/* @__PURE__ */ jsx("p", {
			className: "font-display text-display-md text-foreground/25",
			children: "Empty"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-meta text-muted",
			children: label
		})]
	});
}
function NotFoundState({ code = "404", title = "Object not found", description = "The object you're looking for has left the collection." }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center",
		children: [
			/* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				className: "bg-type absolute inset-0 flex items-center justify-center text-[38vw]",
				children: code
			}),
			"            ",
			/* @__PURE__ */ jsxs("p", {
				className: "text-meta relative text-muted",
				children: [code, " — Collection"]
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-display-lg relative mt-4",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "relative mt-4 max-w-md text-sm text-foreground-secondary",
				children: description
			}),
			/* @__PURE__ */ jsx(Button, {
				asChild: true,
				size: "lg",
				className: "relative mt-10",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/collection",
					children: "Return to collection"
				})
			})
		]
	});
}
function ErrorState({ description = "The collection is temporarily unavailable.", onRetry }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-display-md",
				children: "Collection unavailable"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "max-w-md text-sm text-foreground-secondary",
				children: description
			}),
			onRetry && /* @__PURE__ */ jsx(Button, {
				variant: "outline",
				onClick: onRetry,
				children: "Retry"
			})
		]
	});
}
//#endregion
export { NotFoundState as i, ErrorState as n, LoadingState as r, EmptyState as t };

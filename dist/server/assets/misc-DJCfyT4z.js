import { n as cn } from "./schema-DYDO5Lmu.js";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
import { Check } from "lucide-react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
//#region src/components/ui/misc.tsx
function Badge({ className, variant = "default", ...props }) {
	return /* @__PURE__ */ jsx("span", {
		className: cn("text-meta inline-flex items-center border px-2 py-0.5", variant === "default" && "border-foreground bg-foreground text-background", variant === "outline" && "border-border text-foreground-secondary", variant === "accent" && "border-accent/40 text-accent", variant === "muted" && "border-border/60 text-muted", className),
		...props
	});
}
var Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(SeparatorPrimitive.Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border/50", orientation === "horizontal" ? "h-px w-full" : "w-px h-full", className),
	...props
}));
Separator.displayName = "Separator";
var Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(CheckboxPrimitive.Root, {
	ref,
	className: cn("peer size-4 shrink-0 border border-border bg-transparent transition-colors hover:border-foreground data-[state=checked]:border-foreground data-[state=checked]:bg-foreground focus-visible:outline-2 focus-visible:outline-accent", className),
	...props,
	children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, {
		className: "flex items-center justify-center text-background",
		children: /* @__PURE__ */ jsx(Check, {
			className: "size-3",
			strokeWidth: 3
		})
	})
}));
Checkbox.displayName = "Checkbox";
//#endregion
export { Checkbox as n, Badge as t };

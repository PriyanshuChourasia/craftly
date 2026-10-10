import { n as cn } from "./schema-DYDO5Lmu.js";
import * as React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Check, ChevronDown } from "lucide-react";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
//#region src/components/ui/input.tsx
var fieldBase = "w-full border border-border bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors focus:border-foreground focus-visible:outline-none disabled:opacity-50";
var Input = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("input", {
	ref,
	className: cn(fieldBase, "h-10", className),
	...props
}));
Input.displayName = "Input";
var Textarea = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("textarea", {
	ref,
	className: cn(fieldBase, "min-h-[100px] resize-y", className),
	...props
}));
Textarea.displayName = "Textarea";
var Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, {
	ref,
	className: cn("text-meta mb-1.5 block text-foreground-secondary", className),
	...props
}));
Label.displayName = "Label";
var FieldError = ({ message }) => message ? /* @__PURE__ */ jsx("p", {
	role: "alert",
	className: "mt-1.5 text-xs text-accent",
	children: message
}) : null;
//#endregion
//#region src/components/ui/select.tsx
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
	ref,
	className: cn("flex h-10 w-full items-center justify-between border border-border bg-transparent px-3 py-2 text-sm transition-colors hover:border-foreground focus:outline-none focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50 [&>span]:truncate", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
		asChild: true,
		children: /* @__PURE__ */ jsx(ChevronDown, { className: "size-3.5 shrink-0 opacity-60" })
	})]
}));
SelectTrigger.displayName = "SelectTrigger";
var SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx(SelectPrimitive.Content, {
	ref,
	position,
	className: cn("z-[100] max-h-72 min-w-[10rem] overflow-hidden border border-border bg-background shadow-[0_20px_60px_rgba(8,8,8,0.12)]", className),
	...props,
	children: /* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
		className: "p-1",
		children
	})
}) }));
SelectContent.displayName = "SelectContent";
var SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center py-2 pl-8 pr-3 text-sm outline-none data-[highlighted]:bg-foreground/5 data-[state=checked]:font-medium", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2.5 flex size-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "size-3" }) })
	}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
}));
SelectItem.displayName = "SelectItem";
//#endregion
export { SelectValue as a, Label as c, SelectTrigger as i, Textarea as l, SelectContent as n, FieldError as o, SelectItem as r, Input as s, Select as t };

import { jsx } from "react/jsx-runtime";
import { motion, useReducedMotion } from "motion/react";
//#region src/components/animations/Reveal.tsx
var EASE = [
	.22,
	1,
	.36,
	1
];
var OFFSETS = {
	up: { y: 40 },
	down: { y: -40 },
	left: { x: 60 },
	right: { x: -60 },
	none: {}
};
/** Fade + directional slide on viewport entry. */
function Reveal({ children, delay = 0, duration = .9, direction = "up", className, once = true, amount = .25 }) {
	const reduced = useReducedMotion();
	const offset = OFFSETS[direction];
	return /* @__PURE__ */ jsx(motion.div, {
		className,
		initial: reduced ? { opacity: 0 } : {
			opacity: 0,
			...offset
		},
		whileInView: {
			opacity: 1,
			x: 0,
			y: 0
		},
		viewport: {
			once,
			amount
		},
		transition: {
			duration: reduced ? .3 : duration,
			delay,
			ease: EASE
		},
		children
	});
}
/** Staggers direct motion children on viewport entry. */
function Stagger({ children, className, stagger = .12, delay = 0 }) {
	const reduced = useReducedMotion();
	return /* @__PURE__ */ jsx(motion.div, {
		className,
		initial: "hidden",
		whileInView: "show",
		viewport: {
			once: true,
			amount: .15
		},
		variants: {
			hidden: {},
			show: { transition: {
				staggerChildren: reduced ? 0 : stagger,
				delayChildren: delay
			} }
		},
		children
	});
}
var staggerItem = {
	hidden: {
		opacity: 0,
		y: 30
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .8,
			ease: EASE
		}
	}
};
//#endregion
export { Stagger as n, staggerItem as r, Reveal as t };

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function slugify(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}
function isValidHttpUrl(value) {
	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}
function padNumber(n, length = 2) {
	return String(n).padStart(length, "0");
}
//#endregion
//#region src/lib/products/schema.ts
var urlSchema = z.string().trim().refine((v) => {
	try {
		return ["http:", "https:"].includes(new URL(v).protocol);
	} catch {
		return false;
	}
}, "Must be a valid http(s) URL").optional().or(z.literal(""));
var productImageSchema = z.object({
	url: z.string().min(1, "Image URL is required"),
	alt: z.string().min(1, "Alt text is required"),
	width: z.number().int().positive().optional(),
	height: z.number().int().positive().optional()
});
var productInputSchema = z.object({
	name: z.string().min(1, "Name is required").max(120),
	slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers and dashes only"),
	shortDescription: z.string().max(300).optional().or(z.literal("")),
	description: z.string().min(1, "Description is required"),
	price: z.number().min(0, "Price must be 0 or more"),
	currency: z.enum([
		"INR",
		"USD",
		"EUR",
		"GBP"
	]),
	category: z.string().min(1, "Category is required"),
	brand: z.string().optional().or(z.literal("")),
	year: z.number().int().min(1900, "Year looks too old").max(2100, "Year looks too far ahead"),
	tags: z.array(z.string().min(1)),
	images: z.array(productImageSchema).min(1, "At least one image is required"),
	material: z.string().optional().or(z.literal("")),
	dimensions: z.string().optional().or(z.literal("")),
	color: z.string().optional().or(z.literal("")),
	availability: z.enum([
		"available",
		"sold_out",
		"coming_soon"
	]),
	sellerName: z.string().optional().or(z.literal("")),
	sellerUrl: urlSchema,
	buyUrl: urlSchema,
	featured: z.boolean(),
	published: z.boolean(),
	seo: z.object({
		metaTitle: z.string().optional().or(z.literal("")),
		metaDescription: z.string().optional().or(z.literal("")),
		ogImage: z.string().optional().or(z.literal(""))
	}).optional()
});
//#endregion
export { slugify as a, padNumber as i, cn as n, isValidHttpUrl as r, productInputSchema as t };

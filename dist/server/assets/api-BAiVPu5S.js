import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "../server.js";
import { a as slugify, r as isValidHttpUrl, t as productInputSchema } from "./schema-DYDO5Lmu.js";
//#region node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/data/products.ts
/** Primary (cover) image of a product. */
function primary(name, alt, w = 1200, h = 1500) {
	return {
		id: name,
		url: name,
		alt,
		width: w,
		height: h,
		order: 0,
		isPrimary: true
	};
}
/** Secondary view of a product. */
function view(name, alt, w, h) {
	return {
		id: name,
		url: name,
		alt,
		width: w,
		height: h,
		order: 0
	};
}
var initialProducts = [
	{
		slug: "tide-stone",
		name: "Tide Stone",
		short: "A hand-carved basalt object shaped by repetition.",
		desc: "Tide Stone began as a study of erosion — a form worn down, then rebuilt by hand. Each facet is ground until the surface holds light the way wet stone does. The piece carries the traces of the hands, places and moments that shaped it.",
		price: 4500,
		category: "Objects",
		brand: "Studio Meridian",
		year: 2026,
		tags: [
			"stone",
			"hand-carved",
			"sculptural"
		],
		material: "Basalt",
		dimensions: "25 × 12 × 10 CM",
		color: "Graphite",
		seller: "Studio Meridian",
		buyUrl: "https://example.com/product/tide-stone",
		featured: true,
		images: [
			primary("/products/WhatsApp Image 2026-10-08 at 14.55.38.jpeg", "Tide Stone — front view"),
			view("/products/WhatsApp Image 2026-10-08 at 14.55.34.jpeg", "Tide Stone — side view", 1500, 1e3),
			view("/products/WhatsApp Image 2026-10-08 at 14.55.35.jpeg", "Tide Stone — detail view", 1200, 1200)
		]
	},
	{
		slug: "meridian-lamp",
		name: "Meridian Lamp",
		short: "A diffused, low-glare table lamp in spun brass.",
		desc: "The Meridian Lamp is built around a single curved sheet of spun brass that folds light back onto itself. Designed for evenings — its warm 2700K glow pools rather than spreads. The switch is a single brushed toggle recessed into the base.",
		price: 12800,
		category: "Lighting",
		brand: "Atelier Nord",
		year: 2026,
		tags: [
			"brass",
			"ambient",
			"lighting"
		],
		material: "Spun brass, opal glass",
		dimensions: "38 × 22 × 22 CM",
		color: "Brass",
		seller: "Atelier Nord",
		buyUrl: "https://example.com/product/meridian-lamp",
		images: [
			primary("/products/WhatsApp Image 2026-10-08 at 14.56.05.jpeg", "Meridian Lamp — front view"),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.05 (1).jpeg", "Meridian Lamp — side view", 1500, 1e3),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.06.jpeg", "Meridian Lamp — detail view", 1200, 1200)
		]
	},
	{
		slug: "half-moon-chair",
		name: "Half Moon Chair",
		short: "Sculptural bent-ply lounge chair with a cane seat.",
		desc: "A single sheet of birch ply, bent twice and resolved with a hand-woven cane seat. The Half Moon holds the body at an angle between sitting and resting. Produced in a numbered run of sixty.",
		price: 32e3,
		category: "Furniture",
		brand: "Form & Field",
		year: 2025,
		tags: [
			"plywood",
			"cane",
			"lounge"
		],
		material: "Birch ply, natural cane",
		dimensions: "72 × 64 × 78 CM",
		color: "Natural",
		seller: "Form & Field",
		buyUrl: "https://example.com/product/half-moon-chair",
		featured: true,
		images: [
			primary("/products/WhatsApp Image 2026-10-08 at 14.56.08.jpeg", "Half Moon Chair — front view"),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.08 (1).jpeg", "Half Moon Chair — side view", 1500, 1e3),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.09.jpeg", "Half Moon Chair — detail view", 1200, 1200)
		]
	},
	{
		slug: "vessel-07",
		name: "Vessel No. 07",
		short: "Hand-thrown stoneware with a dry volcanic glaze.",
		desc: "Thrown on the wheel in a single morning, then left to find its own slight asymmetry in the firing. The volcanic glaze breaks over the shoulder of the vessel and pools near the foot — no two pieces share the same surface.",
		price: 7900,
		category: "Ceramic",
		brand: "Kiln & Co.",
		year: 2026,
		tags: [
			"stoneware",
			"vessel",
			"hand-thrown"
		],
		material: "Stoneware, volcanic glaze",
		dimensions: "28 Ø × 31 CM",
		color: "Ash grey",
		seller: "Kiln & Co.",
		buyUrl: "https://example.com/product/vessel-07",
		featured: true,
		images: [
			primary("/products/WhatsApp Image 2026-10-08 at 14.56.10.jpeg", "Vessel No. 07 — front view"),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.10 (1).jpeg", "Vessel No. 07 — top view", 1500, 1e3),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.11.jpeg", "Vessel No. 07 — detail view", 1200, 1200)
		]
	},
	{
		slug: "errand-bag",
		name: "Errand Bag",
		short: "A structured canvas tote with a leather base.",
		desc: "Cut from a single panel of 18oz waxed canvas and closed with one seam. The leather base takes the weight; the canvas takes the years. Inside, one slip pocket sized for exactly the things you actually carry.",
		price: 6200,
		category: "Accessories",
		brand: "Morrow Goods",
		year: 2024,
		tags: [
			"canvas",
			"tote",
			"leather"
		],
		material: "Waxed canvas, veg-tan leather",
		dimensions: "40 × 32 × 14 CM",
		color: "Olive",
		seller: "Morrow Goods",
		buyUrl: "https://example.com/product/errand-bag",
		images: [
			primary("/products/WhatsApp Image 2026-10-08 at 14.56.12.jpeg", "Errand Bag — front view"),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.12 (1).jpeg", "Errand Bag — open view", 1500, 1e3),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.13.jpeg", "Errand Bag — detail view", 1200, 1200)
		]
	},
	{
		slug: "still-camera",
		name: "Still Camera",
		short: "A fixed-lens 35mm film camera in magnesium.",
		desc: "One lens, one shutter speed dial, one purpose. The Still Camera strips 35mm photography back to focus and light. Its magnesium body is bead-blasted to a soft matte that hides the marks of travel.",
		price: 41e3,
		category: "Technology",
		brand: "Ampersand Optics",
		year: 2024,
		tags: [
			"film",
			"35mm",
			"analogue"
		],
		material: "Magnesium, glass",
		dimensions: "128 × 74 × 40 MM",
		color: "Matte black",
		seller: "Ampersand Optics",
		buyUrl: "https://example.com/product/still-camera",
		images: [
			primary("/products/WhatsApp Image 2026-10-08 at 14.56.14.jpeg", "Still Camera — front view"),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.14 (1).jpeg", "Still Camera — top view", 1500, 1e3),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.15.jpeg", "Still Camera — detail view", 1200, 1200)
		]
	},
	{
		slug: "echo-sculpture",
		name: "Echo Sculpture",
		short: "A cast bronze form derived from a sound wave.",
		desc: "Echo takes a three-second recording of the sea and translates its waveform into solid bronze. Cast in a foundry that has operated since 1911, then hand-patinated to a deep umber. Each casting is a unique moment of the same sound.",
		price: 96e3,
		category: "Art",
		brand: "Studio Meridian",
		year: 2023,
		tags: [
			"bronze",
			"sculpture",
			"edition"
		],
		material: "Cast bronze",
		dimensions: "42 × 18 × 14 CM",
		color: "Umber patina",
		availability: "coming_soon",
		seller: "Studio Meridian",
		buyUrl: "https://example.com/product/echo-sculpture",
		featured: true,
		images: [
			primary("/products/WhatsApp Image 2026-10-08 at 14.56.17.jpeg", "Echo Sculpture — front view"),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.17 (1).jpeg", "Echo Sculpture — side view", 1500, 1e3),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.18.jpeg", "Echo Sculpture — detail view", 1200, 1200)
		]
	},
	{
		slug: "standing-object",
		name: "Standing Object",
		short: "A weighted steel form for desks and shelves.",
		desc: "A small monument to nothing in particular. Machined from solid steel and left slightly rough, the Standing Object is heavy in the hand and quiet on a shelf. It does exactly what you bring to it.",
		price: 3200,
		category: "Objects",
		brand: "Form & Field",
		year: 2025,
		tags: [
			"steel",
			"desk",
			"minimal"
		],
		material: "Solid steel",
		dimensions: "10 × 10 × 22 CM",
		color: "Raw steel",
		seller: "Form & Field",
		buyUrl: "https://example.com/product/standing-object",
		images: [
			primary("/products/WhatsApp Image 2026-10-08 at 14.56.19.jpeg", "Standing Object — front view"),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.19 (1).jpeg", "Standing Object — side view", 1500, 1e3),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.20.jpeg", "Standing Object — detail view", 1200, 1200)
		]
	},
	{
		slug: "halo-light",
		name: "Halo Light",
		short: "A wall-mounted ring of warm, indirect light.",
		desc: "Halo mounts flush to the wall and emits nothing directly — only the warm wash that returns from it. The diffuser is hand-opalescent glass; the frame is blackened oak. For hallways, heads of beds, and rooms without ceilings lights.",
		price: 15400,
		category: "Lighting",
		brand: "Atelier Nord",
		year: 2024,
		tags: [
			"wall",
			"glass",
			"ambient"
		],
		material: "Blackened oak, opal glass",
		dimensions: "44 Ø × 6 CM",
		color: "Black / white",
		availability: "sold_out",
		seller: "Atelier Nord",
		buyUrl: "https://example.com/product/halo-light",
		images: [
			primary("/products/WhatsApp Image 2026-10-08 at 14.56.21.jpeg", "Halo Light — front view"),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.21 (1).jpeg", "Halo Light — side view", 1500, 1e3),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.22.jpeg", "Halo Light — detail view", 1200, 1200)
		]
	},
	{
		slug: "dune-set",
		name: "Dune Set",
		short: "Four stacking stoneware bowls in graded glazes.",
		desc: "Four bowls, thrown as one family, glazed in a gradient that runs from sand to ash. They stack to a single sculptural column and separate for a table. Dishwasher-proof, though they would rather you did not.",
		price: 8900,
		category: "Ceramic",
		brand: "Kiln & Co.",
		year: 2023,
		tags: [
			"stoneware",
			"bowls",
			"set"
		],
		material: "Stoneware",
		dimensions: "16 Ø × 8 CM each",
		color: "Sand → ash",
		seller: "Kiln & Co.",
		buyUrl: "https://example.com/product/dune-set",
		images: [
			primary("/products/WhatsApp Image 2026-10-08 at 14.56.24.jpeg", "Dune Set — stacked view"),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.24 (1).jpeg", "Dune Set — spread view", 1500, 1e3),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.25.jpeg", "Dune Set — detail view", 1200, 1200)
		]
	},
	{
		slug: "cairn",
		name: "Cairn",
		short: "Three stacked stone forms balanced by weight alone.",
		desc: "Three stones, cut flat where they meet and nothing more. The Cairn holds itself through mass and patience. Made in collaboration with a quarry that otherwise sells its off-cuts as gravel.",
		price: 5600,
		category: "Objects",
		brand: "Studio Meridian",
		year: 2025,
		tags: [
			"stone",
			"stacked",
			"sculptural"
		],
		material: "Limestone",
		dimensions: "14 × 14 × 26 CM",
		color: "Chalk",
		seller: "Studio Meridian",
		buyUrl: "https://example.com/product/cairn",
		images: [
			primary("/products/WhatsApp Image 2026-10-08 at 14.56.27.jpeg", "Cairn — front view"),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.27 (1).jpeg", "Cairn — side view", 1500, 1e3),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.28.jpeg", "Cairn — detail view", 1200, 1200)
		]
	},
	{
		slug: "arc-stool",
		name: "Arc Stool",
		short: "A three-legged oak stool with a curved seat.",
		desc: "The seat of the Arc Stool is a shallow arc of solid oak, dished by hand to meet the body. Three round legs splay at twelve degrees — enough to feel planted, not so much that it argues with a room.",
		price: 9800,
		category: "Furniture",
		brand: "Form & Field",
		year: 2026,
		tags: [
			"oak",
			"stool",
			"wood"
		],
		material: "Solid white oak",
		dimensions: "38 Ø × 46 CM",
		color: "White oak",
		availability: "coming_soon",
		seller: "Form & Field",
		buyUrl: "https://example.com/product/arc-stool",
		images: [
			primary("/products/WhatsApp Image 2026-10-08 at 14.56.29.jpeg", "Arc Stool — front view"),
			view("/products/WhatsApp Image 2026-10-08 at 14.56.28.jpeg", "Arc Stool — side view", 1500, 1e3),
			view("/products/WhatsApp Image 2026-10-08 at 14.55.30.jpeg", "Arc Stool — detail view", 1200, 1200)
		]
	},
	{
		slug: "carry-keyring",
		name: "Carry Keyring",
		short: "A solid brass keyring that ages in weeks.",
		desc: "A single billet of brass, drilled, chamfered and tumbled until it feels like a river stone. The ring is steel; the rest is brass that will darken, brighten, and record every pocket it has lived in.",
		price: 1400,
		category: "Accessories",
		brand: "Morrow Goods",
		year: 2023,
		tags: [
			"brass",
			"everyday",
			"carry"
		],
		material: "Solid brass, steel ring",
		dimensions: "60 × 18 × 5 MM",
		color: "Brass",
		seller: "Morrow Goods",
		buyUrl: "https://example.com/product/carry-keyring",
		images: [
			primary("/products/WhatsApp Image 2026-10-08 at 14.56.28.jpeg", "Carry Keyring — front view"),
			view("/products/WhatsApp Image 2026-10-08 at 14.55.30.jpeg", "Carry Keyring — top view", 1500, 1e3),
			view("/products/WhatsApp Image 2026-10-08 at 14.55.33.jpeg", "Carry Keyring — detail view", 1200, 1200)
		]
	}
].map((seed, index) => {
	const offset = index * 864e5 * 9;
	return {
		id: `prd-${String(index + 1).padStart(2, "0")}`,
		slug: seed.slug,
		name: seed.name,
		shortDescription: seed.short,
		description: seed.desc,
		price: seed.price,
		currency: seed.currency ?? "INR",
		category: seed.category,
		brand: seed.brand,
		year: seed.year,
		tags: seed.tags,
		images: seed.images,
		primaryImage: seed.images[0]?.url,
		material: seed.material,
		dimensions: seed.dimensions,
		color: seed.color,
		availability: seed.availability ?? "available",
		sellerName: seed.seller,
		sellerUrl: seed.seller ? `https://example.com/seller/${seed.seller.toLowerCase().replace(/[^a-z]+/g, "-")}` : void 0,
		buyUrl: seed.buyUrl,
		featured: seed.featured ?? false,
		published: true,
		createdAt: (/* @__PURE__ */ new Date(1761e9 - offset)).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date(1761e9 - offset / 2)).toISOString()
	};
});
//#endregion
//#region src/repositories/mock-product-repository.ts
/**
* In-memory ProductRepository. Data lives for the lifetime of the server
* process — ideal for the mock stage, trivially replaceable later.
*/
var MockProductRepository = class {
	products;
	constructor(seed = initialProducts) {
		this.products = new Map(seed.map((p) => [p.id, { ...p }]));
	}
	toInput(p) {
		const { id: _id, images, createdAt: _c, updatedAt: _u, primaryImage: _p, ...rest } = p;
		return {
			...rest,
			images: images.map(({ id: _i, order: _o, ...img }) => img)
		};
	}
	nextId() {
		return `prd-${crypto.randomUUID().slice(0, 8)}`;
	}
	ensureUniqueSlug(base, ignoreId) {
		let slug = base || "object";
		let n = 2;
		while ([...this.products.values()].some((p) => p.slug === slug && p.id !== ignoreId)) slug = `${base}-${n++}`;
		return slug;
	}
	async getProducts() {
		return [...this.products.values()].sort((a, b) => b.year - a.year || a.name.localeCompare(b.name));
	}
	async getProductBySlug(slug) {
		return [...this.products.values()].find((p) => p.slug === slug) ?? null;
	}
	async getProductById(id) {
		return this.products.get(id) ?? null;
	}
	async getFeaturedProducts() {
		return (await this.getProducts()).filter((p) => p.featured && p.published);
	}
	async getProductsByYear(year) {
		return (await this.getProducts()).filter((p) => p.year === year);
	}
	async searchProducts(query) {
		const q = query.trim().toLowerCase();
		if (!q) return this.getProducts();
		return (await this.getProducts()).filter((p) => [
			p.name,
			p.category,
			p.brand,
			String(p.year),
			...p.tags
		].join(" ").toLowerCase().includes(q));
	}
	async getAvailableYears() {
		return [...new Set((await this.getProducts()).map((p) => p.year))].sort((a, b) => b - a);
	}
	async getCategories() {
		return [...new Set((await this.getProducts()).map((p) => p.category))].sort();
	}
	async getBrands() {
		return [...new Set((await this.getProducts()).map((p) => p.brand).filter((b) => !!b))].sort();
	}
	async getTags() {
		return [...new Set((await this.getProducts()).flatMap((p) => p.tags))].sort();
	}
	async filterProducts(filters) {
		let list = await this.getProducts();
		if (!filters) return list;
		list = list.filter((p) => p.published);
		if (filters.search) {
			const q = filters.search.toLowerCase();
			list = list.filter((p) => [
				p.name,
				p.category,
				p.brand,
				String(p.year),
				...p.tags
			].join(" ").toLowerCase().includes(q));
		}
		if (filters.category) list = list.filter((p) => p.category === filters.category);
		if (filters.brand) list = list.filter((p) => p.brand === filters.brand);
		if (filters.year) list = list.filter((p) => p.year === filters.year);
		if (typeof filters.minPrice === "number") list = list.filter((p) => p.price >= filters.minPrice);
		if (typeof filters.maxPrice === "number") list = list.filter((p) => p.price <= filters.maxPrice);
		if (filters.availability) list = list.filter((p) => p.availability === filters.availability);
		if (filters.featured !== void 0) list = list.filter((p) => p.featured === filters.featured);
		if (filters.tags?.length) list = list.filter((p) => filters.tags.some((t) => p.tags.includes(t)));
		return list;
	}
	async createProduct(input) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const images = input.images.map((img, i) => ({
			...img,
			id: `img-${crypto.randomUUID().slice(0, 8)}`,
			order: i
		}));
		const product = {
			...input,
			id: this.nextId(),
			slug: this.ensureUniqueSlug(slugify(input.slug || input.name)),
			images,
			primaryImage: images[0]?.url ?? "",
			createdAt: now,
			updatedAt: now
		};
		this.products.set(product.id, product);
		return product;
	}
	async updateProduct(id, update) {
		const existing = this.products.get(id);
		if (!existing) return null;
		const { images: newImages, ...rest } = update;
		const merged = {
			...existing,
			...rest,
			id: existing.id,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		if (update.slug !== void 0) merged.slug = this.ensureUniqueSlug(slugify(update.slug), id);
		if (newImages) {
			merged.images = newImages.map((img, i) => ({
				...img,
				id: existing.images[i]?.id ?? `img-${crypto.randomUUID().slice(0, 8)}`,
				order: i
			}));
			merged.primaryImage = merged.images[0]?.url ?? merged.primaryImage ?? "";
		}
		if (update.buyUrl !== void 0 && update.buyUrl && !isValidHttpUrl(update.buyUrl)) throw new Error("Invalid buy URL");
		this.products.set(id, merged);
		return merged;
	}
	async deleteProduct(id) {
		return this.products.delete(id);
	}
	async duplicateProduct(id) {
		const source = this.products.get(id);
		if (!source) return null;
		const input = this.toInput(source);
		input.name = `${source.name} (Copy)`;
		input.featured = false;
		return this.createProduct(input);
	}
	async toggleFeatured(id) {
		const p = this.products.get(id);
		if (!p) return null;
		p.featured = !p.featured;
		p.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
		return p;
	}
};
/** Singleton for the server bundle. */
var instance = null;
function getProductRepository() {
	if (!instance) instance = new MockProductRepository();
	return instance;
}
//#endregion
//#region src/lib/products/api.ts?tss-serverfn-split
var fetchProducts_createServerFn_handler = createServerRpc({
	id: "ef00a98a9dd8aa91b5795ad63e1ee874db9f4e466fc67f2def5e5f412d6a0d5d",
	name: "fetchProducts",
	filename: "src/lib/products/api.ts"
}, (opts) => fetchProducts.__executeServer(opts));
var fetchProducts = createServerFn({ method: "GET" }).handler(fetchProducts_createServerFn_handler, () => getProductRepository().getProducts());
var fetchPublishedProducts_createServerFn_handler = createServerRpc({
	id: "9ee3bf08b9daef564b91f12f5f4997ea041fd43fa95978b64ccfd031e7002684",
	name: "fetchPublishedProducts",
	filename: "src/lib/products/api.ts"
}, (opts) => fetchPublishedProducts.__executeServer(opts));
var fetchPublishedProducts = createServerFn({ method: "GET" }).handler(fetchPublishedProducts_createServerFn_handler, () => getProductRepository().getProducts());
var fetchProductBySlug_createServerFn_handler = createServerRpc({
	id: "af8724dfaf6bfe85d2b91615bf950dbd8dc8295cf0a461e19ba15a7a1a0f9b4e",
	name: "fetchProductBySlug",
	filename: "src/lib/products/api.ts"
}, (opts) => fetchProductBySlug.__executeServer(opts));
var fetchProductBySlug = createServerFn({ method: "GET" }).validator((slug) => slug).handler(fetchProductBySlug_createServerFn_handler, ({ data }) => getProductRepository().getProductBySlug(data));
var fetchProductById_createServerFn_handler = createServerRpc({
	id: "e18f7044968f4f717e38f9601899da2773430d80ffd8f878d340a50604beb219",
	name: "fetchProductById",
	filename: "src/lib/products/api.ts"
}, (opts) => fetchProductById.__executeServer(opts));
var fetchProductById = createServerFn({ method: "GET" }).validator((id) => id).handler(fetchProductById_createServerFn_handler, ({ data }) => getProductRepository().getProductById(data));
var fetchFeaturedProducts_createServerFn_handler = createServerRpc({
	id: "28d82ff52ad0a393004366c4c1641057bdf5348ffaf66da8aec0edc03fe31ee3",
	name: "fetchFeaturedProducts",
	filename: "src/lib/products/api.ts"
}, (opts) => fetchFeaturedProducts.__executeServer(opts));
var fetchFeaturedProducts = createServerFn({ method: "GET" }).handler(fetchFeaturedProducts_createServerFn_handler, () => getProductRepository().getFeaturedProducts());
var fetchFacets_createServerFn_handler = createServerRpc({
	id: "45697c59d3bc3b5eaca98e8e62a8532bbb5bd1abd09f79640c227c8831ab18f2",
	name: "fetchFacets",
	filename: "src/lib/products/api.ts"
}, (opts) => fetchFacets.__executeServer(opts));
var fetchFacets = createServerFn({ method: "GET" }).handler(fetchFacets_createServerFn_handler, async () => {
	const repo = getProductRepository();
	const [years, categories, brands, tags] = await Promise.all([
		repo.getAvailableYears(),
		repo.getCategories(),
		repo.getBrands(),
		repo.getTags()
	]);
	return {
		years,
		categories,
		brands,
		tags
	};
});
var fetchFilteredProducts_createServerFn_handler = createServerRpc({
	id: "8fad8f211ebd02786e5f09000b0e3950ae2cb1bc93b1386cdcef78bcfc04ed22",
	name: "fetchFilteredProducts",
	filename: "src/lib/products/api.ts"
}, (opts) => fetchFilteredProducts.__executeServer(opts));
var fetchFilteredProducts = createServerFn({ method: "GET" }).validator((d) => d).handler(fetchFilteredProducts_createServerFn_handler, ({ data }) => getProductRepository().filterProducts(data));
var createProductFn_createServerFn_handler = createServerRpc({
	id: "af062b45f8497d90b8df6add0e3124d9da60d76decdd0cd8ee81e886f5d6ba2a",
	name: "createProductFn",
	filename: "src/lib/products/api.ts"
}, (opts) => createProductFn.__executeServer(opts));
var createProductFn = createServerFn({ method: "POST" }).validator((d) => productInputSchema.parse(d)).handler(createProductFn_createServerFn_handler, async ({ data }) => {
	return getProductRepository().createProduct(data);
});
var updateProductFn_createServerFn_handler = createServerRpc({
	id: "4e1355d7316abc3419337aa17af3c8d99b2aba7cbdd54bdff3f9f558f0f504c1",
	name: "updateProductFn",
	filename: "src/lib/products/api.ts"
}, (opts) => updateProductFn.__executeServer(opts));
var updateProductFn = createServerFn({ method: "POST" }).validator((d) => d).handler(updateProductFn_createServerFn_handler, async ({ data }) => {
	const parsed = productInputSchema.parse(data.data);
	return getProductRepository().updateProduct(data.id, parsed);
});
var deleteProductFn_createServerFn_handler = createServerRpc({
	id: "027a0a05d5aca72271dbc711b3193bcd444f7510a931e3f1f366eb4dee1496e8",
	name: "deleteProductFn",
	filename: "src/lib/products/api.ts"
}, (opts) => deleteProductFn.__executeServer(opts));
var deleteProductFn = createServerFn({ method: "POST" }).validator((id) => id).handler(deleteProductFn_createServerFn_handler, ({ data }) => getProductRepository().deleteProduct(data));
var duplicateProductFn_createServerFn_handler = createServerRpc({
	id: "3affc2f2a378f506f6105caa716c91a7c26c980e52ed4fc527c7e3ee21ddf0f8",
	name: "duplicateProductFn",
	filename: "src/lib/products/api.ts"
}, (opts) => duplicateProductFn.__executeServer(opts));
var duplicateProductFn = createServerFn({ method: "POST" }).validator((id) => id).handler(duplicateProductFn_createServerFn_handler, ({ data }) => getProductRepository().duplicateProduct(data));
var toggleFeaturedFn_createServerFn_handler = createServerRpc({
	id: "3c42d0215e242bcbf0f791d04a2ce89f2c9b1e18af8eda76bff8a41529a21034",
	name: "toggleFeaturedFn",
	filename: "src/lib/products/api.ts"
}, (opts) => toggleFeaturedFn.__executeServer(opts));
var toggleFeaturedFn = createServerFn({ method: "POST" }).validator((id) => id).handler(toggleFeaturedFn_createServerFn_handler, ({ data }) => getProductRepository().toggleFeatured(data));
var fetchAdminStats_createServerFn_handler = createServerRpc({
	id: "089dd33669198ae82b39c4828425f4fa2d4e3aaa3bdf0c91ed935229062cde67",
	name: "fetchAdminStats",
	filename: "src/lib/products/api.ts"
}, (opts) => fetchAdminStats.__executeServer(opts));
var fetchAdminStats = createServerFn({ method: "GET" }).handler(fetchAdminStats_createServerFn_handler, async () => {
	const all = await getProductRepository().getProducts();
	return {
		total: all.length,
		featured: all.filter((p) => p.featured).length,
		available: all.filter((p) => p.availability === "available").length,
		soldOut: all.filter((p) => p.availability === "sold_out").length,
		drafts: all.filter((p) => !p.published).length,
		recent: [...all].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5)
	};
});
//#endregion
export { createProductFn_createServerFn_handler, deleteProductFn_createServerFn_handler, duplicateProductFn_createServerFn_handler, fetchAdminStats_createServerFn_handler, fetchFacets_createServerFn_handler, fetchFeaturedProducts_createServerFn_handler, fetchFilteredProducts_createServerFn_handler, fetchProductById_createServerFn_handler, fetchProductBySlug_createServerFn_handler, fetchProducts_createServerFn_handler, fetchPublishedProducts_createServerFn_handler, toggleFeaturedFn_createServerFn_handler, updateProductFn_createServerFn_handler };

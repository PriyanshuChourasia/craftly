//#region src/lib/format.ts
var CURRENCY_LOCALE = {
	INR: "en-IN",
	USD: "en-US",
	EUR: "de-DE",
	GBP: "en-GB"
};
/** Format a numeric price with the correct currency symbol & grouping. */
function formatPrice(amount, currency = "INR") {
	const cur = currency in CURRENCY_LOCALE ? currency : "INR";
	try {
		return new Intl.NumberFormat(CURRENCY_LOCALE[cur], {
			style: "currency",
			currency: cur,
			maximumFractionDigits: 0
		}).format(amount);
	} catch {
		return `${amount} ${cur}`;
	}
}
/** Uppercase, human-readable availability label. */
function availabilityLabel(a) {
	switch (a) {
		case "available": return "Available";
		case "sold_out": return "Sold";
		case "coming_soon": return "Coming Soon";
		default: return a;
	}
}
//#endregion
export { formatPrice as n, availabilityLabel as t };

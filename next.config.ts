import type { Config } from "next";

const nextConfig: Config = {
	// Compiler options
	compiler: {
		// Remove console.log in production
		removeConsole: process.env.NODE_ENV === "production",
	},

	// Image optimization
	images: {
		domains: ["images.microcms-assets.io"],
	},
};

export default nextConfig;

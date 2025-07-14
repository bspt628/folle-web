import type { Config } from "next";

const nextConfig: Config = {
	// Enable SWC minification
	swcMinify: true,

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

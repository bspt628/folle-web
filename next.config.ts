import { NextConfig } from "next";

const nextConfig: NextConfig = {
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

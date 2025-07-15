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

	// Modern JavaScript and build optimization
	experimental: {
		// Enable modern JavaScript features without transpilation
		optimizePackageImports: ["@vercel/analytics", "@vercel/speed-insights"],
	},

	// Browser targets configuration
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			// Client-side production build
			Object.assign(config.resolve.alias, {
				// Reduce core-js polyfills
				"core-js/modules": false,
				"regenerator-runtime/runtime": false,
			});

			// Configure target for client-side bundles
			config.target = "es2020";
		}
		return config;
	},
};

export default nextConfig;

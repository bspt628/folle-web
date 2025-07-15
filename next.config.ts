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

			// Configure output for client-side bundles
			config.output = {
				...config.output,
				environment: {
					arrowFunction: true,
					bigIntLiteral: false,
					const: true,
					destructuring: true,
					dynamicImport: false,
					forOf: true,
					module: true,
					optionalChaining: true,
					templateLiteral: true,
				},
			};
		}
		return config;
	},
};

export default nextConfig;

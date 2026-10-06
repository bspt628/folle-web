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
		// 変換済み画像をブラウザと CDN に30日間保持させる。
		// 画像を差し替えるときはファイル名を変えて、古いキャッシュを参照させない。
		minimumCacheTTL: 2592000,
		// 表示幅の最大は全画面背景で、2048px を超える変換は不要。
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
		// coming-soon プレースホルダー等の SVG を next/image で表示するため許可。
		// スクリプトは CSP で無効化し、サンドボックス下でのみ描画する。
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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

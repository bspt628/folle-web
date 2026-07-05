import { Roboto, Inter, Archivo } from "next/font/google";

// ローディングの "Orchestra più Folle" 用。DIN Alternate に近い標準幅グロテスク。
// next/font がセルフホストするため全端末で同一表示になる。
export const archivo = Archivo({
	subsets: ["latin"],
	weight: ["500", "600", "700"],
	display: "swap",
	variable: "--font-din",
	fallback: ["DIN Alternate", "Bahnschrift", "Arial", "sans-serif"],
});

export const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	display: "swap",
	variable: "--font-roboto",
	fallback: ["system-ui"],
});

export const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	display: "swap",
	variable: "--font-inter",
	fallback: ["system-ui"],
});

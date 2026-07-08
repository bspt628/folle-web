import {
	Roboto,
	Inter,
	Archivo_Narrow,
	Noto_Sans_JP,
} from "next/font/google";

// ローディングの "Orchestra più Folle" 用。DIN Alternate に近い縦長のナロー体。
// next/font がセルフホストするため全端末で同一表示になる。
export const archivo = Archivo_Narrow({
	subsets: ["latin"],
	weight: ["500", "600", "700"],
	display: "swap",
	variable: "--font-din",
	fallback: ["DIN Alternate", "DIN Condensed", "Bahnschrift", "Arial", "sans-serif"],
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
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-inter",
	fallback: ["system-ui"],
});

// 本文・見出しの日本語用。Noto Serif JP のサンセリフ版にあたる Noto Sans JP。
export const notoSansJp = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	display: "swap",
	variable: "--font-jp",
	fallback: [
		"Hiragino Sans",
		"Hiragino Kaku Gothic ProN",
		"Meiryo",
		"sans-serif",
	],
});

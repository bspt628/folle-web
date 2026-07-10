import { Archivo_Narrow } from "next/font/google";

// ローディングの "Orchestra più Folle" 用。DIN Alternate に近い縦長のナロー体。
// next/font がセルフホストするため全端末で同一表示になる。
export const archivo = Archivo_Narrow({
	subsets: ["latin"],
	weight: ["500", "600", "700"],
	display: "swap",
	variable: "--font-din",
	fallback: ["DIN Alternate", "DIN Condensed", "Bahnschrift", "Arial", "sans-serif"],
});

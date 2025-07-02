import { Roboto, Inter } from "next/font/google";

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

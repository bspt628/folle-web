import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { BIZ_UDGothic } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const roboto = Roboto({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

const bizUDGothic = BIZ_UDGothic({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
	preload: false,
	variable: "--font-biz-ud",
});

export const metadata: Metadata = {
	title: "Orchestra più folle",
	description: "Orchestra più folle（通称Fオケ）の公式サイトです。演奏会情報をお届けします。",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<body
				className={`${roboto.variable} ${bizUDGothic.variable} font-sans antialiased min-h-screen flex flex-col`}
			>
				<Header />
				<main className="flex-grow">{children}</main>
				<Footer />
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { roboto, inter } from "@/app/ui/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
	title: "Orchestra più Folle",
	description:
		"Orchestra più Folle（オーケストラ）（通称Fオケ）の公式サイトです。演奏会情報をお届けします。",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja" className={`${roboto.variable} ${inter.variable}`}>
			<head>
				<link rel="icon" href="/logo.png" />
			</head>
			<body className="font-sans antialiased min-h-screen flex flex-col">
				<Header />
				<main className="flex-grow">{children}</main>
				<Footer />
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}

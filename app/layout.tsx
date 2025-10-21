import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { roboto, inter } from "@/app/ui/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
	title: "Orchestra più Folle | オーケストラ ピウ フォーレ",
	description:
		"Orchestra più Folle（オーケストラ ピウ フォーレ）は、東京大学音楽部管弦楽団の団員とOBOGを中心に2025年に結成されたオーケストラです。演奏会情報をお届けします。",
	keywords: [
		"Orchestra più Folle",
		"オーケストラ ピウ フォーレ",
		"Fオケ",
		"ピウフォーレ",
		"オーケストラ",
		"クラシック",
		"東京",
		"演奏会",
		"コンサート",
	],
	openGraph: {
		title: "Orchestra più Folle | オーケストラ ピウ フォーレ",
		description:
			"Orchestra più Folle（オーケストラ ピウ フォーレ）は、東京大学音楽部管弦楽団の団員とOBOGを中心に2025年に結成されたオーケストラです。演奏会情報をお届けします。",
		type: "website",
		locale: "ja_JP",
		siteName: "Orchestra più Folle",
		url: "https://orchestrapiufolle.com",
		images: [
			{
				url: "https://orchestrapiufolle.com/567993919410012183.jpg",
				width: 1200,
				height: 630,
				alt: "Orchestra più Folle - オーケストラ ピウ フォーレ",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Orchestra più Folle | オーケストラ ピウ フォーレ",
		description:
			"Orchestra più Folle（オーケストラ ピウ フォーレ）は、東京大学音楽部管弦楽団の団員とOBOGを中心に2025年に結成されたオーケストラです。演奏会情報をお届けします。",
	},
	alternates: {
		canonical: "https://orchestrapiufolle.com",
	},
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
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black p-4 z-50"
				>
					メインコンテンツにスキップ
				</a>
				<Header />
				<main id="main-content" className="flex-grow" role="main">
					{children}
				</main>
				<Footer />
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}

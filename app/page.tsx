"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
	getUpcomingConcert,
	getLatestPastConcert,
	isComingSoonConcert,
} from "@/lib/constants/concerts";
import { getNewsItems } from "@/lib/constants/news";
import { useEffect, useState, useRef } from "react";
import { NewsItem } from "@/lib/types";
import { Concert } from "@/lib/types";
import { useRouter, usePathname } from "next/navigation";
import Head from "next/head";
// import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function HomePage() {
	const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
	const [upcomingConcert, setUpcomingConcert] = useState<Concert | null>(null);
	const [showOverlay, setShowOverlay] = useState(true);
	const [isFadingOut, setIsFadingOut] = useState(false);
	// ニュースは1件ずつ表示。index 0 が最新（配列は新しい順）。
	const [newsIndex, setNewsIndex] = useState(0);
	const newsRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const pathname = usePathname();
	// const isMdScreen = useMediaQuery("(min-width: 768px)");

	// データフェッチを別のuseEffectで管理
	useEffect(() => {
		const fetchData = async () => {
			const news = getNewsItems();
			const concert = await getUpcomingConcert();
			setNewsItems(news);
			setUpcomingConcert(concert || null);
		};
		fetchData();
	}, []);

	useEffect(() => {
		// セッションストレージから前回のパスを取得
		const prevPath = sessionStorage.getItem("prevPath");
		const currentPath = pathname;

		const getNavigationType = () => {
			const navEntry = window.performance.getEntriesByType(
				"navigation"
			)[0] as PerformanceNavigationTiming;
			return navEntry.type;
		};

		// デバッグ情報の出力
		const navigationType = getNavigationType();
		const isInternalNavigation = prevPath !== null;

		// 現在のパスをセッションストレージに保存
		sessionStorage.setItem("prevPath", currentPath);

		// リロードまたは直接URLアクセスの場合のみオーバーレイを表示
		const shouldShowOverlay =
			(navigationType === "reload" && !isInternalNavigation) ||
			(navigationType === "navigate" && !isInternalNavigation);

		// 内部ナビゲーションの場合は即座にオーバーレイをフェードアウト
		if (!shouldShowOverlay) {
			console.log("Skipping overlay - Internal navigation detected");
			setIsFadingOut(true);
			setShowOverlay(false);
			return;
		}

		// アニメーションのタイミングを制御
		const logo = document.querySelector(".logo") as HTMLElement;
		const text = document.querySelector(".text") as HTMLElement;

		setTimeout(() => {
			if (logo) {
				logo.classList.add("animate-fade-in");
			}
		}, 0);

		setTimeout(() => {
			if (logo) {
				logo.classList.remove("animate-fade-in");
				logo.classList.add("animate-spin");
			}
		}, 1000);

		setTimeout(() => {
			if (text) {
				text.classList.add("text-fade-in");
			}
		}, 1000);

		setTimeout(() => {
			if (text) {
				const textContent = "Orchestra più Folle";
				text.innerHTML = "";

				// Wrap each character in a span
				textContent.split("").forEach((char) => {
					const span = document.createElement("span");
					span.textContent = char;
					span.style.color = "white";
					text.appendChild(span);
				});

				let index = 0;
				const interval = setInterval(() => {
					if (index < text.children.length) {
						(text.children[index] as HTMLElement).style.color = "black";
						index++;
					} else {
						clearInterval(interval);
					}
				}, 100);
			}
		}, 1000);

		setTimeout(() => {
			setIsFadingOut(true);
			setTimeout(() => {
				setShowOverlay(false);
			}, 1000);
		}, 3000);
	}, [pathname]);

	// 次回演奏会がポスター未定(coming soon)の場合は、直近の過去演奏会を表示する
	const comingSoon = isComingSoonConcert(upcomingConcert);
	const featuredConcert = comingSoon
		? (getLatestPastConcert() as Concert | null)
		: upcomingConcert;
	const featuredLabel = comingSoon ? "直近の演奏会" : "次回の演奏会";

	const handleConcertClick = () => {
		if (featuredConcert) {
			router.push(`/concerts/${featuredConcert.id}`);
		}
	};

	return (
		<>
			<Head>
				<title>Orchestra più Folle | オーケストラ ピウ フォーレ</title>
				<meta
					name="description"
					content="Orchestra più Folle（オーケストラ ピウ フォーレ）は、東京大学音楽部管弦楽団の団員とOBOGを中心に2025年に結成されたオーケストラです。演奏会情報をお届けします。"
				/>
				<meta
					property="og:title"
					content="Orchestra più Folle | オーケストラ ピウ フォーレ"
				/>
				<meta
					property="og:description"
					content="Orchestra più Folle（オーケストラ ピウ フォーレ）は、東京大学音楽部管弦楽団の団員とOBOGを中心に2025年に結成されたオーケストラです。演奏会情報をお届けします。"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://orchestrapiufolle.com" />
				<meta property="og:site_name" content="Orchestra più Folle" />
				<meta
					property="og:image"
					content="https://orchestrapiufolle.com/567993919410012183.jpg"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="Orchestra più Folle | オーケストラ ピウ フォーレ"
				/>
				<meta
					name="twitter:description"
					content="Orchestra più Folle（オーケストラ ピウ フォーレ）は、東京大学音楽部管弦楽団の団員とOBOGを中心に2025年に結成されたオーケストラです。演奏会情報をお届けします。"
				/>
				<meta
					name="twitter:image"
					content="https://orchestrapiufolle.com/567993919410012183.jpg"
				/>
			</Head>
			<div className="min-h-screen relative">
				{/* オーバーレイ */}
				{showOverlay && (
					<div className={`overlay ${isFadingOut ? "fade-out" : ""}`}>
						<div className="flex items-center justify-center gap-4">
							<div className="relative flex items-center justify-center">
								<Image
									src="/567993919410012183.jpg"
									alt="Logo"
									className="logo"
									width={488}
									height={488}
									priority
								/>
							</div>
							<div className="text text-white text-2xl">
								Orchestra più Folle
							</div>
						</div>
					</div>
				)}

				{/* Content Container（背景はレイアウトの固定背景を使用） */}
				<div className="relative z-10 flex flex-col md:flex-row md:items-start pt-20 pb-10">
					{/* Main Content */}
					<div className="w-full md:flex-1 md:min-w-0">
						{/* Logo and News Container */}
						<div className="relative flex flex-col">
							{/* 演奏風景の写真（左右に均等な余白を持たせ、Welcome表記付き） */}
							<div className="pt-6 pl-6 pr-4 md:pt-10 md:pl-10 md:pr-6">
								<div className="relative w-full aspect-[1999/1330] overflow-hidden rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/10">
									<Image
										src="/orchestra-hall.webp"
										alt="Orchestra più Folle の演奏風景"
										fill
										className="object-cover object-center"
										priority
										sizes="(max-width: 768px) 100vw, 55vw"
									/>
								</div>
							</div>

							{/* Logo - temporarily hidden */}
							{/* {isMdScreen ? (
							<div className="w-[50vw] h-[50vw] opacity-40 slow-rotate absolute bottom-0">
								<Image
									src="/logo.svg"
									alt="Folle Logo"
									fill
									className="object-contain [filter:drop-shadow(0_0_10px_white)_brightness(1.1)]"
									priority
								/>
							</div>
						) : null} */}

							{/* News Section（1件ずつ表示。< > で前後のニュースへ） */}
							<div ref={newsRef} className="px-6 py-8">
								<div className="mb-5 flex items-center justify-between gap-4">
									<h2 className="text-2xl font-bold tracking-tight text-white">
										ニュース
									</h2>
									{newsItems.length > 1 && (
										<div className="flex items-center gap-2">
											<button
												type="button"
												aria-label="新しいニュースを見る"
												onClick={() =>
													setNewsIndex((i) => Math.max(i - 1, 0))
												}
												disabled={newsIndex === 0}
												className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))] disabled:pointer-events-none disabled:opacity-30"
											>
												<ChevronLeft size={18} aria-hidden="true" />
											</button>
											<span className="min-w-[3rem] text-center text-xs tabular-nums text-white/60 select-none">
												{newsIndex + 1} / {newsItems.length}
											</span>
											<button
												type="button"
												aria-label="過去のニュースを見る"
												onClick={() =>
													setNewsIndex((i) =>
														Math.min(i + 1, newsItems.length - 1)
													)
												}
												disabled={newsIndex >= newsItems.length - 1}
												className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))] disabled:pointer-events-none disabled:opacity-30"
											>
												<ChevronRight size={18} aria-hidden="true" />
											</button>
										</div>
									)}
								</div>
								{(() => {
									const item = newsItems[newsIndex];
									if (!item) return null;
									return (
										<div className="border-t border-white/10">
											<div
												key={item.id}
												onClick={
													item.hasDetailPage
														? () => router.push(`/news/${item.id}`)
														: undefined
												}
												className={`group border-l-2 border-transparent py-4 pl-4 pr-2 transition-all duration-300 ${
													item.hasDetailPage
														? "cursor-pointer hover:border-[hsl(var(--brand))] hover:bg-white/5"
														: ""
												}`}
												{...(item.hasDetailPage && {
													role: "button",
													tabIndex: 0,
													onKeyDown: (e) => {
														if (e.key === "Enter" || e.key === " ") {
															e.preventDefault();
															router.push(`/news/${item.id}`);
														}
													},
													"aria-label": `${item.title}の詳細を見る`,
												})}
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center space-x-4 flex-1">
														<span className="font-mono text-sm text-white/60">
															{item.date}
														</span>
														<h3 className="text-white transition-colors group-hover:text-[hsl(var(--brand))]">
															{item.title}
														</h3>
													</div>
													{item.hasDetailPage && (
														<div className="ml-4 text-white/60 transition-colors group-hover:text-[hsl(var(--brand))]">
															<svg
																width="16"
																height="16"
																viewBox="0 0 16 16"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
																className="transition-transform duration-300 group-hover:translate-x-1"
															>
																<path
																	d="M6 12L10 8L6 4"
																	stroke="currentColor"
																	strokeWidth="2"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
														</div>
													)}
												</div>
											</div>
										</div>
									);
								})()}
							</div>
						</div>
					</div>

					{/* Right Side - 次回 / 直近の演奏会 */}
					<div className="w-full md:w-auto md:shrink-0 pl-6 pr-6 md:pr-14 py-8 flex items-start justify-center mt-8 md:mt-0">
						{featuredConcert && (
							<div className="w-full md:w-[calc((100vh-220px)*0.707)] flex flex-col">
								<h2 className="mb-6 text-2xl font-bold tracking-tight text-white">
									{featuredLabel}
								</h2>
								<div
									onClick={handleConcertClick}
									className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-black/70"
									style={{ aspectRatio: "0.707" }}
									role="button"
									tabIndex={0}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											handleConcertClick();
										}
									}}
									aria-label={`${
										featuredConcert?.title || featuredLabel
									}の詳細を見る`}
								>
									<div className="relative w-full h-full">
										<Image
											src={
												featuredConcert.posterImage?.url || "/placeholder.jpg"
											}
											alt={`${featuredConcert.title} Poster`}
											fill
											className="object-cover transition-transform duration-500 group-hover:scale-105"
											priority
											fetchPriority="high"
											loading="eager"
											sizes="(max-width: 768px) 100vw, 50vw"
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

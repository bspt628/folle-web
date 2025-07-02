"use client";

import Image from "next/image";
import { getUpcomingConcert } from "@/lib/constants/concerts";
import { getNewsItems } from "@/lib/constants/news";
import { useEffect, useState, useRef } from "react";
import { NewsItem } from "@/lib/types";
import { Concert } from "@/lib/types";
import { useRouter, usePathname } from "next/navigation";

export default function HomePage() {
	const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
	const [upcomingConcert, setUpcomingConcert] = useState<Concert | null>(null);
	const [showOverlay, setShowOverlay] = useState(true);
	const [isFadingOut, setIsFadingOut] = useState(false);
	const [newsOffset, setNewsOffset] = useState(0);
	const [isMdScreen, setIsMdScreen] = useState(false);
	const [isLgScreen, setIsLgScreen] = useState(false);
	const newsRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const pathname = usePathname();

	// 画面サイズの監視
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMdScreen(window.innerWidth >= 768);
			setIsLgScreen(window.innerWidth >= 1024);
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	// ニュースセクションの位置調整
	useEffect(() => {
		const updateNewsPosition = () => {
			if (isMdScreen && newsRef.current) {
				const newsHeight = newsRef.current.offsetHeight;
				const bottomPadding = 32; // フッターからの余白
				setNewsOffset(newsHeight + bottomPadding);
			} else {
				setNewsOffset(0);
			}
		};

		updateNewsPosition();
		window.addEventListener("resize", updateNewsPosition);

		return () => {
			window.removeEventListener("resize", updateNewsPosition);
		};
	}, [newsItems, isMdScreen]);

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
		}, 3500);
	}, [pathname]);

	const handleConcertClick = () => {
		if (upcomingConcert) {
			router.push(`/concerts/${upcomingConcert.id}`);
		}
	};

	return (
		<div className="h-screen relative">
			{/* オーバーレイ */}
			{showOverlay && (
				<div className={`overlay ${isFadingOut ? "fade-out" : ""}`}>
					<Image
						src="/logo.png"
						alt="Logo"
						className="logo"
						width={100}
						height={100}
					/>
					<div className="text text-white text-2xl">Orchestra più Folle</div>
				</div>
			)}

			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/gray_back.jpg"
					alt="Orchestra Performance"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/40" />
			</div>

			{/* Content Container */}
			<div className="relative z-10 h-full flex flex-col md:flex-row overflow-y-auto md:overflow-y-hidden pt-20">
				{/* Main Content */}
				<div className="w-full md:w-1/2 h-auto flex flex-col relative">
					{/* Logo and Title */}
					<div className="relative pl-0 py-0 flex justify-center md:justify-start">
						<div className="w-[500px] h-[500px] sm:w-[560px] sm:h-[560px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] relative opacity-40 slow-rotate">
							<Image
								src="/logo.svg"
								alt="Folle Logo"
								fill
								className="object-contain [filter:drop-shadow(0_0_10px_white)_brightness(1.1)]"
								priority
							/>
						</div>

						{/* News Section - Overlapping with Logo */}
						<div
							ref={newsRef}
							className="absolute left-1/2 -translate-x-1/2 lg:left-16 lg:translate-x-0 top-1/2 md:top-auto md:bottom-0 -translate-y-1/2 md:translate-y-0 w-[calc(100%-32px)] md:w-[min(calc(50vw-80px),calc((100vh-200px)*0.707))] lg:w-[min(calc(50vw-96px),calc((100vh-200px)*0.707))]"
							style={{
								transform: `translate(${isLgScreen ? "0" : "-50%"}, ${
									isMdScreen ? `-${newsOffset}px` : "-50%"
								})`,
							}}
						>
							<h2 className="text-2xl font-bold text-white mb-4">
								What&apos;s New
							</h2>
							<div className="space-y-3">
								{newsItems.map((item, index) => (
									<div
										key={index}
										className="bg-white/20 backdrop-blur-md rounded-lg p-5"
									>
										<div className="flex items-center space-x-4">
											<span className="text-white font-mono text-sm">
												{item.date}
											</span>
											<h3 className="text-white font-medium">{item.title}</h3>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Right Side - Upcoming Concert */}
				<div className="w-full md:w-1/2 h-auto md:h-full p-4 md:p-8 flex items-center justify-center">
					{upcomingConcert && (
						<div className="w-[calc(100%-96px)] md:w-[min(calc(50vw-80px),calc((100vh-200px)*0.707))] lg:w-[min(calc(50vw-96px),calc((100vh-200px)*0.707))] h-full flex flex-col">
							<h2 className="text-2xl font-bold text-white mb-6">
								Upcoming Concert
							</h2>
							<div
								onClick={handleConcertClick}
								className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/20 hover:scale-[0.98] cursor-pointer p-5"
								style={{ aspectRatio: "0.707" }}
							>
								<div className="relative w-full h-full">
									<Image
										src={upcomingConcert.posterImage?.url || "/placeholder.jpg"}
										alt={`${upcomingConcert.title} Poster`}
										fill
										className="object-cover rounded-lg"
										priority
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* 代表者挨拶セクション - 非表示 */}
			<div className="hidden">{/* ここに代表者挨拶のコンテンツを入れる */}</div>
		</div>
	);
}

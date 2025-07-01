"use client";

import Image from "next/image";
import { getUpcomingConcert } from "@/lib/constants/concerts";
import { getNewsItems } from "@/lib/constants/news";
import { useEffect, useState } from "react";
import { NewsItem } from "@/lib/types";
import { Concert } from "@/lib/types";
import { useRouter, usePathname } from "next/navigation";

export default function HomePage() {
	const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
	const [upcomingConcert, setUpcomingConcert] = useState<Concert | null>(null);
	const [showOverlay, setShowOverlay] = useState(true);
	const [isFadingOut, setIsFadingOut] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

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
		// const currentUrl = window.location.href;
		// const referrer = document.referrer;
		const isInternalNavigation = prevPath !== null;

		// console.group("Navigation Debug Info");
		// console.log("Navigation Type:", navigationType);
		// console.log("Referrer:", referrer);
		// console.log("Current URL:", currentUrl);
		// console.log("Previous Path:", prevPath);
		// console.log("Current Path:", currentPath);
		// console.log("Is Internal Navigation:", isInternalNavigation);
		// console.log("Is Direct Access:", !isInternalNavigation);
		// console.log("Is Reload:", navigationType === "reload");
		// console.groupEnd();

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
					src="/red_back.jpg"
					alt="Orchestra Performance"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/60" />
			</div>

			{/* Content Container */}
			<div className="relative z-10 h-full flex flex-col md:flex-row overflow-y-auto md:overflow-y-hidden pt-20">
				{/* Left Side */}
				<div className="w-full md:w-1/2 h-auto md:h-full flex flex-col">
					{/* Hero Content */}
					<div className="flex-1 flex items-center justify-center p-8">
						<div className="text-center">
							<h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
								Orchestra più Folle
							</h1>
						</div>
					</div>

					{/* News Section */}
					<div className="p-4 md:p-8">
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
										<span className="text-[#cfa580] font-mono text-sm">
											{item.date}
										</span>
										<h3 className="text-white font-medium">{item.title}</h3>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right Side - Upcoming Concert */}
				<div className="w-full md:w-1/2 h-auto md:h-full p-4 md:p-8 flex items-center justify-center">
					{upcomingConcert && (
						<div className="w-full max-w-[360px]">
							<h2 className="text-2xl font-bold text-white mb-6">
								Upcoming Concert
							</h2>
							<div
								onClick={handleConcertClick}
								className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/20 hover:scale-[0.98] cursor-pointer"
							>
								<div className="p-5">
									<div
										className="relative w-full"
										style={{ aspectRatio: "0.707" }}
									>
										<Image
											src={
												upcomingConcert.posterImage?.url || "/placeholder.jpg"
											}
											alt={`${upcomingConcert.title} Poster`}
											fill
											className="object-cover rounded-lg"
											priority
										/>
									</div>
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

"use client";

import Image from "next/image";
import { Calendar, MapPin, Clock } from "lucide-react";
import { getUpcomingConcert } from "@/lib/constants/concerts";
import { getNewsItems } from "@/lib/constants/news";
import { useEffect, useState } from "react";
import { NewsItem } from "@/lib/types";
import { Concert } from "@/lib/types";

export default function HomePage() {
	const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
	const [upcomingConcert, setUpcomingConcert] = useState<Concert | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const news = getNewsItems();
			const concert = await getUpcomingConcert();
			setNewsItems(news);
			setUpcomingConcert(concert);
		};
		fetchData();

		// アニメーションのタイミングを制御
		const overlay = document.querySelector(".overlay") as HTMLElement;
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
					span.style.color = "white"; // Initial color
					text.appendChild(span);
				});

				let index = 0;
				const interval = setInterval(() => {
					if (index < text.children.length) {
						(text.children[index] as HTMLElement).style.color = "black"; // Change color to white
						index++;
					} else {
						clearInterval(interval);
					}
				}, 100); // Adjust the speed of the color change here
			}
		}, 1000); // Start text animation after logo animation

		setTimeout(() => {
			if (overlay) {
				overlay.classList.add("hidden");
			}
		}, 3500);
	}, []);

	return (
		<div className="h-screen relative">
			{/* オーバーレイ */}
			<div className="overlay">
				<Image
					src="/logo.png"
					alt="Logo"
					className="logo"
					width={100}
					height={100}
				/>
				<div className="text text-white text-2xl">Orchestra più Folle</div>
			</div>

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
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
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
									className="bg-white/20 backdrop-blur-md rounded-lg p-4"
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
				<div className="w-full md:w-1/2 h-auto md:h-full p-4 md:p-8 flex items-center">
					{upcomingConcert && (
						<div className="w-full">
							<h2 className="text-2xl font-bold text-white mb-6">
								Upcoming Concert
							</h2>
							<div
								className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden transition-all duration-300 hover:bg-white/20 cursor-pointer"
								onClick={() =>
									(window.location.href = `/concerts/${upcomingConcert.id}`)
								}
							>
								<div className="relative aspect-[3/2] w-full">
									<Image
										src={upcomingConcert.posterImage?.url || "/placeholder.jpg"}
										alt={`${upcomingConcert.title} Poster`}
										fill
										className="object-cover"
									/>
								</div>
								<div className="p-4 md:p-6">
									<h3 className="text-xl font-bold text-white mb-4">
										{upcomingConcert.title}
									</h3>
									<div className="space-y-3 text-white/90">
										<div className="flex items-center space-x-3">
											<Calendar size={18} className="text-[#cfa580]" />
											<span className="text-sm md:text-base">
												{new Date(upcomingConcert.date).toLocaleDateString(
													"ja-JP",
													{
														year: "numeric",
														month: "long",
														day: "numeric",
														weekday: "long",
													}
												)}
											</span>
										</div>
										<div className="flex items-center space-x-3">
											<Clock size={18} className="text-[#cfa580]" />
											<span className="text-sm md:text-base">
												{upcomingConcert.startTime} 開演 （
												{upcomingConcert.openTime} 開場）
											</span>
										</div>
										<div className="flex items-center space-x-3 flex-nowrap min-w-0">
											<MapPin size={18} className="text-[#cfa580] shrink-0" />
											<span className="text-sm md:text-base truncate">
												{upcomingConcert.venue.name}
											</span>
										</div>
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

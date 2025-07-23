"use client";

import Image from "next/image";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { getNewsById } from "@/lib/constants/news";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NewsItem } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function NewsDetailPage() {
	const params = useParams();
	const router = useRouter();
	const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchNewsItem = async () => {
			const item = getNewsById(params.id as string);
			setNewsItem(item);
			setIsLoading(false);
		};

		fetchNewsItem();
	}, [params.id]);

	if (isLoading) {
		return (
			<div className="h-screen relative">
				<div className="absolute inset-0 z-0">
					<Image
						src="/gray_back.jpg"
						alt="Background"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black/50" />
				</div>
				<div className="relative z-10 pt-20">
					<div className="container mx-auto px-4 py-16">
						<div className="text-center text-white">Loading...</div>
					</div>
				</div>
			</div>
		);
	}

	if (!newsItem) {
		return (
			<div className="h-screen relative">
				<div className="absolute inset-0 z-0">
					<Image
						src="/gray_back.jpg"
						alt="Background"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black/50" />
				</div>
				<div className="relative z-10 pt-20">
					<div className="container mx-auto px-4 py-16">
						<div className="text-center">
							<h1 className="text-2xl font-bold text-white mb-4">
								ニュースが見つかりません
							</h1>
							<Button
								onClick={() => router.push("/")}
								variant="outline"
								className="bg-white/20 hover:bg-white/30 text-white border-white/30"
							>
								ホームに戻る
							</Button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen relative">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/gray_back.jpg"
					alt="Background"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/50" />
			</div>

			{/* Content */}
			<div className="relative z-10 pt-20">
				<section className="py-16">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto">
							{/* Back Button */}
							<div className="mb-8">
								<Button
									onClick={() => router.back()}
									variant="outline"
									className="bg-white/20 hover:bg-white/30 text-white border-white/30 flex items-center gap-2"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M10 12L6 8L10 4"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									戻る
								</Button>
							</div>

							{/* News Content */}
							<div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
								{/* Date */}
								<div className="mb-4">
									<span className="text-white/70 font-mono text-sm">
										{format(
											parseISO(newsItem.date.replace(/\./g, "-")),
											"yyyy年MM月dd日",
											{
												locale: ja,
											}
										)}
									</span>
								</div>

								{/* Title */}
								<h1
									className="text-2xl lg:text-3xl font-bold text-white mb-8 break-words"
									style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
								>
									{newsItem.title}
								</h1>

								{/* Content */}
								{newsItem.content && (
									<div className="text-white/90 leading-relaxed mb-8">
										{newsItem.content.split("\n").map((paragraph, index) => (
											<p
												key={index}
												className="mb-4 last:mb-0"
												style={{
													wordBreak: "break-all",
													overflowWrap: "anywhere",
												}}
											>
												{paragraph}
											</p>
										))}
									</div>
								)}

								{/* External Links */}
								{newsItem.links && newsItem.links.length > 0 && (
									<div>
										<h4
											className="text-lg font-bold text-white mb-4"
											style={{
												wordBreak: "break-all",
												overflowWrap: "anywhere",
											}}
										>
											関連リンク
										</h4>
										<div className="space-y-3">
											{newsItem.links.map((link, index) => (
												<a
													key={index}
													href={link.url}
													target="_blank"
													rel="noopener noreferrer"
													className="block"
												>
													<Button
														variant="outline"
														className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 justify-start text-left h-auto py-3 px-4"
														style={{
															wordBreak: "break-all",
															overflowWrap: "anywhere",
															whiteSpace: "normal",
														}}
													>
														<div
															className="flex items-start justify-between w-full gap-3"
															style={{ minWidth: 0 }}
														>
															<span
																className="break-words text-left flex-1 leading-relaxed"
																style={{
																	wordBreak: "break-all",
																	overflowWrap: "anywhere",
																	minWidth: 0,
																}}
															>
																{link.title}
															</span>
															<svg
																width="16"
																height="16"
																viewBox="0 0 16 16"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
																className="flex-shrink-0 mt-0.5"
															>
																<path
																	d="M12 4L4 12M12 4H8M12 4V8"
																	stroke="currentColor"
																	strokeWidth="2"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
														</div>
													</Button>
												</a>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

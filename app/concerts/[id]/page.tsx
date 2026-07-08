"use client";

import Image from "next/image";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { useConcert } from "@/lib/hooks/useConcerts";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isVideoPublished } from "@/lib/utils";
import Head from "next/head";

export default function ConcertDetailPage() {
	const params = useParams();
	const { concert, isLoading } = useConcert(params.id as string);

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

	if (!concert) {
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
						<div className="text-center text-white">Concert not found</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			{concert && (
				<Head>
					<title>{concert.title} | Orchestra più Folle</title>
					<meta
						name="description"
						content={
							concert.description || `${concert.title}の演奏会情報です。`
						}
					/>
					<meta
						property="og:title"
						content={`${concert.title} | Orchestra più Folle`}
					/>
					<meta
						property="og:description"
						content={
							concert.description || `${concert.title}の演奏会情報です。`
						}
					/>
					<meta property="og:type" content="event" />
					<meta
						property="og:url"
						content={`https://orchestrapiufolle.com/concerts/${concert.id}`}
					/>
					<meta property="og:site_name" content="Orchestra più Folle" />
					{concert.posterImage?.url && (
						<meta
							property="og:image"
							content={`https://orchestrapiufolle.com${concert.posterImage.url}`}
						/>
					)}
					<meta name="twitter:card" content="summary_large_image" />
					<meta
						name="twitter:title"
						content={`${concert.title} | Orchestra più Folle`}
					/>
					<meta
						name="twitter:description"
						content={
							concert.description || `${concert.title}の演奏会情報です。`
						}
					/>
					{concert.posterImage?.url && (
						<meta
							name="twitter:image"
							content={`https://orchestrapiufolle.com${concert.posterImage.url}`}
						/>
					)}
				</Head>
			)}
			<div className="min-h-screen relative">
				{/* Content（背景はレイアウトの固定背景を使用） */}
				<div className="relative z-10 pt-20">
					<section className="py-16">
						<div className="container mx-auto px-4">
							<div className="max-w-6xl mx-auto">
								<div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
										{/* ポスター画像 */}
										<div className="w-full lg:w-auto shrink-0">
											<div
												className="relative mx-auto w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 lg:w-[360px]"
												style={{ aspectRatio: "0.707" }}
											>
												<Image
													src={concert.posterImage?.url || "/placeholder.jpg"}
													alt={`${concert.title} Poster`}
													fill
													className="object-cover"
													priority
													fetchPriority="high"
													loading="eager"
													sizes="(max-width: 1024px) 100vw, 360px"
												/>
											</div>
										</div>

										{/* コンサート情報 */}
										<div className="flex-1">
											<h1 className="text-xl font-bold text-white mb-6 break-words">
												{concert.title}
											</h1>
											<div className="space-y-4 text-white/90 mb-8">
												<div className="space-y-1">
													<div className="flex flex-wrap items-baseline gap-x-3">
														<span className="text-white font-bold w-12">
															日時:
														</span>
														<span className="break-all">
															{format(
																parseISO(concert.date),
																"yyyy/MM/dd (E)",
																{
																	locale: ja,
																}
															)}
														</span>
													</div>
													{concert.openTime && (
														<div className="flex flex-wrap items-baseline gap-x-3">
															<span className="text-white font-bold w-12">
																開場:
															</span>
															<span className="break-all">
																{concert.openTime}
															</span>
														</div>
													)}
													{concert.startTime && (
														<div className="flex flex-wrap items-baseline gap-x-3">
															<span className="text-white font-bold w-12">
																開演:
															</span>
															<span className="break-all">
																{concert.startTime}
															</span>
														</div>
													)}
													<div className="flex flex-wrap items-baseline gap-x-3">
														<span className="text-white font-bold w-12">
															場所:
														</span>
														<span className="break-all">
															{concert.venue.name}
														</span>
													</div>
													<div className="flex flex-wrap items-baseline gap-x-3">
														<span className="text-white font-bold w-12">
															指揮:
														</span>
														<span className="break-all">
															{concert.conductor}
														</span>
													</div>
												</div>
											</div>

											{/* プログラム */}
											{concert.program && concert.program.length > 0 && (
												<div className="mb-8">
													<h4 className="text-lg font-bold text-white mb-4">
														プログラム
													</h4>
													<ul className="space-y-2">
														{concert.program.map((item, index) => (
															<li key={index} className="text-white/90">
																<span className="font-medium">
																	{item.composer && item.title
																		? `${item.composer}: ${item.title}`
																		: item.composer || item.title}
																</span>
															</li>
														))}
													</ul>
												</div>
											)}

											{/* 演奏会詳細 */}
											{concert.description && (
												<div className="mb-8">
													<h4 className="text-lg font-bold text-white mb-4">
														演奏会詳細
													</h4>
													<p className="text-white/90 leading-relaxed">
														{concert.description}
													</p>
												</div>
											)}

											{/* チケット情報 */}
											<div className="space-y-4">
												<h4 className="text-lg font-bold text-white mb-4">
													チケット情報
												</h4>
												{concert.ticketPrice &&
													concert.ticketPrice.length > 0 && (
														<div className="space-y-2">
															{concert.ticketPrice.map((ticket, index) => (
																<div
																	key={index}
																	className="flex justify-between items-center text-white/90"
																>
																	<span>{ticket.category}</span>
																	{ticket.price !== null && (
																		<span className="font-medium">
																			¥{ticket.price.toLocaleString()}
																		</span>
																	)}
																</div>
															))}
														</div>
													)}
												{concert.teketUrl ? (
													<a
														href={concert.teketUrl}
														target="_blank"
														rel="noopener noreferrer"
														className="mt-8 flex justify-center"
														aria-label="Teketで演奏会のチケットを予約する（新しいタブで開きます）"
													>
														<Button
															variant="outline"
															className="w-full bg-[hsl(var(--primary))] hover:brightness-110 text-[hsl(var(--primary-foreground))] border-0 relative py-3 group flex items-center gap-0"
														>
															<div className="w-[108px] h-[42px] relative">
																<Image
																	src="/teket-logo-v-white.svg"
																	alt="Teket Logo"
																	fill
																	className="object-contain"
																	aria-hidden="true"
																/>
															</div>
															<span className="-ml-4">で予約する</span>
														</Button>
													</a>
												) : (
													<div className="relative group">
														<Button
															variant="outline"
															className="w-full bg-[hsl(var(--primary))] hover:brightness-105 text-[hsl(var(--primary-foreground))] border-0 cursor-not-allowed opacity-80 relative py-3 group flex items-center gap-0"
															disabled
															aria-label="チケット予約は近日公開予定です"
														>
															<div className="w-[108px] h-[42px] relative">
																<Image
																	src="/teket-logo-v-white.svg"
																	alt="Teket Logo"
																	fill
																	className="object-contain"
																	aria-hidden="true"
																/>
															</div>
															<span className="-ml-4">で予約する</span>
														</Button>
														<span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 text-white text-sm rounded-md whitespace-nowrap after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-black/90">
															Coming Soon
														</span>
													</div>
												)}

												{/* 演奏動画をチラ見せ */}
												{concert.youtubeVideos &&
													concert.youtubeVideos.length > 0 && (
														<div className="mb-8">
															<h4 className="text-lg font-bold text-white mb-4">
																演奏動画をチラ見せ👀
															</h4>
															<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
																{concert.youtubeVideos
																	.filter((video) =>
																		isVideoPublished(video.publishDate)
																	)
																	.map((video, index) => (
																		<div key={index} className="space-y-3">
																			<h5 className="text-sm font-medium text-white/90 text-center">
																				{video.title}
																			</h5>
																			<div className="flex justify-center">
																				<div
																					className="relative w-full max-w-[280px]"
																					style={{ aspectRatio: "9/16" }}
																				>
																					<iframe
																						src={video.url}
																						title={video.title}
																						className="absolute inset-0 w-full h-full rounded-lg"
																						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
																						allowFullScreen
																					/>
																				</div>
																			</div>
																		</div>
																	))}
															</div>
														</div>
													)}
											</div>
										</div>
									</div>
								</div>
						</div>
					</section>
				</div>
			</div>
		</>
	);
}

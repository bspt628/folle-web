"use client";

import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { getAllConcerts } from "@/lib/constants/concerts";
import { PageContainer } from "@/components/ui/page-container";

export default function ConcertsPage() {
	const concerts = getAllConcerts().sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	return (
		<PageContainer>
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-white text-center mb-12">
						Concerts
					</h1>

					<div className="max-w-md mx-auto space-y-8">
						{concerts.map((concert) => (
							<Link key={concert.id} href={`/concerts/${concert.id}`}>
								<div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden hover:bg-white/20 transition-all cursor-pointer">
									<div className="p-5">
										<div
											className="relative w-full"
											style={{ aspectRatio: "0.707" }}
										>
											{concert.posterImage?.url && (
												<Image
													src={concert.posterImage.url}
													alt={concert.title || ""}
													fill
													className="object-cover rounded-lg"
													priority
												/>
											)}
											{new Date(concert.date) > new Date() ? (
												<div className="absolute top-4 right-4 bg-[var(--accent-green)] text-black px-3 py-1 rounded-full text-sm font-semibold">
													開催予定
												</div>
											) : (
												<div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-semibold">
													終演
												</div>
											)}
										</div>
									</div>

									<div className="p-5">
										<h2 className="text-xl font-bold text-white mb-6 break-words">
											{concert.title}
										</h2>

										<div className="space-y-1">
											<div className="flex flex-wrap items-baseline gap-x-2">
												<span className="text-white font-bold w-10">日時:</span>
												<span className="break-all text-white">
													{format(parseISO(concert.date), "yyyy.MM.dd(E)", {
														locale: ja,
													})}
												</span>
											</div>

											{concert.openTime && (
												<div className="flex flex-wrap items-baseline gap-x-2">
													<span className="text-white font-bold w-10">
														開場:
													</span>
													<span className="break-all text-white">
														{concert.openTime}
													</span>
												</div>
											)}

											{concert.startTime && (
												<div className="flex flex-wrap items-baseline gap-x-2">
													<span className="text-white font-bold w-10">
														開演:
													</span>
													<span className="break-all text-white">
														{concert.startTime}
													</span>
												</div>
											)}

											{concert.venue?.name && (
												<div className="flex flex-wrap items-baseline gap-x-2">
													<span className="text-white font-bold w-10">
														場所:
													</span>
													<span className="break-all text-white">
														{concert.venue.name}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
		</PageContainer>
	);
}

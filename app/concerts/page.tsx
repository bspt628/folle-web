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
							<Link
								key={concert.id}
								href={`/concerts/${concert.id}`}
								aria-label={`${concert.title || "演奏会"}の詳細を見る`}
							>
								<div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden hover:bg-white/20 hover:scale-[0.98] transition-all cursor-pointer">
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
													fetchPriority="high"
													loading="eager"
												/>
											)}
											{new Date(concert.date) > new Date() ? (
												<div className="absolute top-4 right-4 bg-[#FFD700]/50 text-black px-3 py-1 rounded-full text-sm font-semibold">
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
										<div className="flex justify-between items-center">
											<h2 className="text-xl font-bold text-white break-words">
												{concert.title}
											</h2>
											<span className="text-white">
												{format(parseISO(concert.date), "yyyy/MM/dd (E)", {
													locale: ja,
												})}
											</span>
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

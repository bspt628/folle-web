"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
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

					<div className="max-w-4xl mx-auto space-y-8">
						{concerts.map((concert) => (
							<Link key={concert.id} href={`/concerts/${concert.id}`}>
								<div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden hover:bg-white/20 transition-all cursor-pointer">
									<div className="relative aspect-[3/2] w-full">
										{concert.posterImage?.url && (
											<Image
												src={concert.posterImage.url}
												alt={concert.title || ""}
												fill
												className="object-cover"
												priority
											/>
										)}
										{new Date(concert.date) > new Date() ? (
											<div className="absolute top-4 right-4 bg-[#cfa580] text-white px-3 py-1 rounded-full text-sm font-semibold">
												開催予定
											</div>
										) : (
											<div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-semibold">
												終演
											</div>
										)}
									</div>

									<div className="p-6">
										<h2 className="text-2xl font-bold text-white mb-6">
											{concert.title}
										</h2>

										<div className="space-y-4">
											{concert.date && (
												<div className="flex items-center space-x-2 text-white/90">
													<Calendar size={20} className="text-[#cfa580]" />
													<span>
														{format(
															parseISO(concert.date),
															"yyyy年MM月dd日(E)",
															{
																locale: ja,
															}
														)}
													</span>
												</div>
											)}

											{concert.openTime && concert.startTime && (
												<div className="flex items-center space-x-2 text-white/90">
													<Clock size={20} className="text-[#cfa580]" />
													<span>
														開場 {concert.openTime} / 開演 {concert.startTime}
													</span>
												</div>
											)}

											{concert.venue?.name && (
												<div className="flex items-center space-x-2 text-white/90">
													<MapPin size={20} className="text-[#cfa580]" />
													<span>{concert.venue.name}</span>
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

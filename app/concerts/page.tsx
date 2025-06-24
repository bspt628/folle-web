"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { getAllConcerts } from "@/lib/constants/concerts";

export default function ConcertsPage() {
	const concerts = getAllConcerts().sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	return (
		<div className="pt-20">
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h1 className="page-title text-gray-800 text-center mb-12">
						Concerts
					</h1>

					<div className="max-w-4xl mx-auto space-y-8">
						{concerts.map((concert) => (
							<Link key={concert.id} href={`/concerts/${concert.id}`}>
								<Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
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
										{new Date(concert.date) > new Date() && (
											<div className="absolute top-4 right-4 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-sm font-semibold">
												開催予定
											</div>
										)}
									</div>

									<CardHeader>
										<CardTitle className="text-2xl text-gray-800">
											{concert.title}
										</CardTitle>
									</CardHeader>

									<CardContent>
										<div className="space-y-4">
											{concert.date && (
												<div className="flex items-center space-x-2 text-gray-600">
													<Calendar size={20} />
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
												<div className="flex items-center space-x-2 text-gray-600">
													<Clock size={20} />
													<span>
														開場 {concert.openTime} / 開演 {concert.startTime}
													</span>
												</div>
											)}

											{concert.venue?.name && (
												<div className="flex items-center space-x-2 text-gray-600">
													<MapPin size={20} />
													<span>{concert.venue.name}</span>
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}

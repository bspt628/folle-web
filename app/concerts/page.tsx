"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { useUpcomingConcert } from "@/lib/hooks/useConcerts";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";

export default function ConcertsPage() {
	const { concert, isLoading, error } = useUpcomingConcert();

	if (isLoading) {
		return (
			<div className="pt-20">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center">Loading...</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="pt-20">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center text-red-500">エラーが発生しました</div>
				</div>
			</div>
		);
	}

	if (!concert) {
		return (
			<div className="pt-20">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center">開催予定の演奏会はありません</div>
				</div>
			</div>
		);
	}

	return (
		<div className="pt-20">
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h1 className="font-serif text-4xl font-bold text-gray-800 text-center mb-12">
						Concerts
					</h1>

					<div className="max-w-4xl mx-auto">
						<Link href={`/concerts/${concert.id}`}>
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
									<div className="absolute top-4 right-4 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-sm font-semibold">
										開催予定
									</div>
								</div>

								<CardHeader>
									<CardTitle className="font-serif text-2xl text-gray-800">
										{concert.title}
									</CardTitle>
								</CardHeader>

								<CardContent>
									<div className="space-y-4">
										{concert.date && (
											<div className="flex items-center space-x-2 text-gray-600">
												<Calendar size={20} />
												<span>
													{format(parseISO(concert.date), "yyyy-MM-dd", {
														locale: ja,
													})}
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
											<div className="text-gray-600">
												会場: {concert.venue.name}
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}

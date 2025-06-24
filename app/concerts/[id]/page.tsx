"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Ticket, MapPin } from "lucide-react";
import { useConcert } from "@/lib/hooks/useConcerts";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ConcertDetailPage() {
	const params = useParams();
	const { concert, isLoading } = useConcert(params.id as string);

	if (isLoading) {
		return (
			<div className="pt-20">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center">Loading...</div>
				</div>
			</div>
		);
	}

	if (!concert) {
		return (
			<div className="pt-20">
				<div className="container mx-auto px-4 py-16">
					<div className="text-center">Concert not found</div>
				</div>
			</div>
		);
	}

	return (
		<div className="pt-20">
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto">
						<div className="lg:flex lg:space-x-12">
							{/* Poster */}
							<div className="lg:w-1/2 mb-8 lg:mb-0">
								{concert.posterImage?.url && (
									<Card className="overflow-hidden">
										<Image
											src={concert.posterImage.url}
											alt={concert.title || ""}
											width={450}
											height={600}
											className="w-full h-auto"
										/>
									</Card>
								)}
							</div>

							{/* Concert Details */}
							<div className="lg:w-1/2">
								<h1 className="page-title text-gray-800 mb-8">
									{concert.title}
								</h1>

								<Card className="mb-8">
									<CardContent className="p-6 space-y-4">
										{concert.date && (
											<div className="flex items-center space-x-3">
												<Calendar className="text-[#002060]" size={20} />
												<span className="text-gray-800 font-medium">
													{format(parseISO(concert.date), "yyyy年MM月dd日(E)", {
														locale: ja,
													})}
												</span>
											</div>
										)}

										{concert.openTime && concert.startTime && (
											<div className="flex items-center space-x-3">
												<Clock className="text-[#002060]" size={20} />
												<span className="text-gray-800 font-medium">
													{concert.startTime}開演（{concert.openTime}開場）
												</span>
											</div>
										)}

										{concert.venue?.name && (
											<div className="flex items-center space-x-3">
												<MapPin className="text-[#002060]" size={20} />
												<span className="text-gray-800 font-medium">
													{concert.venue.name}
												</span>
											</div>
										)}

										{concert.program.length > 0 && (
											<div className="mt-6">
												<h3 className="text-xl font-semibold mb-4">
													プログラム
												</h3>
												<ul className="space-y-3">
													{concert.program.map((item, index) => (
														<li key={index} className="text-gray-700">
															<span className="font-semibold">
																{item.composer}
															</span>
															{item.title && <> / {item.title}</>}
														</li>
													))}
												</ul>
											</div>
										)}
									</CardContent>
								</Card>

								{/* Concert Description */}
								{concert.description && (
									<Card className="mb-8">
										<CardContent className="p-6">
											<h3 className="text-xl font-semibold text-gray-800 mb-4">
												演奏会について
											</h3>
											<p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
												{concert.description}
											</p>
										</CardContent>
									</Card>
								)}

								{/* Ticket Information */}
								{concert.ticketPrice && concert.ticketPrice.length > 0 && (
									<Card>
										<CardContent className="p-6">
											<div className="flex items-center justify-between mb-4">
												<div className="flex items-center space-x-3">
													<Ticket className="text-[#002060]" size={20} />
													<h3 className="text-xl font-semibold text-gray-800">
														チケット情報
													</h3>
												</div>
												{concert.teketUrl && (
													<a
														href={concert.teketUrl}
														target="_blank"
														rel="noopener noreferrer"
													>
														<Button
															variant="outline"
															className="bg-gray-900 text-white hover:bg-gray-800 border-0"
														>
															<Ticket className="w-4 h-4 mr-2" />
															チケット
														</Button>
													</a>
												)}
											</div>
											<div className="space-y-2">
												{concert.ticketPrice.map((ticket, index) => (
													<div
														key={index}
														className="flex justify-between items-center"
													>
														<span className="text-gray-700">
															{ticket.category}
														</span>
														{ticket.price !== null && (
															<span className="font-medium">
																¥{ticket.price.toLocaleString()}
															</span>
														)}
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

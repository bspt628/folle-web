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
			<div className="h-screen relative">
				<div className="absolute inset-0 z-0">
					<Image
						src="/red_back.jpg"
						alt="Background"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black/60" />
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
						src="/red_back.jpg"
						alt="Background"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black/60" />
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
		<div className="min-h-screen relative">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/red_back.jpg"
					alt="Background"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/60" />
			</div>

			{/* Content */}
			<div className="relative z-10 pt-20">
				<section className="py-16">
					<div className="container mx-auto px-4">
						<div className="max-w-6xl mx-auto">
							<div className="lg:flex lg:space-x-12">
								{/* Poster */}
								<div className="lg:w-1/2 mb-8 lg:mb-0">
									{concert.posterImage?.url && (
										<Card className="overflow-hidden bg-white/10 backdrop-blur-md">
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
									<h1 className="text-3xl font-bold text-white mb-8">
										{concert.title}
									</h1>

									<Card className="mb-8 bg-white/10 backdrop-blur-md">
										<CardContent className="p-6 space-y-4">
											{concert.date && (
												<div className="flex items-center space-x-3">
													<Calendar className="text-[#cfa580]" size={20} />
													<span className="text-white font-medium">
														{format(
															parseISO(concert.date),
															"yyyy年MM月dd日 (E)",
															{
																locale: ja,
															}
														)}
													</span>
												</div>
											)}

											{concert.openTime && concert.startTime && (
												<div className="flex items-center space-x-3">
													<Clock className="text-[#cfa580]" size={20} />
													<span className="text-white font-medium">
														{concert.startTime} 開演 （{concert.openTime} 開場）
													</span>
												</div>
											)}

											{concert.venue?.name && (
												<div className="flex items-start space-x-2 text-white/90">
													<MapPin
														size={20}
														className="text-[#cfa580] shrink-0 mt-1"
													/>
													<div className="break-words whitespace-pre-wrap">
														{concert.venue.name}
													</div>
												</div>
											)}

											{concert.program.length > 0 && (
												<div className="mt-6">
													<h3 className="text-xl font-semibold mb-4 text-white">
														プログラム
													</h3>
													<ul className="space-y-3">
														{concert.program.map((item, index) => (
															<li key={index} className="text-white/90">
																<span className="font-semibold">
																	{item.composer}
																</span>
																{item.title && <>: {item.title}</>}
															</li>
														))}
													</ul>
												</div>
											)}
										</CardContent>
									</Card>

									{/* Concert Description */}
									{concert.description && (
										<Card className="mb-8 bg-white/10 backdrop-blur-md">
											<CardContent className="p-6">
												<div className="text-white/90 leading-loose jp-text-optimize">
													{concert.description
														.split("\n")
														.map((paragraph, index) => (
															<p
																key={index}
																className="indent-4 mb-4 last:mb-0"
															>
																{paragraph}
															</p>
														))}
												</div>
											</CardContent>
										</Card>
									)}

									{/* Ticket Information */}
									{concert.ticketPrice && concert.ticketPrice.length > 0 && (
										<Card className="bg-white/10 backdrop-blur-md">
											<CardContent className="p-6">
												<div className="flex items-center mb-4">
													<Ticket className="text-[#cfa580]" size={20} />
													<h3 className="text-xl font-semibold text-white ml-3">
														チケット情報
													</h3>
												</div>
												<div className="space-y-2 mb-6">
													{concert.ticketPrice.map((ticket, index) => (
														<div
															key={index}
															className="flex justify-between items-center"
														>
															<span className="text-white/90">
																{ticket.category}
															</span>
															{ticket.price !== null && (
																<span className="font-medium text-white">
																	¥{ticket.price.toLocaleString()}
																</span>
															)}
														</div>
													))}
												</div>
												<div className="relative group">
													{concert.teketUrl ? (
														<a
															href={concert.teketUrl}
															target="_blank"
															rel="noopener noreferrer"
															className="block w-full"
														>
															<Button
																variant="outline"
																className="w-full bg-[#b04940] hover:bg-[#c27f62] text-white border-0"
															>
																<Ticket className="w-4 h-4 mr-2" />
																チケット予約
															</Button>
														</a>
													) : (
														<>
															<Button
																variant="outline"
																className="w-full bg-[#b04940] hover:bg-[#c27f62] text-white border-0 cursor-not-allowed opacity-80"
																disabled
															>
																<Ticket className="w-4 h-4 mr-2" />
																チケット予約
															</Button>
															<span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 text-white text-sm rounded-md whitespace-nowrap after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-black/90">
																Coming Soon
															</span>
														</>
													)}
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
		</div>
	);
}

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";
import { getUpcomingConcert } from "@/lib/constants/concerts";
import Link from "next/link";

export default async function HomePage() {
	const newsItems = [
		{
			date: "2025.06.30",
			title: "Orchestra più folleのWebサイトを公開しました",
		},
	];

	const upcomingConcert = await getUpcomingConcert();

	return (
		<div>
			{/* Hero Section */}
			<section className="relative h-screen flex items-center justify-center">
				<div className="absolute inset-0 z-0">
					<Image
						src="/hero.jpg"
						alt="Orchestra Performance"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black/40" />
				</div>

				<div className="relative z-10 text-center text-white px-4">
					<h1 className="page-title mb-6">Orchestra più folle</h1>
					<p className="text-xl md:text-2xl font-light tracking-wide">
						最高の演奏をあなたと。
					</p>
				</div>
			</section>

			{/* What's New Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<h2 className="section-title text-gray-800 mb-8">What&apos;s New</h2>

					<div className="space-y-4">
						{newsItems.map((item, index) => (
							<Card key={index}>
								<CardContent className="flex items-center p-6">
									<div className="flex items-center space-x-4">
										<span className="text-[#002060] font-mono text-sm">
											{item.date}
										</span>
										<h3 className="text-gray-800 font-medium">{item.title}</h3>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Next Concert Section */}
			{upcomingConcert && (
				<section className="py-16">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
							Next Concert
						</h2>

						<Card className="max-w-4xl mx-auto overflow-hidden">
							<div className="md:flex">
								<div className="md:w-1/2">
									<Image
										src={upcomingConcert.posterImage?.url || "/placeholder.jpg"}
										alt={`${upcomingConcert.title} Poster`}
										width={600}
										height={400}
										className="w-full h-64 md:h-full object-cover"
									/>
								</div>
								<div className="md:w-1/2 p-8">
									<CardHeader className="p-0 mb-6">
										<CardTitle className="text-2xl text-gray-800">
											{upcomingConcert.title}
										</CardTitle>
									</CardHeader>
									<CardContent className="p-0 space-y-4">
										<div className="flex items-center space-x-3 text-gray-600">
											<Calendar size={20} />
											<span>
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
										<div className="flex items-center space-x-3 text-gray-600">
											<Clock size={20} />
											<span>
												{upcomingConcert.startTime}開演（
												{upcomingConcert.openTime}開場）
											</span>
										</div>
										<div className="flex items-center space-x-3 text-gray-600">
											<MapPin size={20} />
											<span>{upcomingConcert.venue.name}</span>
										</div>

										<div className="mt-6">
											<h4 className="font-semibold text-gray-800 mb-2">
												プログラム
											</h4>
											<ul className="text-gray-600 space-y-1">
												{upcomingConcert.program.map((item, index) => (
													<li key={index}>
														{item.composer} / {item.title}
													</li>
												))}
											</ul>
										</div>

										<div className="mt-8">
											<Link href={`/concerts/${upcomingConcert.id}`}>
												<Button className="bg-[#002060] hover:bg-[#001040] text-white">
													詳細はこちら
												</Button>
											</Link>
										</div>
									</CardContent>
								</div>
							</div>
						</Card>
					</div>
				</section>
			)}
		</div>
	);
}

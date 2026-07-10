"use client";

import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { getAllConcerts } from "@/lib/constants/concerts";
import { PageContainer } from "@/components/ui/page-container";
import Head from "next/head";

export default function ConcertsPage() {
	const concerts = getAllConcerts().sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	return (
		<>
			<Head>
				<title>Concerts | Orchestra più Folle</title>
				<meta
					name="description"
					content="Orchestra più Folle（オーケストラ ピウ フォーレ）の演奏会情報をお届けします。"
				/>
				<meta property="og:title" content="Concerts | Orchestra più Folle" />
				<meta
					property="og:description"
					content="Orchestra più Folle（オーケストラ ピウ フォーレ）の演奏会情報をお届けします。"
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content="https://orchestrapiufolle.com/concerts"
				/>
				<meta property="og:site_name" content="Orchestra più Folle" />
				<meta
					property="og:image"
					content="https://orchestrapiufolle.com/567993919410012183.jpg"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Concerts | Orchestra più Folle" />
				<meta
					name="twitter:description"
					content="Orchestra più Folle（オーケストラ ピウ フォーレ）の演奏会情報をお届けします。"
				/>
				<meta
					name="twitter:image"
					content="https://orchestrapiufolle.com/567993919410012183.jpg"
				/>
			</Head>
			<PageContainer>
				<section className="py-16">
					<div className="container mx-auto px-4">
						<h1 className="mb-14 text-center text-4xl font-bold tracking-tight text-white">
							演奏会
						</h1>

						<div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
							{concerts.map((concert) => (
								<Link
									key={concert.id}
									href={`/concerts/${concert.id}`}
									aria-label={`${concert.title || "演奏会"}の詳細を見る`}
									className="group block h-full"
								>
									<article className="flex h-full flex-col">
										<div
											className="relative w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-black/70"
											style={{ aspectRatio: "0.707" }}
										>
											{concert.posterImage?.url && (
												<Image
													src={concert.posterImage.url}
													alt={concert.title || ""}
													fill
													className="object-cover transition-transform duration-500 group-hover:scale-105"
													priority
													fetchPriority="high"
													loading="eager"
												/>
											)}
										</div>

										<div className="relative mt-5 pl-5">
											{/* 装飾アクセント: グラデーションの縦バー＋グロウする起点ノード */}
											<span
												aria-hidden="true"
												className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-gradient-to-b from-[hsl(var(--brand))] via-[hsl(var(--brand))]/60 to-transparent transition-all duration-300 group-hover:top-0 group-hover:bottom-0"
											/>
											<span
												aria-hidden="true"
												className="absolute -left-[3px] top-0.5 h-2.5 w-2.5 rounded-full bg-[hsl(var(--brand))] ring-2 ring-[hsl(var(--brand))]/25 shadow-[0_0_10px_hsl(var(--brand))] transition-transform duration-300 group-hover:scale-125"
											/>
											<span
												className="block text-sm tracking-wider text-white/70"
												style={{
													fontFamily:
														'"游ゴシック体", "Yu Gothic", YuGothic, "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", sans-serif',
												}}
											>
												{format(parseISO(concert.date), "yyyy/MM/dd (E)", {
													locale: ja,
												})}
											</span>
											<h2 className="mt-1 text-lg font-bold text-white break-words transition-colors group-hover:text-[hsl(var(--brand))]">
												{concert.title}
											</h2>
										</div>
									</article>
								</Link>
							))}
						</div>
					</div>
				</section>
			</PageContainer>
		</>
	);
}

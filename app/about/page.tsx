import { PageContainer } from "@/components/ui/page-container";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Head from "next/head";

export default function AboutPage() {
	return (
		<>
			<Head>
				<title>About Us | Orchestra più Folle</title>
				<meta
					name="description"
					content="Orchestra più Folle（オーケストラ ピウ フォーレ）について。東京大学音楽部管弦楽団の団員とOBOGを中心に2025年に結成されたオーケストラです。"
				/>
				<meta property="og:title" content="About Us | Orchestra più Folle" />
				<meta
					property="og:description"
					content="Orchestra più Folle（オーケストラ ピウ フォーレ）について。東京大学音楽部管弦楽団の団員とOBOGを中心に2025年に結成されたオーケストラです。"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://orchestrapiufolle.com/about" />
				<meta property="og:site_name" content="Orchestra più Folle" />
				<meta
					property="og:image"
					content="https://orchestrapiufolle.com/567993919410012183.jpg"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="About Us | Orchestra più Folle" />
				<meta
					name="twitter:description"
					content="Orchestra più Folle（オーケストラ ピウ フォーレ）について。東京大学音楽部管弦楽団の団員とOBOGを中心に2025年に結成されたオーケストラです。"
				/>
				<meta
					name="twitter:image"
					content="https://orchestrapiufolle.com/567993919410012183.jpg"
				/>
			</Head>
			<PageContainer>
				{/* About Section */}
				<section className="py-16">
					<div className="container mx-auto px-4">
						<div className="max-w-4xl mx-auto">
							<div className="mb-14 text-center">
								<span className="eyebrow mb-3">Who We Are</span>
								<h1 className="heading-accent text-4xl font-bold tracking-tight text-white">
									About Us
								</h1>
							</div>

							<Card className="overflow-hidden rounded-3xl border-0 bg-black/25 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur-xl">
								<div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 md:items-start">
									{/* Logo - web版では左 */}
									<div className="w-2/3 mx-auto md:w-1/3 md:mx-0 shrink-0">
										<Image
											src="/567993919410012183.jpg"
											alt="Orchestra più Folle Logo"
											width={0}
											height={0}
											sizes="(min-width: 768px) 33vw, 66vw"
											className="w-full h-auto object-contain rounded-2xl"
											priority
										/>
									</div>

									{/* Content - web版では右 */}
									<div className="flex-1 space-y-4">
										<p className="text-lg text-white leading-[1.8] jp-text-optimize indent-4">
											「Orchestra più Folle
											(Fオケ)」は、東京大学音楽部管弦楽団の団員とOBOGを中心に2025年に結成されたオーケストラです。
											「più
											Folle」はイタリア語で「もっと熱狂的に」という意味を持ちます。この名前には、一人ひとり個性を待った団員が音楽と向き合い、熱狂的に音を紡ぐという意味合いが込められています。
											若く熱狂的な演奏で、クラシック音楽の魅力を一歩踏み込んでお届けします。
										</p>
										<p className="text-lg text-white leading-[1.8] jp-text-optimize indent-4">
											ロゴマークは、躍動感あふれる音符をモチーフにしています。中央に配置された流れるようなラインは、私たちが奏でる音楽のハーモニーと、その中に込められた自由な発想を表現しており、ダークカラーと鮮やかなグリーンは、音楽が持つ多彩な表情を表しています。それぞれの要素が融合することで、聞き手の心に響くような、時に熱情的で、時に繊細な、豊かな音楽の世界を創造するという私たちの願いが込められています。
										</p>
										<p className="text-lg text-white leading-[1.8] jp-text-optimize indent-4">
											このロゴとともに当団は、皆さまと一丸となって熱狂の渦を巻き起こすべく、日々音楽と向き合っております。
										</p>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</section>
			</PageContainer>
		</>
	);
}

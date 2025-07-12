import { PageContainer } from "@/components/ui/page-container";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
	const historyItems = [
		{ year: "2025", event: "Orchestra più Folle 設立" },
		{ year: "2025", event: "第1回特別演奏会開催予定" },
	];

	return (
		<PageContainer>
			{/* About Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h1 className="text-4xl font-bold text-white mb-12 text-center">
							About Us
						</h1>

						<Card className="bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden">
							<div className="relative p-4">
								{/* Logo and Title */}
								<div className="bg-white/15 backdrop-blur-sm rounded-lg p-4">
									<div className="flex justify-center">
										<div className="w-4/5">
											<Image
												src="/logo-color.png"
												alt="Orchestra più Folle Logo"
												width={0}
												height={0}
												sizes="100vw"
												className="w-full h-auto object-contain rounded-3xl"
												priority
											/>
										</div>
									</div>
								</div>

								{/* Content */}
								<div className="relative mt-4 border-t border-white/10 pt-4">
									<div className="bg-white/3 rounded-lg p-4 backdrop-blur-sm space-y-2">
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
							</div>
						</Card>
					</div>
				</div>
			</section>

			{/* History Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-white text-center mb-12">
							History
						</h2>
						<div className="space-y-12 jp-text-optimize max-w-2xl mx-auto relative px-4">
							{/* 縦線 */}
							<div className="absolute left-[calc(117px)] top-8 bottom-8 w-[2px] bg-[#FFD700]/30"></div>

							{historyItems.map((item, index) => (
								<div key={index} className="flex items-center relative">
									{/* 年号バッジ - 固定幅で配置 */}
									<div className="w-[90px] shrink-0">
										<div className="px-4 py-2 rounded-full bg-[#FFD700]/10 backdrop-blur-sm border border-[#FFD700]/30 inline-block">
											<span className="font-mono text-lg text-[#FFD700]">
												{item.year}
											</span>
										</div>
									</div>

									{/* 接続線の丸ポイント */}
									<div className="w-[24px] shrink-0 flex justify-center z-10">
										<div className="w-3 h-3 rounded-full bg-[#FFD700] border-2 border-[#FFD700]"></div>
									</div>

									{/* イベント内容 */}
									<div className="flex-1 pl-4">
										<Card className="bg-white/5 backdrop-blur-md border border-white/10 p-4 hover:bg-white/10 transition-colors duration-200">
											<div className="text-white/90 jp-text-optimize">
												{item.event}
											</div>
										</Card>
									</div>

									{/* 接続線（カードへの） */}
									<div className="absolute left-[calc(105px)] top-1/2 h-[2px] w-4 bg-[#FFD700]/30"></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</PageContainer>
	);
}

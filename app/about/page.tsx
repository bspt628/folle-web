import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";

export default function AboutPage() {
	const historyItems = [
		{ year: "2025.8", event: "Orchestra più folle 設立" },
		{ year: "2025.11", event: "第1回特別演奏会開催予定" },
	];

	return (
		<PageContainer>
			{/* About Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-4xl font-bold text-white mb-8">
							Orchestra più Folle について
						</h1>
						<p className="text-lg text-white/90 leading-[4.5] mb-8 jp-text-optimize">
							Orchestra più
							Folle（Fオケ）は東京大学音楽部管弦楽団の団員とOBOGを中心に結成されたオーケストラです。
							「più Folle」は「もっと狂って」という意味を持ちます。
							一見不思議な団体に見えますが、一人一人個性を持った団員が音楽と向き合い、熱狂的に音を紡ぐという意味合いが込められています。若く熱狂的な演奏で、クラシック音楽の魅力を一歩踏み込んでお届けするオーケストラです。
						</p>
					</div>
				</div>
			</section>

			{/* Conductor Message */}
			<section className="py-16 hidden">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold text-white text-center mb-12">
							代表者挨拶
						</h2>

						<div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
							<div className="md:flex items-center space-y-6 md:space-y-0 md:space-x-8">
								<div className="flex-shrink-0 text-center">
									<Image
										src="/placeholder.svg?height=150&width=150"
										alt="Conductor"
										width={150}
										height={150}
										className="rounded-full mx-auto mb-4"
									/>
									<div>
										<p className="font-semibold text-white/90">代表</p>
										<p className="text-[#cfa580] text-lg font-bold">
											藤井 敦也
										</p>
									</div>
								</div>

								<div className="flex-1">
									<p className="text-white/90 leading-relaxed mb-4 jp-text-optimize">
										Orchestra più
										folleの音楽監督を務めさせていただいております田中太郎です。
										当団は設立から14年を迎え、多くの音楽愛好家の皆様に支えられながら成長してまいりました。
									</p>
									<p className="text-white/90 leading-relaxed mb-4 jp-text-optimize">
										私たちが大切にしているのは、技術の向上はもちろんのこと、
										音楽を通じて人と人とのつながりを深め、聴いてくださる皆様に感動をお届けすることです。
									</p>
									<p className="text-white/90 leading-relaxed jp-text-optimize">
										これからも地域の皆様に愛されるオーケストラとして、
										心に響く演奏をお届けできるよう、団員一同精進してまいります。
									</p>
								</div>
							</div>
						</div>
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
						<div className="space-y-6 jp-text-optimize max-w-2xl mx-auto relative">
							{/* 縦線 */}
							<div className="absolute left-[calc(120px+1rem)] top-4 bottom-4 w-px bg-[#b04940]/30"></div>

							{historyItems.map((item, index) => (
								<div key={index} className="flex items-center">
									{/* 年号バッジ - 固定幅で配置 */}
									<div className="w-[120px] shrink-0">
										<div className="px-4 py-2 rounded-full bg-[#b04940]/20 backdrop-blur-sm border border-[#b04940]/30 inline-block">
											<span className="font-mono text-lg text-[#cfa580]">
												{item.year}
											</span>
										</div>
									</div>

									{/* 接続線の丸ポイント */}
									<div className="w-8 shrink-0 flex justify-center">
										<div className="w-2 h-2 rounded-full bg-[#b04940] border-2 border-[#cfa580]"></div>
									</div>

									{/* イベント内容 */}
									<div className="text-white/90 jp-text-optimize flex-1">
										{item.event}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</PageContainer>
	);
}

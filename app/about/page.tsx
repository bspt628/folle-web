import Image from "next/image";
import { PageContainer } from "@/components/ui/page-container";
import { Card } from "@/components/ui/card";

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
					<div className="max-w-4xl mx-auto">
						<h1 className="text-4xl font-bold text-white mb-12 text-center">
							団体紹介
						</h1>

						<Card className="bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden">
							<div className="relative">
								{/* Decorative Element */}
								<div className="absolute top-0 left-0 w-32 h-32 bg-[#b04940]/20 rounded-full -translate-x-16 -translate-y-16" />
								<div className="absolute bottom-0 right-0 w-32 h-32 bg-[#cfa580]/20 rounded-full translate-x-16 translate-y-16" />

								{/* Logo and Title */}
								<div className="relative pt-8 px-8 pb-4 flex items-center justify-center border-b border-white/10">
									<div className="flex items-center gap-4">
										<div className="relative w-16 h-16">
											<Image
												src="/logo.png"
												alt="Orchestra più Folle Logo"
												fill
												className="object-contain"
											/>
										</div>
										<div>
											<h2 className="text-4xl font-bold bg-gradient-to-r from-[#cfa580] to-white bg-clip-text text-transparent">
												Orchestra più Folle
											</h2>
										</div>
									</div>
								</div>

								{/* Content */}
								<div className="relative p-8">
									<div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
										<p className="text-lg text-white/90 leading-[3] jp-text-optimize">
											Orchestra più Folle
											<wbr />
											（Fオケ）は
											<wbr />
											東京大学音楽部管弦楽団の
											<wbr />
											団員とOBOGを中心に
											<wbr />
											結成されたオーケストラです。
											<wbr />
											「più Folle」は
											<wbr />
											「もっと狂って」という
											<wbr />
											意味を持ちます。
											<wbr />
											一見不思議な団体に見えますが、
											<wbr />
											一人一人個性を持った団員が
											<wbr />
											音楽と向き合い、
											<wbr />
											熱狂的に音を紡ぐという
											<wbr />
											意味合いが込められています。
											<wbr />
											若く熱狂的な演奏で、
											<wbr />
											クラシック音楽の魅力を
											<wbr />
											一歩踏み込んで
											<wbr />
											お届けするオーケストラです。
										</p>
									</div>
								</div>
							</div>
						</Card>
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

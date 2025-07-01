import Image from "next/image";
import { PageContainer } from "@/components/ui/page-container";
import { Card } from "@/components/ui/card";

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
							<div className="relative">
								{/* Decorative Element */}
								<div className="absolute top-0 left-0 w-32 h-32 bg-[var(--accent-green)]/20 rounded-full -translate-x-16 -translate-y-16" />
								<div className="absolute bottom-0 right-0 w-32 h-32 bg-[var(--accent-green)]/20 rounded-full translate-x-16 translate-y-16" />

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
											<h2 className="text-4xl font-bold bg-gradient-to-r from-[var(--accent-green)] to-white bg-clip-text text-transparent">
												Orchestra più Folle
											</h2>
										</div>
									</div>
								</div>

								{/* Content */}
								<div className="relative p-8">
									<div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm space-y-6">
										<p className="text-lg text-white leading-[2] jp-text-optimize indent-4">
											Orchestra più
											Folle（Fオケ）は、東京大学音楽部管弦楽団の団員とOBOGを中心に結成されたオーケストラです。
										</p>
										<p className="text-lg text-white leading-[2] jp-text-optimize indent-4">
											「più Folle」は「もっと狂って」という意味を持ちます。
										</p>
										<p className="text-lg text-white leading-[2] jp-text-optimize indent-4">
											一見不思議な団体に見えますが、一人一人個性を持った団員が音楽と向き合い、熱狂的に音を紡ぐという意味合いが込められています。
										</p>
										<p className="text-lg text-white leading-[2] jp-text-optimize indent-4">
											若く熱狂的な演奏で、クラシック音楽の魅力を一歩踏み込んでお届けするオーケストラです。
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
						<div className="space-y-6 jp-text-optimize max-w-2xl mx-auto relative">
							{/* 縦線 */}
							<div className="absolute left-[calc(120px+1rem)] top-6 bottom-6 w-px bg-[var(--accent-green)]/30"></div>

							{historyItems.map((item, index) => (
								<div key={index} className="flex items-center">
									{/* 年号バッジ - 固定幅で配置 */}
									<div className="w-[120px] shrink-0">
										<div className="px-4 py-2 rounded-full bg-[var(--accent-green)]/20 backdrop-blur-sm border border-[var(--accent-green)]/30 inline-block">
											<span className="font-mono text-lg text-[var(--accent-green)]">
												{item.year}
											</span>
										</div>
									</div>

									{/* 接続線の丸ポイント */}
									<div className="w-8 shrink-0 flex justify-center">
										<div className="w-2 h-2 rounded-full bg-[var(--accent-green)] border-2 border-[var(--accent-green)]"></div>
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

import { CONCERTS } from "@/lib/constants/concerts";

// 演奏会データは定数のため、全詳細ページをビルド時に生成する。
export function generateStaticParams() {
	return CONCERTS.map((concert) => ({ id: concert.id }));
}

export default function ConcertDetailLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}

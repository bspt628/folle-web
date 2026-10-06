import { newsItems } from "@/lib/constants/news";

// ニュースは定数のため、詳細ページを持つ記事をビルド時に生成する。
export function generateStaticParams() {
	return newsItems
		.filter((item) => item.hasDetailPage)
		.map((item) => ({ id: item.id }));
}

export default function NewsDetailLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}

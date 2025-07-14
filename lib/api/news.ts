export type NewsItem = {
	id: string;
	title: string;
	content: string;
	publishedAt: string;
};

export async function getNewsItems(): Promise<NewsItem[]> {
	// TODO: 実際のAPIリクエストを実装
	return [];
}

export type NewsItem = {
	date: string;
	title: string;
};

export const newsItems: NewsItem[] = [
	{
		date: "2025.07.02",
		title: "第1回特別演奏会のチケットリンクを公開しました",
	},
	{
		date: "2025.06.30",
		title: "Orchestra più folleのWebサイトを公開しました",
	},
];

export const getNewsItems = (): NewsItem[] => {
	return [...newsItems].sort((a, b) => {
		const dateA = new Date(a.date.replace(/\./g, "-"));
		const dateB = new Date(b.date.replace(/\./g, "-"));
		return dateB.getTime() - dateA.getTime(); // 降順（新しい順）でソート
	});
};

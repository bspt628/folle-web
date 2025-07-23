export type NewsItem = {
	id: string;
	date: string;
	title: string;
	content?: string;
	hasDetailPage?: boolean;
	links?: {
		title: string;
		url: string;
	}[];
};

export const newsItems: NewsItem[] = [
	{
		id: "3",
		date: "2025.07.23",
		title: "第1回特別演奏会が所沢市「音楽のあるまちづくり」音まち推奨イベントに認定されました",
		hasDetailPage: true,
		content: `この度、当団の第1回特別演奏会が、所沢市「音楽のあるまちづくり」音まち推奨イベントに認定されました。

所沢市では、音楽を通じて地域コミュニティの活性化と文化的な魅力向上を目指す「音楽のあるまちづくり」事業を推進しており、この事業に賛同し、地域に根ざした音楽活動を行う演奏会としてご認定いただきました。

この認定について、所沢市「音楽のあるまちづくり」の各公式メディアでもご紹介いただいております。

引き続き、皆様のご支援とご協力をよろしくお願いいたします。`,
		links: [
			{
				title: "所沢市「音楽のあるまちづくり」公式Webサイト",
				url: "https://otomati-tokorozawa.amebaownd.com/posts/57121169?categoryIds=8782907",
			},
			{
				title: "X（旧Twitter）",
				url: "https://x.com/otomachi_toko/status/1945750827169169902",
			},
			{
				title: "Facebook",
				url: "https://www.facebook.com/otomachi.tokorozawa/posts/pfbid02pm4PpvjpP67SK3XoDLN7RpGEtv1w3pJnbnonbzyeSTousXHqQWQ5SwE1PpNMLysrl",
			},
			{
				title: "Instagram",
				url: "https://www.instagram.com/p/DMM2TWMurAh/?utm_source=ig_web_copy_link",
			},
		],
	},
	{
		id: "2",
		date: "2025.07.12",
		title: "第1回特別演奏会の演奏会情報を公開しました",
		hasDetailPage: false,
	},
	{
		id: "1",
		date: "2025.07.12",
		title: "Orchestra più Folle のWebサイトを公開しました",
		hasDetailPage: false,
	},
];

export const getNewsItems = (): NewsItem[] => {
	return [...newsItems].sort((a, b) => {
		const dateA = new Date(a.date.replace(/\./g, "-"));
		const dateB = new Date(b.date.replace(/\./g, "-"));
		return dateB.getTime() - dateA.getTime(); // 降順（新しい順）でソート
	});
};

export const getNewsById = (id: string): NewsItem | null => {
	return newsItems.find((item) => item.id === id) || null;
};

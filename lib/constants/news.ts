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
		id: "5",
		date: "2025.11.18",
		title: "第2回演奏会の開催日時・会場が決定しました",
		hasDetailPage: true,
		content: `この度、第2回演奏会の開催日時と会場が決定いたしました。

【開催情報】
・日時：2026年10月24日（土）夜公演
・会場：パルテノン多摩 大ホール
・指揮：水戸博之

プログラムやチケット情報など、その他の詳細につきましては後日発表いたします。

皆様のご来場を心よりお待ちしております。`,
		links: [
			{
				title: "第2回演奏会の詳細ページ",
				url: "/concerts/2",
			},
		],
	},
	{
		id: "4",
		date: "2025.11.09",
		title: "第1回特別演奏会を無事終了いたしました",
		hasDetailPage: true,
		content: `本日、所沢市民文化センター ミューズ アークホールにて開催いたしました第1回特別演奏会は、おかげさまで無事終了いたしました。

ご来場いただきました皆様、また本演奏会を支えてくださった関係者の皆様に心より御礼申し上げます。

指揮者・水戸博之氏のもと、ベートーヴェン《シュテファン王》序曲、メンデルスゾーン交響曲第4番《イタリア》、同第5番《宗教改革》を演奏いたしました。団員一同、情熱を込めて演奏させていただきました。

今後も地域に根ざした音楽活動を続けてまいりますので、引き続きご支援・ご協力のほど、よろしくお願いいたします。`,
		links: [
			{
				title: "第1回特別演奏会の詳細ページ",
				url: "/concerts/1",
			},
		],
	},
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

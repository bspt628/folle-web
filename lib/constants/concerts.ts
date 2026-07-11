export type Concert = {
	id: string;
	title: string | null;
	date: string;
	openTime: string | null;
	startTime: string | null;
	conductor: string | null;
	venue: {
		name: string | null;
	};
	program: {
		composer: string | null;
		title: string | null;
	}[];
	posterImage: {
		url: string | null;
		width: number | null;
		height: number | null;
	} | null;
	// チラシ裏面（表面 = posterImage）。両面が揃うと詳細ページでめくって切り替えできる。
	posterImageBack?: {
		url: string | null;
		width: number | null;
		height: number | null;
	} | null;
	ticketPrice?: {
		category: string;
		price: number | null;
	}[];
	teketUrl: string | null;
	description?: string;
	youtubeVideos?: {
		title: string;
		url: string;
		publishDate?: string; // ISO 8601 format (YYYY-MM-DDTHH:mm:ss)
	}[];
};

export const CONCERTS: Concert[] = [
	{
		id: "1",
		title: "第1回特別演奏会",
		date: "2025-11-09",
		openTime: "13:00",
		startTime: "13:30",
		conductor: "水戸博之",
		venue: {
			name: "所沢市民文化センター ミューズ アークホール",
		},
		program: [
			{
				composer: "ベートーヴェン",
				title: "「シュテファン王」序曲",
			},
			{
				composer: "メンデルスゾーン",
				title: "交響曲第4番 「イタリア」",
			},
			{
				composer: "メンデルスゾーン",
				title: "交響曲第5番 「宗教改革」",
			},
		],
		posterImage: {
			url: "/1stビラ.png",
			width: 2894,
			height: 4093,
		},
		posterImageBack: {
			url: "/flyer-1st-back.webp",
			width: 1414,
			height: 2000,
		},
		ticketPrice: [
			{
				category: "入場無料・全席自由",
				price: null,
			},
		],
		teketUrl: "https://teket.jp/14035/53069",
		youtubeVideos: [
			{
				title: "「シュテファン王」序曲",
				url: "https://www.youtube.com/embed/wtRehmh0lJM",
			},
			{
				title: "交響曲第4番「イタリア」",
				url: "https://www.youtube.com/embed/NvzbDV8WKYE",
			},
			{
				title: "交響曲第5番「宗教改革」",
				url: "https://www.youtube.com/embed/SGKVD9mlQ0s",
			},
		],
	},
	{
		id: "2",
		title: "第2回演奏会",
		date: "2026-10-24",
		openTime: "17:30",
		startTime: "18:00",
		conductor: "水戸博之",
		venue: {
			name: "パルテノン多摩 大ホール",
		},
		program: [
			{
				composer: "ワーグナー",
				title: "「さまよえるオランダ人」序曲",
			},
			{
				composer: "ワーグナー",
				title: "「トリスタンとイゾルデ」より 前奏曲と愛の死",
			},
			{
				composer: "ベートーヴェン",
				title: "交響曲第6番「田園」",
			},
		],
		posterImage: {
			url: "/flyer-2nd-front.jpg",
			width: 2552,
			height: 3580,
		},
		posterImageBack: {
			url: "/flyer-2nd-back.jpg",
			width: 2552,
			height: 3580,
		},
		ticketPrice: [
			{
				category: "入場無料・全席自由",
				price: null,
			},
		],
		teketUrl: "https://teket.jp/14035/72751",
	},
];

export function getAllConcerts(): Concert[] {
	return [...CONCERTS].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}

export function getUpcomingConcert(): Concert | null {
	const today = new Date().toISOString().split("T")[0];
	return CONCERTS.find((concert) => concert.date >= today) || null;
}

export function getConcertById(id: string): Concert | null {
	return CONCERTS.find((concert) => concert.id === id) || null;
}

export function getConcert(id: string): Concert | null {
	return getConcertById(id);
}

export function getLatestConcert(): Concert | null {
	return CONCERTS[0] || null;
}

// coming-soon（ポスター未定）のプレースホルダー画像パス
export const COMING_SOON_POSTER = "/coming-soon-poster.svg";

export function isComingSoonConcert(
	concert: { posterImage?: { url?: string | null } | null } | null | undefined
): boolean {
	return !concert || concert.posterImage?.url === COMING_SOON_POSTER;
}

// すでに開催済みの中で最も直近の演奏会（ポスター未定のものは除く）
export function getLatestPastConcert(): Concert | null {
	const today = new Date().toISOString().split("T")[0];
	return (
		getAllConcerts().find(
			(concert) =>
				concert.date < today &&
				concert.posterImage?.url !== COMING_SOON_POSTER
		) || null
	);
}

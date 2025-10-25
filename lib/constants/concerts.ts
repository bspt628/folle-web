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
		ticketPrice: [
			{
				category: "入場無料・全席自由",
				price: null,
			},
		],
		teketUrl: "https://teket.jp/14035/53069",
		description:
			"第1回特別演奏会は、指揮に水戸博之氏を迎え、「有名作曲家の名曲で熱狂の渦を起こす」ことをテーマにした演奏会を開催いたします。演奏機会は比較的少ないものの、威厳と緊迫感をあわせ持つ華やかなベートーヴェン / 《シュテファン王》序曲に始まり、メンデルスゾーンの著名な交響曲を2つ、それぞれのドラマを感じながらお届けいたします。演奏者個々人が各々の個性や情熱をぶつけ、考え抜いた音楽を奏で、それを味わっていただける演奏会です。",
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

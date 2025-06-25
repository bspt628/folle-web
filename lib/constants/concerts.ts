export type Concert = {
	id: string;
	title: string | null;
	date: string;
	openTime: string | null;
	startTime: string | null;
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
};

export const CONCERTS: Concert[] = [
	{
		id: "1",
		title: "第1回特別演奏会",
		date: "2025-11-09",
		openTime: "13:00",
		startTime: "13:30",
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
			url: "/Fオケ第1回定演_ビラ案(赤色)_微修正2.png",
			width: 2894,
			height: 4093,
		},
		ticketPrice: [
			{
				category: "全席自由・入場無料",
				price: null,
			},
		],
		teketUrl: null,
		description:
			"第1回特別演奏会は、指揮に水戸博之氏を迎え、「定番の曲目を熱狂的にお届けする」ことをテーマにした演奏会を開催予定です。東京大学音楽部管弦楽団の現役団員が中心となり、各個人が各々の個性や情熱をぶつけ、考え抜いた音楽を奏で、それを味わっていただく演奏会です。",
	}
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

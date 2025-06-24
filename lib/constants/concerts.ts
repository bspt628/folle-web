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
	ticketPrice: {
		category: string;
		price: number;
	}[];
	teketUrl: string | null;
};

export const CONCERTS: Concert[] = [
	{
		id: "1",
		title: "第1回定期演奏会",
		date: "2024-05-26",
		openTime: "13:30",
		startTime: "14:00",
		venue: {
			name: "杉並公会堂",
		},
		program: [
			{
				composer: "ドヴォルザーク",
				title: "交響曲第9番 ホ短調「新世界より」",
			},
		],
		posterImage: {
			url: "/Fオケ第1回定演_ビラ案(赤色)_微修正2.png",
			width: 2894,
			height: 4093,
		},
		ticketPrice: [
			{
				category: "一般",
				price: 1000,
			},
			{
				category: "学生",
				price: 500,
			},
		],
		teketUrl: "https://teket.jp/sample/1",
	},
	{
		id: "2",
		title: "第2回定期演奏会",
		date: "2024-09-15",
		openTime: "17:30",
		startTime: "18:00",
		venue: {
			name: "すみだトリフォニーホール",
		},
		program: [
			{
				composer: "ベートーヴェン",
				title: "交響曲第5番 ハ短調「運命」",
			},
			{
				composer: "チャイコフスキー",
				title: "バレエ音楽「くるみ割り人形」より抜粋",
			},
		],
		posterImage: {
			url: "/placeholder.png",
			width: 800,
			height: 1200,
		},
		ticketPrice: [
			{
				category: "S席",
				price: 2000,
			},
			{
				category: "A席",
				price: 1500,
			},
			{
				category: "学生",
				price: 1000,
			},
		],
		teketUrl: "https://teket.jp/sample/2",
	},
	{
		id: "3",
		title: "第3回定期演奏会",
		date: "2024-12-23",
		openTime: "13:30",
		startTime: "14:00",
		venue: {
			name: "東京芸術劇場",
		},
		program: [
			{
				composer: "モーツァルト",
				title: "交響曲第41番 ハ長調「ジュピター」",
			},
			{
				composer: "ブラームス",
				title: "ハンガリー舞曲第5番",
			},
			{
				composer: "ホルスト",
				title: "組曲「惑星」より「木星」",
			},
		],
		posterImage: {
			url: "/placeholder.png",
			width: 800,
			height: 1200,
		},
		ticketPrice: [
			{
				category: "S席",
				price: 2500,
			},
			{
				category: "A席",
				price: 2000,
			},
			{
				category: "B席",
				price: 1500,
			},
			{
				category: "学生",
				price: 1000,
			},
		],
		teketUrl: "https://teket.jp/sample/3",
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

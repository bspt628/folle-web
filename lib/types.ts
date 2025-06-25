export type NewsItem = {
	date: string;
	title: string;
};

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
	description?: string;
	posterImage?: {
		url: string | null;
		width: number | null;
		height: number | null;
	} | null;
	ticketPrice?: {
		category: string;
		price: number | null;
	}[];
};

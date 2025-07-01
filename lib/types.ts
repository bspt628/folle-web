export type NewsItem = {
	date: string;
	title: string;
};

export interface Venue {
	name: string | null;
}

export interface Concert {
	id: string;
	title: string | null;
	date: string;
	openTime: string | null;
	startTime: string | null;
	venue: Venue;
	program: {
		composer: string | null;
		title: string | null;
	}[];
	posterImage?: {
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
}

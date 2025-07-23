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

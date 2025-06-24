export type Concert = {
	id: string;
	title: string;
	date: string;
	openTime: string;
	startTime: string;
	venue: string;
	program: {
		composer: string;
		title: string;
	}[];
	description?: string;
	posterImage?: string;
	ticketPrice?: {
		category: string;
		price: number;
	}[];
};

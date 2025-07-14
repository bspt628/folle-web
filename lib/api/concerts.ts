export type Concert = {
	id: string;
	title: string;
	date: string;
	venue: string;
	description: string;
	ticketUrl?: string;
};

export async function getUpcomingConcert(): Promise<Concert | null> {
	// TODO: 実際のAPIリクエストを実装
	return {
		id: "1",
		title: "第1回特別演奏会",
		date: "2024-05-01",
		venue: "東京芸術劇場",
		description: "Orchestra più Folleの第1回特別演奏会です。",
		ticketUrl: "https://example.com/tickets/1",
	};
}

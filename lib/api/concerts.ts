import { supabase } from "../supabase/client";

// データベースのレスポンス型
type ConcertProgram = {
	performance_order: number;
	pieces: {
		composer: string | null;
		title: string | null;
	} | null;
};

type TicketType = {
	category: string;
	price: number;
	display_order: number;
};

type DatabaseConcert = {
	id: string;
	title: string | null;
	concert_date: string;
	doors_open_time: string | null;
	start_time: string | null;
	poster_image_url: string | null;
	poster_image_width: number | null;
	poster_image_height: number | null;
	venues: {
		name: string | null;
	} | null;
	concert_programs: ConcertProgram[] | null;
	ticket_types: TicketType[] | null;
};

// フロントエンドで使いやすいように、取得後のデータ型を定義
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
};

// SupabaseからのJOINクエリを定義
const concertSelectQuery = `
	id,
	title,
	concert_date,
	doors_open_time,
	start_time,
	poster_image_url,
	poster_image_width,
	poster_image_height,
	venues!concerts_venue_id_fkey (
		name
	),
	concert_programs!concert_programs_concert_id_fkey (
		performance_order,
		pieces!concert_programs_piece_id_fkey (
			composer,
			title
		)
	),
	ticket_types!ticket_types_concert_id_fkey (
		category,
		price,
		display_order
	)
`;

// Supabaseのレスポンスをフロントエンドの型に変換するヘルパー関数
function shapeConcertData(data: DatabaseConcert): Concert {
	if (!data) return null as unknown as Concert;

	// プログラムを演奏順にソート
	const program =
		data.concert_programs
			?.sort((a, b) => a.performance_order - b.performance_order)
			.map((p) => ({
				composer: p.pieces?.composer ?? null,
				title: p.pieces?.title ?? null,
			})) || [];

	// チケット料金を順番にソート
	const ticketPrice =
		data.ticket_types
			?.sort((a, b) => a.display_order - b.display_order)
			.map((t) => ({
				category: t.category,
				price: t.price,
			})) || [];

	return {
		id: data.id,
		title: data.title,
		date: data.concert_date,
		openTime: data.doors_open_time,
		startTime: data.start_time,
		venue: {
			name: data.venues?.name || null,
		},
		program,
		ticketPrice,
		posterImage: data.poster_image_url
			? {
					url: data.poster_image_url,
					width: data.poster_image_width,
					height: data.poster_image_height,
			  }
			: null,
	};
}

/**
 * 全ての演奏会情報を取得します
 */
export async function getAllConcerts(): Promise<Concert[]> {
	try {
		const { data, error } = await supabase
			.from("concerts")
			.select(concertSelectQuery)
			.order("concert_date", { ascending: false });

		if (error) {
			console.error("Error fetching all concerts:", error);
			throw error;
		}

		return (data as unknown as DatabaseConcert[]).map(shapeConcertData);
	} catch (error) {
		console.error("Error in getAllConcerts:", error);
		throw error;
	}
}

/**
 * これから開催される直近の演奏会を1件取得します
 */
export async function getUpcomingConcert(): Promise<Concert | null> {
	try {
		const today = new Date().toISOString().split("T")[0];
		const { data, error } = await supabase
			.from("concerts")
			.select(concertSelectQuery)
			.gte("concert_date", today)
			.order("concert_date", { ascending: true })
			.limit(1)
			.maybeSingle();

		if (error) {
			console.error("Error fetching upcoming concert:", error);
			throw error;
		}

		return data ? shapeConcertData(data as unknown as DatabaseConcert) : null;
	} catch (error) {
		console.error("Error in getUpcomingConcert:", error);
		throw error;
	}
}

/**
 * 指定されたIDの演奏会情報を取得します
 */
export async function getConcertById(id: string): Promise<Concert | null> {
	try {
		const { data, error } = await supabase
			.from("concerts")
			.select(concertSelectQuery)
			.eq("id", id)
			.single();

		if (error) {
			console.error(`Error fetching concert by id: ${id}`, error);
			if (error.code === "PGRST116") {
				return null;
			}
			throw error;
		}

		return data ? shapeConcertData(data as unknown as DatabaseConcert) : null;
	} catch (error) {
		console.error("Error in getConcertById:", error);
		throw error;
	}
}

export async function getConcert(id: string): Promise<Concert> {
	const { data, error } = await supabase
		.from("concerts")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error("Concert not found");
	}

	return {
		...data,
		posterImage: {
			url: data.poster_image_url,
			height: data.poster_image_height,
			width: data.poster_image_width,
		},
	} as unknown as Concert;
}

export async function getLatestConcert(): Promise<Concert> {
	const { data, error } = await supabase
		.from("concerts")
		.select("*")
		.order("date", { ascending: true })
		.limit(1)
		.single();

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error("No concerts found");
	}

	return {
		...data,
		posterImage: {
			url: data.poster_image_url,
			height: data.poster_image_height,
			width: data.poster_image_width,
		},
	} as unknown as Concert;
}

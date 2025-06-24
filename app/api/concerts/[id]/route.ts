import { getConcertById } from "@/lib/api/concerts";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const concert = await getConcertById(params.id);
		if (!concert) {
			return NextResponse.json({ error: "Concert not found" }, { status: 404 });
		}
		return NextResponse.json(concert);
	} catch (error) {
		console.error("Error fetching concert:", error);
		return NextResponse.json(
			{ error: "Failed to fetch concert" },
			{ status: 500 }
		);
	}
}

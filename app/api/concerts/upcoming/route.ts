import { getUpcomingConcert } from "@/lib/api/concerts";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const concert = await getUpcomingConcert();
		if (!concert) {
			return NextResponse.json(
				{ error: "No upcoming concerts found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(concert);
	} catch (error) {
		console.error("Error fetching upcoming concert:", error);
		return NextResponse.json(
			{ error: "Failed to fetch upcoming concert" },
			{ status: 500 }
		);
	}
}

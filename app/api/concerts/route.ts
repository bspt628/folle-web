import { getUpcomingConcert } from "@/lib/api/concerts";

export async function GET() {
	try {
		const concert = await getUpcomingConcert();
		return Response.json(concert);
	} catch (error) {
		console.error("Error fetching concert:", error);
		return Response.json({ error: "Failed to fetch concert" }, { status: 500 });
	}
}

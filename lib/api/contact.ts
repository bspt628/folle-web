import { supabase } from "../supabase/client";

export async function submitContactForm(data: {
	name: string;
	email: string;
	subject: string;
	message: string;
}) {
	try {
		const { error } = await supabase.from("contact_forms").insert([
			{
				name: data.name,
				email: data.email,
				subject: data.subject || null,
				message: data.message,
				status: "unread",
			},
		]);

		if (error) throw error;

		// Slack通知を送信
		await fetch("/api/notify-slack", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: data.name,
				email: data.email,
				subject: data.subject,
				message: data.message,
			}),
		});

		return { success: true };
	} catch (error) {
		console.error("Error submitting contact form:", error);
		return { success: false, error };
	}
}

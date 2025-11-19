export async function submitContactForm(data: {
	name: string;
	email: string;
	subject: string;
	message: string;
}) {
	try {
		// Slack通知を送信
		const response = await fetch("/api/notify-slack", {
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

		if (!response.ok) {
			throw new Error("Failed to send notification");
		}

		return { success: true };
	} catch (error) {
		console.error("Error submitting contact form:", error);
		return { success: false, error };
	}
}

export async function submitContactForm(data: {
	name: string;
	email: string;
	subject: string;
	message: string;
}) {
	try {
		// メール送信（データベースには保存しない）
		const response = await fetch("/api/contact", {
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
			throw new Error("メール送信に失敗しました");
		}

		// Slack通知を送信（失敗してもお問い合わせ自体は成功扱いにする）
		try {
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
		} catch (slackError) {
			console.error("Error sending Slack notification:", slackError);
		}

		return { success: true };
	} catch (error) {
		console.error("Error submitting contact form:", error);
		return { success: false, error };
	}
}

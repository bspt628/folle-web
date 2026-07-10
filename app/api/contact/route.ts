import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const escapeHtml = (s: string) =>
	s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");

interface ContactBody {
	name: string;
	email: string;
	subject?: string;
	message: string;
}

const buildHtml = (body: ContactBody) => {
	const row = (label: string, value: string) => `
    <tr>
      <th align="left" style="background:#f3f4f6;padding:12px 20px;width:120px;border-bottom:1px solid #e5e7eb;font-size:12px;color:#111827;font-weight:600;">${label}</th>
      <td style="padding:12px 20px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#374151;">${value}</td>
    </tr>`;

	const message = escapeHtml(body.message).replace(/\n/g, "<br>");

	return `<!DOCTYPE html>
<html lang="ja">
  <body style="margin:0;background:#f9fafb;font-family:'Helvetica Neue',Arial,'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif;color:#111827;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <div style="background:#ffffff;border:1px solid #e5e7eb;">
        <div style="background:#7c3aed;color:#ffffff;padding:24px 28px;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.3em;font-weight:700;">CONTACT</p>
          <h1 style="margin:0;font-size:18px;font-weight:700;">お問い合わせを受信しました</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tbody>
            ${row("お名前", escapeHtml(body.name))}
            ${row("メール", `<a href="mailto:${escapeHtml(body.email)}" style="color:#7c3aed;text-decoration:none;">${escapeHtml(body.email)}</a>`)}
            ${body.subject ? row("件名", escapeHtml(body.subject)) : ""}
          </tbody>
        </table>
        <div style="padding:20px 28px;border-top:1px solid #e5e7eb;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;color:#6b7280;font-weight:700;">MESSAGE</p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;white-space:pre-wrap;">${message}</p>
        </div>
        <div style="padding:14px 28px;background:#f9fafb;color:#9ca3af;font-size:11px;">
          このメールは Orchestra più Folle の問い合わせフォームから自動送信されています。
        </div>
      </div>
    </div>
  </body>
</html>`;
};

const buildText = (body: ContactBody) => {
	const lines = [
		"お問い合わせを受信しました",
		"──────────────────────",
		`お名前: ${body.name}`,
		`メール: ${body.email}`,
	];
	if (body.subject) lines.push(`件名:   ${body.subject}`);
	lines.push(
		"──────────────────────",
		"内容:",
		body.message,
		"──────────────────────"
	);
	return lines.join("\n");
};

// 送信者本人への自動返信（内容確認）メール
const buildAutoReplyHtml = (body: ContactBody) => {
	const row = (label: string, value: string) => `
    <tr>
      <th align="left" style="background:#f3f4f6;padding:12px 20px;width:120px;border-bottom:1px solid #e5e7eb;font-size:12px;color:#111827;font-weight:600;">${label}</th>
      <td style="padding:12px 20px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#374151;">${value}</td>
    </tr>`;

	const message = escapeHtml(body.message).replace(/\n/g, "<br>");

	return `<!DOCTYPE html>
<html lang="ja">
  <body style="margin:0;background:#f9fafb;font-family:'Helvetica Neue',Arial,'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif;color:#111827;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <div style="background:#ffffff;border:1px solid #e5e7eb;">
        <div style="background:#7c3aed;color:#ffffff;padding:24px 28px;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.3em;font-weight:700;">Orchestra più Folle</p>
          <h1 style="margin:0;font-size:18px;font-weight:700;">お問い合わせありがとうございます</h1>
        </div>
        <div style="padding:24px 28px;">
          <p style="margin:0 0 16px;font-size:14px;line-height:1.8;color:#374151;">
            ${escapeHtml(body.name)} 様<br><br>
            この度は Orchestra più Folle へお問い合わせをいただき、誠にありがとうございます。<br>
            下記の内容にてお問い合わせを受け付けいたしました。内容を確認次第、担当者よりご連絡させていただきます。
          </p>
          <p style="margin:0 0 16px;font-size:13px;line-height:1.8;color:#6b7280;">
            ・3日以内を目安にメールにてご連絡いたします。<br>
            ・4日以上経っても返信がない場合は、お手数ですが orchestrapiufolle@gmail.com まで直接ご連絡ください。<br>
            ・こちらからのメールが迷惑メールに分類される場合がございますので、あわせてご確認ください。
          </p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tbody>
            ${body.subject ? row("件名", escapeHtml(body.subject)) : ""}
          </tbody>
        </table>
        <div style="padding:20px 28px;border-top:1px solid #e5e7eb;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;color:#6b7280;font-weight:700;">お問い合わせ内容</p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;white-space:pre-wrap;">${message}</p>
        </div>
        <div style="padding:14px 28px;background:#f9fafb;color:#9ca3af;font-size:11px;">
          このメールは Orchestra più Folle の問い合わせフォームより自動送信されています。本メールにお心当たりのない場合は破棄してください。
        </div>
      </div>
    </div>
  </body>
</html>`;
};

const buildAutoReplyText = (body: ContactBody) => {
	const lines = [
		`${body.name} 様`,
		"",
		"この度は Orchestra più Folle へお問い合わせをいただき、誠にありがとうございます。",
		"下記の内容にてお問い合わせを受け付けいたしました。内容を確認次第、担当者よりご連絡させていただきます。",
		"",
		"・3日以内を目安にメールにてご連絡いたします。",
		"・4日以上経っても返信がない場合は、お手数ですが orchestrapiufolle@gmail.com まで直接ご連絡ください。",
		"・こちらからのメールが迷惑メールに分類される場合がございますので、あわせてご確認ください。",
		"",
		"──────────────────────",
		"■ お問い合わせ内容",
	];
	if (body.subject) lines.push(`件名: ${body.subject}`);
	lines.push("", body.message, "──────────────────────", "", "Orchestra più Folle");
	return lines.join("\n");
};

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as ContactBody;

		if (!body.name || !body.email || !body.message) {
			return NextResponse.json(
				{ error: "必須項目が入力されていません" },
				{ status: 400 }
			);
		}

		// 受信先。CONTACT_TO_EMAIL が未設定なら送信認証アカウント(EMAIL_ADDRESS)へ届く。
		const toEmail =
			process.env.CONTACT_TO_EMAIL ||
			process.env.EMAIL_ADDRESS ||
			"orchestrapiufolle@gmail.com";

		// 1通目: orchestrapiufolle 宛の通知メール
		const notifyMail = {
			from: process.env.EMAIL_ADDRESS,
			to: toEmail,
			subject: `【お問い合わせ】${body.subject || "（件名なし）"} | ${body.name} 様`,
			text: buildText(body),
			html: buildHtml(body),
			replyTo: body.email,
		};

		// 2通目: 送信者本人への自動返信（内容確認）メール
		const autoReplyMail = {
			from: process.env.EMAIL_ADDRESS,
			to: body.email,
			subject: "【Orchestra più Folle】お問い合わせを受け付けました",
			text: buildAutoReplyText(body),
			html: buildAutoReplyHtml(body),
			replyTo: toEmail,
		};

		// CONTACT_DRY_RUN=1 のときは実送信をスキップ。ローカル/プレビュー検証用。
		if (process.env.CONTACT_DRY_RUN === "1") {
			console.log("[contact] DRY_RUN: skipping sendMail", {
				notifyTo: notifyMail.to,
				autoReplyTo: autoReplyMail.to,
			});
			return NextResponse.json(
				{ message: "DRY_RUN: メール送信をスキップしました", dryRun: true },
				{ status: 200 }
			);
		}

		if (!process.env.EMAIL_ADDRESS || !process.env.EMAIL_PASSWORD) {
			throw new Error("メール送信の認証情報が設定されていません");
		}

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_ADDRESS,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		// 通知メールは必須。失敗すればエラーを返す。
		await transporter.sendMail(notifyMail);

		// 自動返信は補助的な位置づけ。失敗してもお問い合わせ自体は成功扱いにする。
		try {
			await transporter.sendMail(autoReplyMail);
		} catch (autoReplyError) {
			console.error("Error sending auto-reply email:", autoReplyError);
		}

		return NextResponse.json(
			{ message: "メール送信が成功しました" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending contact email:", error);
		return NextResponse.json(
			{ error: "メールの送信に失敗しました" },
			{ status: 500 }
		);
	}
}

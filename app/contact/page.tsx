"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, AlertCircle } from "lucide-react";
import { submitContactForm } from "@/lib/api/contact";
import { PageContainer } from "@/components/ui/page-container";
import Head from "next/head";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	// バリデーションは送信ボタンを押したときにのみ走らせる
	const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error" | null;
		message: string | null;
	}>({ type: null, message: null });
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	// お問い合わせ内容欄: 入力に応じて高さを自動拡張する（Safari 等でも動くよう JS で制御）
	const messageRef = useRef<HTMLTextAreaElement>(null);
	useEffect(() => {
		const el = messageRef.current;
		if (!el) return;
		el.style.height = "auto";
		el.style.height = `${el.scrollHeight}px`;
	}, [formData.message]);

	// モーダル表示中は Esc キーで閉じ、背面のスクロールを固定する
	useEffect(() => {
		if (!showSuccessModal) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setShowSuccessModal(false);
		};
		document.addEventListener("keydown", handleKeyDown);
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = prevOverflow;
		};
	}, [showSuccessModal]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus({ type: null, message: null });

		// 送信を試みたのでバリデーションを有効化する
		setHasAttemptedSubmit(true);

		// 必須項目が未入力の場合はここで中断（メール送信は行わない）
		if (
			formData.name === "" ||
			formData.email === "" ||
			!formData.email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/) ||
			formData.subject === "" ||
			formData.message === ""
		) {
			setIsSubmitting(false);
			return;
		}

		try {
			const result = await submitContactForm(formData);
			if (result.success) {
				// フォームとバリデーション状態をリセットし、
				// 空欄バリデーションエラーが表示されないようにする
				setFormData({
					name: "",
					email: "",
					subject: "",
					message: "",
				});
				setHasAttemptedSubmit(false);
				setSubmitStatus({ type: null, message: null });
				setShowSuccessModal(true);
			} else {
				throw new Error("送信に失敗しました");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitStatus({
				type: "error",
				message:
					"お問い合わせの送信に失敗しました。しばらく時間をおいて再度お試しください。",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<>
			<Head>
				<title>Contact Us | Orchestra più Folle</title>
				<meta
					name="description"
					content="Orchestra più Folle（オーケストラ ピウ フォーレ）へのお問い合わせ。演奏会に関するご質問やお問い合わせはこちらから。"
				/>
				<meta property="og:title" content="Contact Us | Orchestra più Folle" />
				<meta
					property="og:description"
					content="Orchestra più Folle（オーケストラ ピウ フォーレ）へのお問い合わせ。演奏会に関するご質問やお問い合わせはこちらから。"
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content="https://orchestrapiufolle.com/contact"
				/>
				<meta property="og:site_name" content="Orchestra più Folle" />
				<meta
					property="og:image"
					content="https://orchestrapiufolle.com/567993919410012183.jpg"
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Contact Us | Orchestra più Folle" />
				<meta
					name="twitter:description"
					content="Orchestra più Folle（オーケストラ ピウ フォーレ）へのお問い合わせ。演奏会に関するご質問やお問い合わせはこちらから。"
				/>
				<meta
					name="twitter:image"
					content="https://orchestrapiufolle.com/567993919410012183.jpg"
				/>
			</Head>
			<PageContainer>
				<section className="py-16">
					<div className="container mx-auto px-4">
						<h1 className="mb-14 text-center text-4xl font-bold tracking-tight text-white">
							お問い合わせ
						</h1>

						<div className="max-w-4xl mx-auto">
							{/* Contact Form（カードレス・背景に直接） */}
							<div>
								{submitStatus.type && (
									<div
										className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${
											submitStatus.type === "success"
												? "bg-green-50/90 text-green-800 border border-green-200"
												: "bg-red-50/90 text-red-800 border border-red-200"
										}`}
										role={submitStatus.type === "success" ? "status" : "error"}
									>
										{submitStatus.type === "success" ? (
											<CheckCircle
												className="h-5 w-5 text-green-500 mt-0.5"
												aria-hidden="true"
											/>
										) : (
											<AlertCircle
												className="h-5 w-5 text-red-500 mt-0.5"
												aria-hidden="true"
											/>
										)}
										<div className="flex-1">{submitStatus.message}</div>
									</div>
								)}

								<form onSubmit={handleSubmit} className="space-y-6" noValidate>
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-medium text-white mb-2"
										>
											お名前{" "}
											<span className="text-red-400" aria-hidden="true">
												*
											</span>
											<span className="sr-only">（必須）</span>
										</label>
										<Input
											id="name"
											name="name"
											type="text"
											required
											value={formData.name}
											onChange={handleChange}
											className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/50"
											placeholder="お名前をご記入ください。"
											disabled={isSubmitting}
											aria-invalid={hasAttemptedSubmit && formData.name === ""}
											aria-describedby={
												hasAttemptedSubmit && formData.name === ""
													? "name-error"
													: undefined
											}
										/>
										{hasAttemptedSubmit && formData.name === "" && (
											<p
												id="name-error"
												className="mt-2 text-sm text-red-400"
												role="alert"
											>
												お名前を入力してください
											</p>
										)}
									</div>

									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium text-white mb-2"
										>
											メールアドレス{" "}
											<span className="text-red-400" aria-hidden="true">
												*
											</span>
											<span className="sr-only">（必須）</span>
										</label>
										<Input
											id="email"
											name="email"
											type="email"
											required
											pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
											value={formData.email}
											onChange={handleChange}
											className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/50"
											placeholder="メールアドレスをご記入ください。"
											disabled={isSubmitting}
											aria-invalid={
												hasAttemptedSubmit &&
												(formData.email === "" ||
													!formData.email.match(
														/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
													))
											}
											aria-describedby={
												hasAttemptedSubmit &&
												(formData.email === "" ||
													!formData.email.match(
														/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
													))
													? "email-error"
													: undefined
											}
										/>
										{hasAttemptedSubmit && formData.email === "" && (
											<p
												id="email-error"
												className="mt-2 text-sm text-red-400"
												role="alert"
											>
												メールアドレスを入力してください
											</p>
										)}
										{hasAttemptedSubmit &&
											formData.email !== "" &&
											!formData.email.match(
												/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
											) && (
												<p
													id="email-format-error"
													className="mt-2 text-sm text-red-400"
													role="alert"
												>
													正しいメールアドレスを入力してください
												</p>
											)}
									</div>

									<div>
										<label
											htmlFor="subject"
											className="block text-sm font-medium text-white mb-2"
										>
											件名{" "}
											<span className="text-red-400" aria-hidden="true">
												*
											</span>
											<span className="sr-only">（必須）</span>
										</label>
										<Input
											id="subject"
											name="subject"
											type="text"
											required
											value={formData.subject}
											onChange={handleChange}
											className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/50"
											placeholder="件名をご記入ください。"
											disabled={isSubmitting}
											aria-invalid={
												hasAttemptedSubmit && formData.subject === ""
											}
											aria-describedby={
												hasAttemptedSubmit && formData.subject === ""
													? "subject-error"
													: undefined
											}
										/>
										{hasAttemptedSubmit && formData.subject === "" && (
											<p
												id="subject-error"
												className="mt-2 text-sm text-red-400"
												role="alert"
											>
												件名を入力してください
											</p>
										)}
									</div>

									<div>
										<label
											htmlFor="message"
											className="block text-sm font-medium text-white mb-2"
										>
											お問い合わせ内容{" "}
											<span className="text-red-400" aria-hidden="true">
												*
											</span>
											<span className="sr-only">（必須）</span>
										</label>
										<Textarea
											ref={messageRef}
											id="message"
											name="message"
											required
											rows={10}
											value={formData.message}
											onChange={handleChange}
											className="w-full min-h-[15rem] resize-none overflow-hidden bg-white/5 border-white/10 text-white placeholder:text-white/50 [field-sizing:normal]"
											placeholder="お問い合わせ内容をご記入ください。"
											disabled={isSubmitting}
											aria-invalid={
												hasAttemptedSubmit && formData.message === ""
											}
											aria-describedby={
												hasAttemptedSubmit && formData.message === ""
													? "message-error"
													: undefined
											}
										/>
										{hasAttemptedSubmit && formData.message === "" && (
											<p
												id="message-error"
												className="mt-2 text-sm text-red-400"
												role="alert"
											>
												お問い合わせ内容を入力してください
											</p>
										)}
									</div>

									<div className="text-center">
										<Button
											type="submit"
											size="lg"
											disabled={isSubmitting}
											className="min-w-[12rem] tracking-widest"
										>
											{isSubmitting ? "送信中..." : "送信"}
										</Button>
									</div>
								</form>

								<div className="mt-8 text-sm text-white/90">
									<ul className="list-disc list-inside space-y-2">
										<li>
											3日以内を目安にメールにてご連絡させていただきます。
										</li>
										<li>
											4日以上経っても返信がない場合はお手数ですが、orchestrapiufolle[at]gmail.com（[at]を@に置き換えてください）まで直接ご連絡ください。
										</li>
										<li>
											なお、こちらからのメールが迷惑メールに分類されてしまうケースもございますので、そちらもご確認ください。
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</section>
			</PageContainer>

			{/* 送信完了モーダル */}
			{showSuccessModal && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
					role="dialog"
					aria-modal="true"
					aria-labelledby="success-modal-title"
				>
					{/* オーバーレイ */}
					<button
						type="button"
						className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
						aria-label="閉じる"
						onClick={() => setShowSuccessModal(false)}
					/>

					{/* モーダル本体 */}
					<div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-200">
						<div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
							<CheckCircle className="h-9 w-9 text-green-600" aria-hidden="true" />
						</div>
						<h2
							id="success-modal-title"
							className="text-xl font-bold text-gray-900 mb-3"
							role="status"
						>
							お問い合わせを送信いたしました
						</h2>
						<p className="text-sm text-gray-600 leading-relaxed mb-2">
							内容を確認次第、担当者よりご連絡させていただきます。
						</p>
						<p className="text-sm text-gray-600 leading-relaxed mb-6">
							ご入力いただいたメールアドレス宛に、受付確認の自動返信メールをお送りしました。数分経っても届かない場合は、迷惑メールフォルダもご確認ください。
						</p>
						<Button
							type="button"
							onClick={() => setShowSuccessModal(false)}
							className="px-8 py-3"
						>
							閉じる
						</Button>
					</div>
				</div>
			)}
		</>
	);
}

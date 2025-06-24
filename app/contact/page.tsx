"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Mail,
	MessageCircle,
	FileText,
	Twitter,
	Instagram,
	CheckCircle,
	AlertCircle,
} from "lucide-react";
import { submitContactForm } from "@/lib/api/contact";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error" | null;
		message: string | null;
	}>({ type: null, message: null });

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus({ type: null, message: null });

		try {
			const result = await submitContactForm(formData);
			if (result.success) {
				setSubmitStatus({
					type: "success",
					message:
						"お問い合わせを送信いたしました。内容を確認次第、担当者よりご連絡させていただきます。",
				});
				setFormData({
					name: "",
					email: "",
					subject: "",
					message: "",
				});
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
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="pt-20">
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h1 className="font-serif text-4xl font-bold text-gray-800 text-center mb-12">
						Contact Us
					</h1>

					<div className="max-w-4xl mx-auto">
						{/* Contact Information */}
						<Card className="mb-12">
							<CardHeader>
								<CardTitle className="font-serif text-2xl text-gray-800 text-center">
									お問い合わせ先
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
									<div className="flex flex-col items-center space-y-3">
										<FileText className="text-[#002060]" size={32} />
										<div>
											<h3 className="font-semibold text-gray-800 mb-1">
												フォーム
											</h3>
											<p className="text-gray-600">
												下記のフォームから
												<br />
												お問い合わせいただけます
											</p>
										</div>
									</div>

									<div className="flex flex-col items-center space-y-3">
										<Mail className="text-[#002060]" size={32} />
										<div>
											<h3 className="font-semibold text-gray-800 mb-1">
												メール
											</h3>
											<p className="text-gray-600">
												orchestrapiufolle[at]gmail.com
											</p>
											<p className="text-sm text-gray-500 mt-1">
												※[at]を@に置き換えてください
											</p>
										</div>
									</div>

									<div className="flex flex-col items-center space-y-3">
										<MessageCircle className="text-[#002060]" size={32} />
										<div>
											<h3 className="font-semibold text-gray-800 mb-1">SNS</h3>
											<div className="flex flex-col items-center space-y-2">
												<a
													href="https://x.com/orchpiufolle"
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center space-x-2 text-gray-600 hover:text-[#002060] transition-colors"
												>
													<Twitter size={20} />
													<span>X (Twitter)</span>
												</a>
												<a
													href="https://www.instagram.com/orchpiufolle/"
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center space-x-2 text-gray-600 hover:text-[#002060] transition-colors"
												>
													<Instagram size={20} />
													<span>Instagram</span>
												</a>
											</div>
										</div>
									</div>
								</div>

								<div className="mt-8 text-sm text-gray-600 space-y-2">
									<p>・3日以内を目安にメールにてご連絡させていただきます。</p>
									<p>
										・4日以上経っても返信がない場合はお手数ですが、上記のメールアドレスまで直接ご連絡ください。
									</p>
									<p>
										・なお、こちらからのメールが迷惑メールに分類されてしまうケースもございますので、そちらもご確認ください。
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Contact Form */}
						<Card>
							<CardHeader>
								<CardTitle className="font-serif text-2xl text-gray-800 text-center">
									お問い合わせフォーム
								</CardTitle>
							</CardHeader>
							<CardContent>
								{submitStatus.type && (
									<div
										className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${
											submitStatus.type === "success"
												? "bg-green-50 text-green-800 border border-green-200"
												: "bg-red-50 text-red-800 border border-red-200"
										}`}
									>
										{submitStatus.type === "success" ? (
											<CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
										) : (
											<AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
										)}
										<div className="flex-1">{submitStatus.message}</div>
									</div>
								)}

								<form onSubmit={handleSubmit} className="space-y-6">
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											お名前 <span className="text-red-500">*</span>
										</label>
										<Input
											id="name"
											name="name"
											type="text"
											required
											value={formData.name}
											onChange={handleChange}
											className="w-full"
											placeholder="山田 太郎"
											disabled={isSubmitting}
										/>
									</div>

									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											メールアドレス <span className="text-red-500">*</span>
										</label>
										<Input
											id="email"
											name="email"
											type="email"
											required
											pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
											value={formData.email}
											onChange={handleChange}
											className="w-full"
											placeholder="example@email.com"
											disabled={isSubmitting}
										/>
									</div>

									<div>
										<label
											htmlFor="subject"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											件名
										</label>
										<Input
											id="subject"
											name="subject"
											type="text"
											value={formData.subject}
											onChange={handleChange}
											className="w-full"
											placeholder="お問い合わせの件名をご記入ください。"
											disabled={isSubmitting}
										/>
									</div>

									<div>
										<label
											htmlFor="message"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											お問い合わせ内容 <span className="text-red-500">*</span>
										</label>
										<Textarea
											id="message"
											name="message"
											required
											rows={6}
											value={formData.message}
											onChange={handleChange}
											className="w-full"
											placeholder="お問い合わせの内容をご記入ください。"
											disabled={isSubmitting}
										/>
									</div>

									<div className="text-center">
										<Button
											type="submit"
											className="bg-[#002060] hover:bg-[#001040] text-white px-8 py-3"
											disabled={isSubmitting}
										>
											{isSubmitting ? "送信中..." : "送信"}
										</Button>
									</div>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</div>
	);
}

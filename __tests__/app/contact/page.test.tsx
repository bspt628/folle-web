import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactPage from "@/app/contact/page";
import { submitContactForm } from "@/lib/api/contact";
import { TestProvider } from "../../../test/providers/test-provider";

// APIのモック
jest.mock("@/lib/api/contact", () => ({
	submitContactForm: jest.fn(),
}));

describe("Contact Page", () => {
	beforeEach(() => {
		// 各テスト前にモックをリセット
		jest.clearAllMocks();
	});

	it("renders contact form with all fields", () => {
		render(<ContactPage />, { wrapper: TestProvider });

		// 見出しが表示されているか確認
		expect(
			screen.getByRole("heading", { name: /Contact Us/i })
		).toBeInTheDocument();

		// フォームフィールドが表示されているか確認
		expect(
			screen.getByRole("textbox", { name: /お名前/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("textbox", { name: /メールアドレス/i })
		).toBeInTheDocument();
		expect(screen.getByRole("textbox", { name: /件名/i })).toBeInTheDocument();
		expect(
			screen.getByRole("textbox", { name: /お問い合わせ内容/i })
		).toBeInTheDocument();

		// 送信ボタンが表示されているか確認
		expect(screen.getByRole("button", { name: /送信/i })).toBeInTheDocument();
	});

	it("initially renders form without validation errors", () => {
		render(<ContactPage />, { wrapper: TestProvider });

		// エラーメッセージが表示されていないことを確認
		const errors = screen.queryAllByRole("alert");
		expect(errors).toHaveLength(0);
	});

	it("shows validation errors after fields are touched and empty", async () => {
		render(<ContactPage />, { wrapper: TestProvider });

		// 各フィールドにフォーカスして離れる（touched状態にする）
		const nameInput = screen.getByRole("textbox", { name: /お名前/i });
		const emailInput = screen.getByRole("textbox", { name: /メールアドレス/i });
		const subjectInput = screen.getByRole("textbox", { name: /件名/i });
		const messageInput = screen.getByRole("textbox", {
			name: /お問い合わせ内容/i,
		});

		fireEvent.focus(nameInput);
		fireEvent.blur(nameInput);
		fireEvent.focus(emailInput);
		fireEvent.blur(emailInput);
		fireEvent.focus(subjectInput);
		fireEvent.blur(subjectInput);
		fireEvent.focus(messageInput);
		fireEvent.blur(messageInput);

		// エラーメッセージが表示されるか確認
		await waitFor(() => {
			const errors = screen.getAllByRole("alert");
			expect(errors).toHaveLength(4);
			expect(errors[0]).toHaveTextContent("お名前を入力してください");
			expect(errors[1]).toHaveTextContent("メールアドレスを入力してください");
			expect(errors[2]).toHaveTextContent("件名を入力してください");
			expect(errors[3]).toHaveTextContent("お問い合わせ内容を入力してください");
		});
	});

	it("validates email format after field is touched", async () => {
		render(<ContactPage />, { wrapper: TestProvider });

		// 不正なメールアドレスを入力
		const emailInput = screen.getByRole("textbox", { name: /メールアドレス/i });
		fireEvent.focus(emailInput);
		fireEvent.change(emailInput, { target: { value: "invalid-email" } });
		fireEvent.blur(emailInput);

		// エラーメッセージが表示されるか確認
		await waitFor(() => {
			const errors = screen.getAllByRole("alert");
			expect(errors).toHaveLength(1);
			expect(errors[0]).toHaveTextContent(
				"正しいメールアドレスを入力してください"
			);
		});

		// 正しいメールアドレスを入力するとエラーが消える
		fireEvent.change(emailInput, { target: { value: "test@example.com" } });

		await waitFor(() => {
			const errors = screen.queryAllByRole("alert");
			expect(errors).toHaveLength(0);
		});
	});

	it("shows validation errors on submit if fields are empty", async () => {
		render(<ContactPage />, { wrapper: TestProvider });

		// 送信ボタンをクリック
		fireEvent.click(screen.getByRole("button", { name: /送信/i }));

		// すべてのフィールドがtouchedになり、エラーメッセージが表示される
		await waitFor(() => {
			const validationErrors = screen.getAllByRole("alert");
			expect(validationErrors).toHaveLength(4);
			expect(validationErrors[0]).toHaveTextContent("お名前を入力してください");
			expect(validationErrors[1]).toHaveTextContent(
				"メールアドレスを入力してください"
			);
			expect(validationErrors[2]).toHaveTextContent("件名を入力してください");
			expect(validationErrors[3]).toHaveTextContent(
				"お問い合わせ内容を入力してください"
			);
		});
	});

	it("submits form successfully", async () => {
		const mockSubmitContactForm = submitContactForm as jest.Mock;
		mockSubmitContactForm.mockResolvedValueOnce({ success: true });

		render(<ContactPage />, { wrapper: TestProvider });

		// フォームに値を入力
		fireEvent.change(screen.getByRole("textbox", { name: /お名前/i }), {
			target: { value: "テスト太郎" },
		});
		fireEvent.change(screen.getByRole("textbox", { name: /メールアドレス/i }), {
			target: { value: "test@example.com" },
		});
		fireEvent.change(screen.getByRole("textbox", { name: /件名/i }), {
			target: { value: "テストの件" },
		});
		fireEvent.change(
			screen.getByRole("textbox", { name: /お問い合わせ内容/i }),
			{ target: { value: "テストメッセージ" } }
		);

		// フォームを送信
		fireEvent.click(screen.getByRole("button", { name: /送信/i }));

		// 送信成功メッセージが表示されるか確認
		await waitFor(() => {
			const successMessage = screen.getByRole("status");
			expect(successMessage).toHaveTextContent(
				"お問い合わせを送信いたしました"
			);
		});

		// APIが正しい値で呼び出されたか確認
		expect(mockSubmitContactForm).toHaveBeenCalledWith({
			name: "テスト太郎",
			email: "test@example.com",
			subject: "テストの件",
			message: "テストメッセージ",
		});
	});

	it("handles submission error", async () => {
		const mockSubmitContactForm = submitContactForm as jest.Mock;
		mockSubmitContactForm.mockRejectedValueOnce(new Error("送信エラー"));

		render(<ContactPage />, { wrapper: TestProvider });

		// フォームに値を入力
		fireEvent.change(screen.getByRole("textbox", { name: /お名前/i }), {
			target: { value: "テスト太郎" },
		});
		fireEvent.change(screen.getByRole("textbox", { name: /メールアドレス/i }), {
			target: { value: "test@example.com" },
		});
		fireEvent.change(screen.getByRole("textbox", { name: /件名/i }), {
			target: { value: "テストの件" },
		});
		fireEvent.change(
			screen.getByRole("textbox", { name: /お問い合わせ内容/i }),
			{ target: { value: "テストメッセージ" } }
		);

		// フォームを送信
		fireEvent.click(screen.getByRole("button", { name: /送信/i }));

		// エラーメッセージが表示されるか確認
		await waitFor(() => {
			const errorMessage = screen.getByRole("error");
			expect(errorMessage).toHaveTextContent(
				"お問い合わせの送信に失敗しました"
			);
		});
	});
});

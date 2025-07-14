import { render, screen } from "@testing-library/react";
import ConcertsPage from "@/app/concerts/page";

// モックデータ
const mockConcerts = [
	{
		id: "1",
		title: "第1回特別演奏会",
		date: "2025-11-09T00:00:00+09:00",
		venue: "テスト会場1",
		posterUrl: "/1stビラ.png",
		status: "upcoming",
	},
];

// APIレスポンスのモック
jest.mock("@/lib/microcms", () => ({
	client: {
		get: jest.fn(() => Promise.resolve({ contents: mockConcerts })),
	},
}));

describe("Concerts Page", () => {
	it("renders concert list", async () => {
		render(await ConcertsPage());

		// ページタイトルが表示されているか確認
		expect(screen.getByText("Concerts")).toBeInTheDocument();

		// コンサートのタイトルが表示されているか確認
		expect(screen.getByText("第1回特別演奏会")).toBeInTheDocument();

		// 日付が表示されているか確認
		expect(screen.getByText("2025/11/09 (日)")).toBeInTheDocument();

		// ステータスが表示されているか確認
		expect(screen.getByText("開催予定")).toBeInTheDocument();
	});

	it("renders concert cards with proper accessibility attributes", async () => {
		render(await ConcertsPage());

		// コンサートカードが適切なアクセシビリティ属性を持っているか確認
		const card = screen.getByLabelText("第1回特別演奏会の詳細を見る");
		expect(card).toBeInTheDocument();
		expect(card).toHaveAttribute("href", "/concerts/1");
	});
});

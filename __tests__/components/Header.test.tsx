import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/header";

jest.mock("next/navigation", () => ({
	usePathname: () => "/",
}));

describe("Header Component", () => {
	it("renders logo and navigation links", () => {
		render(<Header />);

		// ロゴが表示されているか確認
		expect(screen.getByAltText("Orchestra più Folle")).toBeInTheDocument();

		// ナビゲーションリンクが表示されているか確認
		expect(screen.getByText("コンサート")).toBeInTheDocument();
		expect(screen.getByText("メンバー")).toBeInTheDocument();
		expect(screen.getByText("お問い合わせ")).toBeInTheDocument();
	});

	it("toggles mobile menu when menu button is clicked", () => {
		render(<Header />);

		// モバイルメニューボタンを取得
		const menuButton = screen.getByLabelText("メニューを開く");

		// 初期状態ではメニューは閉じている
		expect(menuButton).toHaveAttribute("aria-expanded", "false");

		// メニューボタンをクリック
		fireEvent.click(menuButton);

		// メニューが開いた状態になる
		expect(menuButton).toHaveAttribute("aria-expanded", "true");

		// もう一度クリックで閉じる
		fireEvent.click(menuButton);
		expect(menuButton).toHaveAttribute("aria-expanded", "false");
	});

	it("handles keyboard navigation in mobile menu", () => {
		render(<Header />);

		const menuButton = screen.getByLabelText("メニューを開く");

		// Enterキーでメニューを開く
		fireEvent.keyDown(menuButton, { key: "Enter" });
		expect(menuButton).toHaveAttribute("aria-expanded", "true");

		// Escapeキーでメニューを閉じる
		fireEvent.keyDown(document, { key: "Escape" });
		expect(menuButton).toHaveAttribute("aria-expanded", "false");
	});
});

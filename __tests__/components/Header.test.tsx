import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/header";

// useRouterのモック
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: jest.fn(),
		prefetch: jest.fn(),
	}),
}));

describe("Header Component", () => {
	it("renders logo and navigation links", () => {
		render(<Header />);

		// ロゴが表示されているか確認
		expect(screen.getByAltText("Orchestra più Folle")).toBeInTheDocument();

		// メインナビゲーションのリンクが表示されているか確認
		const mainNav = screen.getByLabelText("メインナビゲーション");
		expect(mainNav).toBeInTheDocument();
		expect(mainNav.querySelector('a[href="/about"]')).toHaveTextContent(
			"About Us"
		);
		expect(mainNav.querySelector('a[href="/concerts"]')).toHaveTextContent(
			"Concerts"
		);
		expect(mainNav.querySelector('a[href="/contact"]')).toHaveTextContent(
			"Contact Us"
		);
	});

	it("toggles mobile menu when menu button is clicked", () => {
		render(<Header />);

		// モバイルメニューボタンを取得
		const menuButton = screen.getByLabelText("メインメニューを開閉");
		const mobileNav = screen.getByLabelText("モバイルメインナビゲーション");

		// 初期状態ではメニューは閉じている
		expect(menuButton).toHaveAttribute("aria-expanded", "false");
		expect(mobileNav).toHaveClass("hidden");

		// メニューボタンをクリック
		fireEvent.click(menuButton);

		// メニューが開いた状態になる
		expect(menuButton).toHaveAttribute("aria-expanded", "true");
		expect(mobileNav).not.toHaveClass("hidden");

		// もう一度クリックで閉じる
		fireEvent.click(menuButton);

		// メニューが閉じた状態に戻る
		expect(menuButton).toHaveAttribute("aria-expanded", "false");
		expect(mobileNav).toHaveClass("hidden");
	});

	it("handles keyboard navigation in mobile menu", () => {
		render(<Header />);

		const menuButton = screen.getByLabelText("メインメニューを開閉");
		const mobileNav = screen.getByLabelText("モバイルメインナビゲーション");

		// Enterキーでメニューを開く（クリックイベントをシミュレート）
		fireEvent.click(menuButton);
		expect(menuButton).toHaveAttribute("aria-expanded", "true");
		expect(mobileNav).not.toHaveClass("hidden");

		// Escapeキーでメニューを閉じる
		fireEvent.keyDown(document, { key: "Escape" });
		expect(menuButton).toHaveAttribute("aria-expanded", "false");
		expect(mobileNav).toHaveClass("hidden");
	});
});

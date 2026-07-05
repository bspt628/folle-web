import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";

describe("About Page", () => {
	it("renders main heading and introduction", async () => {
		render(await AboutPage());

		// メインの見出しが表示されているか確認
		expect(
			screen.getByRole("heading", { name: /About Us/i })
		).toBeInTheDocument();

		// 団体紹介のテキストが表示されているか確認
		const introText = screen.getByText((content) =>
			content.includes("Orchestra più Folle (Fオケ)")
		);
		expect(introText).toBeInTheDocument();
	});

	it("renders logo and description", async () => {
		render(await AboutPage());

		// ロゴ画像が表示されているか確認
		const logo = screen.getByAltText("Orchestra più Folle Logo");
		expect(logo).toBeInTheDocument();

		// ロゴの説明が表示されているか確認
		const logoDescription = screen.getByText((content) =>
			content.includes("ロゴマークは、躍動感あふれる音符をモチーフにしています")
		);
		expect(logoDescription).toBeInTheDocument();
	});
});

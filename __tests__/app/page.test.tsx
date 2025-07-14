import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { TestProvider } from "../../test/providers/test-provider";

// React Hooksのモック
jest.mock("react", () => ({
	...jest.requireActual("react"),
	useState: jest.fn((init) => [init, jest.fn()]),
	useRef: jest.fn(() => ({ current: null })),
	useEffect: jest.fn((cb) => cb()),
}));

// Next.jsのフックのモック
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: jest.fn(),
		prefetch: jest.fn(),
	}),
	usePathname: () => "/",
}));

// データ取得関数のモック
jest.mock("@/lib/api/news", () => ({
	getNewsItems: jest.fn().mockResolvedValue([]),
}));

jest.mock("@/lib/api/concerts", () => ({
	getUpcomingConcert: jest.fn().mockResolvedValue({
		id: "1",
		title: "第1回特別演奏会",
		date: "2024-05-01",
		venue: "東京芸術劇場",
		description: "Orchestra più Folleの第1回特別演奏会です。",
		ticketUrl: "https://example.com/tickets/1",
	}),
}));

describe("Home Page", () => {
	it("renders main heading", async () => {
		render(await HomePage(), { wrapper: TestProvider });
		expect(screen.getByText("Orchestra più Folle")).toBeInTheDocument();
	});
});

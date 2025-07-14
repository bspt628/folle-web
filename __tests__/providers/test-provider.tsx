import { render } from "@testing-library/react";
import { TestProvider } from "../../test/providers/test-provider";

describe("TestProvider", () => {
	it("renders children correctly", () => {
		const { container } = render(
			<TestProvider>
				<div>Test Child</div>
			</TestProvider>
		);
		expect(container.textContent).toBe("Test Child");
	});
});

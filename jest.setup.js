import "@testing-library/jest-dom";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

// Mock window.performance
Object.defineProperty(window, "performance", {
	writable: true,
	value: {
		mark: jest.fn(),
		measure: jest.fn(),
		clearMarks: jest.fn(),
		clearMeasures: jest.fn(),
		getEntriesByType: jest.fn().mockReturnValue([
			{
				type: "navigation",
				entryType: "navigation",
				name: "document",
			},
		]),
	},
});

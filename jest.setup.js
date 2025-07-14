require("@testing-library/jest-dom");

// React Hooksのテストに必要な設定
const React = require("react");
const { useState: originalUseState } = React;

// useStateのモック
React.useState = jest.fn().mockImplementation((init) => {
	return originalUseState(init);
});

// window.performanceのモック
Object.defineProperty(window, "performance", {
	value: {
		getEntriesByType: jest.fn().mockReturnValue([
			{
				type: "navigate",
			},
		]),
	},
	writable: true,
});

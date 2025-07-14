module.exports = {
	testEnvironment: "jest-environment-jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1",
		"\\.(css|less|sass|scss)$": "identity-obj-proxy",
	},
	testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
	},
	moduleDirectories: ["node_modules", "<rootDir>"],
};

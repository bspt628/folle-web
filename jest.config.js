const nextJest = require("next/jest");

const createJestConfig = nextJest({
	// next.config.jsとテスト環境用の.envファイルが配置されたディレクトリをセット
	dir: "./",
});

// Jest のカスタム設定を設置する場所
const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	moduleDirectories: ["node_modules", "<rootDir>/"],
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1",
	},
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": ["@swc/jest"],
	},
};

// createJestConfigを定義することによって、本ファイルで定義された設定がNext.jsの設定に反映されます
module.exports = createJestConfig(customJestConfig);

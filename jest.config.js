module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/__mocks__"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts", "!src/{services,modules,types}/**/*"],
  // to run some script immediately after the test framework has been installed in the environment but before the test code itself.
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setupAfterEnv.ts"],
  // to run some scripts in the testing environment before executing setupFilesAfterEnv and before the test code itself.
  setupFiles: ["react-app-polyfill/jsdom", "<rootDir>/src/tests/jest.setupBeforeEnv.ts"],
  // NOTE: https://github.com/mswjs/msw/issues/1786#issuecomment-1782559851
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}", "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/config/jest/babelTransform.js",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  modulePaths: ["<rootDir>/src/"],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["web.js", "js", "web.ts", "ts", "web.tsx", "tsx", "json", "web.jsx", "jsx", "node"],
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
  resetMocks: true,
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Automatically restore mock state between every test
  restoreMocks: true,
  displayName: {
    name: "CLIENT_UNIT_TESTS",
    color: "blue",
  },
  // coverage
  coverageDirectory: "<rootDir>/reports/unit/coverage",
  coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: true }]],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};

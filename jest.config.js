// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    "<rootDir>/__tests__/**/*.[jt]s?(x)", // Match all test files under the __tests__ directory
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Collect coverage from source files
    "!**/node_modules/**", // Exclude node_modules
    "!**/__tests__/**", // Exclude test files from coverage
  ],
};

module.exports = createJestConfig(customJestConfig);

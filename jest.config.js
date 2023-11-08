module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "dist", "utils.test.ts"],
  collectCoverage: true,
  coverageDirectory: "dist/coverage",
  collectCoverageFrom: ["src/*.ts", "!src/**/*.d.ts"],
  coverageThreshold: {
    global: {
      //branches: 50,
      //functions: 50,
      //lines: 50,
      //statements: 50,
    },
  },
};

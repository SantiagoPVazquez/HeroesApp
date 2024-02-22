module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {"\\.[jt]sx?$": "babel-jest"},
    moduleNameMapper: {
        "^animate.css$": "<rootDir>/mocks/animate.css.js",
      },
      transformIgnorePatterns: ["/node_modules/(?!query-string)/"],
    // setupFiles: ['./jest.setup.js']
}
module.exports = {
  collectCoverageFrom: ['src/{,**/}*.tsx'],
  setupTestFrameworkScriptFile: '<rootDir>/test/env.js',
  testMatch: ['**/*.spec.ts?(x)'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleNameMapper: {
    '^.+[.](md|txt)$': '<rootDir>/test/stringStub.js',
  },
  transform: {
    '^.+\\.(js|ts)x?$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  rootDir: __dirname,
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/test/img.spec.js'],
}

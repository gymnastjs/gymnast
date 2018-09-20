module.exports = {
  collectCoverageFrom: ['src/{,**/}*.js'],
  setupTestFrameworkScriptFile: '<rootDir>/test/env.js',
  moduleNameMapper: {
    '^.+[.]css$': 'identity-obj-proxy',
    '^.+[.](md|txt)$': '<rootDir>/test/stringStub.js',
  },
  transform: {
    '^.+[.]js$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  rootDir: __dirname,
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/test/img.spec.js',
  ],
}

module.exports = {
  collectCoverageFrom: ['src/{,**/}*.js'],
  setupFilesAfterEnv: ['<rootDir>/test/env.js'],
  moduleNameMapper: {
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

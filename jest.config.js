module.exports = {
  collectCoverageFrom: ['src/{,**/}*.{j,t}s{x,}'],
  setupFilesAfterEnv: ['<rootDir>/test/env.tsx'],
  moduleNameMapper: {
    '^.+[.](md|txt)$': '<rootDir>/test/stringStub.js',
    "^gymnast$": "<rootDir>/src/gymnast.tsx",
    "^gymnast/(.*)": "<rootDir>/$1"
  },
  transform: {
    '^.+[.](j|t)sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  rootDir: __dirname,
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/test/img.spec.tsx',
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
}

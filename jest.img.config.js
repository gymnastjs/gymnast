const config = require('./jest.config')

module.exports = Object.assign({}, config, {
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
})

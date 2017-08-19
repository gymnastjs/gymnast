const isCIMaster = process.env.CI && process.env.CIRCLE_BRANCH === 'master'
const suffix = isCIMaster ? '_MASTER' : ''
const browserHeight = 960
const browserWidth = 1280

module.exports = {
  isCIMaster,
  username: process.env[`SAUCE_USERNAME${suffix}`],
  accessKey: process.env[`SAUCE_ACCESS_KEY${suffix}`],
  browserWidth,
  browserHeight,
  getWidth(browserName) {
    switch (browserName) {
      case 'ie':
      case 'edge':
        return browserWidth + 16
      default:
        return browserWidth
    }
  },
  getHeight(browserName) {
    switch (browserName) {
      case 'ie':
        return browserHeight + 7
      case 'edge':
        return browserHeight - 17
      case 'firefox':
        return browserHeight + 5
      case 'safari':
        return browserHeight - 36
      default:
        return browserHeight
    }
  },
}

const isCIMaster = process.env.CI && process.env.CIRCLE_BRANCH === 'master'
const suffix = isCIMaster ? '_MASTER' : ''
const browserHeight = 960

module.exports = {
  isCIMaster,
  username: process.env[`SAUCE_USERNAME${suffix}`],
  accessKey: process.env[`SAUCE_ACCESS_KEY${suffix}`],
  browserWidth: 1280,
  browserHeight,
  getActualHeight(browserName) {
    switch (browserName) {
      case 'ie':
        return browserHeight - 45
      default:
        return browserHeight
    }
  },
}

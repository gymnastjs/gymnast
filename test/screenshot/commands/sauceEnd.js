const SauceLabs = require('saucelabs')

exports.command = function command(callback) {
  const saucelabs = new SauceLabs({
    username: process.env.SAUCE_USERNAME,
    password: process.env.SAUCE_ACCESS_KEY,
  })
  const sessionId = this.capabilities['webdriver.remote.sessionid']
  const { name } = this.currentTest
  const passed = this.currentTest.results.failed === 0

  saucelabs.updateJob(sessionId, { passed, name }, callback)

  return this
}

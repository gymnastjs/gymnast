const { find } = require('lodash')
const browsers = require('../browsers.json')

const isCIMaster = process.env.CI && process.env.CIRCLE_BRANCH === 'master'
const suffix = isCIMaster ? '_MASTER' : ''

function getBrowserData(browserName) {
  const match = find(
    browsers,
    (browser, key) =>
      browser.desiredCapabilities.browserName === browserName ||
      key === browserName
  )

  if (match) {
    return match.custom_vars
  }

  return {}
}

module.exports = {
  isCIMaster,
  getBrowserData,
  username: process.env[`SAUCE_USERNAME${suffix}`],
  accessKey: process.env[`SAUCE_ACCESS_KEY${suffix}`],
}

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

function delay(time) {
  return new Promise(done => setTimeout(done, time))
}

function retry(promiseCalls, maxAttempts = 3, attempt = 0) {
  return new Promise((success, fail) => {
    try {
      promiseCalls()
        .then(success)
        .catch(fail)
    } catch (e) {
      fail(e)
    }
  }).catch(e => {
    if (attempt < maxAttempts) {
      return delay(1000).then(() =>
        retry(promiseCalls, maxAttempts, attempt + 1)
      )
    }
    throw new Error(
      `Max retries (${maxAttempts}) exceeded. ${e.stack || e.message}`
    )
  })
}

module.exports = {
  accessKey: process.env[`SAUCE_ACCESS_KEY${suffix}`],
  delay,
  getBrowserData,
  isCIMaster,
  retry,
  username: process.env[`SAUCE_USERNAME${suffix}`],
}

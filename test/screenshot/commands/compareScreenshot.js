/* eslint-disable no-console, prefer-arrow-callback */
const { noop } = require('lodash')

exports.command = function command(
  filename,
  baseline,
  sessionId,
  browserName,
  callback = noop
) {
  const screenshotPath = 'test/screenshot/images'
  const resultPath = `${screenshotPath}/results/${browserName}-${filename}`

  return this.execute(function inBrowser() {
    document.body.style.overflow = 'hidden'
    return true
  }).saveScreenshot(resultPath, screenshot => {
    if (screenshot.status !== 0) {
      console.log('Error saving screenshot...', screenshot)
      callback(false)
    }
    this.assert.compareScreenshot(filename, baseline, browserName, result => {
      callback(result)
    })
  })
}

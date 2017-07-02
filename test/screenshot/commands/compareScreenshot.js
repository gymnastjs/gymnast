/* eslint-disable no-console */

const { noop } = require('lodash')

exports.command = function command(
  filename,
  baseline,
  sessionId,
  expected,
  callback = noop
) {
  const screenshotPath = 'test/screenshot/images'
  const resultPath = `${screenshotPath}/results/${filename}`

  this.saveScreenshot(resultPath, screenshot => {
    if (screenshot.status !== 0) {
      console.log('Error saving screenshot...', screenshot)
      callback(false)
    }
    this.assert.compareScreenshot(filename, baseline, expected, result => {
      callback(result)
    })
  })

  return this
}

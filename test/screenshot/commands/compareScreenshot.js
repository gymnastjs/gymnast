exports.command = function command(filename, baseline, expected, callback) {
  const screenshotPath = 'test/screenshot/images'
  const resultPath = `${screenshotPath}/results/${filename}`

  this.saveScreenshot(resultPath, () => {
    this.assert.compareScreenshot(filename, baseline, expected, result => {
      if (typeof callback === 'function') {
        callback.call(this, result)
      }
    })
  })

  return this
}

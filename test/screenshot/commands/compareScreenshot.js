/* eslint-disable no-console, prefer-arrow-callback, prefer-rest-params */
const { existsSync } = require('fs')
const { resolve } = require('path')
const { moveSync } = require('fs-extra')
const sharp = require('sharp')
const { noop } = require('lodash')
const { getBrowserData } = require('../shared')

sharp.concurrency(1)

function isValid(
  assert,
  screenshot,
  filename,
  baseline,
  sessionId,
  browserName,
  callback = noop
) {
  if (screenshot.status !== 0) {
    console.log('Error saving screenshot...', screenshot)
    callback(false)
  }
  assert.compareScreenshot(filename, baseline, browserName, result => {
    callback(!!result)
  })
}

function move(origin, destination) {
  if (existsSync(origin)) {
    moveSync(origin, destination, { overwrite: true })
  }
}

exports.command = function command(filename, baseline, sessionId, browserName) {
  const screenshotPath = 'test/screenshot/images'
  const resultPath = `${screenshotPath}/results/${browserName}-${filename}`

  return this.execute(function inBrowser() {
    document.body.style.overflow = 'hidden'
    return true
  }).saveScreenshot(resultPath, screenshot => {
    const { extract } = getBrowserData(browserName)
    const check = isValid.bind(this, this.assert, screenshot, ...arguments)

    if (extract) {
      const target = resolve(__dirname, '../../..', resultPath)
      const temp = resolve(__dirname, '../../../temp.png')
      const movePartial = move.bind(this, temp, target)

      return sharp(target)
        .extract(extract)
        .toFile(temp)
        .then(movePartial)
        .then(check)
    }

    return check()
  })
}

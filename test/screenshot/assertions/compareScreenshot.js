const resemblejs = require('node-resemble-js')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const { getBrowserData, retry } = require('../shared')

function makeDir(dirPath) {
  return mkdirp.sync(dirPath)
}

function compareImages(baselinePath, resultPath) {
  resemblejs.outputSettings({
    errorColor: {
      red: 225,
      green: 0,
      blue: 255,
    },
    errorType: 'movement',
    transparency: 0.1,
    largeImageThreshold: 1200,
  })

  return new Promise(resolve => {
    resemblejs(baselinePath)
      .compareTo(resultPath)
      .onComplete(resolve)
  })
}

function compareScreenshot({ baseline, result, diff }, browserName) {
  const { platform } = getBrowserData(browserName)

  makeDir(path.dirname(result))
  makeDir(path.dirname(diff))
  makeDir(path.dirname(baseline))

  // create new baseline photo if none exists
  if (!fs.existsSync(baseline)) {
    // baseline is chrome for desktop, iphone for mobile
    if (
      (platform === 'desktop' && browserName === 'chrome') ||
      (platform === 'mobile' && browserName === 'iphone7')
    ) {
      process.stdout.write('Image did not exist, updating test...\n')
      fs.writeFileSync(baseline, fs.readFileSync(result))
    }
  }

  if (fs.existsSync(baseline)) {
    return compareImages(baseline, result)
  }
  return Promise.reject()
}

exports.assertion = function assertion(filename, baselinePath, browserName) {
  const screenshotPath = 'test/screenshot/images'
  const resultPath = `${screenshotPath}/results/${browserName}-${filename}`
  const diffPath = `${screenshotPath}/diffs/${browserName}-${filename}`

  this.message = 'Unexpected compareScreenshot error.'
  this.expected = browserName === 'chrome' ? 0 : 3.7 // misMatchPercentage tolerance 3.0% for non chrome

  this.command = callback => {
    retry(() =>
      compareScreenshot(
        {
          baseline: baselinePath,
          result: resultPath,
          diff: diffPath,
        },
        browserName
      ).then(callback)
    ).catch(() => callback(false))
    return this
  }

  this.value = result => {
    if (result) {
      result
        .getDiffImage()
        .pack()
        .pipe(fs.createWriteStream(diffPath))
      return parseFloat(result.misMatchPercentage, 10) // value this.pass is called with
    }
    return 0
  }

  this.pass = function passFn(value) {
    const pass = value <= this.expected

    if (pass === true) {
      this.message = `Screenshots Matched for ${filename} with a tolerance of ${this
        .expected}%.`
    } else if (pass === false) {
      this.message =
        `Screenshots Match Failed for ${filename} with a tolerance of ${this
          .expected}%.\n` +
        `   Screenshots at:\n` +
        `    Baseline: ${baselinePath}\n` +
        `    Result: ${resultPath}\n` +
        `    Diff: ${diffPath}\n` +
        `   Open ${diffPath} to see how the screenshot has changed.\n` +
        `   If the Result Screenshot is correct you can use it to update the Baseline Screenshot and re-run your test:\n` +
        `    cp ${resultPath} ${baselinePath}`
    } else {
      this.message = `Screenshot results not collected for this browser`
      return false
    }
    return pass
  }
}

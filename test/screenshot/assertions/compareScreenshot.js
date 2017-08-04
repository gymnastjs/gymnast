const resemblejs = require('node-resemble-js')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

function makeDir(dirPath) {
  return new Promise((resolve, reject) => {
    mkdirp(dirPath, err => {
      if (err) {
        reject(err)
      }

      resolve()
    })
  })
}

function compareImages(baselinePath, resultPath, callback) {
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

  resemblejs(baselinePath).compareTo(resultPath).onComplete(callback)
}

exports.assertion = function assertion(filename, baselinePath, browserName) {
  const screenshotPath = 'test/screenshot/images'
  const resultPath = `${screenshotPath}/results/${browserName}-${filename}`
  const diffPath = `${screenshotPath}/diffs/${browserName}-${filename}`

  this.message = 'Unexpected compareScreenshot error.'
  this.expected = browserName === 'chrome' ? 0 : 5 // misMatchPercentage tolerance 5% for non chrome

  this.command = callback => {
    makeDir(path.dirname(resultPath)).then(() =>
      makeDir(path.dirname(diffPath))
    )

    // create new baseline photo if none exists
    if (!fs.existsSync(baselinePath) && browserName === 'chrome') {
      process.stdout.write('Image did not exist, updating test...\n')
      fs.writeFileSync(baselinePath, fs.readFileSync(resultPath))
    }

    if (fs.existsSync(baselinePath)) {
      compareImages(baselinePath, resultPath, callback)
    } else {
      callback()
    }

    return this
  }

  this.value = result => {
    if (result) {
      result.getDiffImage().pack().pipe(fs.createWriteStream(diffPath))
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

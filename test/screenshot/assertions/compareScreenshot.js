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

exports.assertion = function assertion(filename, baselinePath, expected) {
  const screenshotPath = 'test/screenshot/images'
  const resultPath = `${screenshotPath}/results/${filename}`
  const diffPath = `${screenshotPath}/diffs/${filename}`

  this.message = 'Unexpected compareScreenshot error.'
  this.expected = expected || 0 // misMatchPercentage tolerance default 0%

  this.command = callback => {
    makeDir(path.dirname(baselinePath))
      .then(() => makeDir(path.dirname(resultPath)))
      .then(() => makeDir(path.dirname(diffPath)))

    // create new baseline photo if none exists
    if (!fs.existsSync(baselinePath)) {
      makeDir(path.dirname(baselinePath))
        .then(() => fs.writeFileSync(baselinePath, fs.readFileSync(resultPath)))
        .then(() => compareImages(baselinePath, resultPath, callback))
    } else {
      compareImages(baselinePath, resultPath, callback)
    }

    return this
  }

  this.value = result => {
    result.getDiffImage().pack().pipe(fs.createWriteStream(diffPath))
    return parseFloat(result.misMatchPercentage, 10) // value this.pass is called with
  }

  this.pass = function passFn(value) {
    const pass = value <= this.expected

    if (pass) {
      this.message = `Screenshots Matched for ${filename} with a tolerance of ${this
        .expected}%.`
    } else {
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
    }
    return pass
  }
}

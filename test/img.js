/* eslint-disable no-console */
const { spawn } = require('child_process')
const requireContext = require('require-context')
const { resolve } = require('path')
const { runTests, getFiles } = require('picturebook')

const storyRoot = resolve(__dirname, '../storybook/stories/')
const overwrite = process.argv.includes('-u')
const { isCI, URL: url } = process.env

if (!isCI && !url) {
  console.log(`
ℹ️  Local tests default to the last deployed storybook for the branch.

You can provide URL as environment variable to overwrite the default url.`)
} else if (url) {
  console.log(`
ℹ️  Running tests on ${url}
`)
}

const configPath = resolve(__dirname, '../nightwatch.config.js')
const outputPath = resolve(__dirname, 'picturebook-results.json')

function runJest() {
  const params = ['test/img.spec.tsx', '--config', 'jest.img.config.js']
  const jest = spawn('./node_modules/.bin/jest', params, {
    stdio: 'pipe',
    env: process.env,
  })

  return new Promise((res, reject) => {
    jest.stdout.on('data', data => console.log(data.toString()))
    jest.stderr.on('data', data => {
      console.error(data.toString())
    })
    jest.on('close', exitCode => {
      if (exitCode === 0) {
        res()
      } else {
        reject()
      }
    })
  })
}

runTests({
  storyRoot,
  files: getFiles({
    stories: requireContext(storyRoot, true, /\.(tsx|png)/),
  }),
  overwrite,
  configPath,
  outputPath,
  maxRetryAttempts: 3,
})
  .then(runJest)
  .catch(() => {
    console.error('Failed image comparison')
    process.exit(1)
  })

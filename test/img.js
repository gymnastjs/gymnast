/* eslint-disable no-console */
const { spawn } = require('child_process')
const requireContext = require('require-context')
const { resolve } = require('path')
const { runTests, getFiles } = require('picturebook')

const storyRoot = resolve(__dirname, '../storybook/stories/')
const overwrite = process.argv.includes('-u')
const { isCI, URL } = process.env

if (!isCI && !URL) {
  console.log(`
ℹ️ Local tests default to the last deployed storybook for the branch.

You can provide URL as environment variable to overwrite the default url.`)
} else if (URL) {
  console.log(`
ℹ️ Running tests on ${URL}
`)
}

const configPath = resolve(__dirname, '../nightwatch.config.js')
const outputPath = resolve(__dirname, 'picturebook-results.json')

function runJest() {
  const params = ['test/img.spec.js', '--config', 'jest.img.config.js']
  const jest = spawn('./node_modules/.bin/jest', params, {
    stdio: 'pipe',
    env: process.env,
  })
  jest.stdout.on('data', data => console.log(data.toString()))
  jest.stderr.on('data', data => console.error(data.toString()))

  return new Promise(r => jest.on('close', r))
}

runTests({
  storyRoot,
  files: getFiles({
    stories: requireContext(storyRoot, true, /\.(js|png)/),
  }),
  overwrite,
  configPath,
  outputPath,
}).then(runJest)

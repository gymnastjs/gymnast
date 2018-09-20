/* eslint-disable no-console */

const { resolve } = require('path')
const requireContext = require('require-context')
const { nightwatchConfig, getFiles } = require('picturebook')

const { CI, CIRCLE_BRANCH, CIRCLE_BUILD_NUM, LOCAL_BRANCH, URL } = process.env

const projectName = 'gymnast'
const branchName = CIRCLE_BRANCH || LOCAL_BRANCH
const isMaster = branchName === 'master'
const isCI = !!CI

const branchUrlSuffix = isMaster ? '' : `/branch/${branchName}`

const ciConfig = {
  username: process.env[`SAUCE_USERNAME${isMaster ? '_MASTER' : ''}`],
  access_key: process.env[`SAUCE_ACCESS_KEY${isMaster ? '_MASTER' : ''}`],
  desiredCapabilities: {
    tags: [
      CIRCLE_BRANCH,
      isMaster ? projectName : `${projectName}-${CIRCLE_BRANCH}`,
    ],
    build: CIRCLE_BUILD_NUM,
  },
}

const localConfig = {
  username: process.env.SAUCE_USERNAME,
  access_key: process.env.SAUCE_ACCESS_KEY,

  desiredCapabilities: {
    tags: [`${projectName}-dev`, 'local'],
    build: 'dev',
  },
}

module.exports = nightwatchConfig({
  ...(isCI ? ciConfig : localConfig),
  files: getFiles({
    baseUrl: URL || `https://gymnastjs.github.io/gymnast${branchUrlSuffix}`,
    stories: requireContext(
      resolve(__dirname, './storybook/stories'),
      true,
      /\.js/
    ),
  }),
})

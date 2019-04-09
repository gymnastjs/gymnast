/* eslint-disable no-console */

const { resolve } = require('path')
const requireContext = require('require-context')
const { nightwatchConfig, getFiles } = require('picturebook')

/**
 * CircleCI defines CI and all the CIRCLE_* env variables
 * We additionally expose LOCAL_BRANCH as a way to customize the target url
 */
const { CI, CIRCLE_BRANCH, CIRCLE_BUILD_NUM, LOCAL_BRANCH } = process.env

const projectName = 'gymnast'
const branchName = CIRCLE_BRANCH || LOCAL_BRANCH
const isMaster = branchName === 'master'
const isCI = !!CI

/**
 * The project is deployed at different URLS depending on the git branch:
 * - master: https://gymnastjs.github.io/gymnast
 * - branch: https://gymnastjs.github.io/gymnast/branch/${branch}
 */
const branchUrlSuffix = isMaster ? '' : `/branch/${branchName}`

// CI config is used when tests run on CircleCI
const ciConfig = {
  /**
   * Because SauceLabs uses all tests results to publish the browser support chart,
   * we use 2 accounts:
   * - For master, so it only contains all master tests
   * - For development and branches, so tests can fail while developing without affecting the
   *   library browser support chart in the README
   */
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

// local config is used for local development
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
    baseUrl: `https://gymnastjs.github.io/gymnast${branchUrlSuffix}`,
    filter: {
      tests: file => file.endsWith('.spec.tsx'),
      docs: file => file.endsWith('.md'),
      screenshots: file => file.endsWith('.png'),
      story: (file = '', target = '') => file.endsWith(`${target}.tsx`),
    },
    stories: requireContext(
      resolve(__dirname, './storybook/stories'),
      true,
      /\.tsx/
    ),
  }),
})

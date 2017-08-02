const path = require('path')
const { merge } = require('lodash')
const { isCIMaster, username, accessKey } = require('./shared')

process.env.NODE_ENV = 'test:image'

const targetUrl = process.argv[process.argv.indexOf('--url') + 1]
const selenium = {
  start_process: false,
  host: '127.0.0.1',
  port: 4444,
  cli_args: {
    'webdriver.chrome.driver': '',
    'webdriver.ie.driver': '',
  },
}

const commonSettings = {
  launch_url: targetUrl,
  selenium_host: 'ondemand.saucelabs.com',
  selenium_port: 80,
  username,
  access_key: accessKey,
  screenshots: {
    enabled: false,
  },
  desiredCapabilities: {
    screenResolution: '1280x960',
    tags: [
      isCIMaster ? 'reflex' : 'reflex-branch',
      process.env.CIRCLE_BRANCH || 'local',
    ],
    build: process.env.CIRCLE_BUILD_NUM || 'dev',
    acceptSslCerts: true,
  },
}

module.exports = {
  src_folders: [path.resolve(__dirname, './specs')],
  custom_commands_path: path.resolve(__dirname, './commands'),
  custom_assertions_path: path.resolve(__dirname, './assertions'),
  selenium,
  test_workers: { enabled: true, workers: 'auto' },
  test_settings: {
    default: commonSettings,
    chrome: merge({}, commonSettings, {
      desiredCapabilities: {
        platform: 'macOS 10.12',
        version: 'latest',
        browserName: 'chrome',
        chromedriverVersion: '2.24',
      },
    }),
    ie11: merge({}, commonSettings, {
      desiredCapabilities: {
        platform: 'Windows 10',
        version: '11.103',
        browserName: 'internet explorer',
      },
    }),
  },
}

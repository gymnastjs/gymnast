const path = require('path')

const targetUrlIndex = process.argv.indexOf('--url')
if (targetUrlIndex === -1) {
  throw new Error(
    'Cannot run screenshot tests. Environment variable `TARGET_URL` must be provided'
  )
}

const targetUrl = process.argv[targetUrlIndex + 1]

module.exports = {
  src_folders: [path.resolve(__dirname, './specs')],
  custom_commands_path: path.resolve(__dirname, './commands'),
  custom_assertions_path: path.resolve(__dirname, './assertions'),
  page_objects_path: '',
  globals_path: '',
  selenium: {
    start_process: false,
    server_path: '',
    log_path: '',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': '',
      'webdriver.gecko.driver': '',
      'webdriver.edge.driver': '',
    },
  },
  test_settings: {
    default: {
      launch_url: targetUrl,
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: false,
        path: '',
      },
      desiredCapabilities: {
        chromeOptions: {
          args: ['window-size=1280,800'],
        },
        browserName: 'chrome',
      },
    },
  },
}

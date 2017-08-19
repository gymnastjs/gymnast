const isCIMaster = process.env.CI && process.env.CIRCLE_BRANCH === 'master'
const suffix = isCIMaster ? '_MASTER' : ''

module.exports = {
  isCIMaster,
  username: process.env[`SAUCE_USERNAME${suffix}`],
  accessKey: process.env[`SAUCE_ACCESS_KEY${suffix}`],
  browserWidth: 1280,
  browserHeight: 960,
}

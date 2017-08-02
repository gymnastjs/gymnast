const isCIMaster = process.env.CI && process.env.CIRCLE_BRANCH === 'master'
const suffix = isCIMaster ? '_MASTER' : ''
const username = process.env[`SAUCE_USERNAME${suffix}`]
const accessKey = process.env[`SAUCE_ACCESS_KEY${suffix}`]

module.exports = {
  isCIMaster,
  username,
  accessKey,
}
